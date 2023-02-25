<template>
  <div>
    <vee-form
      action="submit"
      @submit="auth"
      :validation-schema="schema_auth"
      class="auth__form"
    >
      <div class="form__card-element">
        <label for="auth_firstname">Firstname:</label>
        <vee-field
          name="auth_firstname"
          :bails="false"
          v-slot="{ field, errors }"
          ><div class="form__card-input">
            <input
              v-model="credentials.auth_firstname"
              type="text"
              id="auth_firstname"
              autocomplete="off"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
      </div>
      <div class="form__card-element">
        <label for="auth_lastname">Lastname:</label>
        <vee-field
          name="auth_lastname"
          :bails="false"
          v-slot="{ field, errors }"
          ><div class="form__card-input">
            <input
              v-model="credentials.auth_lastname"
              type="text"
              id="auth_lastname"
              autocomplete="off"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
      </div>
      <div class="form__card-element">
        <label for="auth_birthday">Birthday:</label>
        <vee-field
          name="auth_birthday"
          :bails="false"
          v-slot="{ field, errors }"
          ><div class="form__card-input">
            <input
              v-model="credentials.auth_birthday"
              type="date"
              id="auth_birthday"
              autocomplete="off"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
      </div>
      <div class="form__card-element">
        <label for="auth_username">Username:</label>
        <vee-field
          name="auth_username"
          :bails="false"
          v-slot="{ field, errors }"
          ><div class="form__card-input">
            <input
              v-model="credentials.auth_username"
              type="text"
              id="auth_username"
              autocomplete="off"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
      </div>
      <div class="form__card-element">
        <label for="auth_email">Email</label>
        <vee-field name="auth_email" :bails="false" v-slot="{ field, errors }">
          <div class="form__card-input">
            <input
              v-model="credentials.auth_email"
              type="email"
              id="auth_email"
              autocomplete="off"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </div></vee-field
        >
      </div>
      <div class="form__card-element">
        <label for="auth_password">Password</label>
        <vee-field
          name="auth_password"
          :bails="false"
          v-slot="{ field, errors }"
          class="form__card-input"
          ><div class="form__card-input">
            <input
              v-model="credentials.auth_password"
              type="password"
              id="auth_password"
              autocomplete="off"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </div></vee-field
        >
      </div>
      <div class="form__card-element">
        <label for="auth_password_confirmed">repeat Password:</label>
        <vee-field
          name="auth_password_confirmed"
          :bails="false"
          v-slot="{ field, errors }"
          ><div class="form__card-input">
            <input
              v-model="credentials.auth_password_confirmed"
              type="password"
              id="auth_password_confirmed"
              autocomplete="off"
              placeholder="Repeat password"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
      </div>
      <div class="form__card-element">
        <label for="auth_tos">TOS:</label>
        <vee-field name="auth_tos" :bails="false" v-slot="{ field, errors }"
          ><div class="form__card-input">
            <input
              v-model="credentials.auth_tos"
              type="checkbox"
              id="auth_tos"
              value="true"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
      </div>
      <button type="submit">Login</button>
    </vee-form>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useUserStore } from "@/stores/users.js";

export default {
  data() {
    const credentials = reactive({
      auth_email: "",
      auth_password_confirmed: "",
      auth_firstname: "",
      auth_lastname: "",
      auth_birthday: "",
      auth_username: "",
      auth_tos: false,
    });
    const storeUser = useUserStore();

    return {
      credentials,
      storeUser,
      schema_auth: {
        auth_email: "required|min:3|max:100|email",
        auth_password: "required|min:8|max:100|excluded:password",
        auth_password_confirmed: "pw_missmatch:@auth_password",
        auth_firstname: "required|min:3|max:100|alphaSpaces",
        auth_lastname: "required|min:3|max:100|alphaSpaces",
        auth_username: "required|min:6|max:100|alphaSpaces",
        auth_birthday: "required",
        auth_tos: "tos",
      },
    };
  },
  methods: {
    auth() {
      if (!this.credentials.auth_email || !this.credentials.auth_password) {
        console.log("wrong entry");
      } else {
        this.storeUser.registerUser(this.credentials);
      }
    },
  },
};
</script>
