<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["notification"]);
const emit = defineEmits(["refreshNotifications"]);

const deleteNotification = async () => {
  try {
    await fetchy(`/api/notifications/${props.notification._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshNotifications");
};
</script>

<template>
  <div class="base">
    <button class="button-error btn-small pure-button" @click="deleteNotification">Delete</button>
  </div>
</template>

<style scoped>
.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
