import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Friend, Limit, Notification, Post, Reaction, User, WebSession } from "./app";
import { LimitOptions } from "./concepts/limit";
import { NotificationOptions } from "./concepts/notification";
import { PostDoc, PostOptions } from "./concepts/post";
import { ReactionOptions } from "./concepts/reaction";
import { UserDoc } from "./concepts/user";
import { WebSessionDoc } from "./concepts/websession";
import Responses from "./responses";

class Routes {
  @Router.get("/session")
  async getSessionUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.getUserById(user);
  }

  @Router.get("/users")
  async getUsers() {
    return await User.getUsers();
  }

  @Router.get("/users/:username")
  async getUser(username: string) {
    return await User.getUserByUsername(username);
  }

  @Router.post("/users")
  async createUser(session: WebSessionDoc, username: string, password: string) {
    WebSession.isLoggedOut(session);
    return await User.create(username, password);
  }

  @Router.patch("/users")
  async updateUser(session: WebSessionDoc, update: Partial<UserDoc>) {
    const user = WebSession.getUser(session);
    return await User.update(user, update);
  }

  @Router.delete("/users")
  async deleteUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    WebSession.end(session);
    return await User.delete(user);
  }

  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string, password: string) {
    const u = await User.authenticate(username, password);
    try {
      const loginToken = await Limit.getRemaining(u._id, "loginToken");
      if (loginToken.remaining > 0) {
        WebSession.start(session, u._id);
        return { msg: "Logged in! Time remaining in your session:" + loginToken.remaining / (60 * 60 * 1000) + " hours" };
      } else {
        const timeUntilReset = await Limit.timeUntilReset(u._id, "loginToken");
        return { msg: `You have exceeded your time online today. Please try again in ${timeUntilReset}` };
      }
    } catch (error) {
      WebSession.start(session, u._id);
      await Limit.setLimit(u._id, 20, "reaction");
      await Limit.setLimit(u._id, 5 * 60 * 60 * 1000, "loginToken"); // A default of 5 hrs (in milliseconds)
    }
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    const timeElapsed = WebSession.calculateTimeLoggedIn(session);
    const user = WebSession.getUser(session);
    try {
      if (typeof timeElapsed === "number") {
        const remaining = await Limit.getRemaining(user, "loginToken");
        await Limit.decrement(user, Math.min(remaining.remaining, timeElapsed), "loginToken"); // decrement whichever's less to prevent errors
        WebSession.end(session);
        return {
          msg: "Logged out! Time remaining in your session:" + (await Limit.getRemaining(user, "loginToken")).remaining / (60 * 60 * 1000) + " hours",
        };
      } else {
        return { msg: "Error calculating time elapsed" };
      }
    } catch (error) {
      throw new Error("Error while logging out");
    }
  }

  @Router.get("/posts")
  async getPosts(author?: string) {
    let posts;
    if (author) {
      const id = (await User.getUserByUsername(author))._id;
      posts = await Post.getByAuthor(id);
    } else {
      posts = await Post.getPosts({});
    }
    return Responses.posts(posts);
  }

  @Router.get("/posts/mine")
  async getMyPosts(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    const posts = await Post.getByAuthor(user);
    return Responses.posts(posts);
  }

  @Router.post("/posts")
  async createPost(session: WebSessionDoc, content: string, options?: PostOptions) {
    const user = WebSession.getUser(session);
    const created = await Post.create(user, content, options);
    return { msg: created.msg, post: await Responses.post(created.post) };
  }

  @Router.patch("/posts/:_id")
  async updatePost(session: WebSessionDoc, _id: ObjectId, update: Partial<PostDoc>) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    return await Post.update(_id, update);
  }

  @Router.delete("/posts/:_id")
  async deletePost(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    return Post.delete(_id);
  }

  @Router.get("/friends")
  async getFriends(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.idsToUsernames(await Friend.getFriends(user));
  }

  @Router.delete("/friends/:friend")
  async removeFriend(session: WebSessionDoc, friend: string) {
    const user = WebSession.getUser(session);
    const friendId = (await User.getUserByUsername(friend))._id;
    return await Friend.removeFriend(user, friendId);
  }

  @Router.get("/friend/requests")
  async getRequests(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Responses.friendRequests(await Friend.getRequests(user));
  }

  @Router.post("/friend/requests/:to")
  async sendFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.sendRequest(user, toId);
  }

  @Router.delete("/friend/requests/:to")
  async removeFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.removeRequest(user, toId);
  }

  @Router.put("/friend/accept/:from")
  async acceptFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.acceptRequest(fromId, user);
  }

  @Router.put("/friend/reject/:from")
  async rejectFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.rejectRequest(fromId, user);
  }

  @Router.post("/reactions/:_id")
  async createUpvote(session: WebSessionDoc, _id: ObjectId, options?: ReactionOptions) {
    // citation: gpt for cleaner code (and debugging).
    const user = WebSession.getUser(session);
    const post = (await Post.getPostById(_id))._id;

    try {
      const limit = await Limit.getRemaining(user, "reaction");
      if (limit.remaining <= 0) {
        throw new Error(`You have run out of resources. Try again in ${await Limit.timeUntilReset(user, "reaction")}`);
      }

      const created = await Reaction.upvote(user, post, options);
      await Limit.decrement(user, 1, "reaction");

      return {
        msg: created.msg,
        upvote: await Responses.reaction(created.reaction),
        remaining: (await Limit.getRemaining(user, "reaction")).remaining,
      };
    } catch (error) {
      // await Limit.setLimit(user, 20, "reaction");
      throw new Error("" + error);
    }
  }

  @Router.delete("/reactions/:_id")
  async deleteUpvote(session: WebSessionDoc, _id: ObjectId, options?: ReactionOptions) {
    // citation: gpt for cleaner code (and debugging).
    const user = WebSession.getUser(session);
    const post = (await Post.getPostById(_id))._id;

    try {
      const limit = await Limit.getRemaining(user, "reaction");
      if (limit.remaining <= 0) {
        throw new Error(`You have run out of resources. Try again in ${await Limit.timeUntilReset(user, "reaction")}`);
      }

      const created = await Reaction.downvote(user, post, options);
      await Limit.decrement(user, 1, "reaction");

      return {
        msg: created.msg,
        upvote: await Responses.reaction(created.reaction),
        remaining: (await Limit.getRemaining(user, "reaction")).remaining,
      };
    } catch (error) {
      throw new Error("" + error);
    }
  }

  @Router.get("/reactions/count/:_id")
  async getPostReactionCount(_id: ObjectId) {
    return await Reaction.getReactionCount(_id);
  }

  @Router.get("/reactions/liked")
  async getReactions(session: WebSessionDoc) {
    // Citation: posts implementation above and gpt for debugging
    let reactions;
    const user = WebSession.getUser(session);
    reactions = await Reaction.getByAuthor(user);
    const upvotedPostIds = reactions.map((reaction) => reaction.target);
    const upvotedPosts = await Post.getPosts({ _id: { $in: upvotedPostIds } });
    reactions = upvotedPosts;
    return reactions;
  }

  @Router.post("/notifications")
  async createNotification(session: WebSessionDoc, content: string, options?: NotificationOptions) {
    const user = WebSession.getUser(session);
    const userCanSendNotifications = await Notification.checkCanSend(user);
    if (userCanSendNotifications === false) {
      throw new Error("Recipient cannot receive notifications");
    }
    const created = await Notification.send(user, content, options);
    return { msg: created.msg, notification: await Responses.notification(created.post) };
  }

  @Router.put("/notifications/markread/:_id")
  async markAsRead(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Notification.isRecipient(user, _id);
    return await Notification.markAsRead(_id);
  }

  @Router.put("/notifications/markunread/:_id")
  async markAsUnread(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Notification.isRecipient(user, _id);
    return await Notification.markAsUnread(_id);
  }

  @Router.get("/notifications/read")
  async getReadNotifications(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Notification.getRead(user);
  }

  @Router.get("/notifications/unread")
  async getUnreadNotifications(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Notification.getUnread(user);
  }

  @Router.get("/notifications/all")
  async getAll(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    try {
      return await Notification.getAll(user);
    } catch (e) {
      console.error("Trouble getting all notifications", e);
    }
  }

  @Router.delete("/notifications/clear")
  async clearNotifications(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    const result = await Notification.clearNotifications(user);
    return { msg: "Notifications cleared successfully", result };
  }

  @Router.delete("/notifications/:_notificationId")
  async deleteNotification(session: WebSessionDoc, _notificationId: ObjectId) {
    const user = WebSession.getUser(session);
    try {
      await Notification.isRecipient(user, _notificationId);
      const result = await Notification.deleteNotification(_notificationId);
      return { msg: "Notification deleted successfully", result };
    } catch (error) {
      return { msg: "Error deleting notification", error };
    }
  }

  @Router.put("/notifications/unsubscribe")
  async unsubscribe(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Notification.unsubscribe(user);
  }

  @Router.put("/notifications/subscribe")
  async subscribe(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Notification.subscribe(user);
  }

  @Router.post("/limits/resource")
  async createLimit(session: WebSessionDoc, type: string, options?: LimitOptions) {
    const user = WebSession.getUser(session);
    return await Limit.setLimit(user, 20, type, options);
  }

  @Router.put("/limits/resource")
  async decrementLimit(session: WebSessionDoc, limit: number, type: string) {
    const user = WebSession.getUser(session);
    return await Limit.decrement(user, limit, type);
  }

  @Router.get("/limits/resource")
  async getRemaining(session: WebSessionDoc, type: string) {
    const user = WebSession.getUser(session);
    return (await Limit.getRemaining(user, type)).remaining;
  }

  @Router.put("/limits/reset")
  async resetLimit(session: WebSessionDoc, type: string) {
    const user = WebSession.getUser(session);
    return await Limit.reset(user, type);
  }

  @Router.get("/limits/status")
  async getStatus(session: WebSessionDoc, type: string) {
    const user = WebSession.getUser(session);
    return await Limit.getStatus(user, type);
  }

  @Router.get("/limits/waitime")
  async getTimeToReset(session: WebSessionDoc, type: string) {
    const user = WebSession.getUser(session);
    return await Limit.timeUntilReset(user, type);
  }
}

export default getExpressRouter(new Routes());
