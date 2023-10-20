<script setup lang="ts">
import NotificationListComponent from "@/components/Notification/NotificationListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <section class="welcome">
      <h1 v-if="isLoggedIn">Notifications for {{ currentUsername }} ✉️.</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <NotificationListComponent />
  </main>
</template>

<style scoped>
.welcome {
  text-align: center;
}
</style>
