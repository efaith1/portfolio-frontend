<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const loaded = ref(false);
let notifications = ref<Array<Record<string, string>>>([]);
let notifRecipient = ref("");

async function getRead(recipient?: string) {
  let query: Record<string, string> = recipient !== undefined ? { recipient } : {};
  let readResults;
  try {
    readResults = await fetchy("/api/notifications/read", "GET", { query });
  } catch (_) {
    return;
  }
  notifRecipient.value = recipient ? recipient : "";
  notifications.value = readResults;
}

onBeforeMount(async () => {
  await getRead();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2 v-if="!notifRecipient">No author to listRead:</h2>
    <button v-else class="button-error btn-small pure-button" @click="getRead(notifRecipient)">List Read Notifications</button>
  </div>
</template>

<style scoped>
.row {
  margin: 0 auto;
  max-width: 60em;
}
</style>
