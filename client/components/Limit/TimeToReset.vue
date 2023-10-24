<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const type = ref("");

const timeToReset = async (type: string) => {
  try {
    await fetchy("/api/limits/waitime", "GET", {
      body: { type },
    });
  } catch (_) {
    return;
  }
};
</script>
