import $http from "@/service";

export default {
  namespaced: true,
  state: () => ({
    balance: "",
    playerStatus: "",
    orders: {
      list: [],
      total: 0
    }
  }),
  getters: {
    balance: ({ balance }) => Number(balance),
    playerStatus: ({ playerStatus }) => Boolean(!playerStatus)
  },
  actions: {
    async getAmountShow({ commit }) {
      const { rtnInfo } = await $http.amountShow();
      if (rtnInfo.code === 0) {
        const {
          data: { balance }
        } = rtnInfo;
        commit("SET_BALANCE", balance);
      }
      return rtnInfo;
    },
    async orderPlayerList(
      { commit },
      OrderParameter = {
        date: "month",
        gameId: "",
        pageNum: 1,
        pageSize: 20,
        search: "",
        status: ""
      }
    ) {
      const { rtnInfo } = await $http.orderPlayerList(OrderParameter);
      if (rtnInfo.code === 0) {
        commit("SET_ORDERS", rtnInfo.data);
      }
      return rtnInfo;
    },
    async getPlayerStatus({ commit }) {
      const { rtnInfo } = await $http.getPlayerStatus();
      if (rtnInfo.code === 0) {
        commit("SET_PLAYER_STATUS", rtnInfo.data);
      }
      return rtnInfo;
    },
    async openPlayer({ commit, state: { playerStatus } }) {
      const { rtnInfo } = await $http.openPlayer({
        status: Number(!playerStatus)
      });
      if (rtnInfo.code === 0) {
        commit("SET_PLAYER_STATUS", !playerStatus);
      }
      return rtnInfo;
    }
  },
  mutations: {
    SET_BALANCE(state, balance) {
      state.balance = balance;
    },
    SET_PLAYER_STATUS(state, status) {
      state.playerStatus = status;
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    }
  }
};
