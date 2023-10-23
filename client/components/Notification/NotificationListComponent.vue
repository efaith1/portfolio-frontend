<script setup lang="ts">
import CreateNotification from "@/components/Notification/CreateNotification.vue";
import DeleteNotification from "@/components/Notification/DeleteNotification.vue";
import MarkRead from "@/components/Notification/MarkRead.vue";
import MarkUnread from "@/components/Notification/MarkUnread.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const loaded = ref(false);
let notifications = ref<Array<Record<string, string>>>([]);
let searchRecipient = ref("");

async function getNotifications(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let notificationsResults;
  try {
    notificationsResults = await fetchy("/api/notifications/all", "GET", { query });
  } catch (_) {
    console.error("error loading notifications", _);
    return;
  }
  searchRecipient.value = author ? author : "";
  notifications.value = notificationsResults;
}

onBeforeMount(async () => {
  await getNotifications();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a notification:</h2>
    <CreateNotification @refreshNotifications="getNotifications(searchRecipient)" />
  </section>
  <!-- TODO should look into making this entire thing only if is logged in -->
  <section class="notifications" v-if="loaded && notifications.length !== 0">
    <article v-for="notification in notifications" :key="notification._id">
      <!-- <ListRead :notification="notification" /> -->
      <!-- <ListUnread :notification="notification" /> -->
      <MarkRead :notification="notification" />
      <MarkUnread :notification="notification" />
      <DeleteNotification :notification="notification" @refreshNotifications="getNotifications(searchRecipient)" />
      <ClearNotifications @refreshNotifications="getNotifications(searchRecipient)" />
      <SubscribeNotifications :notification="notification" />
      <UnsubscribeNotifications :notification="notification" />
    </article>
  </section>
  <p v-else-if="loaded">No notifications found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
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
}

.notifications {
  padding: 1em;
}
</style>
