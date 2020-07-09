import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";

Vue.use(VueRouter);
Vue.use(VueMeta);

import routes from "./routes";

export function createRoute() {
  return new VueRouter({
    mode: "history",
    routes: [
      {
        path: routes.pages.main,
        component: () => import("../views/Default.vue"),
      },
    ],
  });
}
