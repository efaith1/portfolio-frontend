import { defineStore } from "pinia";
import { ref } from "vue";

export const useLimitStore = defineStore(
  "limit",
  () => {
    const remaining = ref(0);

    const setRemaining = async (value: number) => {
      remaining.value = value;
    };

    return {
      remaining,
      setRemaining,
    };
  },
  { persist: true },
);
