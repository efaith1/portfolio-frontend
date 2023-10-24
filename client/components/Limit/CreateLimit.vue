<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const limit = ref(0);
const type = ref("");

const createLimit = async (limit: number, type: string) => {
  try {
    await fetchy("/api/limits/resource", "POST", {
      body: { limit, type },
    });
  } catch (_) {
    return;
  }
};
</script>

<template>
  <h2>Set your daily app usage limit.</h2>
  <form @submit.prevent="createLimit(limit, type)">
    <select id="select" placeholder="Please Select" required>
      <option value="" disabled>Please Select</option>
      <option v-for="i in 5" :key="i" :value="i">{{ i }}</option>
    </select>

    <h2>Your daily reaction limit (upvote and downvote combined) is preset to: 20</h2>
    <label> <input type="checkbox" name="accept" required /> I understand that I can change this limit in the settings page </label>
    <button type="submit" class="pure-button-primary pure-button">Create Limit</button>
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

/* Style the checkbox label */
label {
  font-size: 16px;
}
</style>
