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
    policers: [],
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
      let history = _.fetchHistory.bind({ payload, schema: REQUEST.GET });

      if (payload) {
        const response = await history();

        if (response.code === 1) {
          commit("SET_HISTORY_BIKES", response && response.details);
        } else {
          commit("CLEAR_HISTORY_BIKES");
        }
      }
    },
    setUserInterface({ commit }, { payload }) {
      commit("SET_API_USER_INTERFACE", payload);
    },
    async createBikeUser({ commit, dispatch }, { payload }) {
      return await _.createUser({ payload, schema: REQUEST.POST });
    },
  },
  getters: {
    api: (s) => s.api,
    users: (s) => s.users,
  },
};
