import { defineStore } from "pinia";
import router from "../router";

export const useUserStore = defineStore("storeUser", {
  state: () => {
    return {
      users: [],
      songs: [],
      comments: [],
      user: {},
      usersLoaded: false,
      songsLoaded: false,
    };
  },
  actions: {
    login() {
      console.log("Hallo Welt");
      router.push("/");
    },
  },
});
