<template>
  <sui-segment>
    <sui-form
      @submit="submitVendor"
      :loading="loading"
      :error="errors.length > 0"
      :success="successes.length > 0"
    >
      <sui-header dividing>Bike information</sui-header>
      <sui-form-fields fields="three">
        <sui-form-field>
          <label>E-mail</label>
          <input placeholder="Email" type="text" v-model="stolen_bike.email" />
        </sui-form-field>
        <sui-form-field>
          <label>Serial number of stolen bike</label>
          <input placeholder="Serial number" type="text" v-model="stolen_bike.serial_number" />
        </sui-form-field>
        <sui-form-field>
          <label>Passport number</label>
          <input placeholder="Passport number" v-model="stolen_bike.passport_number" />
        </sui-form-field>
      </sui-form-fields>

      <sui-message error>
        <sui-message-header>An error occured</sui-message-header>
        <sui-message-list>
          <sui-message-item v-for="(error, i) in errors" :key="i">{{error.msg}}</sui-message-item>
        </sui-message-list>
      </sui-message>

      <sui-message success>
        <sui-message-header>Success</sui-message-header>
        <sui-message-list>
          <sui-message-item v-for="(success, i) in successes" :key="i">{{success.msg}}</sui-message-item>
        </sui-message-list>
      </sui-message>

      <sui-button type="submit" :disabled="loading">Fetch</sui-button>
    </sui-form>
    <transition name="fade">
      <sui-table v-if="received" celled>
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
          <sui-table-row>
            <sui-table-cell>
              <sui-label ribbon>{{meta_features.id}}</sui-label>
            </sui-table-cell>
            <sui-table-cell>{{meta_features.modelBike}}</sui-table-cell>
            <sui-table-cell>{{meta_features.asap ? 'YES' : 'NOPE'}}</sui-table-cell>
            <sui-table-cell>{{meta_features.nameBike}}</sui-table-cell>
            <sui-table-cell>{{meta_features.serialNumber}}</sui-table-cell>
            <sui-table-cell>
              <sui-button
                :color="meta_features.status === 'PENDING' ? 'red' : 'green'"
              >{{meta_features.status}}</sui-button>
            </sui-table-cell>
            <sui-table-cell>{{meta_features.createdAt}}</sui-table-cell>
            <sui-table-cell>{{meta_features.modifiedAt}}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </transition>
  </sui-segment>
</template>

<script>
export default {
  data() {
    return {
      stolen_bike: {
        email: "",
        passport_number: "",
        serial_number: ""
      },
      loading: false,
      successes: [],
      errors: [],
      received: false,
      meta_features: {}
    };
  },
  methods: {
    async submitVendor(e) {
        
      e.preventDefault();
      this.errors = [];
      this.received = false;
      this.successes = [];
      this.loading = true;
      const stolenBike = Object.values(this.stolen_bike).every(item =>
        !item ? false : true
      );

      if (stolenBike) {
        try {
          const res = await Promise.resolve(
            this.$store.dispatch("main/fetchStolenBike", {
              payload: this.stolen_bike
            })
          );

          if (res && res.response && res.response.code === 1) {
            this.meta_features = res.response.details;
            this.received = true;
          }

          if (res && res.error && res.error.code === 2) {
            this.errors = [
              {
                msg: res.error.msg || "This client is not existing"
              }
            ];
          }

          if (res && res.error && res.error.code === 3) {
            this.errors = [
              {
                msg: res.error.msg || "Bike hasn't found"
              }
            ];
          }
        } catch (e) {
          await Promise.reject(e);
        }
      } else {
        this.errors = [{ msg: "Please, fill out the fields above" }];
      }

      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>