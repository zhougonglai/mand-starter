<template>
  <div id="account">
    <div class="account_header">
      <div class="account_avatar">
        <img class="avatar" :src="info.imageUrl" :alt="info.nickName" />
      </div>
      <div class="account_content">
        <div class="account_nick_name larger bold">
          {{ info.nickName }}
          <small class="x-small text-white player-status ml-2">
            <div
              class="status-bage"
              :class="{
                online: playerStatus === 0,
                offline: playerStatus === 1,
                serving: playerStatus === 2
              }"
            ></div>
            {{
              playerStatus ? (playerStatus === 1 ? "离线" : "服务中") : "在线"
            }}
          </small>
        </div>
        <div class="account_info">
          <div class="info_id small">ID:{{ info.memberNo }}</div>
          <div class="info_invite small">邀请码:{{ info.memberNo }}</div>
          <div class="tag" @click="copyMenberNo">复制</div>
        </div>
      </div>
      <div
        class="account_arrow"
        @click="$router.push({ name: 'account_details' })"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </div>
    </div>

    <div
      class="online_switch"
      v-if="playerApply.playerStatus === 0 && playerStatus !== 2"
    >
      <p
        class="larger bold fill"
        v-text="playerStatusTransform ? '关闭接单' : '开启接单'"
      />
      <md-switch
        :value="playerStatusTransform"
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
          <div
            class="bage"
            v-if="ordersStatus.wait"
            v-text="ordersStatus.wait"
          />
          <small class="small text-gray">待接单</small>
        </div>
        <div class="order_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconic_service" />
          </svg>
          <div
            class="bage"
            v-if="ordersStatus.online"
            v-text="ordersStatus.online"
          />
          <small class="small text-gray">服务中</small>
        </div>
        <div class="order_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconic_after-sale" />
          </svg>
          <div
            class="bage"
            v-if="ordersStatus.afterSale"
            v-text="ordersStatus.afterSale"
          />
          <small class="small text-gray">售后中</small>
        </div>
      </div>
      <div class="my_order" @click="$router.push({ name: 'order_management' })">
        <img
          src="@/assets/images/ic_my-order@2x.png"
          srcset="
            @/assets/images/ic_my-order@2x.png 2x,
            @/assets/images/ic_my-order@3x.png 3x
          "
          alt="我的接单"
        />
        <small class="small text-gray">我的接单</small>
      </div>
    </div>

    <!-- <div class="wallet">
      <div class="wallet_header">
        <div class="header_info" @click="$router.push({ name: 'wallet' })">
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
    </div>-->

    <div class="cells">
      <div class="cell-item" @click="$router.push({ name: 'wallet' })">
        <div class="item_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icongerenzhongxintubiao-zhuanqu_wodeqianbao" />
          </svg>
        </div>
        <div class="item-content border-bottom-1px">
          <p class="larger bold">我的钱包</p>
          <div class="content_icon">
            <small class="small text-gray">
              <md-amount :value="balance" :duration="800" transition />元
            </small>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchakangengduojiantou" />
            </svg>
          </div>
        </div>
      </div>

      <div class="cell-item">
        <div class="item_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icongerenzhongxintubiao-zhuanqu_gerenziliao" />
          </svg>
        </div>
        <div class="item-content border-bottom-1px">
          <p class="larger bold">陪玩资料</p>
          <div class="content_icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchakangengduojiantou" />
            </svg>
          </div>
        </div>
      </div>

      <div class="cell-item" @click="$router.push({ name: 'servicemanage' })">
        <div class="item_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icongerenzhongxintubiao_zhuanqu_fuwuguanli" />
          </svg>
        </div>
        <div class="item-content">
          <p class="larger bold">服务管理</p>
          <div class="content_icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchakangengduojiantou" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <input
      ref="copyTarget"
      type="text"
      readonly
      :value="info.memberNo"
      style="visibility: hidden;"
    />
  </div>
</template>
<script>
import { Amount, Switch, Toast } from "mand-mobile";
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
    ordersStatus() {
      if (this.orders.list.length) {
        return {
          wait: this.orders.list.filter(({ status }) => status === 23).length,
          online: this.orders.list.filter(({ status }) => status === 26).length,
          afterSale: this.orders.list.filter(({ status }) => status === 30)
            .length
        };
      } else {
        return {
          wait: 0,
          online: 0,
          afterSale: 0
        };
      }
    },
    ...mapState("user", ["info", "playerApply"]),
    ...mapState("account", ["orders", "playerStatus"]),
    ...mapGetters("account", ["balance", "playerStatusTransform"])
  },
  methods: {
    copyMenberNo() {
      const input = document.createElement("input");
      input.setAttribute("readonly", "readonly");
      input.setAttribute("value", this.info.memberNo);
      document.body.appendChild(input);
      input.setSelectionRange(0, this.info.memberNo.length);
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        Toast.succeed("复制成功");
      }
      document.body.removeChild(input);
    },
    async playerStatusChange() {
      this.processActive = true;
      await this.openPlayer();
      this.processActive = false;
    },
    ...mapActions("account", [
      "openPlayer",
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
    background-image: url('../../assets/images/bg_me_top@2x.png');
    background-position: center;
    background-size: contain;
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

      .account_nick_name {
        height: fit-content;
        display: flex;
        align-items: center;
      }

      .account_info {
        height: fit-content;
        display: flex;
        align-items: center;

        .info_invite {
          position: relative;
          padding-left: 16px;
          margin-left: 16px;
          margin-right: 16px;

          &::before {
            content: '';
            position: absolute;
            width: 1px;
            background: #DCDCDC;
            height: 80%;
            top: 10%;
            opacity: 0.2;
            left: 0;
          }
        }
      }
    }

    .account_arrow {
      height: 100%;
      min-width: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
        position: relative;

        .bage {
          position: absolute;
          top: 1px;
          right: 25%;
          width: 32px;
          height: 32px;
          font-size: 24px;
          line-height: 32px;
          text-align: center;
          border-radius: 50%;
          background-color: color-text-error;
          color: white;
        }
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
  }
}
</style>
