<script setup lang="ts">
import GetRemainingReaction from "@/components/Limit/GetRemainingReaction.vue";
import TimeToResetReaction from "@/components/Limit/TimeToResetReaction.vue";
import { fetchy } from "../../utils/fetchy";

const react = "reaction";
const emit = defineEmits(["createLimit"]);

const createLimit = async (type = react) => {
  try {
    await fetchy("/api/limits/resource", "POST", { query: { type } });
  } catch (_) {
    return;
  }
  emit("createLimit");
};
</script>

<template>
  <h2>Set your daily reaction limit.</h2>
  <div class="limit">
    <button type="submit" class="pure-button-primary pure-button" @click="createLimit(react)">Activate Upvote Limit</button>
  </div>
  <GetRemainingReaction />
  <TimeToResetReaction />
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

/* Style the checkbox label */
label {
  font-size: 16px;
}
</style>
