<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const createDownvote = async () => {
  try {
    await fetchy(`/api/reactions/${props.post._id}`, "DELETE");
  } catch (_) {
    return;
  }
  // emit("createDownvote");
};
</script>

<template>
  <form @submit.prevent="createDownvote">
    <button type="submit" class="pure-button-primary pure-button">Downvote</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
