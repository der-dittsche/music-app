import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/users";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/song/:id",
    name: "song",
    component: () => import("@/views/SongView.vue"),
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("@/views/ManageSongsView.vue"),
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/components/AuthView.vue"),
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  const storeUser = useUserStore();
  if (storeUser.user.id) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
