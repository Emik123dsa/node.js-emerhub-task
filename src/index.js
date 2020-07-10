import Vue from "vue";
import { sync } from "vuex-router-sync";
import App from "./App.vue";

import { createRoute } from "./routes";
import { createStore } from "./store";

export function createApp() {
  const router = createRoute();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    store,
    router,
    render: (h) => h(App),
  });

  return { app, router, store };
}
