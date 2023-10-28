<script setup lang="ts">
// import ClearNotifications from "@/components/Notification/ClearNotifications.vue";
import CreateNotification from "@/components/Notification/CreateNotification.vue";
import ListRead from "@/components/Notification/ListRead.vue";
import ListUnread from "@/components/Notification/ListUnread.vue";
import SubscribeNotifications from "@/components/Notification/SubscribeNotifications.vue";
import UnsubscribeNotifications from "@/components/Notification/UnsubscribeNotifications.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import NotificationComponent from "./NotificationComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const loaded = ref(false);
let notifications = ref<Array<Record<string, string>>>([]);

async function getNotifications() {
  let notificationsResults;
  try {
    notificationsResults = await fetchy("/api/notifications/all", "GET");
  } catch (_) {
    return;
  }
  notifications.value = notificationsResults;
}

onMounted(async () => {
  await getNotifications();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2 class="top">Create a notification:</h2>
    <CreateNotification @refreshNotifications="getNotifications" />
  </section>

  <section>
    <h2 class="top">Available Actions</h2>
    <article>
      <ListUnread />
    </article>
    <article>
      <ListRead />
    </article>
    <article>
      <SubscribeNotifications />
    </article>
    <article>
      <UnsubscribeNotifications />
    </article>
    <!-- <ClearNotifications @clearNotifications="getNotifications" /> -->
  </section>

  <h2 class="top">Notifications</h2>
  <section class="notifications" v-if="loaded && notifications.length !== 0">
    <article v-for="notification in notifications" :key="notification._id">
      <NotificationComponent :notification="notification" />
    </article>
  </section>
  <p v-else-if="loaded">No notifications found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
.top {
  text-align: center;
}
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  margin: 2em;
}

.notifications {
  padding: 1em;
}
</style>
