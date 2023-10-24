<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const loaded = ref(false);
let notifications = ref<Array<Record<string, string>>>([]);
let notifRecipient = ref("");

async function getRead() {
  let readResults;
  try {
    readResults = await fetchy("/api/notifications/read", "GET");
  } catch (_) {
    return;
  }
  notifications.value = readResults;
}

onBeforeMount(async () => {
  await getRead();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <button class="pure-button-primary pure-button" @click="getRead()">List Read Notifications</button>
  </div>
</template>

<style scoped>
.row {
  margin: 0 auto;
  max-width: 60em;
}
</style>
