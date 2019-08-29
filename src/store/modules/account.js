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
    },
    payMents: {
      list: [],
      pageNum: 0,
      pageSize: 20,
      total: 0
    }
  }),
  getters: {
    balance: ({ balance }) => Number(balance),
    playerStatusTransform: ({ playerStatus }) => Boolean(!playerStatus),
    // 收益记录
    earningsPayments: ({ payMents }) => {
      if (payMents.list.length) {
        const earningsPaymentList = payMents.list.filter(({ type }) =>
          [25, 27, 30, 32, 35, 37].includes(type)
        );
        return {
          list: earningsPaymentList,
          pageNum: Math.floor(earningsPaymentList.length / 20),
          pageSize: 20,
          total: earningsPaymentList.length
        };
      } else {
        return {
          list: [],
          pageNum: 0,
          pageSize: 20,
          total: 0
        };
      }
    },
    // 消费记录
    consumePayments: ({ payMents }) => {
      if (payMents.list.length) {
        const consumePaymentList = payMents.list.filter(({ type }) =>
          [20, 21, 22, 23, 24, 29, 34].includes(type)
        );
        return {
          list: consumePaymentList,
          pageNum: Math.floor(consumePaymentList.length / 20),
          pageSize: 20,
          total: consumePaymentList.length
        };
      } else {
        return {
          list: [],
          pageNum: 0,
          pageSize: 20,
          total: 0
        };
      }
    },
    // 提现记录
    withdrawPayments: ({ payMents }) => {
      if (payMents.list.length) {
        const withdrawPaymentList = payMents.list.filter(({ type }) =>
          [10, 11].includes(type)
        );
        return {
          list: withdrawPaymentList,
          pageNum: Math.floor(withdrawPaymentList.length / 20),
          pageSize: 20,
          total: withdrawPaymentList.length
        };
      } else {
        return {
          list: [],
          pageNum: 0,
          pageSize: 20,
          total: 0
        };
      }
    }
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
        commit("SET_PLAYER_STATUS", playerStatus ? 0 : 1);
      }
      return rtnInfo;
    },
    /**
     * {
     *   createTimeEnd: ""
     *   createTimeStart: ""
     *   pageNum: 1
     *   pageSize: 20
     *   status: ""
     * }
     * @param {*} paymentParams
     */
    async selectPayment({ commit }, paymentParams = {}) {
      const { rtnInfo } = await $http.selectPayment(paymentParams);
      if (rtnInfo.code === 0) {
        commit("SET_PAYMENTS", rtnInfo.data);
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
    },
    SET_PAYMENTS({ payMents }, { list, total, pageNum, pageSize }) {
      payMents.list = list;
      payMents.total = total;
      payMents.pageNum = pageNum;
      payMents.pageSize = pageSize;
    }
  }
};
