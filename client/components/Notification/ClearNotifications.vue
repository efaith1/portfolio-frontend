<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["refreshNotifications"]);
const loaded = ref(false);
let notifications = ref<Array<Record<string, string>>>([]);
let searchRecipient = ref("");

async function clearNotifications(recipient?: string) {
  let query: Record<string, string> = recipient !== undefined ? { recipient } : {};
  let clearResults;
  try {
    await fetchy("/api/notifications/clear", "DELETE", { query });
  } catch (e) {
    return;
  }
  searchRecipient.value = recipient ? recipient : "";
  notifications.value = clearResults;
  emit("refreshNotifications");
}

onBeforeMount(async () => {
  await clearNotifications();
  loaded.value = true;
});
</script>

<template>
  <div class="base">
    <h2 v-if="!searchRecipient">Notifications:</h2>
    <button class="button-error btn-small pure-button" @click="clearNotifications(searchRecipient)">Clear Notifications</button>
  </div>
</template>

<style scoped>
.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
