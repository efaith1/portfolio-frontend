<script setup lang="ts">
// import { remaining, timeUntilReset } from "@/stores/limit";
// import { onMounted } from "vue";
// import { fetchy } from "../../utils/fetchy";

// const token = "loginToken";

// const timeToReset = async (type = token) => {
//   try {
//     const time = await fetchy("/api/limits/waitime", "GET", {
//       query: { type },
//     });
//     timeUntilReset.value = time;
//   } catch (error) {
//     console.error("Error fetching time to reset:", error);
//   }
// };

// onMounted(async () => {
//   await timeToReset(token);
// });
</script>

<!-- <template>
  <div class="count">
    <div>
      <p class="sorry" v-if="remaining === 0">Sorry, you cannot log in at the moment! Try again in: {{ timeUntilReset }} hours</p>
    </div>
  </div>
</template> -->

<style scoped>
.sorry {
  background-color: rgb(245, 94, 94);
  padding: 10px;
  color: black;
  border-radius: 5px;
}
</style>
