<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["clearNotifications"]);
const loaded = ref(false);

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
  loaded.value = true;
});
</script>

<template>
  <div class="base">
    <button class="pure-button-primary pure-button" @click="clearNotifications()">Clear Notifications</button>
  </div>
</template>

<style scoped>
.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
