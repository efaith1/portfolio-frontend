<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const type = ref("");

const getRemaining = async (type: string) => {
  try {
    await fetchy("/api/limits/status", "GET", {
      body: { type },
    });
  } catch (_) {
    return;
  }
};
</script>
