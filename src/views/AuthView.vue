<template>
  <div>
    <h1>This is an Authentication Page</h1>
    <div class="auth__tab">
      <div
        class="auth__tab-item"
        :class="{ is_active: !register }"
        @click.prevent="register = false"
      >
        <h2>Login</h2>
      </div>
      <div
        class="auth__tab-item"
        :class="{ is_active: register }"
        @click.prevent="register = true"
      >
        <h2>Register</h2>
      </div>
    </div>
    <div class="form__card" v-if="!register">
      <LoginUser />
    </div>
    <div class="form__card" v-if="register">
      <RegisterUser />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LoginUser from "@/components/userLogin.vue";
import RegisterUser from "@/components/userRegistration.vue";

export default {
  data() {
    const register = ref(false);

    return {
      register,
    };
  },
  components: {
    LoginUser,
    RegisterUser,
  },
};
</script>
