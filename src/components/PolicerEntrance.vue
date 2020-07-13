<template>
  <div class="ui placeholder segment">
    <div class="ui two column very relaxed stackable grid">
      <div class="column">
        <div class="ui form">
          <div class="field">
            <label>E-mail</label>
            <div class="ui left icon input">
              <input type="text" placeholder="E-mail" v-model="policer.email" />
              <i class="mail icon"></i>
            </div>
          </div>
          <div class="field">
            <label>Identificator:</label>
            <input type="text" placeholder="Identificator" v-model="policer.bearer" />
          </div>
        </div>
      </div>
      <div class="middle aligned column">
        <div class="ui big red button">
          <i class="magic icon"></i>
          Create
        </div>
      </div>
    </div>
    <div class="ui vertical divider">And</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      policer: {
        email: "",
        bearer: ""
      }
    };
  },
  watch: {
    deep: true,
    handler: function (before, after) {
      this.$store.dispatch("main/setPoliceInterface", { payload: after });
    }
  }
};
</script>

<style>
</style>