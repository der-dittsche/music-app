<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/users";

export default {
  components: {
    RouterLink,
    RouterView,
  },
  data() {
    const storeUser = useUserStore();
    return {
      storeUser,
    };
  },
};
</script>

<style scoped></style>
