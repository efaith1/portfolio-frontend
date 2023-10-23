<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["refreshNotifications"]);
const loaded = ref(false);
let searchRecipient = ref("");

async function clearNotifications(recipient?: string) {
  let query: Record<string, string> = recipient !== undefined ? { recipient } : {};
  try {
    await fetchy("/api/notifications/clear", "DELETE", { query });
  } catch (e) {
    return;
  }
  searchRecipient.value = recipient ? recipient : "";
  emit("refreshNotifications");
}

onBeforeMount(async () => {
  await clearNotifications();
  loaded.value = true;
});
</script>

<template>
  <div class="base">
    <h2 v-if="!searchRecipient">No author to clear:</h2>
    <button v-else class="button-error btn-small pure-button" @click="clearNotifications(searchRecipient)">Clear Notifications</button>
  </div>
</template>

<style scoped>
.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
