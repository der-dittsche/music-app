<template>
  <nav>
    <div class="nav__title">DNW</div>
    <ul class="primary-nav">
      <li>
        <RouterLink to="/"><div class="nav-item">Home</div></RouterLink>
      </li>
      <li v-if="storeUser.user.id">
        <RouterLink to="/about"><div class="nav-item">About</div></RouterLink>
      </li>
      <li v-if="storeUser.user.id">
        <RouterLink to="/manage"><div class="nav-item">Manage</div></RouterLink>
      </li>
    </ul>
    <div class="nav__auth">
      <RouterLink to="/auth"
        ><div class="nav-item" v-if="!storeUser.user.id">Auth</div></RouterLink
      >
      <div
        class="nav-item"
        @click="storeUser.logoutUser"
        v-if="storeUser.user.id"
      >
        LogOut
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "@/stores/users";

export default {
  data() {
    const storeUser = useUserStore();
    return {
      storeUser,
    };
  },
};
</script>
