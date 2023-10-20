<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const reactionCount = ref(0);

const getReactionCount = async () => {
  try {
    // TODO need to somehow pass the ID
    console.log("gettingractionCount");
    const response = await fetchy("/api/reactions", "GET");
    if (response && response.count) {
      reactionCount.value = response.count;
      console.log("successfully counted"), reactionCount;
    }
  } catch (error) {
    console.error("Error fetching reaction count:", error);
  }
};
</script>

<template>
  <div class="count" @submit-prevent="getReactionCount">
    <div>
      <p>Reaction Count: {{ reactionCount }}</p>
    </div>
  </div>
</template>

<style scoped>
.count {
  display: flex;
}
</style>
