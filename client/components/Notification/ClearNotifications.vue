<script setup lang="ts">
import { onBeforeMount } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["clearNotifications"]);

async function clearNotifications() {
  try {
    await fetchy("/api/notifications/clear", "DELETE");
  } catch (e) {
    return;
  }
  emit("clearNotifications");
}

onBeforeMount(async () => {
  await clearNotifications();
});
</script>

<template>
  <div class="base">
    <button class="pure-button-primary pure-button" @click="clearNotifications">Clear Notifications</button>
  </div>
</template>

<style scoped>
.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
