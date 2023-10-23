<script setup lang="ts">
import ClearNotifications from "@/components/Notification/ClearNotifications.vue";
import ListRead from "@/components/Notification/ListRead.vue";
import ListUnread from "@/components/Notification/ListUnread.vue";
import NotificationListComponent from "@/components/Notification/NotificationListComponent.vue";
import SubscribeNotifications from "@/components/Notification/SubscribeNotifications.vue";
import UnsubscribeNotifications from "@/components/Notification/UnsubscribeNotifications.vue";
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
    <section>
      <article>
        <ListRead />
        <ListUnread />
        <SubscribeNotifications />
        <UnsubscribeNotifications />
        <ClearNotifications />
      </article>
    </section>
    <NotificationListComponent />
  </main>
</template>

<style scoped>
.welcome {
  text-align: center;
}
</style>
