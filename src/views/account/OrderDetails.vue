<template>
  <div class="order_details">
    <div class="order_status" v-if="'status' in orderPlayerDetails">
      <div class="status_title larger bold">
        订单状态:
        <span v-if="[21, 22].includes(orderPlayerDetails.status)">已取消</span>
        <span v-else-if="[23].includes(orderPlayerDetails.status)">待接单</span>
        <span
          v-else-if="
            [24, 25, 27, 32, 36, 37].includes(orderPlayerDetails.status)
          "
          >已退款</span
        >
        <span v-else-if="[26].includes(orderPlayerDetails.status)">服务中</span>
        <span v-else-if="[30].includes(orderPlayerDetails.status)">售后中</span>
        <span
          v-else-if="
            [28, 29, 31, 33, 34, 35, 38].includes(orderPlayerDetails.status)
          "
          >已完成</span
        >
      </div>
      <div
        class="status_subtitle text-error mt-2"
        v-if="orderPlayerDetails.remainingTime"
      >
        <CountDown
          :prefix="
            [26].includes(orderPlayerDetails.status)
              ? '剩余时间:'
              : '剩余支付时间:'
          "
          :time="orderPlayerDetails.remainingTime"
        />
      </div>
    </div>

    <div class="order_info">
      <div class="info_title larger">用户信息</div>
      <div class="info_list">
        <div class="info_item" v-if="[26].includes(orderPlayerDetails.status)">
          <small class="small text-gray"
            >手机号: {{ orderPlayerDetails.phoneNo }}</small
          >
        </div>
        <div class="info_item" v-if="[26].includes(orderPlayerDetails.status)">
          <small class="small text-gray"
            >QQ: {{ orderPlayerDetails.QQNo }}</small
          >
        </div>
        <div class="info_item">
          <small class="small text-gray">
            备注说明:
            {{ orderPlayerDetails.remark ? orderPlayerDetails.remark : "无" }}
          </small>
        </div>
      </div>
    </div>

    <div class="cells">
      <div class="cell-item padding border-bottom-1px">
        <p class="bold fill larger">陪玩类型</p>
        <small class="text-gray">{{ orderPlayerDetails.gameName }}</small>
      </div>
      <div class="cell-item padding border-bottom-1px">
        <p class="bold fill larger">服务价格</p>
        <small class="text-gray">
          <md-amount :value="orderPlayerDetails.orderPrice" />元/小时
        </small>
      </div>
      <div class="cell-item padding border-bottom-1px">
        <p class="bold fill larger">购买数量</p>
        <small class="text-gray">{{ orderPlayerDetails.orderNumber }}</small>
      </div>
      <div class="cell-item padding border-bottom-1px">
        <p class="bold fill larger">优惠金额</p>
        <small class="text-gray">
          <md-amount :value="orderPlayerDetails.couponAmount" />元/小时
        </small>
      </div>
      <div class="cell-item padding border-bottom-1px">
        <p class="bold fill larger">实付金额</p>
        <small class="text-gray">
          <md-amount :value="orderPlayerDetails.payAmount" />元/小时
        </small>
      </div>
    </div>

    <div class="order_info">
      <div class="info_title larger">订单信息</div>
      <div class="info_list">
        <div class="info_item">
          <small class="small text-gray"
            >订单编号: {{ orderPlayerDetails.orderNo }}</small
          >
        </div>
        <div class="info_item">
          <small class="small text-gray"
            >下单时间: {{ orderPlayerDetails.orderTime }}</small
          >
        </div>
        <div class="info_item" v-if="orderPlayerDetails.paymentTime">
          <small class="small text-gray"
            >支付时间: {{ orderPlayerDetails.paymentTime }}</small
          >
        </div>
        <div class="info_item" v-if="orderPlayerDetails.receiptTime">
          <small class="small text-gray"
            >接单时间: {{ orderPlayerDetails.receiptTime }}</small
          >
        </div>
      </div>
    </div>

    <div class="action-bar">
      <div class="action-details">
        <!-- 参考# OrderManagement.vue -->
        <p class="bold large">
          <span v-if="[23, 26].includes(orderPlayerDetails.status)"
            >预计收益:</span
          >
          <span
            v-else-if="
              [28, 29, 31, 33, 34, 35, 38].includes(orderPlayerDetails.status)
            "
            >收益:</span
          >
          <span v-else-if="[30].includes(orderPlayerDetails.status)"
            >实付金额:</span
          >
          <span
            v-else-if="
              [24, 25, 27, 32, 36, 37].includes(orderPlayerDetails.status)
            "
            >已退款:</span
          >
          <span class="text-error">
            <md-amount :value="orderPlayerDetails.profitAmount" />元
          </span>
        </p>
        <small
          class="small mt-2 text-gray"
          v-if="
            [23, 26, 28, 29, 31, 33, 34, 35, 38].includes(
              orderPlayerDetails.status
            )
          "
        >
          扣除{{ orderPlayerDetails.platformFee * 100 }}%的平台服务费
          <md-amount :value="orderPlayerDetails.systemAmount" />元
        </small>
      </div>
      <div
        class="action-buttons"
        v-if="[23].includes(orderPlayerDetails.status)"
      >
        <md-button
          type="primary"
          size="small"
          round
          inline
          @click="orderOPlayerTaking($route.params.orderNo)"
          >接单</md-button
        >
      </div>
    </div>
    <!-- <md-action-bar :actions="actions">
      <div class="action-details">
        <p class="bold large">
          预计收益:
          <span class="text-error">
            <md-amount :value="orderPlayerDetails.profitAmount" />元
          </span>
        </p>
        <small class="small mt-2 text-gray">
          扣除{{orderPlayerDetails.platformFee * 100}}%的平台服务费
          <md-amount :value="orderPlayerDetails.systemAmount" />元
        </small>
      </div>
    </md-action-bar>-->
  </div>
</template>
<script>
import { Field, CellItem, Amount, Button } from "mand-mobile";
import { mapState, mapActions } from "vuex";

export default {
  name: "order_details",
  components: {
    [Field.name]: Field,
    [Amount.name]: Amount,
    [Button.name]: Button,
    [CellItem.name]: CellItem,
    CountDown: () => import("@/components/CountDown")
  },
  data() {
    return {
      actions: [
        {
          text: "接单",
          round: true,
          onClick: this.takingOrderOPlayer
        }
      ]
    };
  },
  computed: {
    ...mapState("account", ["orderPlayerDetails"])
  },
  methods: {
    async takingOrderOPlayer() {
      const { code } = await this.orderOPlayerTaking(
        this.$route.params.orderNo
      );
      if (!code) {
        await this.getOrderPlayerDetails(this.$route.params.orderNo);
      }
    },
    ...mapActions("account", ["orderOPlayerTaking", "getOrderPlayerDetails"])
  }
};
</script>
<style lang="stylus" scoped>
.order_details {
  width: 750px;
  height: 100vh;
  padding-bottom: 500px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F7;
  position: relative;

  .order_status {
    height: 140px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .order_info {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .info_list {
      flex: 1;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .info_item {
        &+.info_item {
          margin-top: 16px;
        }
      }
    }
  }

  .cells {
    margin-top: 20px;
  }

  .action-bar {
    height: 120px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 0 8px 4px alpha(color-text-disabled, 0.2), 0 0 4px 2px alpha(color-text-disabled, 0.14), 0 0 4px 1px alpha(color-text-disabled, 0.12);
  }
}
</style>
