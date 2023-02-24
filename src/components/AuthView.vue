<template>
  <div class="modal" :class="hiddenClass">
    <div class="modal__container">
      <div class="auth__close" @click="isOpen = false">X</div>
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
import LoginUser from "@/components/userLogin.vue";
import RegisterUser from "@/components/userRegistration.vue";
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
<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  padding: 2rem;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

.modal__container {
  position: relative;
  width: 50vw;
  min-height: 50vh;
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
}
.auth__close {
  position: absolute;
  right: 2rem;
  cursor: pointer;
}
</style>
