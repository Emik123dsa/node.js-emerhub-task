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
        content="Create request for users"
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
          :active="activeVendor === 'History Of Policer\'s\ bikes'"
          content="History Of Policer's bikes"
          to="/vendor"
          @click.native="selectVendor('History Of Policer\'s\ bikes')"
        />
      </sui-menu-menu>
      <sui-menu-menu>
        <router-link
          is="sui-menu-item"
          :active="activeVendor === 'Resolve Stolen Bike'"
          content="Resolve Stolen Bike"
          to="/resolve"
          @click.native="selectVendor('Resolve Stolen Bike')"
        />
      </sui-menu-menu>
      <sui-menu-menu>
        <router-link
          is="sui-menu-item"
          :active="activeVendor === 'policers'"
          content="Create Policers"
          to="/policers"
          @click.native="selectVendor('policers')"
        />
      </sui-menu-menu>

      <sui-dropdown item icon="wrench" simple>
        <sui-dropdown-menu>
          <sui-dropdown-divider />
          <sui-dropdown-header>ACTIONS</sui-dropdown-header>
          <sui-dropdown-item>
            <router-link to="/checkout">Check-out bike for user</router-link>
          </sui-dropdown-item>
          <sui-dropdown-item>
            <router-link to="/query">Create new request of stolen bikes</router-link>
          </sui-dropdown-item>
          <sui-dropdown-divider />
          <sui-dropdown-header>API</sui-dropdown-header>
          <router-link class="ui item" to="/documentation">Documentation</router-link>
          <sui-dropdown-divider />
          <sui-dropdown-header>ORIGIN</sui-dropdown-header>
          <a
            class="ui item"
            href="https://github.com/Emik123dsa/node.js-emerhub-task"
            target="_blank"
          >
            <sui-icon name="github" color="black" />GitHub
          </a>
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