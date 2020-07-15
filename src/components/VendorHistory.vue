<template>
  <sui-form @submit="fetchHistoryBikes" :loading="loading" :error="errors.length > 0">
    <sui-header dividing>Policer information to fetch history from resolved bikes:</sui-header>
    <sui-form-fields fields="two">
      <sui-form-field>
        <label>Email</label>
        <input placeholder="E-mail" type="text" v-model="policer.email" />
      </sui-form-field>
      <sui-form-field>
        <label>Identificator:</label>
        <input placeholder="Identificator" type="text" v-model="policer.bearer" />
      </sui-form-field>
    </sui-form-fields>

    <sui-message error>
      <sui-message-header>An error occured</sui-message-header>
      <sui-message-list>
        <sui-message-item v-for="(error, i) in errors" :key="i">{{error.msg}}</sui-message-item>
      </sui-message-list>
    </sui-message>
    <transition name="fade">
      <sui-table v-if="result.length > 0" celled>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell>ID:</sui-table-header-cell>
            <sui-table-header-cell>Model of bike:</sui-table-header-cell>
            <sui-table-header-cell>Asap:</sui-table-header-cell>
            <sui-table-header-cell>Name of bike:</sui-table-header-cell>
            <sui-table-header-cell>Serial number of bike:</sui-table-header-cell>
            <sui-table-header-cell>Status:</sui-table-header-cell>
            <sui-table-header-cell>Created At:</sui-table-header-cell>
            <sui-table-header-cell>Modifed At:</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>

        <sui-table-body>
          <sui-table-row v-for="(feature, i) in result" :key="i">
            <sui-table-cell>
              <sui-label ribbon>{{feature.id}}</sui-label>
            </sui-table-cell>
            <sui-table-cell>{{feature.modelBike}}</sui-table-cell>
            <sui-table-cell>{{feature.asap ? 'YES' : 'NOPE'}}</sui-table-cell>
            <sui-table-cell>{{feature.nameBike}}</sui-table-cell>
            <sui-table-cell>{{feature.serialNumber}}</sui-table-cell>
            <sui-table-cell>
              <sui-button :color="currentColor(feature.status)">{{feature.status}}</sui-button>
            </sui-table-cell>
            <sui-table-cell>{{feature.createdAt}}</sui-table-cell>
            <sui-table-cell>{{feature.modifiedAt}}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </transition>

    <sui-button type="submit" :disabled="loading">Fetch</sui-button>
  </sui-form>
</template>

<script>
export default {
  data() {
    return {
      policer: {
        email: "",
        bearer: ""
      },
      errors: [],
      //result: [],
      loading: false,
      mode: "history"
    };
  },
  computed: {
    result() {
      return this.$store.getters["main/historyBikes"];
    }
  },
  methods: {
    currentColor(map) {
      switch (map) {
        case "SUSPECTED":
          return "yellow";
        case "APPROVEN":
          return "green";
        case "DENIED":
          return "red";
        default:
          return "blue";
      }
    },
    async fetchHistoryBikes(e) {
      this.loading = true;
      e.preventDefault();
      this.errors = [];
      const history = Object.keys(this.policer).every(item =>
        !this.policer[item] ? false : true
      );
      if (history) {
        try {
          const res = await Promise.resolve(
            this.$store.dispatch("main/getHistoryBikesByPolicers", {
              payload: {
                ...this.policer,
                mode: this.mode
              }
            })
          );

          if (
            res &&
            res.error &&
            res.error.error &&
            res.error.error.length > 0
          ) {
            this.errors = res.error.error;
          }

          if (res && res.error && res.error.msg) {
            this.errors = [
              { msg: res.error.msg || "This policer is not existing" }
            ];
          }
        } catch (e) {
          console.error(e);
          await Promise.reject(e);
        }
      } else {
        this.errors = [{ msg: "Please, you have to fill out a fields above!" }];
      }

      this.loading = false;
    }
  }
};
</script>

<style>
</style>