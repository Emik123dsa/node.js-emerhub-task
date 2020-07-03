import { createApp } from "../src";

export default (context) =>
  new Promise((res, rej) => {
    const { app, store, router } = createApp();

    const meta = app.$meta();

    router.push(context.url);

    context.meta = meta;

    router.onReady(() => {
      context.rendered = () => {
        context.state = store.state;
      };

      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return rej(new Error(404));
      }

      return res(app);
    }, rej);
  });
