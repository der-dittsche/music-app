<template>
  <main>
    <h1>This is an about page</h1>
    <p>about me</p>
    <div class="container">
      <div v-for="details in storeUser.users" :key="details.id">
        <div class="userdetails">
          <div class="userdetails_topic">
            <ul>
              <li>E-Mail:</li>
              <li>Firstname:</li>
              <li>Lastname:</li>
              <li>Birthday:</li>
              <li>Username:</li>
            </ul>
          </div>
          <div class="userdetails_info">
            <ul>
              <li>{{ details.email }}</li>
              <li>{{ details.firstname }}</li>
              <li>{{ details.lastname }}</li>
              <li>{{ details.birthday }}</li>
              <li>{{ details.username }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { useUserStore } from "@/stores/users";
export default {
  name: "AboutView",
  data() {
    const storeUser = useUserStore();

    return {
      storeUser,
    };
  },
  methods: {},
};
</script>
<style></style>
