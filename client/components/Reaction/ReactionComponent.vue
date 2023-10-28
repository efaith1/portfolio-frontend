<script setup lang="ts">
import { usePostStore } from "@/stores/post";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";

import { onMounted } from "vue";

const { reactionCount } = storeToRefs(usePostStore());
const props = defineProps(["post"]);

const getReactionCount = async () => {
  try {
    const response = await fetchy(`/api/reactions/count/${props.post._id}`, "GET");
    reactionCount.value = response;
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
      <h4>Upvotes: {{ reactionCount }}</h4>
    </div>
  </div>
</template>

<style scoped>
.count {
  display: flex;
}
</style>
