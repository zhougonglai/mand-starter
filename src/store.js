import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { state, mutations, actions } from "@/store/index";

import global from "@/store/global";
import config from "@/store/config";
import user from "@/store/user";

import account from "@/store/modules/account";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters: {
    token: (state, getters, rootState) => rootState.user.info.token
  },
  actions,
  mutations,
  modules: {
    global,
    config,
    user,
    account
  },
  plugins: [createPersistedState()]
});
