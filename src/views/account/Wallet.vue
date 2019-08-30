<template>
  <div class="wallet">
    <div class="wallet_header">
      <small class="smaller lighter text-white">账户余额(元)</small>
      <div class="x-large mt-2 bold text-white">
        <md-amount :value="balance" :duration="800" transition />
      </div>
    </div>
    <md-tabs v-model="current" @change="typeChange">
      <md-tab-pane
        class="content"
        :name="item.name"
        :label="item.label"
        v-for="(item, index) in items"
        :key="index"
      >
        <div
          class="cells"
          v-if="
            payMents.list.filter(({ type }) => item.filter.includes(type))
              .length
          "
        >
          <div
            class="cell-item column"
            v-for="(payment, index) in payMents.list.filter(({ type }) =>
              item.filter.includes(type)
            )"
            :key="payment.orderNo"
          >
            <div
              class="item_content column"
              :class="{ 'border-bottom-1px': index < payMents.list.length }"
            >
              <div class="item-top">
                <p class="larger bold">
                  <span v-if="[0].includes(payment.type)">充值</span>
                  <span v-else-if="[10, 11].includes(payment.type)">提现</span>
                  <span
                    v-else-if="
                      [20, 21, 22, 23, 24, 29, 34].includes(payment.type)
                    "
                    >消费</span
                  >
                  <span
                    v-else-if="[25, 27, 30, 32, 35, 37].includes(payment.type)"
                    >收益</span
                  >
                </p>

                <small class="small text-grayer" v-text="payment.createTime" />
              </div>
              <div class="item-bottom">
                <div class="bottom-left">
                  <small class="small text-gray"
                    >订单号:{{ payment.orderNo }}</small
                  >
                </div>
                <div
                  class="bottom-right bold"
                  :class="{
                    'text-error': [0, 25, 27, 30, 32, 35, 37].includes(
                      payment.type
                    )
                  }"
                >
                  {{ payment.totalAmount }}元
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-block">
          <img
            class="block-cover"
            src="@/assets/img_empty-state2@2x.png"
            srcset="
              @/assets/img_empty-state2@2x.png 2x,
              @/assets/img_empty-state2@3x.png 3x
            "
          />
          <p class="block-title">咦？ 没有没有相关记录哟~</p>
        </div>
      </md-tab-pane>
    </md-tabs>
  </div>
</template>
<script>
import { Amount, Tabs, TabPane } from "mand-mobile";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "wallet",
  components: {
    [Amount.name]: Amount,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane
  },
  data() {
    return {
      current: "payMents",
      items: [
        {
          name: "payMents",
          label: "全部",
          filter: [
            0,
            10,
            11,
            20,
            21,
            22,
            23,
            24,
            29,
            34,
            25,
            27,
            30,
            32,
            35,
            37
          ]
        },
        {
          name: "earningsPayments",
          label: "收益",
          filter: [25, 27, 30, 32, 35, 37]
        },
        {
          name: "consumePayments",
          label: "消费",
          filter: [20, 21, 22, 23, 24, 29, 34]
        },
        {
          name: "withdrawPayments",
          label: "提现",
          filter: [10, 11]
        }
      ]
    };
  },
  computed: {
    ...mapState("account", ["payMents"]),
    ...mapGetters("account", [
      "balance",
      "earningsPayments",
      "consumePayments",
      "withdrawPayments"
    ])
  },
  methods: {
    typeChange({ name }) {
      const status = {
        payMents: "",
        earningsPayments: "3",
        consumePayments: "2",
        withdrawPayments: "1"
      };
      this.selectPayment({ status: status[name] });
    },
    ...mapActions("account", ["selectPayment"])
  },
  async created() {
    this.selectPayment();
  }
};
</script>
<style lang="stylus" scoped>
.wallet {
  width: 750px;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .wallet_header {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(135deg, #CD51FB 0%, #8C5FFE 100%);

    small {
      opacity: 0.7;
    }
  }

  >>>.md-tab-bar {
    background-color: #fff;
    position: relative;

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
}
</style>
