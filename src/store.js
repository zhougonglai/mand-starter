import Vue from "vue";
import Vuex from "vuex";
import global from "@/store/global";
import config from "@/store/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    global,
    config
  }
});
