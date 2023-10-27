<script setup lang="ts">
import { remaining } from "@/stores/limit";
import { ref, watch } from "vue";
import { fetchy } from "../../utils/fetchy";

const timeToreset = ref(0);
const type = "loginToken";

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

watch(remaining, async (newRemaining) => {
  if (newRemaining === 0) {
    await timeToReset(type);
  }
});
</script>

<template>
  <div class="count" @createLimit="timeToReset(type)">
    <div>
      <p class="sorry" v-if="remaining === 0">Sorry, you cannot log in at the moment! Try again in: {{ timeToreset }} hours</p>
    </div>
  </div>
</template>

<style scoped>
.sorry {
  background-color: rgb(245, 94, 94);
  padding: 10px;
  color: black;
  border-radius: 5px;
}
</style>
