import $http from "@/service";
import CryptoJS from "crypto-js";
import { Toast } from "mand-mobile";

export default {
  namespaced: true,
  state: {
    info: {},
    gameList: {
      status: false,
      active: "",
      list: []
    },
    rankList: {
      status: false,
      active: "",
      list: []
    },
    verification: {
      label: "获取短信验证码",
      time: 60,
      status: false,
      dataSource: undefined,
      type: 1 // 1: 短信验证码 , 0 : 图形验证码
    }
  },
  getters: {},
  actions: {
    toggetGameList: ({ commit }) => commit("GAMELIST_TOGGER"),
    activeGameList: ({ commit, dispatch }, active) => {
      commit("GAMELIST_ACTIVE", active);
      dispatch("getrankList");
    },
    async login(
      { commit, rootState },
      { phone, emailOrAccount, accountType, password }
    ) {
      const {
        rtnCode,
        rtnInfo: { code, data, msg }
      } = await $http.login({
        channel: "wechat",
        phone: accountType ? phone : "",
        flag: accountType ? 1 : 2,
        emailOrAccount: accountType ? "" : emailOrAccount,
        password: CryptoJS.MD5(password).toString(),
        countryCode: rootState.global.areaCode.item.code
      });
      if (rtnCode === "000") {
        if (code) {
          Toast.failed(msg);
        } else {
          commit("SET_INFO", data);
        }
        return code;
      } else {
        throw Error("服务器异常");
      }
    },
    async findPwd({ rootState }, { phone, smsCode, password }) {
      const {
        rtnCode,
        rtnInfo: { code, msg }
      } = await $http.findPwd({
        channel: "wechat",
        countryCode: rootState.global.areaCode.item.code,
        smsCode,
        phone,
        password: CryptoJS.MD5(password).toString()
      });
      if (rtnCode === "000") {
        if (code) {
          Toast.failed(msg);
        } else {
          Toast.succeed(msg);
        }
        return code;
      } else {
        throw Error("服务器异常");
      }
    },
    /**
     * 图形验证码
     * @param {number} type { 2: 找回密码 }
     */
    async checkImageShow({ rootState, commit }, { phone, type = 1 }) {
      const {
        rtnCode,
        rtnInfo: { code }
      } = await $http.checkImageShow({
        phone,
        countryCode: rootState.global.areaCode.item.code,
        type
      });
      if (rtnCode === "000") {
        if (code === 0) {
          await commit("VERIFICATION_SWITCHTYPE", code);
        }
        return code;
      } else {
        throw Error("服务器异常");
      }
    },
    /**
     *
     *通用获取图片验证码
     * @param {number} flag 验证码类型 1登录验证码 2.注册验证码
     */
    async imgCode({ commit }, flag = 1) {
      const {
        rtnCode,
        rtnInfo: { data, msg }
      } = await $http.imgCode({ flag });
      if (rtnCode === "000") {
        if (data) {
          commit("VERIFICATION_DATASOURCE", data);
          return data;
        } else {
          Toast.failed(msg);
        }
      } else {
        throw Error("服务器异常");
      }
    },
    /**
     * 短信验证
     * @param {number} type { 0:注册, 3:忘记密码}
     * */
    async phoneAuthenticateNoLogin(
      {
        state: { verification },
        commit,
        rootState
      },
      { phone, imgCode = "", type = 0 }
    ) {
      const {
        rtnCode,
        rtnInfo: { code, msg }
      } = await $http.phoneAuthenticateNoLogin({
        phone,
        imgCode,
        countryCode: rootState.global.areaCode.item.code,
        type
      });
      if (rtnCode === "000") {
        if (code) {
          Toast.info(msg);
        } else {
          commit("VERIFICATION_TOGGER");
          let timer = setInterval(() => {
            if (verification.time > 1) {
              commit("VERIFICATION_COUNT", verification.time - 1);
            } else {
              commit("VERIFICATION_TOGGER");
              clearInterval(timer);
              commit("VERIFICATION_COUNT", 60);
            }
          }, 1000);
        }
        return code;
      } else {
        throw Error("服务器异常");
      }
    },
    async register(
      { rootState, commit },
      { smsCode, imgCode, invitationCode, password, phone }
    ) {
      const {
        rtnCode,
        rtnInfo: { code, data, msg }
      } = await $http.register({
        channel: "wechat",
        countryCode: rootState.global.areaCode.item.code,
        imgCode,
        invitationCode,
        phone,
        smsCode,
        password: CryptoJS.MD5(password).toString()
      });

      if (rtnCode === "000") {
        if (code) {
          Toast.failed(msg);
        } else {
          commit("SET_INFO", data);
        }
        return code;
      } else {
        throw Error("服务器异常");
      }
    },
    async fileUpload(
      {
        state: { info }
      },
      fileName
    ) {
      const { rtnInfo } = await $http.fileUpload(
        {
          fileName
        },
        true,
        {
          headers: {
            Authorization: info.token
          }
        }
      );
      return rtnInfo;
    },
    async base64Upload(
      {
        state: { info }
      },
      base64
    ) {
      const { rtnInfo } = await $http.base64Upload(
        {
          fileName: base64
        },
        false,
        {
          headers: {
            Authorization: info.token
          }
        }
      );
      return rtnInfo;
    },
    async getgameList({ commit }) {
      const { rtnCode, rtnInfo } = await $http.gameList();
      if (rtnCode === "000") {
        if (rtnInfo.code === 0) {
          commit("SET_GAMELIST", rtnInfo.data);
        }
      }
      return rtnInfo;
    },
    async getrankList({ state: { gameList }, commit }) {
      const {
        rtnCode,
        rtnInfo: { code, data }
      } = await $http.rankList({
        gameId: gameList.active.id
      });
      if (rtnCode === "000") {
        if (code === 0) {
          commit("SET_RANKLIST", data);
        }
      }
      return code;
    }
  },
  mutations: {
    SET_INFO(state, result) {
      state.info = result;
    },
    SET_GAMELIST({ gameList }, list) {
      gameList.list = list;
    },
    GAMELIST_TOGGER({ gameList }) {
      gameList.status = !gameList.status;
    },
    GAMELIST_ACTIVE({ gameList }, active) {
      gameList.active = active;
    },
    SET_RANKLIST({ rankList }, list) {
      rankList.list = list;
    },
    VERIFICATION_COUNT({ verification }, time) {
      verification.time = time;
    },
    VERIFICATION_TOGGER({ verification }) {
      verification.status = !verification.status;
    },
    VERIFICATION_SWITCHTYPE({ verification }, type) {
      verification.type = type;
    },
    VERIFICATION_DATASOURCE({ verification }, dataSource) {
      verification.dataSource = dataSource;
    }
  }
};
