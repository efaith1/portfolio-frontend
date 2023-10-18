<script setup lang="ts">
import CreateDownvote from "@/components/Reaction/CreateDownvote.vue";
import CreateUpvote from "@/components/Reaction/CreateUpvote.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import ReactionCount from "./ReactionCount.vue";

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
    <ReactionCount />
  </div>
</template>

<style scoped>
.react {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.count {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: rgb(131, 183, 241);
  border-radius: 5px;
}
</style>
