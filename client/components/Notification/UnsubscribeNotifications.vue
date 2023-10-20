<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const unsubscribe = async () => {
  try {
    await fetchy("/api/notifications/unsubscribe", "PUT");
  } catch (_) {
    return;
  }
};
</script>

<template>
  <div class="unsubscribe">
    <button type="submit" class="pure-button-primary pure-button" @click="unsubscribe">Unsubscribe</button>
  </div>
</template>

<style scoped>
.unsubscribe {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 1em;
  align-content: space-between;
}
</style>
