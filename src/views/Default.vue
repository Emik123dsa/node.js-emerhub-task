<template>
  <sui-segment>
    <sui-container>
      <div class="ui placeholder segment">
        <div class="ui two column very relaxed stackable grid">
          <div class="column">
            <router-link to="/users" class="ui big button blue">
              <i class="signup icon"></i>
              For third party
            </router-link>
          </div>
          <div class="middle aligned column">
            <router-link to="/policers" class="ui big button red">
              <i class="signup icon"></i>
              For policer
            </router-link>
          </div>
        </div>
        <div class="ui vertical divider">Or</div>
      </div>
    </sui-container>
  </sui-segment>
</template>

<script>
export default {
  name: "default",
  data() {
    return {};
  }
};
</script>

<style>
</style>