import { ref } from "vue";

export const remaining = ref(0);

export function setRemaining(value: number) {
  remaining.value = value;
}
