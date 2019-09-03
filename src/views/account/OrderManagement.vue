<template>
  <div class="order_management">
    <md-tabs v-model="current" @change="tabChange">
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
            @click="navigatorDetails(order)"
          >
            <div class="order-header">
              <div class="header-avatar">
                <img class="avatar" :src="order.imageUrl" />
              </div>
              <div class="header-content">
                <div class="header-content-title larger bold">
                  {{ order.nickname }}
                </div>
                <small class="header-content-subtitle small text-gray mt-2">{{
                  order.createTime
                }}</small>
              </div>
              <div class="header-action">
                <div class="action-top">
                  <small
                    class="small text-gray"
                    v-if="[21, 22].includes(order.status)"
                    >已取消</small
                  >
                  <small
                    class="small text-gray"
                    v-else-if="[23].includes(order.status)"
                    >待接单</small
                  >
                  <small
                    class="small text-gray"
                    v-else-if="[24, 25, 27, 32, 36, 37].includes(order.status)"
                    >已退款</small
                  >
                  <small
                    class="small text-gray"
                    v-else-if="[26].includes(order.status)"
                    >服务中</small
                  >
                  <small
                    class="small text-gray"
                    v-else-if="[30].includes(order.status)"
                    >售后中</small
                  >
                  <small
                    class="small text-gray"
                    v-else-if="
                      [28, 29, 31, 33, 34, 35, 38].includes(order.status)
                    "
                    >已完成</small
                  >
                </div>
                <div class="action-bottom mt-2">{{ order.remainingTime }}</div>
              </div>
            </div>
            <div class="order-content border-top-1px">
              <div class="content-top">
                <small class="small text-gray"
                  >服务类型: {{ order.gameName }}</small
                >
              </div>
              <div class="content-bottom">
                <small class="small text-gray"
                  >数量: {{ order.orderNumber }}</small
                >
                <small class="small text-gray before-diver"
                  >金额: {{ order.orderPrice }}</small
                >
              </div>
            </div>
            <div
              class="order-actions border-top-1px"
              v-if="[23].includes(order.status)"
            >
              <md-button type="primary" size="small" round inline
                >接单</md-button
              >
            </div>
          </div>
        </div>
        <div v-else class="empty-block">
          <img
            class="block-cover"
            src="@/assets/img_empty-state1@2x.png"
            srcset="
              @/assets/img_empty-state1@2x.png 2x,
              @/assets/img_empty-state1@3x.png 3x
            "
          />
          <p class="block-title">咦？暂时没有接单哟~</p>
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
          label: "全部",
          status: []
        },
        {
          name: "wait",
          label: "待接单",
          status: [23]
        },
        {
          name: "online",
          label: "服务中",
          status: [26]
        },
        {
          name: "done",
          label: "已完成",
          status: [28, 29, 31, 33, 34, 35, 38]
        },
        {
          name: "afterSale",
          label: "售后中",
          status: [30]
        }
      ]
    };
  },
  computed: {
    ...mapState("account", ["orders"])
  },
  methods: {
    tabChange({ name }) {
      this.orderPlayerList({
        status: this.items[
          this.items.findIndex(item => item.name === name)
        ].status.join()
      });
    },
    async navigatorDetails({ orderNo }) {
      const { code } = await this.orderPlayerDetails(orderNo);
      if (code === 0) {
        this.$router.push({ name: "order_details", params: { orderNo } });
      }
    },
    ...mapActions("account", ["orderPlayerList", "orderPlayerDetails"])
  },
  created() {
    if (!this.orders.list.length) {
      this.orderPlayerList();
    }
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

  >>>.md-tab-bar {
    background-color: #fff;

    &::after {
      content: '';
      display: block;
      position: absolute;
      border-bottom: 1px solid #E9E9ED;
      left: 0;
      bottom: 0;
      width: 100%;
      transform-origin: 0 bottom;
    }

    .md-tab-bar-ink {
      height: 10px;
      max-width: 48px;
      left: 2%;
      border-radius: 10px 10px 0 0;
      box-shadow: 0 -1px 16px 6px alpha(color-primary, 0.2), 1px 0 4px 2px alpha(color-primary, 0.14), 0 0 4px 1px alpha(color-primary, 0.12);
    }
  }

  >>>.md-tabs-content {
    height: calc(100vh - 100px);
    overflow: auto;
  }

  .empty-block {
    height: calc(100vh - 100px);
    background-color: #fff;
  }
}
</style>
