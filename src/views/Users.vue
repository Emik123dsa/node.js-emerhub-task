<template>
  <sui-segment>
    <sui-form
      @submit="submitVendor"
      :loading="loading"
      :error="errors.length > 0"
      :success="success.length > 0"
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

      <sui-message error>
        <sui-message-header>An error occured</sui-message-header>
        <sui-message-list>
          <sui-message-item v-for="(error, i) in errors" :key="i">{{error.msg}}</sui-message-item>
        </sui-message-list>
      </sui-message>

      <sui-message success>
        <sui-message-header>New Site Features</sui-message-header>
        <sui-message-list>
          <sui-message-item>You can now have cover images on blog pages</sui-message-item>
          <sui-message-item>Drafts will now auto-save while writing</sui-message-item>
        </sui-message-list>
      </sui-message>
      <sui-button type="submit" :disabled="loading">Submit</sui-button>
    </sui-form>
  </sui-segment>
</template>

<script>
import { Observable, Subject, interval, from } from "rxjs";
import { map, scan } from "rxjs/operators";

export default {
  name: "users",
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
      success: [],
      loading: false
    };
  },
  computed: {
    users() {
      return this.$store.getters["main/users"];
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
    async submitVendor(e) {
      this.errors = [];
      this.success = [];
      this.loading = true;
      e.preventDefault();

      if (this.users) {
        const response = await Promise.resolve(
          this.$store.dispatch("main/createBikeUser", {
            payload: {
              ...this.users,
              owner: this.users.first_name + ", " + this.users.last_name
            }
          })
        );

        if (response && response.error) {
          this.errors =
            response.error.errors || [
              { msg: "O-o-ps! This account is already existing" }
            ];
        }

        if (response && response.response && response.response.code === 1) {
          this.$cookies.set("json", response.response.details);
        }

        if (response && response.code === 2) {
          this.errors = [{ msg: "O-o-ps! This account is already existing" }];
        }
      }

      this.loading = false;
    }
  }
};
</script>

<style>
</style>