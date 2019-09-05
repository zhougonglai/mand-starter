/*
 * @Description: In User Settings Edit
 * @Author: John Zhou
 * @Date: 2019-08-10 21:01:19
 * @LastEditTime: 2019-08-11 18:25:55
 * @LastEditors: John Zhou
 */
import $http from "@/service";
import { citys, numList } from "@/utils";
import CryptoJS from "crypto-js";
import { Toast } from "mand-mobile";

export default {
  namespaced: true,
  state: () => ({
    info: {},
    playerApply: {
      //  陪玩资料审核状态：0已通过，1被驳回，2审核中, 3初次申请
      playerDetailsStatus: "",
      //  陪玩状态 ：0审核通过（已经成为陪玩），1被驳回（不是陪玩），2审核中（不是陪玩）
      playerStatus: ""
    },
    reasons: "",
    openId: "",
    ageSelector: {
      status: false,
      active: {
        text: "23岁",
        value: "23"
      },
      list: numList(14, 46).map(i => ({ value: i, text: `${i}岁` }))
    },
    citySelector: {
      status: false,
      active: [],
      list: [citys]
    },
    tags: {
      active: [],
      list: [
        {
          value: 1,
          text: "御姐"
        },
        {
          value: 2,
          text: "萝莉"
        },
        {
          value: 3,
          text: "大叔"
        },
        {
          value: 4,
          text: "颜值担当"
        },
        {
          value: 5,
          text: "阳光帅气"
        },
        {
          value: 6,
          text: "认真专业"
        },
        {
          value: 7,
          text: "成熟稳重"
        },
        {
          value: 8,
          text: "小狼狗"
        },
        {
          value: 9,
          text: "逗比闲聊"
        },
        {
          value: 10,
          text: "电竞大神"
        },
        {
          value: 11,
          text: "人美声甜"
        },
        {
          value: 12,
          text: "强势辅助"
        },
        {
          value: 13,
          text: "叔音易撩"
        },
        {
          value: 14,
          text: "活泼精灵"
        },
        {
          value: 15,
          text: "沉着冷静"
        },
        {
          value: 16,
          text: "温文尔雅"
        },
        {
          value: 17,
          text: "乖巧粘人"
        },
        {
          value: 18,
          text: "皮中带稳"
        }
      ]
    },
    images: [],
    basicInfo: {
      QQNO: "",
      phone: "",
      gender: "2",
      hobby: ""
    },
    serviceInfo: {
      img: {
        dataUrl: "",
        url: "",
        file: ""
      },
      duration: 0,
      skillInfo: "",
      voiceUrl: "",
      serverId: ""
    },
    sampleGraph: {},
    gameList: {
      status: false,
      active: {},
      list: []
    },
    rankList: {
      status: false,
      active: {},
      list: []
    },
    verification: {
      label: "获取短信验证码",
      time: 60,
      timer: 0,
      status: false,
      dataSource: "",
      type: 1 // 1: 短信验证码 , 0 : 图形验证码
    }
  }),
  getters: {},
  actions: {
    activeGameList: ({ commit, dispatch }, { refresh, ...active }) => {
      if (refresh) {
        commit("GAMELIST_ACTIVE", active);
      }
      dispatch("getrankList");
      dispatch("getSampleGraph");
      if (refresh) {
        commit("RANKLIST_ACTIVE", active);
      }
    },
    async login(
      {
        commit,
        state: { openId },
        rootState
      },
      { phone, emailOrAccount, accountType, password, wechat }
    ) {
      const params = new URLSearchParams(location.search);
      const {
        rtnCode,
        rtnInfo: { code, data, msg }
      } = await $http.login({
        channel: params.has("channel") ? params.get("channel") : "",
        phone: accountType ? phone : "",
        flag: accountType ? 1 : 2,
        emailOrAccount: accountType ? "" : emailOrAccount,
        password: CryptoJS.MD5(password).toString(),
        countryCode: rootState.global.areaCode.active.code,
        weChatOpenId: wechat ? openId : ""
      });
      if (rtnCode === "000") {
        if (code) {
          Toast.failed(msg);
        } else {
          commit("SET_INFO", data);
        }
        return { code, data, msg };
      } else {
        throw Error("服务器异常");
      }
    },
    async exchangeCode({ state }) {
      const params = new URLSearchParams(location.search);
      const { rtnCode, rtnInfo } = await $http.exchangeCode({
        code: params.has("code") ? params.get("code") : ""
      });
      if (rtnCode === "000") {
        state.openId = rtnInfo.data.openId;
        return rtnInfo;
      } else {
        return;
      }
    },
    async autoLogin({ state: { openId }, commit }) {
      const {
        rtnCode,
        rtnInfo: { code, data }
      } = await $http.autoLogin({
        openId
      });
      if (rtnCode === "000") {
        if (code === 0) {
          commit("SET_INFO", data);
        }
        return { data, code };
      } else {
        return;
      }
    },
    async findPwd({ rootState }, { imgCode, phone, smsCode, password }) {
      const params = new URLSearchParams(location.search);
      const {
        rtnCode,
        rtnInfo: { code, msg }
      } = await $http.findPwd({
        channel: params.has("channel") ? params.get("channel") : "",
        countryCode: rootState.global.areaCode.active.code,
        imgCode,
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
        countryCode: rootState.global.areaCode.active.code,
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
        phone: phone.toString(),
        imgCode,
        countryCode: rootState.global.areaCode.active.code,
        type
      });
      if (rtnCode === "000") {
        if (code) {
          Toast.info(msg);
        } else {
          if (verification.timer) {
            clearInterval(verification.timer);
            verification.timer = 0;
          }
          commit("VERIFICATION_TOGGER");
          const timer = setInterval(() => {
            if (verification.time > 1) {
              commit("VERIFICATION_COUNT", verification.time - 1);
            } else {
              commit("VERIFICATION_TOGGER");
              clearInterval(timer);
              commit("VERIFICATION_COUNT", 60);
            }
          }, 1000);
          commit("VERIFICATION_TIMER", timer);
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
      const params = new URLSearchParams(location.search);
      const {
        rtnCode,
        rtnInfo: { code, data, msg }
      } = await $http.register({
        channel: params.has("channel") ? params.get("channel") : "",
        countryCode: rootState.global.areaCode.active.code,
        imgCode,
        invitationCode,
        phone,
        smsCode,
        password: CryptoJS.MD5(password).toString()
      });

      if (rtnCode === "000") {
        if (code) {
          Toast.hide();
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
        true,
        {
          headers: {
            Authorization: info.token
          }
        }
      );
      return rtnInfo;
    },
    async getGameList(
      {
        commit,
        dispatch,
        state: { playerApply }
      },
      lazy = false
    ) {
      const { rtnCode, rtnInfo } = await $http.gameList();
      if (rtnCode === "000") {
        if (rtnInfo.code === 0) {
          commit("SET_GAMELIST", rtnInfo.data);
          // 联动默认行为
          if (!lazy) {
            // playerApply @from '@service/playerAPI' 第一次填写,付默认值
            dispatch("activeGameList", {
              ...rtnInfo.data[0],
              refresh: playerApply.playerStatus === 3
            });
          }
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
    },
    async getSampleGraph({ state: { gameList }, commit }) {
      const {
        rtnCode,
        rtnInfo: { code, data }
      } = await $http.sampleGraph({
        gameId: gameList.active.id
      });
      if (rtnCode === "000") {
        if (code === 0) {
          commit("SET_SAMPLEGRAPH", data);
        }
      }
      return code;
    },
    async playerInformationAdd({
      state: {
        info,
        tags,
        images,
        basicInfo,
        ageSelector,
        citySelector,
        playerApply,
        serviceInfo,
        gameList,
        rankList
      }
    }) {
      const { rtnInfo } = await $http.playerInformationAdd(
        {
          ...basicInfo,
          isPlayer: playerApply.playerStatus,
          age: ageSelector.active.value,
          personalityLables: tags.active,
          province: citySelector.active[0],
          city: citySelector.active[1],
          area: citySelector.active[2],
          images: images.filter(({ url }) => url).map(image => image.url),
          gameInfoParameter: [
            {
              duration: serviceInfo.duration,
              gameType: gameList.active.id,
              pictureUrl: serviceInfo.img.url,
              rank: rankList.active.value,
              skills: serviceInfo.skillInfo,
              voiceUrl: serviceInfo.voiceUrl
            }
          ]
        },
        false,
        {
          headers: {
            Authorization: info.token
          }
        }
      );
      if (rtnInfo.code !== 0) {
        Toast.info(rtnInfo.msg);
      }
      return rtnInfo;
    },
    async getPlayerStatus({ state: { info }, commit }) {
      const { rtnCode, rtnInfo } = await $http.playerStatus({}, false, {
        headers: {
          Authorization: info.token
        }
      });
      if (rtnCode === "000") {
        commit("SET_STATUS", rtnInfo.data);
        return rtnInfo;
      } else {
        return false;
      }
    },
    async playerInfoStatus({ state: { info }, commit }) {
      const { rtnCode, rtnInfo } = await $http.playerInfoStatus({}, false, {
        headers: {
          Authorization: info.token
        }
      });
      if (rtnCode === "000") {
        commit("SET_INFO_STATUS", rtnInfo.data);
        return rtnInfo;
      } else {
        return false;
      }
    },
    async memberInformationUpdate(
      {
        state: { info },
        commit
      },
      infomationParams
    ) {
      const { rtnInfo } = await $http.memberInformationUpdate({
        ...info,
        ...infomationParams
      });
      if (rtnInfo.code) {
        Toast.failed(rtnInfo.msg);
      } else {
        commit("SET_INFO", { ...info, ...rtnInfo.data });
      }
      return rtnInfo;
    },
    async memberInformationShow() {
      const { rtnInfo } = await $http.memberInformationShow();
      if (rtnInfo.code) {
        Toast.failed(rtnInfo.msg);
      }
      return rtnInfo;
    }
  },
  mutations: {
    SET_INFO(state, result) {
      state.info = result;
    },
    SET_STATUS(state, status) {
      state.playerApply = status;
    },
    INIT_INFO_DATA(state) {
      const {
        basicInfo,
        ageSelector,
        tags,
        citySelector,
        gameList,
        rankList,
        serviceInfo
      } = state;
      basicInfo.QQNO = "";
      basicInfo.gender = "2";
      basicInfo.hobby = "";
      ageSelector.active = {
        text: "23岁",
        value: "23"
      };
      tags.active = [];
      citySelector.active = [];
      state.images = [];
      state.reasons = "";
      gameList.active = {};
      rankList.active = {};
      serviceInfo.skillInfo = "";
      serviceInfo.voiceUrl = "";
      serviceInfo.img.url = "";
    },
    SET_INFO_STATUS(
      state,
      {
        age,
        area,
        city,
        isPlayer,
        province,
        gameInfoParameter: [
          { gameId, gameType, pictureUrl, rank, rankName, skills, voiceUrl }
        ],
        gender,
        hobby,
        images,
        personalityLable,
        qQNO,
        reasons
      }
    ) {
      state.basicInfo.QQNO = qQNO;
      state.basicInfo.gender = gender.toString();
      state.basicInfo.hobby = hobby;
      state.ageSelector.active.text = age + "岁";
      state.ageSelector.active.value = age.toString();
      state.info.isPlayerApply = isPlayer;
      state.tags.active = personalityLable.split(", ");
      state.citySelector.active = [province, city, area];
      state.images = images.map(url => ({ url }));
      state.reasons = reasons;
      state.gameList.active.value = gameId;
      state.gameList.active.id = gameId;
      state.gameList.active.name = gameType;
      state.gameList.active.type = 0; // 服务端没给
      state.rankList.active.value = rank;
      state.rankList.active.id = rank;
      state.rankList.active.rankName = rankName;
      state.serviceInfo.skillInfo = skills;
      state.serviceInfo.voiceUrl = voiceUrl;
      state.serviceInfo.img.url = pictureUrl;
    },
    SET_GAMELIST({ gameList }, list) {
      gameList.list = list;
    },
    GAMELIST_ACTIVE({ gameList }, active) {
      gameList.active = active;
    },
    SET_RANKLIST({ rankList }, list) {
      rankList.list = list;
    },
    RANKLIST_TOGGEL({ rankList }) {
      rankList.status = !rankList.status;
    },
    RANKLIST_ACTIVE({ rankList }, active) {
      rankList.active = active;
    },
    SET_SAMPLEGRAPH(state, result) {
      state.sampleGraph = result;
    },
    VERIFICATION_COUNT({ verification }, time) {
      verification.time = time;
    },
    VERIFICATION_TIMER({ verification }, timer) {
      verification.timer = timer;
    },
    VERIFICATION_CLEAR({ verification }) {
      clearInterval(verification.timer);
      verification.timer = 0;
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
