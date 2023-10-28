<script setup lang="ts">
import PostComponent from "@/components/Post/PostComponent.vue";
import CreateDownvote from "@/components/Reaction/CreateDownvote.vue";
import CreateUpvote from "@/components/Reaction/CreateUpvote.vue";
import ReactionComponent from "@/components/Reaction/ReactionComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";
import GetRemainingReaction from "../Limit/GetRemainingReaction.vue";

const loaded = ref(false);
let liked = ref<Array<Record<string, string>>>([]);

async function getReactedPosts() {
  let postResults;
  try {
    postResults = await fetchy("/api/reactions/liked", "GET");
  } catch (_) {
    return;
  }
  liked.value = postResults;
}

onMounted(async () => {
  await getReactedPosts();
  loaded.value = true;
});
</script>

<template>
  <h2 class="title">Liked Posts.</h2>
  <section class="posts" v-if="loaded && liked.length !== 0">
    <article class="container" v-for="post in liked" :key="post._id">
      <PostComponent :post="post" />
      <div class="row">
        <CreateUpvote :post="post" @upvote="getReactedPosts" />
        <CreateDownvote :post="post" @downvote="getReactedPosts" />
        <ReactionComponent :post="post" />
        <GetRemainingReaction />
      </div>
    </article>
  </section>
  <h2 class="noPost" v-else-if="loaded">No liked posts.</h2>
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
