<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const _id = ref("");
const emit = defineEmits(["createUpvote"]);

const createUpvote = async () => {
  try {
    await fetchy(`/reactions/${_id.value}`, "POST");
  } catch (_) {
    return;
  }
  emit("createUpvote");
};
</script>

<template>
  <form @submit.prevent="createUpvote">
    <label for="_id">Upvote</label>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
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

.thumbs-up {
  color: #007bff; /* Set the color of the thumbs up icon */
  font-size: 24px; /* Adjust the size as needed */
  cursor: pointer; /* Add a pointer cursor for interaction */
  margin: 0.5em 0; /* Adjust the margin as needed */
}

/* Style the thumbs-up icon on hover */
.thumbs-up:hover {
  color: #0056b3; /* Change the color on hover */
}
</style>
