import { defineStore } from "pinia";

export default defineStore("modal", {
  state: () => ({
    isOpen: false,
    isOpenUser: false,
    isOpenVol: false,
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    },
    hiddenClassUser(state) {
      return !state.isOpenUser ? "hidden" : "";
    },
    hiddenClassVol(state) {
      return !state.isOpenVol ? "hidden" : "";
    },
  },
});
