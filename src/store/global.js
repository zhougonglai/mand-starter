import { countryCode } from "@/utils";

const cuntryListCreator = ([hotCuntry, list]) => {
  return [
    {
      name: "Hot",
      items: hotCuntry
    }
  ].concat(
    list.map(({ group, country }) => ({
      name: group,
      items: country
    }))
  );
};

export default {
  namespaced: true,
  state: {
    sign: {
      current: "sign_in"
    },
    areaCode: {
      status: false,
      active: {
        code: 86,
        group: "Z",
        ico: "https://picture.leigod.com/mobile_area_code/1_5/cn.png",
        iso_code: "cn",
        name: "中国"
      },
      list: cuntryListCreator(Object.values(countryCode))
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
      item
    ) {
      if (item.code !== areaCode.code) {
        await commit("CHANGE_AREA_CODE", item);
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
      areaCode.item = selected;
      areaCode.status = false;
    }
  }
};
