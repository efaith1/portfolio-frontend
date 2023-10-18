<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

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

onMounted(async () => {
  await getReactionCount();
});
</script>

<template>
  <div>
    <p>Reaction Count: {{ reactionCount }}</p>
  </div>
</template>
