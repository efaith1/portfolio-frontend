<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const react = "reaction";
const { reactRemaining } = storeToRefs(useUserStore());

const getRemaining = async (type = react) => {
  try {
    const rem = await fetchy("/api/limits/resource", "GET", {
      query: { type },
    });
    reactRemaining.value = rem;
  } catch (error) {
    console.error("Error fetching remaining reactions:", error);
  }
};

onMounted(async () => {
  await getRemaining(react);
});
</script>

<template>
  <div class="count">
    <div>
      <h4>Remaining Reactions: {{ reactRemaining }}</h4>
    </div>
  </div>
</template>

<style scoped>
.count {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 1em;
  align-content: space-between;
}
</style>
