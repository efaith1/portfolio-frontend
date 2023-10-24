<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref(0);
const type = ref("");

const decrementLimit = async (content: number, type: string) => {
  try {
    await fetchy("/api/limits/resource", "PUT", {
      body: { content, type },
    });
  } catch (_) {
    return;
  }
};
</script>
