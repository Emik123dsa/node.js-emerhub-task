<template>
  <sui-form
    @submit="fetchBikesByQuery"
    :loading="loading"
    :success="successess.length > 0"
    :error="errors.length > 0"
  >
    <sui-header dividing>Resolve stolen bike:</sui-header>
    <sui-form-fields fields="two">
      <sui-form-field>
        <label>Email</label>
        <input
          placeholder="E-mail"
          type="text"
          name="email"
          v-stream:keyup="fetchBikes$"
          v-model="policer.email"
          :disabled="receivedServedBikes.length > 0"
        />
      </sui-form-field>
      <sui-form-field>
        <label>Identificator:</label>
        <input
          v-stream:keyup="fetchBikes$"
          placeholder="Identificator"
          type="text"
          name="bearer"
          v-model="policer.bearer"
          :disabled="receivedServedBikes.length > 0"
        />
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
        <sui-message-item>Sorry, but there's not any served bikes yet</sui-message-item>
      </sui-message-list>
    </sui-message>

    <transition name="fade">
      <sui-table v-if="receivedServedBikes.length > 0" celled>
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
          <sui-table-row v-for="(feature, i) in receivedServedBikes" :key="i">
            <sui-table-cell>
              <sui-label ribbon>{{feature.id}}</sui-label>
            </sui-table-cell>
            <sui-table-cell>{{feature.modelBike}}</sui-table-cell>
            <sui-table-cell>{{feature.asap ? 'YES' : 'NOPE'}}</sui-table-cell>
            <sui-table-cell>{{feature.nameBike}}</sui-table-cell>
            <sui-table-cell>{{feature.serialNumber}}</sui-table-cell>
            <sui-table-cell>
              <sui-button :color="feature.status === 'PENDING' ? 'red' : 'green'">{{feature.status}}</sui-button>
            </sui-table-cell>
            <sui-table-cell>{{feature.createdAt}}</sui-table-cell>
            <sui-table-cell>{{feature.modifiedAt}}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </transition>

    <sui-button
      v-if="receivedServedBikes.length === 0"
      type="submit"
      :loading="loading"
    >Fetch Served Bikes</sui-button>

    <div v-else>
      <sui-header dividing>Resolve this bike by methods below:</sui-header>
      <sui-card-group :items-per-row="3">
        <sui-card>
          <sui-card-content>
            <sui-card-header>Approve request for bike:</sui-card-header>
            <sui-card-meta>This method will be authomatically updated status of stolen bike:</sui-card-meta>
            <sui-card-description>
              <div v-on:click="resolveBike('APPROVEN')" class="ui green button">APPROVE</div>
            </sui-card-description>
          </sui-card-content>
        </sui-card>
        <sui-card>
          <sui-card-content>
            <sui-card-header>Denie request for bike:</sui-card-header>
            <sui-card-meta>This method will be authomatically updated status of stolen bike:</sui-card-meta>
            <sui-card-description>
              <div v-on:click="resolveBike('DENIED')" class="ui red button">DENIE</div>
            </sui-card-description>
          </sui-card-content>
        </sui-card>
        <sui-card>
          <sui-card-content>
            <sui-card-header>Suspect request for bike:</sui-card-header>
            <sui-card-meta>This method will be authomatically updated status of stolen bike:</sui-card-meta>
            <sui-card-description>
              <div v-on:click="resolveBike('SUSPECTED')" class="ui yellow button">SUSPECT</div>
            </sui-card-description>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </div>
  </sui-form>
</template>

<script>
import {
  map,
  pluck,
  distinctUntilChanged,
  debounceTime,
  scan,
  switchMap,
  startWith,
  takeUntil,
  mergeMap
} from "rxjs/operators";
import { interval } from "rxjs";

export default {
  subscriptions() {
    return {
      preSubmitHandler: this.fetchBikes$.pipe(
        pluck("event", "target"),
        map(data => data),
        startWith([]),
        scan((acc, _) => {
          return {
            ...acc,
            [_["name"]]: _["value"]
          };
        })
      ),
      submitEssntialHandler: this.resolveBike$.pipe(
        map(data => data),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(
          async _ =>
            await new Promise((res, rej) => {
              try {
                res(
                  this.resolveStolenBike({
                    data: { ...this.preSubmitHandler, operation: _ }
                  })
                );
              } catch (e) {
                rej(e);
              }
            })
        ),
        map(res => res),
        mergeMap(items => {
          this.receivedServedBikes = [];

          return items;
        })
      )
    };
  },
  observableMethods: {
    resolveBike: "resolveBike$"
  },
  domStreams: ["fetchBikes$"],
  created() {
    this.$observables.preSubmitHandler.subscribe(data => data);
  },
  methods: {
    async resolveStolenBike({ data }) {
      this.loading = true;

      const response = await this.$store.dispatch("main/resolveStolenBike", {
        payload: { ...data }
      });

      this.loading = false;

      return response;
    },
    async fetchBikesByQuery(e) {
      this.loading = true;

      e.preventDefault();

      this.errors = [];

      if (true) {
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
            this.errors = res.error.error;
          }

          if (res && res.response && res.response.code === 1) {
            this.receivedServedBikes = res.response.details;

            if (this.receivedServedBikes.length === 0) {
              this.successess = ["Updated"];
            }
          }

          if (res && res.error && res.error.code === 2) {
            this.errors = [{ msg: res.error.msg }];
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
  },
  data() {
    return {
      policer: {
        email: "",
        bearer: ""
      },
      errors: [],
      receivedServedBikes: [],
      loading: false,
      mode: "served",
      successess: []
    };
  }
};
</script>

<style>
</style>