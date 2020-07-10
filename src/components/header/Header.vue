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
        to="/users"
        @click.native="selectVendor('users')"
      />
    </sui-menu-menu>
    <sui-menu-menu>
      <router-link
        is="sui-menu-item"
        :active="activeVendor === 'policers'"
        content="Policers"
        to="/policers"
        @click.native="selectVendor('policers')"
      />
    </sui-menu-menu>
    <sui-menu-menu position="right">
       <sui-dropdown item icon="wrench" simple>
        <sui-dropdown-menu>
          <sui-dropdown-divider />
          <sui-dropdown-header>ACTIONS</sui-dropdown-header>
          <sui-dropdown-item>Policers</sui-dropdown-item>
          <sui-dropdown-item>Users</sui-dropdown-item>
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
  methods: {
    selectVendor(item) {
      this.activeVendor = item;
    }
  }
};
</script>

<style>
</style>