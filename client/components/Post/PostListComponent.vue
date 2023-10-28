<script setup lang="ts">
import CreatePostForm from "@/components/Post/CreatePostForm.vue";
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import CreateDownvote from "@/components/Reaction/CreateDownvote.vue";
import CreateUpvote from "@/components/Reaction/CreateUpvote.vue";
import ReactionComponent from "@/components/Reaction/ReactionComponent.vue";
// import { useLimitStore } from "@/stores/limit";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import GetRemainingReaction from "../Limit/GetRemainingReaction.vue";
import SearchPostForm from "./SearchPostForm.vue";

// const { reactRemaining } = storeToRefs(useLimitStore());
const { isLoggedIn, reactionCount, editing, reactRemaining } = storeToRefs(useUserStore());

const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
let searchAuthor = ref("");

async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  posts.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

function updateCount(newCount: number) {
  reactionCount.value += newCount;
}

function updateRemaining(newCount: number) {
  reactRemaining.value -= newCount;
}

onBeforeMount(async () => {
  await getPosts();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a post:</h2>
    <CreatePostForm @refreshPosts="getPosts" />
  </section>
  <div class="row">
    <h2 v-if="!searchAuthor">Posts:</h2>
    <h2 v-else>Posts by {{ searchAuthor }}:</h2>
    <SearchPostForm @getPostsByAuthor="getPosts" />
  </div>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article class="container" v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
      <div class="row">
        <CreateUpvote :post="post" @upvote="updateRemaining(1), updateCount(1)" />
        <CreateDownvote :post="post" @downvote="updateRemaining(1), updateCount(-1)" />
        <ReactionComponent :post="post" />
        <GetRemainingReaction />
      </div>
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.container {
  background-color: var(--base-bg);
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.container h2 {
  color: #333;
}

.container a {
  color: #007bff;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: right;
  margin: 0 auto;
  max-width: 60em;
}
</style>
