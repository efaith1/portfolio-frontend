<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["notification"]);

const markRead = async () => {
  try {
    await fetchy(`/api/notifications/markread/${props.notification._id}`, "PUT");
  } catch (_) {
    return;
  }
};
</script>

<template>
  <div class="markRead">
    <button type="submit" class="pure-button-primary pure-button" @click="markRead">Mark As Read</button>
  </div>
</template>

<style scoped>
.markRead {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 1em;
  align-content: space-between;
}
</style>
