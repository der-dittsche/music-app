import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "@/includes/validations";
import icons from "./directives/icons";

import "./assets/main.css";
import "boxicons/css/boxicons.min.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugin);
app.directive("icon", icons);

app.mount("#app");
