<template>
  <sui-form
    @submit="submitVendor"
    :loading="loading"
    :error="errors.length > 0"
    :success="successes.length > 0"
  >
    <sui-header dividing>Personal information</sui-header>
    <sui-form-fields fields="two">
      <sui-form-field>
        <label>First Name</label>
        <input placeholder="First Name" type="text" v-model="user.first_name" />
      </sui-form-field>
      <sui-form-field>
        <label>Last Name</label>
        <input placeholder="Last Name" type="text" v-model="user.last_name" />
      </sui-form-field>
    </sui-form-fields>
    <sui-form-fields fields="four">
      <sui-form-field>
        <label>Phone Number</label>
        <input placeholder="Phone Number" v-model="user.phone_number" />
      </sui-form-field>
      <sui-form-field>
        <label>Address</label>
        <input placeholder="Phone Number" v-model="user.address" />
      </sui-form-field>
      <sui-form-field>
        <label>Passport Number</label>
        <input placeholder="Phone Number" v-model="user.passport_number" />
      </sui-form-field>
      <sui-form-field>
        <label>E-mail</label>
        <input placeholder="Phone Number" v-model="user.email" />
      </sui-form-field>
    </sui-form-fields>
    <sui-header dividing>Stolen Bike Report</sui-header>
    <stolen-bike v-bind:detect="detectBikesChanges" v-bind:user_bikes="user_bikes" />

    <sui-form-field>
      <sui-checkbox toggle label="Find it as soon as possible?" v-model="asap" />
    </sui-form-field>

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

    <sui-button type="submit" :disabled="loading">Submit</sui-button>
  </sui-form>
</template>

<script>
import StolenBike from "./StolenBike.vue";

export default {
  name: "users",
  components: {
    StolenBike
  },
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        phone_number: "",
        passport_number: "",
        address: "",
        email: ""
      },
      errors: [],
      successes: [],
      loading: false,
      asap: false
    };
  },
  computed: {
    users() {
      return this.$store.getters["main/users"];
    },
    user_bikes() {
      return this.$store.getters["main/user_bikes"];
    }
  },
  watch: {
    user: {
      deep: true,
      handler: "alterUser"
    }
  },
  created() {
    if (!Array.isArray(this.user)) {
      Object.keys(this.user).reduce((acc, item) => {
        this.user[item] = this.users[item];
      }, {});
    }
  },
  methods: {
    alterUser(before, after) {
      const { dispatch } = this.$store;
      dispatch("main/setUserInterface", { payload: after });
    },
    detectBikesChanges({ payload }) {
      const { dispatch } = this.$store;
      dispatch("main/setBikeInterface", { payload });
    },
    async submitVendor(e) {
      this.loading = true;
      this.errors = [];
      this.successes = [];

      e.preventDefault();

      const user = Object.keys(this.users).every(item =>
        !this.users[item] ? false : true
      );

      const bike = Object.keys(this.user_bikes).every(item =>
        !this.user_bikes[item] ? false : true
      );

      if (user && bike) {
        const response = await Promise.resolve(
          this.$store.dispatch("main/createBikeUser", {
            payload: {
              ...this.users,
              owner: this.users.first_name + " " + this.users.last_name
            }
          })
        );

        if (response && response.response && response.response.code === 3) {
          this.errors = [
            {
              msg:
                response.response.msg ||
                "You have reached out the limit of total stolen bikes, which you could add"
            }
          ];
        }

        if (response && response.response && response.response.code === 4) {
          this.errors = [
            {
              msg: response.response.msg || "Your password is not being correct"
            }
          ];
        }

        if (response && response.error && response.error.error.length > 0) {
          this.errors = response.error.error;
        }

        if (response && response.response && response.response.code === 1) {
          const json = this.$cookies.get("json");

          const bikeStored = await this.$store.dispatch(
            "main/fillOutStolenBike",
            {
              payload: {
                ...this.users,
                ...this.user_bikes,
                asap: this.asap
              }
            }
          );

          if (!json) {
            this.$cookies.set("json", response.response.details);
          }

          if (
            bikeStored &&
            bikeStored.response &&
            bikeStored.response.code === 1
          ) {
            this.successes = [
              {
                msg:
                  bikeStored.response.details[0] ||
                  "Your stolen bike has been successfully saved, please, check out your current status in the tab: Check-in"
              }
            ];
          }

          if (bikeStored && bikeStored.error && bikeStored.error.code === 2) {
            this.errors = [
              { msg: "Stolen bike is already existing with this serial number" }
            ];
          }
        }

        if (response && response.error && response.error.code === 2) {
          this.errors = [
            {
              msg: "This account is already existing, try it out once more!"
            }
          ];
        }
      } else {
        this.errors = [
          { msg: "O-o-ps! You have to fill out all of the required fields" }
        ];
      }

      this.loading = false;
    }
  }
};
</script>

<style>
</style>