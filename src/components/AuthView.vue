<template>
  <div class="modal" :class="hiddenClass">
    <div class="modal__container">
      <div class="modal__close" @click="isOpen = false">X</div>
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
      <div v-if="!register">
        <LoginUser />
      </div>
      <div v-if="register">
        <RegisterUser />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LoginUser from "@/components/authview/userLogin.vue";
import RegisterUser from "@/components/authview/userRegistration.vue";
import { mapState, mapWritableState } from "pinia";
import useModalStore from "@/stores/modal";

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
  computed: {
    ...mapState(useModalStore, ["hiddenClass"]),
    ...mapWritableState(useModalStore, ["isOpen"]),
  },
};
</script>
