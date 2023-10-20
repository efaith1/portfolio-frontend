<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let notifications = ref<Array<Record<string, string>>>([]);
let searchRecipient = ref("");

async function getRead(recipient?: string) {
  let query: Record<string, string> = recipient !== undefined ? { recipient } : {};
  let readResults;
  try {
    readResults = await fetchy("/api/notifications/read", "GET", { query });
  } catch (_) {
    return;
  }
  searchRecipient.value = recipient ? recipient : "";
  notifications.value = readResults;
}

onBeforeMount(async () => {
  await getRead();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2 v-if="!searchRecipient">Notifications:</h2>
    <h2 v-else>Read by {{ searchRecipient }}:</h2>
    <SearchPostForm @getPostsByAuthor="getRead" />
  </div>
</template>

<style scoped>
.row {
  margin: 0 auto;
  max-width: 60em;
}
</style>
