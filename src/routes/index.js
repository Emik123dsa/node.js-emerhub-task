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
        name: "default",
        component: () => import("../views/Default.vue"),
      },
      {
        path: routes.pages.query,
        name: "users",
        component: () => import("../views/Users.vue"),
      },
      {
        path: routes.pages.checkout,
        name: "history",
        component: () => import("../views/History.vue"),
      },
      {
        path: routes.pages.vendor,
        name: "History Of Policer's bikes",
        component: () => import("../views/Vendor.vue"),
      },
      {
        path: routes.pages.policers,
        name: "policers",
        component: () => import("../views/Policers.vue"),
      },
      {
        path: routes.pages.resolver,
        name: "Resolve Stolen Bike",
        component: () => import("../views/VendorStolen.vue"),
      },
    ],
  });
}
