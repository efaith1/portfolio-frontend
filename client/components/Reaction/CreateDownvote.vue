<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["downvote"]);

const createDownvote = async () => {
  try {
    await fetchy(`/api/reactions/${props.post._id}`, "DELETE");
  } catch (e) {
    return;
  }
  emit("downvote");
};
</script>

<template>
  <div class="downvote">
    <button type="submit" class="pure-button-primary pure-button" @click="createDownvote">Downvote</button>
  </div>
</template>

<style scoped>
.downvote {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 1em;
}
</style>
