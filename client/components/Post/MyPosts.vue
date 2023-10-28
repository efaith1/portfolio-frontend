<script setup lang="ts">
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import CreateDownvote from "@/components/Reaction/CreateDownvote.vue";
import CreateUpvote from "@/components/Reaction/CreateUpvote.vue";
import ReactionComponent from "@/components/Reaction/ReactionComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { usePostStore } from "../../stores/post";

import { onMounted, ref } from "vue";

const { reactionCount } = storeToRefs(usePostStore());
const { editing } = storeToRefs(useUserStore());
const loaded = ref(false);
let mine = ref<Array<Record<string, string>>>([]);

async function getUserPosts() {
  let postResults;
  try {
    postResults = await fetchy("/api/posts/mine", "GET");
  } catch (_) {
    return;
  }
  mine.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

function updateCount(newCount: number) {
  reactionCount.value += newCount;
}

onMounted(async () => {
  await getUserPosts();
  loaded.value = true;
});
</script>

<template>
  <h2 class="title">My Posts.</h2>
  <section class="posts" v-if="loaded && mine.length !== 0">
    <article class="container" v-for="post in mine" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getUserPosts" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getUserPosts" @editPost="updateEditing" />
      <div class="row">
        <CreateUpvote :post="post" @upvote="updateCount(1)" />
        <CreateDownvote :post="post" @downvote="updateCount(-1)" />
        <ReactionComponent :post="post" />
      </div>
    </article>
  </section>
  <h2 class="noPost" v-else-if="loaded">You have not posted yet.</h2>
  <p v-else>Loading...</p>
</template>

<style scoped>
.title {
  text-align: center;
}
.noPost {
  text-align: center;
}

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

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;

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
}
</style>
