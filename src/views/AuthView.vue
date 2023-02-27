<template>
  <div class="container">
    <div class="auth_tab">
      <div
        class="auth_tab_item"
        :class="{ is_active: !register }"
        @click.prevent="register = false"
      >
        Login
      </div>
      <div
        class="auth_tab_item"
        :class="{ is_active: register }"
        @click.prevent="register = true"
      >
        Register
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  data() {
    const register = ref(false);
    const formTitle = computed(() => {
      return register.value ? "Register" : "Login";
    });

    return {
      register,
      formTitle,
    };
  },
};
</script>

<style></style>
