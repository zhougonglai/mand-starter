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
      const { data, status } = await $http.login();
      commit("SET_USER", data);
      return status;
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.info = user;
      state.token = user.memberNo;
    }
  }
};
