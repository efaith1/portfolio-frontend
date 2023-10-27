<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const remaining = ref(0);
const type = "reaction";

const getRemaining = async (type: string) => {
  try {
    const rem = await fetchy("/api/limits/resource", "GET", {
      body: { type },
    });
    console.log("REMAINING", rem);
    remaining.value = rem;
  } catch (_) {
    return;
  }
};
</script>

<template>
  <div class="count" @createLimit="getRemaining(type)">
    <div>
      <p>Remaining Reactions: {{ remaining }}</p>
    </div>
  </div>
</template>
