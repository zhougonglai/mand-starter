import $http from "@/service";

export default {
  namespaced: true,
  state: {
    token: "",
    info: {}
  },
  getters: {},
  actions: {
    async getUserInfo({ commit }) {
      const user = await $http.get("/user");
      return commit("SET_USER", user);
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.info = user;
    }
  }
};
