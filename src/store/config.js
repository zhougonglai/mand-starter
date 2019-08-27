import $http from "@/service";

export default {
  namespaced: true,
  state: {
    config: {
      appId: "",
      jsapi_ticket: "",
      noncestr: "",
      signature: "",
      timestamp: "",
      url: ""
    }
  },
  getters: {},
  actions: {
    async getWxConfig({ commit }) {
      const {
        rtnCode,
        rtnInfo: { data }
      } = await $http.getWxConfig({ url: location.href });
      if (rtnCode === "000") {
        commit("SET_WX_CONFIG", { data });
        return data;
      } else {
        return false;
      }
    },
    async getWxUserInfo(_, openId) {
      const res = await $http.getWxUserInfo({
        openId
      });
      return res;
    },
    async getWxMedia(_, serviceId) {
      const res = await $http.getWxMedia({ mediaId: serviceId });
      return res;
    }
  },
  mutations: {
    SET_WX_CONFIG(state, { data }) {
      state.config = data;
    }
  }
};
