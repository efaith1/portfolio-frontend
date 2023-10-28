<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import NotificationComponent from "./NotificationComponent.vue";

const loaded = ref(false);
const show = ref(false);
const toShow = ref(0);
let notifications = ref<Array<Record<string, string>>>([]);

async function getRead() {
  let readResults;
  try {
    readResults = await fetchy("/api/notifications/read", "GET");
  } catch (_) {
    return;
  }
  notifications.value = readResults;
}

function listRead() {
  toShow.value = 1 - toShow.value;

  if (toShow.value === 1) {
    show.value = true;
  } else {
    show.value = false;
  }
}
onMounted(async () => {
  await getRead();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <button class="pure-button-primary pure-button" @click="listRead">List Read Notifications</button>
  </div>

  <div v-if="show">
    <h2 class="title">Read Notifications</h2>
    <section class="notifications" v-if="loaded && notifications.length !== 0">
      <article v-for="notification in notifications" :key="notification._id">
        <NotificationComponent :notification="notification" @read="getRead" />
      </article>
    </section>
    <h2 v-else-if="loaded">No read notifications.</h2>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.row {
  margin: 0 auto;
  max-width: 60em;
}
</style>
