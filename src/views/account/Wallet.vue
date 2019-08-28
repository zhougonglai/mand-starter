<template>
  <div class="wallet">
    <div class="wallet_header">
      <small class="smaller lighter text-white">账户余额(元)</small>
      <div class="x-large mt-2 bold text-white">
        <md-amount :value="balance" :duration="800" transition />
      </div>
    </div>
    <md-tab-bar v-model="current" :ink-length="50" :items="items" />
  </div>
</template>
<script>
import { Amount, TabBar } from "mand-mobile";
import { mapGetters } from "vuex";

export default {
  name: "wallet",
  components: {
    [Amount.name]: Amount,
    [TabBar.name]: TabBar
  },
  data() {
    return {
      current: 1,
      items: [
        {
          name: 1,
          label: "全部"
        },
        {
          name: 2,
          label: "收益"
        },
        {
          name: 3,
          label: "消费"
        },
        {
          name: 4,
          label: "提现"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("account", ["balance"])
  }
};
</script>
<style lang="stylus" scoped>
.wallet {
  width: 750px;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F7;

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

    .md-tab-bar-ink {
      height: 10px;
      border-radius: 10px 10px 0 0;
      box-shadow: 0 -1px 16px 6px alpha(color-primary, 0.2), 1px 0 4px 2px alpha(color-primary, 0.14), 0 0 4px 1px alpha(color-primary, 0.12);
    }
  }
}
</style>
