<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const subscribe = async () => {
  try {
    await fetchy("/api/notifications/subscribe", "PUT");
  } catch (_) {
    return;
  }
};
</script>
<!-- only show this if unsubscribed? -->
<template>
  <div class="subscribe">
    <button type="submit" class="pure-button-primary pure-button" @click="subscribe">Subscribe</button>
  </div>
</template>

<style scoped>
.subscribe {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 1em;
  align-content: space-between;
}
</style>
