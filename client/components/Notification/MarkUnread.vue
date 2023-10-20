<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["notification"]);

const markUnread = async () => {
  try {
    await fetchy(`/api/notifications/markunread/${props.notification._id}`, "PUT");
  } catch (_) {
    return;
  }
};
</script>

<template>
  <div class="markUnread">
    <button type="submit" class="pure-button-primary pure-button" @click="markUnread">Mark As Unread</button>
  </div>
</template>

<style scoped>
.markUnread {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 1em;
  align-content: space-between;
}
</style>
