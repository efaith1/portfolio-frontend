<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

const reactionCount = ref(0);
const props = defineProps(["post"]);

const getReactionCount = async () => {
  try {
    console.log("getting reaction Count");
    const response = await fetchy(`/api/reactions/count/${props.post._id}`, "GET");
    if (response && response.count) {
      reactionCount.value = response.count;
      console.log("successfully counted"), reactionCount;
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
  <div class="count">
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
