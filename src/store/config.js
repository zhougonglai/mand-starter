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
        `http://ywm.nnn.com/baseUrl/wx/getWxConfig?url=${encodeURIComponent(
          location.href
        )}`
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
        `http://ywm.nnn.com/baseUrl/wx/user-info?openId=${openId}`
      ).then(res => res.json());
      return res;
    },
    async getWxMedia(_, serviceId) {
      const res = await fetch(
        `http://ywm.nnn.com/baseUrl/wx/media-download?mediaId=${serviceId}`
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
