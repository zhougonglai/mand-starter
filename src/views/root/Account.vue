<template>
  <div id="account">
    <div class="account_header">
      <div class="account_avatar">
        <img class="avatar" :src="info.imageUrl" :alt="info.nickName" />
      </div>
      <div class="account_content">
        <div class="account_nick_name larger bold">{{ info.nickName }}</div>
        <div class="account_info">
          <div class="info_id small">ID:{{ info.memberNo }}</div>
        </div>
      </div>
      <div class="account_arrow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </div>
    </div>

    <div class="order">
      <div class="order_status">
        <div class="order_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daijiedan" />
          </svg>
          <div class="bage" />
          <small class="small text-gray">待接单</small>
        </div>
        <div class="order_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-servicing" />
          </svg>
          <div class="bage" />
          <small class="small text-gray">服务中</small>
        </div>
        <div class="order_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dingdan-shouhouzhong" />
          </svg>
          <div class="bage" />
          <small class="small text-gray">售后中</small>
        </div>
      </div>
      <div class="my_order">
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

    <div class="cells">
      <div class="cell-item">
        <div class="item_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qianbao" />
          </svg>
        </div>
        <div class="item-content border-bottom-1px">
          <p class="larger bold">我的钱包</p>
          <div class="content_icon">
            <small class="small text-gray">1元</small>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchakangengduojiantou" />
            </svg>
          </div>
        </div>
      </div>

      <div class="cell-item">
        <div class="item_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ziliao" />
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

      <div class="cell-item">
        <div class="item_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fuwu" />
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
import { Amount, Switch } from "mand-mobile";
import { mapActions, mapState } from "vuex";

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
    ...mapState("user", ["info"])
  },
  methods: {
    ...mapActions("user", ["getUserInfo"])
  },
  async created() {
    // this.getUserInfo();
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
