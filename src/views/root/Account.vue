<template>
  <div id="account">
    <div class="account_header">
      <div class="account_avatar">
        <img class="avatar" :src="info.imageUrl" :alt="info.nickName" />
      </div>
      <div class="account_content">
        <div class="account_nick_name larger bold">{{ info.nickName }}</div>
        <div class="account_info">ID: {{ info.memberNo }}</div>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-arrow-right" />
      </svg>
    </div>

    <div class="online_switch" v-if="playerApply.playerStatus === 0">
      <p
        class="larger bold fill"
        v-text="playerStatus ? '关闭接单' : '开启接单'"
      />
      <md-switch
        :value="playerStatus"
        :disabled="processActive"
        @change="playerStatusChange"
      />
    </div>

    <div class="order">
      <div class="order_status">
        <div class="order_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconic_waitingorder" />
          </svg>
          <small class="small text-gray">待接单</small>
        </div>
        <div class="order_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconic_service" />
          </svg>
          <small class="small text-gray">进行中</small>
        </div>
        <div class="order_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconic_after-sale" />
          </svg>
          <small class="small text-gray">待确认</small>
        </div>
      </div>
      <div class="my_order">
        <div class="icon"></div>
        <small class="small text-gray">我的接单</small>
      </div>
    </div>

    <div class="wallet">
      <div class="wallet_header">
        <div class="header_info">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icongerenzhongxintubiao-zhuanqu_wodeqianbao" />
          </svg>

          <p class="larger bold ml-2">我的钱包</p>
        </div>
        <div class="header_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconchakangengduojiantou" />
          </svg>
        </div>
      </div>
      <div class="wallet_content">
        <div class="balance">
          <div class="x-large bold">
            <md-amount :value="balance" :duration="800" transition />
          </div>
          <small class="mt-1 smaller text-gray">账户余额(元)</small>
        </div>
        <div class="balance_actions"></div>
      </div>
    </div>

    <div class="cells">
      <div class="cell-item">
        <div class="item_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icongerenzhongxintubiao-zhuanqu_gerenziliao" />
          </svg>
        </div>
        <div class="item_content border-bottom-1px">
          <p>陪玩资料</p>
          <div class="content_icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchakangengduojiantou" />
            </svg>
          </div>
        </div>
      </div>

      <div class="cell-item">
        <div class="item_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icongerenzhongxintubiao_zhuanqu_fuwuguanli" />
          </svg>
        </div>
        <div class="item_content">
          <p>服务管理</p>
          <div class="content_icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchakangengduojiantou" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Amount, Switch } from "mand-mobile";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "account",
  components: {
    [Amount.name]: Amount,
    [Switch.name]: Switch
  },
  data() {
    return {
      processActive: false
    };
  },
  computed: {
    ...mapState("user", ["info", "playerApply"]),
    ...mapGetters("account", ["balance", "playerStatus"])
  },
  methods: {
    async playerStatusChange() {
      this.processActive = true;
      await this.openPlayer();
      this.processActive = false;
    },
    ...mapActions("account", [
      "orderPlayerList",
      "getAmountShow",
      "getPlayerStatus"
    ])
  },
  async created() {
    await this.getAmountShow();
    if (this.playerApply.playerStatus === 0) {
      await this.getPlayerStatus();
      await this.orderPlayerList();
    }
  }
};
</script>
<style lang="stylus" scoped>
#account {
  width: 750px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F7;

  .account_header {
    height: 180px;
    padding: 40px;
    background-image: linear-gradient(90deg, #A16AFF 0%, #9D5DFB 100%);
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .account_avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #fff;
    }

    .account_content {
      height: 100%;
      color: #fff;
      padding: 8px 32px;
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    svg.icon {
      width: 24px;
      height: 24px;
    }
  }

  .online_switch {
    background-color: #fff;
    margin: 24px 0;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;
  }

  .order {
    margin: 24px 0;
    padding: 24px 36px;
    height: 160px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    .icon {
      width: 48px;
      height: 48px;
    }

    small {
      margin-top: 16px;
    }

    .order_status {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;

      .order_item {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    .my_order {
      width: 120px;
      height: 120px;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 1px;
        background: #DCDCDC;
        height: 60%;
        top: 20%;
        left: 0;
      }
    }
  }

  .wallet {
    height: 220px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 16px;

    .wallet_header {
      flex: 2;
      display: flex;
      align-items: center;
      padding: 0;

      .header_info {
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;

        svg.icon {
          width: 45px;
          height: 45px;
        }
      }

      .header_icon {
        svg.icon {
          width: 24px;
          height: 24px;
        }
      }
    }

    .wallet_content {
      flex: 3;
      display: flex;

      .balance {
        flex: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .balance_actions {
        flex: 8;
      }
    }
  }

  .cells {
    margin-top: 24px;

    .cell-item {
      background-color: #fff;
      height: 100px;
      display: flex;
      align-items: center;

      .item_icon {
        padding: 16px;

        svg.icon {
          width: 45px;
          height: 45px;
        }
      }

      .item_content {
        flex: 1;
        display: flex;
        padding: 16px 16px 16px 0;
        height: 100%;
        box-sizing: border-box;
        align-items: center;

        p {
          flex: 1;
        }

        .content_icon {
          svg.icon {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>
