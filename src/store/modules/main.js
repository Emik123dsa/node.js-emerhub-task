import * as _ from "../../services/api";
import { REQUEST } from "../../services/methods";

export default {
  namespaced: true,
  state: () => ({
    api: "",
    historyBikes: [],
    users: {
      first_name: "",
      last_name: "",
      phone_number: "",
      address: "",
      passport_number: "",
      email: "",
    },
    user_bikes: {
      model_bike: "",
      name_bike: "",
      serial_number: "",
    },
    policers: {
      bearer: "",
      email: "",
    },
  }),
  mutations: {
    SET_API_BASE_URL(state, payload) {
      state.api = payload;
    },
    SET_HISTORY_BIKES(state, payload) {
      state.historyBikes = payload;
    },
    CLEAR_HISTORY_BIKES(state) {
      state.historyBikes = [];
    },
    SET_API_USER_INTERFACE(state, payload) {
      state.users = payload;
    },
    SET_API_BIKE_INTERFACE(state, payload) {
      state.user_bikes = payload;
    },
  },
  actions: {
    async serverExpressInit({ dispatch, commit }, { req, res }) {
      try {
        await Promise.all([
          dispatch("resolveApiController", { payload: req.headers }),
        ]);
      } catch (e) {
        return await Promise.reject(new Error(500));
      }
    },
    async resolveApiController({ commit }, { payload }) {
      commit("SET_API_BASE_URL", payload);
    },
    /**
     * Cool! We can knit a fetch functions!
     * @param {*} param0
     * @param {*} param1
     */
    async getHistoryBikesByPolicers({ commit, dispatch }, { payload }) {
      let history = _.fetchHistory.bind(null, { payload, schema: REQUEST.GET });

      const response = await history();

      if (response && response.response && response.response.code === 1) {
        commit(
          "SET_HISTORY_BIKES",
          response && response.response && response.response.details
        );
      } else {
        commit("CLEAR_HISTORY_BIKES");
      }

      return response;
    },
    setUserInterface({ commit }, { payload }) {
      commit("SET_API_USER_INTERFACE", payload);
    },
    setBikeInterface({ commit }, { payload }) {
      commit("SET_API_BIKE_INTERFACE", payload);
    },
    async createBikeUser({ commit, dispatch }, { payload }) {
      return await _.createUser({ payload, schema: REQUEST.POST });
    },
    async fillOutStolenBike({ commit, dispatch }, { payload }) {
      let bike = _.createBike.bind(null, { payload, schema: REQUEST.POST });
      return await bike();
    },
    async fetchStolenBike({ commit, dispatch }, { payload }) {
      let historyBike = _.fetchStolenBikes.bind(null, {
        payload,
        schema: REQUEST.GET,
      });

      return await historyBike();
    },
    async createPoliceQuery({ commit, dispatch }, { payload }) {
      let createPolice = _.createPolice.bind(null, {
        payload,
        schema: REQUEST.POST,
      });

      return await createPolice();
    },
    async resolveStolenBike({ commit, dispatch }, { payload }) {
      let resolveBike = _.resovleBike.bind(null, {
        payload,
        schema: REQUEST.POST,
      });

      return await resolveBike();
    },
  },
  getters: {
    api: (s) => s.api,
    users: (s) => s.users,
    historyBikes: (s) => s.historyBikes,
    user_bikes: (s) => s.user_bikes,
    policers: (s) => s.policers,
  },
};
