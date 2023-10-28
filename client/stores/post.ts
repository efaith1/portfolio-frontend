import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore(
  "post",
  () => {
    const reactionCount = ref(0);

    const setInitialCount = (initialValue: number) => {
      reactionCount.value = initialValue;
    };

    const incrementCount = () => {
      reactionCount.value += 1;
    };

    const updateReactionCount = (newValue: number) => {
      reactionCount.value = newValue;
    };

    return {
      reactionCount,
      setInitialCount,
      incrementCount,
      updateReactionCount,
    };
  },
  { persist: true },
);
