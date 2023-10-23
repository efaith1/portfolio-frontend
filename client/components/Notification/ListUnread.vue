<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const loaded = ref(false);
let notifications = ref<Array<Record<string, string>>>([]);
let searchRecipient = ref("");

async function getUnread(recipient?: string) {
  let query: Record<string, string> = recipient !== undefined ? { recipient } : {};
  let unreadResults;
  try {
    unreadResults = await fetchy("/api/notifications/unread", "GET", { query });
  } catch (_) {
    return;
  }
  searchRecipient.value = recipient ? recipient : "";
  notifications.value = unreadResults;
}

onBeforeMount(async () => {
  await getUnread();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2 v-if="!searchRecipient">No author to listUnread:</h2>
    <button v-else class="button-error btn-small pure-button" @click="getUnread(searchRecipient)">List Unread Notifications</button>
  </div>
</template>

<style scoped>
.row {
  margin: 0 auto;
  max-width: 60em;
}
</style>
