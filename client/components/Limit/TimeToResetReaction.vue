<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const timeToreset = ref(0);
const type = "reaction";

const timeToReset = async (type: string) => {
  try {
    const time = await fetchy("/api/limits/waitime", "GET", {
      body: { type },
    });
    console.log("TIME TO RESET", time);
    timeToreset.value = time;
  } catch (_) {
    return;
  }
};
</script>

<template>
  <div class="count" @createLimit="timeToReset(type)">
    <div>
      <p>Time to Limit Reset: {{ timeToreset }}</p>
    </div>
  </div>
</template>
