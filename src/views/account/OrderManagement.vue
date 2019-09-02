<template>
  <div class="order_management">
    <md-tabs v-model="current">
      <md-tab-pane
        class="content"
        :name="item.name"
        :label="item.label"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="order-list" v-if="orders.list.length">
          <div
            class="order-item"
            v-for="order in orders.list"
            :key="order.orderNo"
          >
            <div class="order-header">
              <div class="header-avatar">
                <img class="avatar" :src="order.imageUrl" />
              </div>
              <div class="header-content">
                <div class="header-content-title">{{ order.nickname }}</div>
                <div class="header-content-subtitle">
                  {{ order.createTime }}
                </div>
              </div>
              <div class="header-action">
                <div class="action-top">{{ order.unit }}</div>
                <div class="action-bottom">{{ order.remainingTime }}</div>
              </div>
            </div>
            <div class="order-content"></div>
            <div class="order-actions">
              <md-button type="primary" round inline>接单</md-button>
            </div>
          </div>
        </div>
      </md-tab-pane>
    </md-tabs>
  </div>
</template>
<script>
import { Amount, Tabs, TabPane, Button } from "mand-mobile";
import { mapState, mapActions } from "vuex";

export default {
  name: "order_management",
  components: {
    [Tabs.name]: Tabs,
    [Amount.name]: Amount,
    [Button.name]: Button,
    [TabPane.name]: TabPane
  },
  data() {
    return {
      current: "all",
      items: [
        {
          name: "all",
          label: "全部"
        },
        {
          name: "wait",
          label: "待接单"
        },
        {
          name: "online",
          label: "服务中"
        },
        {
          name: "done",
          label: "已完成"
        },
        {
          name: "afterSale",
          label: "售后中"
        }
      ]
    };
  },
  computed: {
    ...mapState("account", ["orders"])
  },
  methods: {
    ...mapActions("account", ["orderPlayerList"])
  }
};
</script>
<style lang="stylus" scoped>
.order_management {
  width: 750px;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F7;
}
</style>
