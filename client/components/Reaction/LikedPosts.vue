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
    <article v-for="post in liked" :key="post._id">
      <PostComponent :post="post" />
      <CreateUpvote :post="post" />
      <CreateDownvote :post="post" />
      <ReactionComponent :post="post" />
      <GetRemainingReaction />
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
</style>
