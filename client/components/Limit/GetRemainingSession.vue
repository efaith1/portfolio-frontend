<script setup lang="ts">
import { useLimitStore } from "@/stores/limit";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { fetchy } from "../../utils/fetchy";

const token = "loginToken";
const { remaining } = storeToRefs(useLimitStore());
const { setRemaining } = useLimitStore();

const getRemaining = async (type = token) => {
  try {
    const rem = await fetchy("/api/limits/resource", "GET", {
      query: { type },
    });
    await setRemaining(rem);
  } catch (error) {
    console.error("Error fetching remaining:", error);
  }
};

const updateRemainingTime = async () => {
  await setRemaining(remaining.value - 60000);
};

onMounted(async () => {
  await getRemaining(token);
  setInterval(updateRemainingTime, 60000); // Update every minute
});

function convertMillisecondsToTime(durationInMilliseconds: number) {
  const minutes = Math.floor((durationInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((durationInMilliseconds / (1000 * 60 * 60)) % 24);

  return hours + " hours " + minutes + " minutes ";
}
</script>

<template>
  <div>
    <main>
      <h2 class="count">Time Remaining: {{ convertMillisecondsToTime(remaining) }}</h2>
    </main>
  </div>
</template>

<style scoped>
.count {
  text-align: center;
}
</style>
