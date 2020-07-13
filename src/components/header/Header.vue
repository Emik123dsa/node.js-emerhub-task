<template>
  <sui-menu pointing secondary>
    <sui-menu-menu position="left">
      <sui-menu-item>
        <sui-icon item name="cloud" color="blue" simple></sui-icon>
      </sui-menu-item>
    </sui-menu-menu>
    <sui-menu-menu>
      <router-link
        is="sui-menu-item"
        :active="activeVendor === 'users'"
        content="Users"
        to="/query"
        @click.native="selectVendor('users')"
      />
    </sui-menu-menu>

    <sui-menu-menu>
      <router-link
        is="sui-menu-item"
        :active="activeVendor === 'history'"
        content="Check out bike for users"
        to="/checkout"
        @click.native="selectVendor('history')"
      />
    </sui-menu-menu>
    <sui-menu-menu position="right">
      <sui-menu-menu>
        <router-link
          is="sui-menu-item"
          :active="activeVendor === 'policers'"
          content="Policers"
          to="/policers"
          @click.native="selectVendor('policers')"
        />
      </sui-menu-menu>
      <sui-dropdown item icon="wrench" simple>
        <sui-dropdown-menu>
          <sui-dropdown-divider />
          <sui-dropdown-header>ACTIONS</sui-dropdown-header>
          <sui-dropdown-item>
            <router-link to="/query">Check-out bike for user</router-link>
          </sui-dropdown-item>
          <sui-dropdown-item>
            <router-link to="/checkout">Create new request of stolen bikes</router-link>
          </sui-dropdown-item>
          <sui-dropdown-divider />
          <sui-dropdown-header>API</sui-dropdown-header>
          <sui-dropdown-item>Documentation</sui-dropdown-item>
          <sui-dropdown-divider />
          <sui-dropdown-header>ORIGIN</sui-dropdown-header>
          <sui-dropdown-item>
            <sui-icon name="github" color="black" />GitHub
          </sui-dropdown-item>
        </sui-dropdown-menu>
      </sui-dropdown>
    </sui-menu-menu>
  </sui-menu>
</template>

<script>
export default {
  data() {
    return {
      activeVendor: ""
    };
  },
  created() {
    this.activeVendor = this.$route.name;
  },
  watch: {
    "$route.name": {
      handler: function() {
        this.activeVendor = this.$route.name;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    selectVendor(item) {
      this.activeVendor = item;
    }
  }
};
</script>

<style>
</style>