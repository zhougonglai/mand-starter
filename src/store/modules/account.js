import $http from "@/service";

export default {
  namespaced: true,
  state: () => ({
    balance: "",
    playerStatus: 1,
    /**
     * 订单状态
     * 已取消: 21, 22
     * 待接单: 23
     * 已退款: 24,25,27,32,36,37
     * 服务中: 26
     * 售后中: 30
     * 已完成: 28,29,31,33,34,35,38
     */
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
    SET_ORDERS({ orders }, { list, total }) {
      orders.list = list;
      orders.total = total;
    }
  }
};
