import $http from "@/service";
import CryptoJS from "crypto-js";

export default {
  namespaced: true,
  state: {
    info: {}
  },
  getters: {},
  actions: {
    async login(
      { commit, rootState },
      { phone, emailOrAccount, accountType, password }
    ) {
      const { rtnCode, rtnInfo } = await $http.login({
        phone: accountType ? phone : "",
        emailOrAccount: accountType ? "" : emailOrAccount,
        password: CryptoJS.MD5(password).toString(),
        countryCode: rootState.global.areaCode.item.code
      });
      if (rtnCode === "000") {
        commit("SET_INFO", rtnInfo);
        return rtnInfo;
      } else {
        throw Error("服务器异常");
      }
    }
  },
  mutations: {
    SET_INFO(state, result) {
      state.info = result;
    }
  }
};
