export default {
  namespaced: true,
  state: {
    config: {
      appId: "",
      jsapi_ticket: "",
      noncestr: "",
      signature: "",
      timestamp: undefined,
      url: location.origin + location.pathname
    },
    userInfo: {}
  },
  getters: {},
  actions: {
    async getWxConfig({ commit }) {
      const {
        rtnCode,
        rtnInfo: { data }
      } = await fetch(
        `http://qq156471181.vicp.cc/nn/wx/getWxConfig?url=${location.origin +
          location.pathname}`
      ).then(res => res.json());
      if (rtnCode === "000") {
        commit("SET_WX_CONFIG", { data });
        return data;
      } else {
        return false;
      }
    },
    async getWxUserInfo(_, openId) {
      const res = await fetch(
        `http://qq156471181.vicp.cc/nn/wx/user-info?openId=${openId}`
      ).then(res => res.json());
      return res;
    }
  },
  mutations: {
    SET_WX_CONFIG(state, { data }) {
      state.config = data;
    }
  }
};
