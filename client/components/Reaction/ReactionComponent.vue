<script setup lang="ts">
import CreateDownvote from "@/components/Reaction/CreateDownvote.vue";
import CreateUpvote from "@/components/Reaction/CreateUpvote.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const reactionCount = ref(0);

const getReactionCount = async () => {
  try {
    const response = await fetchy("/api/reactions", "GET");
    if (response && response.count) {
      reactionCount.value = response.count;
    }
  } catch (error) {
    console.error("Error fetching reaction count:", error);
  }
};
</script>

<template>
  <div class="react">
    <div v-if="isLoggedIn">
      <CreateUpvote @upvote="getReactionCount" />
      <CreateDownvote @downvote="getReactionCount" />
    </div>
  </div>
  <div class="count">
    <div>
      <p>Reaction Count: {{ reactionCount }}</p>
    </div>
  </div>
</template>

<style scoped>
.react {
  display: flex;
  flex-direction: row;
}
.count {
  padding-top: 100px;
  display: flex;
}
</style>
