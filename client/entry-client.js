import { createApp } from "../src/";

const { app, router, store } = createApp();

router.onReady(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }

  app.$mount("#app");
});

if (module.hot) {
  const api = require("vue-hot-reload-api");
  const Vue = require("vue");

  api.install(Vue);

  if (!api.compatible) {
    throw new Error(500);
  }
}
