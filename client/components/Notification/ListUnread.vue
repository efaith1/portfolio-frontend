<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import NotificationComponent from "./NotificationComponent.vue";

const loaded = ref(false);
const show = ref(false);
const toShow = ref(0);
let notifications = ref<Array<Record<string, string>>>([]);

async function getUnread() {
  let unreadResults;
  try {
    unreadResults = await fetchy("/api/notifications/unread", "GET");
  } catch (_) {
    return;
  }
  notifications.value = unreadResults;
}

function listUnread() {
  toShow.value = 1 - toShow.value;

  if (toShow.value === 1) {
    show.value = true;
  } else {
    show.value = false;
  }
}

onMounted(async () => {
  await getUnread();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <button class="pure-button-primary pure-button" @click="listUnread">List Unread Notifications</button>
  </div>

  <div v-if="show">
    <h2 class="title">Unread Notifications</h2>
    <section class="notifications" v-if="loaded && notifications.length !== 0">
      <article class="one" v-for="notification in notifications" :key="notification._id">
        <NotificationComponent :notification="notification" @unread="getUnread" />
      </article>
    </section>
    <h2 v-else-if="loaded">No unread notifications.</h2>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.row {
  margin: 0 auto;
  max-width: 60em;
}

.one {
  padding-bottom: 15px;
}
</style>
