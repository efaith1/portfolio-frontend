<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const emit = defineEmits(["refreshNotifications"]);

const createNotification = async (content: string) => {
  try {
    await fetchy("/api/notifications", "POST", {
      body: { content },
    });
  } catch (_) {
    return;
  }
  emit("refreshNotifications");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createNotification(content)">
    <label for="content">Notification Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a notification!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Notification</button>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 2em;
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
