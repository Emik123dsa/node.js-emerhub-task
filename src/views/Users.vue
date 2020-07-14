<template>
  <sui-segment>
    <personal-information />
  </sui-segment>
</template>

<script>
import { Observable, Subject, interval, from } from "rxjs";
import { map, scan } from "rxjs/operators";

import PersonalInformation from "../components/PersonalInformation.vue";

export default {
  name: "users",
  components: {
    PersonalInformation
  },
  serverPrefetch() {
    const { res, req } = this.$ssrContext;
    const json = req.cookies && req.cookies.json;
  }
};
</script>

<style>
</style>