<script setup lang="ts">
import { useLimitStore } from "@/stores/limit";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const react = "reaction";

const { timeToreset } = storeToRefs(useLimitStore());

const timeToReset = async (type = react) => {
  try {
    const time = await fetchy("/api/limits/waitime", "GET", {
      query: { type },
    });
    console.log("TIME TO RESET", time);
    timeToreset.value = time;
  } catch (error) {
    console.error("Error getting time to reset for reactions:", error);
  }
};
</script>

<template>
  <div class="count" @createLimit="timeToReset(react)">
    <div>
      <p>Time to Limit Reset: {{ timeToreset }}</p>
    </div>
  </div>
</template>
