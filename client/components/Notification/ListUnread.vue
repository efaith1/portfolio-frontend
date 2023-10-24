<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const loaded = ref(false);
let notifications = ref<Array<Record<string, string>>>([]);

async function getUnread() {
  let notificationsResults;
  try {
    notificationsResults = await fetchy("/api/notifications/unread", "GET");
  } catch (_) {
    return;
  }
  notifications.value = notificationsResults;
}

onBeforeMount(async () => {
  await getUnread();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <button class="pure-button-primary pure-button" @click="getUnread()">List Unread Notifications</button>
  </div>
</template>

<style scoped>
.row {
  margin: 0 auto;
  max-width: 60em;
}
</style>
