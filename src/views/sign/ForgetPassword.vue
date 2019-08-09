<template>
  <div id="forget_password">
    <form class="input-fiel">
      <div class="fiel-row">
        <div class="fiel-item area_code inline" @click="toggleAreaSelector">
          <div class="code">+{{ areaCode.item.code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            type="tel"
            v-model.lazy.trim="forgetInfo.phone"
            placeholder="请输入手机号"
            :maxlength="11"
          />
        </div>
      </div>

      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            type="tel"
            v-model.trim="forgetInfo.smsCode"
            placeholder="请输入6位数验证码"
            :maxlength="6"
          />
          <md-button
            round
            type="link"
            size="small"
            class="button"
            :loging="verification.status"
            :inactive="verification.status"
            @click="sendverifiCode"
          >
            {{
              verification.status
                ? `(${verification.time}s)`
                : verification.label
            }}
          </md-button>
        </div>
      </div>

      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            :type="passwordStatus ? 'text' : 'password'"
            v-model="forgetInfo.password"
            placeholder="请输入6-18位的新密码，不含空格"
          />
          <svg
            class="icon"
            aria-hidden="true"
            @click="passwordStatus = !passwordStatus"
          >
            <use
              :xlink:href="passwordStatus ? '#icon-eye' : '#icon-eye-slash'"
            />
          </svg>
        </div>
      </div>

      <div class="fiel-row">
        <md-button type="primary" round @click="confirmChange"
          >确认修改</md-button
        >
      </div>

      <div class="fiel-row justyfy-center mt-2 larger">
        已有账号?
        <!-- <md-button type="link" @click="toLogin"></md-button> -->
        <div class="primary ml-half" @click="toLogin">立即登录></div>
      </div>
    </form>

    <md-selector
      v-model="areaCode.status"
      title="选择手机区号"
      :default-value="86"
      :data="areaCode.list"
      @choose="changeAreaCode"
      max-height="calc(100vh - 1.2rem)"
    >
      <template slot-scope="{ option }">
        <div
          class="selector-item-body"
          :class="{ selected: option.code === areaCode.item.code }"
        >
          <div class="selector-item-left">
            <span class="holder" v-text="option.group" />
          </div>
          <div class="selector-item-content">
            <p class="selector-item-title">
              <small class="gray">({{ option.iso_code }})</small>
              <span v-text="option.name" />
            </p>
            <p class="selector-item-brief" v-text="option.code" />
          </div>
          <div class="selector-item-right flex justyfy-center align-center">
            <img :src="option.ico" class="icon-ico" :alt="option.name" />
          </div>
        </div>
      </template>
    </md-selector>
  </div>
</template>
<script>
import { Icon, Button, Selector } from "mand-mobile";
import { mapState, mapActions } from "vuex";

export default {
  name: "forget-password",
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Selector.name]: Selector
  },
  data() {
    return {
      forgetInfo: {
        phone: "",
        smsCode: "",
        password: ""
      },
      passwordStatus: false
    };
  },
  computed: {
    ...mapState("global", ["areaCode"]),
    ...mapState("user", ["verification"])
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "sign_in" });
    },
    async sendverifiCode() {
      if (this.forgetInfo.phone) {
        const code = await this.checkImageShow({ ...this.forgetInfo, type: 2 });
        if (code === 0) {
          await this.imgCode(2);
        } else if (code === 1) {
          await this.phoneAuthenticateNoLogin({ ...this.forgetInfo, type: 3 });
        }
      }
    },
    async confirmChange() {
      const code = await this.findPwd(this.forgetInfo);
      if (code === 0) {
        await this.login({
          ...this.forgetInfo,
          accountType: true
        });
        this.$router.push({ name: "basic_info" });
      }
    },
    ...mapActions("global", ["changeAreaCode", "toggleAreaSelector"]),
    ...mapActions("user", [
      "login",
      "phoneAuthenticateNoLogin",
      "checkImageShow",
      "findPwd"
    ])
  }
};
</script>
<style lang="stylus" scoped>
#forget_password {
  height: 100vh;
  display: flex;
  padding: 10vw;
  box-sizing: border-box;

  .selector-item-body {
    display: flex;
    align-items: center;

    &.selected {
      .selector-item-content {
        color: color-primary;
      }
    }

    &.disabled {
      opacity: 0.3;
    }

    .selector-item-left {
      flex-shrink: 0;
      margin-right: 32px;

      .holder {
        display: block;
        width: 88px;
        height: 88px;
        border-radius: 44px;
        background-color: #e6e6e6;
        font-size: 32px;
        font-weight: 500;
        color: color-primary;
        text-align: center;
        line-height: 88px;
      }
    }

    .selector-item-right {
      flex-shrink: 0;
      width: 88px;
      height: 88px;

      .icon-ico {
      }
    }

    .selector-item-content {
      flex: 1;
      color: #111a34;
      font-size: 32px;
      line-height: 1.2;

      .selector-item-title {
        line-height: 1.2;
      }

      .selector-item-brief {
        color: #858b9c;
        font-size: 24px;
        line-height: 1.4;
        margin-top: 8px;
      }
    }
  }
}
</style>
