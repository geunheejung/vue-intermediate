import { createApp } from "vue";
import todoStore from "./store/todoStore";
import App from "./App.vue";

import "./assets/main.css";

createApp(App).use(todoStore).mount("#app");
