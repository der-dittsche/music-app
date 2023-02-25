<template>
  <div>
    <vee-form
      action="submit"
      @submit="login"
      :validation-schema="schema_login"
      class="auth__form"
    >
      <div class="form__card-element">
        <label for="login_email">Email</label>
        <vee-field name="login_email" :bails="false" v-slot="{ field, errors }">
          <div class="form__card-input">
            <input
              v-model="credentials.login_email"
              type="email"
              id="login_email"
              autocomplete="off"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </div></vee-field
        >
      </div>
      <div class="form__card-element">
        <label for="login_password">Password</label>
        <vee-field
          name="login_password"
          :bails="false"
          v-slot="{ field, errors }"
          class="form__card-input"
          ><div class="form__card-input">
            <input
              v-model="credentials.login_password"
              type="password"
              id="login_password"
              autocomplete="off"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </div></vee-field
        >
      </div>
      <div class="form__card-element">
        <button type="submit" @click="isOpen = false">Login</button>
      </div>
    </vee-form>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useUserStore } from "@/stores/users.js";
import { mapWritableState } from "pinia";
import useModalStore from "@/stores/modal";

export default {
  data() {
    const credentials = reactive({
      login_email: "",
      login_password: "",
    });
    const storeUser = useUserStore();

    return {
      credentials,
      storeUser,
      schema_login: {
        login_email: "required|min:3|max:100|email",
        login_password: "required|min:8|max:100|excluded:password",
      },
    };
  },
  methods: {
    login() {
      if (!this.credentials.login_email || !this.credentials.login_password) {
        console.log("wrong entry");
      } else {
        this.storeUser.loginUser(this.credentials);
      }
    },
  },
  computed: {
    ...mapWritableState(useModalStore, ["isOpen"]),
  },
};
</script>
