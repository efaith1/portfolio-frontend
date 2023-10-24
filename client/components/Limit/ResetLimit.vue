<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const type = ref("");

const resetLimit = async (type: string) => {
  try {
    await fetchy("/api/limits/reset", "PUT", {
      body: { type },
    });
  } catch (_) {
    return;
  }
};
</script>
