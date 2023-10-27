import { defineStore } from "pinia";
import { ref } from "vue";

export const useLimitStore = defineStore(
  "limit",
  () => {
    const remaining = ref(0);
    const timeUntilReset = ref(0);
    const reactRemaining = ref(0);
    const timeToreset = ref(0);

    const setRemaining = async (value: number) => {
      remaining.value = value;
    };

    return {
      remaining,
      timeUntilReset,
      reactRemaining,
      timeToreset,
      setRemaining,
    };
  },
  { persist: true },
);
