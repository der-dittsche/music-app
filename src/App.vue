<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
      <button @click="storeUser.logoutUser" v-if="storeUser.user.id">
        LogOut
      </button>
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
  mounted() {
    this.storeUser.initUser();
  },
};
</script>

<style scoped></style>
