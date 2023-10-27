import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import HomeView from "../views/HomeView.vue";
import LikedViewVue from "../views/LikedView.vue";
import LimitView from "../views/LimitView.vue";
import LoginView from "../views/LoginView.vue";
import MyPostsViewVue from "../views/MyPostsView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import NotificationViewVue from "../views/NotificationView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/myPost",
      name: "MyPosts",
      component: MyPostsViewVue,
      meta: { requiresAuth: true },
    },
    {
      path: "/likedPost",
      name: "LikedPosts",
      component: LikedViewVue,
      meta: { requiresAuth: true },
    },
    {
      path: "/notification",
      name: "Notifications",
      component: NotificationViewVue,
      meta: { requiresAuth: true },
    },
    {
      path: "/limit",
      name: "Limit",
      component: LimitView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
