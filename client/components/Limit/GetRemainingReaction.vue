<script setup lang="ts">
// import { useLimitStore } from "@/stores/limit";
// import { storeToRefs } from "pinia";
// import { onMounted } from "vue";
// import { fetchy } from "../../utils/fetchy";

// const react = "reaction";
// const { reactRemaining } = storeToRefs(useLimitStore());

// const getRemaining = async (type = react) => {
//   try {
//     const rem = await fetchy("/api/limits/resource", "GET", {
//       query: { type },
//     });
//     console.log("REMAINING", rem);
//     reactRemaining.value = rem;
//   } catch (error) {
//     console.error("Error fetching remaining reactions:", error);
//   }
// };

// onMounted(async () => {
//   await getRemaining(react);
// });
</script>

<!-- <template>
  <div class="count" @createLimit,upvote,downvote="getRemaining(react)">
    <div>
      <p>Remaining Reactions: {{ reactRemaining }}</p>
    </div>
  </div>
</template> -->
