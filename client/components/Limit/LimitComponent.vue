<script setup lang="ts">
import GetRemainingReaction from "@/components/Limit/GetRemainingReaction.vue";
import TimeToResetReaction from "@/components/Limit/TimeToResetReaction.vue";
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const limit = ref(0);
const type = "reaction";
const emit = defineEmits(["createLimit"]);

const createLimit = async (limit: number, type: string) => {
  try {
    await fetchy("/api/limits/resource", "POST", {
      body: { limit, type },
    });
  } catch (_) {
    return;
  }
  emit("createLimit");
};
</script>

<template>
  <h2>Set your daily reaction limit.</h2>
  <form @submit.prevent="createLimit(limit, type)">
    <select id="select" placeholder="Please Select" required>
      <option value="" disabled>Please Select</option>
      <option v-for="i in 30" :key="i" :value="i">{{ i }}</option>
    </select>
    <GetRemainingReaction />
    <TimeToResetReaction :type="type" />
    <label> <input type="checkbox" name="accept" required /> I understand that I cannot change this limit again until 24 hours pass</label>
    <div class="limit">
      <button type="submit" class="pure-button-primary pure-button">Create Limit</button>
    </div>
  </form>
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
