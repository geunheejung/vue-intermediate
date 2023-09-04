import { createApp } from "vue";
import todoStore from "./modules/Todo";
import App from "./App.vue";

import "./assets/main.css";

createApp(App).use(todoStore).mount("#app");
