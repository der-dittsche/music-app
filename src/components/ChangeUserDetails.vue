<template>
  <div class="modal" :class="hiddenClassUser">
    <div class="modal__container">
      <div class="modal__close" @click="isOpenUser = false">X</div>
      <div class="user__details">This are a user details page</div>

      <vee-form @submit="changeUsername" :validation-schema="schema_user"
        ><p>
          You want to change your username <b>{{ user.username }}</b> to:
        </p>
        <vee-field as="textarea" name="username" autocomplete="off"></vee-field>
        <ErrorMessage name="username" />

        <button type="submit">Submit</button>
      </vee-form>
    </div>
  </div>
</template>
<script>
import { mapStores, mapState, mapWritableState } from "pinia";
import useModalStore from "@/stores/modal";
import { useUserStore } from "@/stores/users";

export default {
  data() {
    const storeUser = useUserStore();
    return {
      schema_user: {
        username: "required|min:3",
      },
      storeUser,
    };
  },
  computed: {
    ...mapStores(useModalStore),
    ...mapState(useModalStore, ["hiddenClassUser"]),
    ...mapWritableState(useModalStore, ["isOpenUser"]),
  },
  props: {
    user: {
      type: Object,
      requiered: true,
    },
  },
  methods: {
    changeUsername(values, { resetForm }) {
      const username = {
        id: this.user.id,
        username: values.username,
        email: this.user.email,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        birthday: this.user.birthday,
        tos: this.user.birthday,
        userid: this.user.id,
      };
      this.storeUser.updateUser(username);
      resetForm();
      this.modalStore.isOpenUser = !this.modalStore.isOpenUser;
    },
  },
};
</script>
