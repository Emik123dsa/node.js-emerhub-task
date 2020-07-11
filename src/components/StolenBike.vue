<template>
  <sui-form-fields fields="three">
    <sui-form-field>
      <label>Model of Bike</label>
      <input placeholder="Phone Number" v-model="bike.model_bike" />
    </sui-form-field>
    <sui-form-field>
      <label>Serial Number</label>
      <input placeholder="Phone Number" v-model="bike.serial_number" />
    </sui-form-field>
    <sui-form-field>
      <label>Name of Bike</label>
      <input placeholder="Phone Number" v-model="bike.name_bike" />
    </sui-form-field>
  </sui-form-fields>
</template>

<script>
export default {
  props: {
    detect: Function,
    user_bikes: Object
  },
  data() {
    return {
      bike: {
        name_bike: "",
        serial_number: "",
        model_bike: ""
      }
    };
  },
  created() {
    if (!Array.isArray(this.user_bikes)) {
      Object.keys(this.user_bikes).reduce((acc, item) => {
        this.bike[item] = this.user_bikes[item];
      }, {});
    }
  },
  watch: {
    bike: {
      deep: true,
      handler: "changeBikeQuery"
    }
  },
  methods: {
    changeBikeQuery(payload) {
      this.detect({ payload });
    }
  }
};
</script>

<style>
</style>