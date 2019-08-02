export default {
  namespaced: true,
  state: {
    config: {
      appId: "",
      jsapi_ticket: "",
      noncestr: "",
      signature: "",
      timestamp: undefined,
      url: location.href
    },
    redirect_uri: encodeURIComponent(
      "http://qq156471181.vicp.cc:12707/?openId=o7hrp5hurltv-No0odArYe_wC0kw"
    )
  },
  getters: {},
  actions: {
    async getWxConfig({ commit }) {
      const {
        rtnCode,
        rtnInfo: { data }
      } = await fetch(
        `http://qq156471181.vicp.cc/wx/getWxConfig?url=${encodeURIComponent(
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
    wx_authorize({
      state: {
        config: { appId },
        redirect_uri
      }
    }) {
      console.log("appId", appId, redirect_uri);
      window.open(
        `
          https://open.weixin.qq.com/connect/oauth2/authorize
          ?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect
        `
      );
    }
  },
  mutations: {
    SET_WX_CONFIG(state, { data }) {
      state.config = data;
    }
  }
};
