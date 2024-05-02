import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Sample from "@/pages/Sample.vue";
import SampleDua from "@/pages/SampleDua.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/sample",
      component: Sample,
    },
  ],
});

export default router;
