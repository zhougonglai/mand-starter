export default {
  namespaced: true,
  state: {
    areaCode: {
      status: false,
      code: 86,
      list: [
        {
          value: 1,
          text: "xxx"
        },
        {
          value: 86,
          text: "中国区"
        }
      ]
    }
  },
  getters: {},
  actions: {
    async toggleAreaSelector({ state: { areaCode }, commit }) {
      await commit("TOGGLEAREA_SELECTOR", !areaCode.status);
    },
    async changeAreaCode(
      {
        state: { areaCode },
        commit
      },
      { value }
    ) {
      if (value !== areaCode.code) {
        await commit("CHANGE_AREA_CODE", value);
      } else {
        await "noChange";
      }
    }
  },
  mutations: {
    TOGGLEAREA_SELECTOR({ areaCode }, changeStatus) {
      areaCode.status = changeStatus;
    },
    CHANGE_AREA_CODE({ areaCode }, selected) {
      areaCode.code = selected;
      areaCode.status = false;
    }
  }
};
