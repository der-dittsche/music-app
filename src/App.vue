<template>
  <header>
    <navBar />
  </header>
  <main>
    <RouterView />
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
