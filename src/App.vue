<template>
  <header>
    <navBar />
  </header>
  <main>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component
      ></transition>
    </RouterView>
  </main>
  <div class="player">
    <songControll v-if="storeUser.user.id" />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/users";
import navBar from "@/components/navBar.vue";
import songControll from "@/components/songControll.vue";

export default {
  components: {
    RouterView,
    navBar,
    songControll,
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
<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
</style>
