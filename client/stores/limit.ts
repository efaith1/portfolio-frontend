import { defineStore } from "pinia";
import { ref } from "vue";

export const useLimitStore = defineStore(
  "limit",
  () => {
    const sessionRemaining = ref(0);

    const setRemaining = async (value: number) => {
      sessionRemaining.value = value;
    };

    return {
      sessionRemaining,
      setRemaining,
    };
  },
  { persist: true },
);
