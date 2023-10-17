<script setup lang="ts">
import CreateDownvote from "@/components/Reaction/CreateDownvote.vue";
import CreateUpvote from "@/components/Reaction/CreateUpvote.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <div class="react">
    <section v-if="isLoggedIn">
      <CreateUpvote />
      <CreateDownvote />
    </section>
  </div>
  <div class="count">
    <h2>Upvotes:</h2>
    <ReactionCount />
  </div>
</template>

<style scoped>
.react {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.count {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
