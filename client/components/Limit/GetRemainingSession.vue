<script setup lang="ts">
import { remaining, setRemaining } from "@/stores/limit";
import { fetchy } from "../../utils/fetchy";

const type = "loginToken";

const getRemaining = async (type: string) => {
  try {
    const rem = await fetchy("/api/limits/resource", "GET", {
      body: { type },
    });
    console.log("REMAINING", rem);
    setRemaining(rem);
  } catch (_) {
    return;
  }
};
</script>

<template>
  <div @createLimit="getRemaining(type)">
    <main>
      <h2 class="count">Time Remaining: {{ remaining }}</h2>
    </main>
  </div>
</template>

<style scoped>
.count {
  flex-direction: center;
  padding-left: 450px;
}
</style>
