<template>
  <div class="pushable">
    <Sidebar />
    <sui-segment vertical>
      <sui-container>
        <div class="pusher">
          <Header />
          <router-view></router-view>
          <Footer />
        </div>
      </sui-container>
    </sui-segment>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Sidebar
  },
  metaInfo: {
    title: "Stolen Bikes | Emerhub"
  },
  async serverPrefetch() {
    const { dispatch } = this.$store;

    const { req, res } = this.$ssrContext;

    try {
      await dispatch("main/serverExpressInit", {
        req: Object.assign({}, req),
        res: Object.assign({}, res)
      });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  methods: {}
};
</script>

<style lang="scss">
</style>