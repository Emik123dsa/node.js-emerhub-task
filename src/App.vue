<template>
  <div class="pusher">
    <Sidebar />
    <sui-segment vertical>
      <sui-container>
        <div>
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
  components: {
    Header,
    Footer,
    Sidebar
  },
  metaInfo: {
    title: "Stolen Bikes | Emerhub"
  }
};
</script>

<style lang="scss">
</style>