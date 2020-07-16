<template>
  <div class="ui placeholder segment" :class="{'loading': loading}">
    <form v-on:submit="submitHandler" class="ui two column very relaxed stackable grid">
      <div class="column">
        <div class="ui form" :class="{'error': errors.length !== 0 }">
          <div class="field">
            <label>E-mail</label>
            <div class="ui left icon input">
              <input type="text" name="email" placeholder="E-mail" v-stream:keyup="query$" />
              <i class="mail icon"></i>
            </div>
          </div>
          <div class="field">
            <label>Identificator:</label>
            <input type="text" name="bearer" placeholder="Identificator" v-stream:keyup="query$" />
          </div>

          <div class="field error">
            <div class="ui error message">
              <div class="header">An error occured</div>
              <ul class="list">
                <li class="item" v-for="(error, i) in errors" :key="i">{{error.msg}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="middle aligned column">
        <button type="submit" class="ui big red button" :disabled="loading">
          <i class="magic icon"></i>
          Create
        </button>
      </div>
    </form>
    <div class="ui vertical divider">And</div>
  </div>
</template>

<script>
import { from, of, merge, interval } from "rxjs";
import {
  map,
  pluck,
  distinctUntilChanged,
  mergeMap,
  debounceTime,
  scan,
  startWith
} from "rxjs/operators";

export default {
  domStreams: ["query$"],
  subscriptions() {
    return {
      query: this.query$.pipe(
        pluck("event", "target"),
        map(data => data),
        startWith(this.policer),
        scan((acc, _) => {
          return {
            ...acc,
            [_["name"]]: _["value"]
          };
        })
      )
    };
  },
  data() {
    return {
      loading: false,
      errors: []
    };
  },
  methods: {
    empty(value) {
      return value === undefined;
    },
    async submitHandler(e) {
      this.errors = [];
      this.loading = true;
      e.preventDefault();

      if (!this.empty(this.query)) {
        try {
          const response = await this.$store.dispatch(
            "main/createPoliceQuery",
            { payload: { ...this.query } }
          );
          if (response && response.error && response.error.code === 2) {
            this.errors = [
              { msg: "Sorry, but this policer is already existing " }
            ];
          }
          if (response && response.response && response.response.code === 1) {
            const json = this.$cookies.get("json_policer");

            if (json) {
              this.$coookies.set("json_policer", response.response.details);
            }

            this.$router.push("/resolve");
          }
        } catch (e) {
          return await Promise.reject(e);
        }
      }

      this.loading = false;
    }
  }
};
</script>

<style>
</style>