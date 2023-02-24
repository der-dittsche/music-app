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
      <div
        class="nav-item"
        v-if="!storeUser.user.id"
        @click.prevent="toggleAuthModal"
      >
        Login
      </div>
      <div
        class="nav-item"
        @click="storeUser.logoutUser"
        v-if="storeUser.user.id"
      >
        LogOut
      </div>
    </div>
    <AuthView></AuthView>
  </nav>
</template>

<script>
import { useUserStore } from "@/stores/users";
import AuthView from "@/components/AuthView.vue";
import { mapStores } from "pinia";
import useModalStore from "@/stores/modal";

export default {
  data() {
    const storeUser = useUserStore();

    return {
      storeUser,
    };
  },
  components: {
    AuthView,
  },
  computed: {
    ...mapStores(useModalStore),
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
  },
};
</script>
