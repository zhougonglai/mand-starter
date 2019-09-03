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
      </div>
    </div>

    <div class="order_info">
      <div class="info_title larger">用户信息</div>
      <div class="info_list">
        <div class="info_item">
          <small class="small text-gray"
            >手机号: {{ orderPlayerDetails.phoneNo }}</small
          >
        </div>
        <div class="info_item">
          <small class="small text-gray"
            >QQ: {{ orderPlayerDetails.QQNo }}</small
          >
        </div>
        <div class="info_item">
          <small class="small text-gray"
            >备注说明:
            {{
              orderPlayerDetails.remark ? orderPlayerDetails.remark : "无"
            }}</small
          >
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
        <div class="info_item">
          <small class="small text-gray"
            >支付时间: {{ orderPlayerDetails.paymentTime }}</small
          >
        </div>
        <div class="info_item">
          <small class="small text-gray"
            >接单时间: {{ orderPlayerDetails.receiptTime }}</small
          >
        </div>
      </div>
    </div>

    <div class="action-bar">
      <div class="action-details">
        <p class="bold large">
          预计收益:
          <span class="text-error">{{ orderPlayerDetails.profitAmount }}</span>
        </p>
        <small class="small mt-2 text-gray">扣除10%的平台服务费34元</small>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, CellItem, Amount } from "mand-mobile";
import { mapState } from "vuex";

export default {
  name: "order_details",
  components: {
    [Field.name]: Field,
    [Amount.name]: Amount,
    [CellItem.name]: CellItem
  },
  computed: {
    ...mapState("account", ["orderPlayerDetails"])
  }
};
</script>
<style lang="stylus" scoped>
.order_details {
  width: 750px;
  min-height: 100vh;
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
