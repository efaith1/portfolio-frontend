<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["upvote"]);

const createUpvote = async () => {
  try {
    console.log("Upvoteclicked");
    await fetchy(`/api/reactions/${props.post._id}`, "POST");
    console.log("done upvote action");
  } catch (e) {
    console.log("error fetching on upvote");
    console.error("Error creating upvote:", e);
  }
  emit("upvote");
  console.log("emmited upvote");
};
</script>

<template>
  <div class="upvote">
    <button type="submit" class="pure-button-primary pure-button" @click="createUpvote">Upvote</button>
  </div>
</template>

<style scoped>
.upvote {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 1em;
  align-content: space-between;
}
</style>
