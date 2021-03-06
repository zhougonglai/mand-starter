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
    token: (state, getters, rootState) => rootState.user.token
  },
  actions,
  mutations,
  modules: {
    global,
    config,
    user,
    account
  },
  // plugins: process.env.NODE_ENV === "production" ? [] : [createPersistedState()] //开发环境使用,生产环境慎用
  plugins: [createPersistedState()] //开发环境使用,生产环境慎用
});
