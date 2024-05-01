import { createApp } from "vue";
import "./sytles/index.css";
import App from "./App.vue";
import router from "./routes/index";

const app = createApp(App);
app.use(router); // Install Vue Router as a plugin
app.mount("#app");
