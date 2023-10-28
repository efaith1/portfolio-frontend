<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <div class="App-container">
    <header>
      <nav>
        <div class="title">
          <img src="@/assets/images/gears.jpeg" />
          <RouterLink :to="{ name: 'Home' }">
            <h1>ProductiVerse</h1>
          </RouterLink>
        </div>
        <ul>
          <li>
            <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'MyPosts' }" :class="{ underline: currentRouteName == 'MyPosts' }"> Posts </RouterLink>
          </li>

          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'LikedPosts' }" :class="{ underline: currentRouteName == 'LikedPosts' }"> Liked </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'Notifications' }" :class="{ underline: currentRouteName == 'Notifications' }"> Notifications </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
          </li>
          <li v-else>
            <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
          </li>
        </ul>
      </nav>
      <article v-if="toast !== null" class="toast" :class="toast.style">
        <p>{{ toast.message }}</p>
      </article>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
@import "./assets/toast.css";

.App-container {
  max-width: 960px;
  padding: var(--m) var(--m);
  margin: auto;
  background-image: url(../split.jpeg);
  position: absolute;
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  min-width: 100%;
  min-height: 100%;
}

nav {
  padding: 1em 2em;
  background-color: rgb(177, 192, 240);
  display: flex;
  align-items: center;
  box-shadow: 4px 4px 8px rgba(0.1, 0.1, 0.1, 0.4);
}

h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
</style>
