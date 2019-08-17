import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";
import global from "@/store/global";
import config from "@/store/config";
import user from "@/store/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {
    token: (state, getters, rootState) => rootState.user.info.token
  },
  mutations: {},
  actions: {},
  modules: {
    global,
    config,
    user
  }
  // plugins: [createPersistedState()]
});
