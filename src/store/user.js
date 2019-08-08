import $http from "@/service";
import CryptoJS from "crypto-js";
import { Toast } from "mand-mobile";

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
      const {
        rtnCode,
        rtnInfo: { data, msg }
      } = await $http.login({
        channel: "wechat",
        phone: accountType ? phone : "",
        flag: accountType ? 1 : 2,
        emailOrAccount: accountType ? "" : emailOrAccount,
        password: CryptoJS.MD5(password).toString(),
        countryCode: rootState.global.areaCode.item.code
      });
      if (rtnCode === "000") {
        if (data) {
          commit("SET_INFO", data);
          return data;
        } else {
          Toast.failed(msg);
        }
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
