<template>
  <div id="forget_password">
    <div class="app-header">
      <div class="app-header-title">找回密码</div>
    </div>
    <form class="input-fiel">
      <div class="fiel-row">
        <div class="fiel-item area_code inline" @click="changeAreaCode">
          <div class="code">+{{ areaCode.active.code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            required
            ref="phone"
            type="tel"
            v-model.number.trim.lazy="forgetInfo.phone"
            placeholder="请输入手机号"
            :maxlength="areaCode.active.code === 86 && 11"
          />
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            required
            ref="smsCode"
            type="text"
            v-model.trim="forgetInfo.smsCode"
            placeholder="请输入6位数验证码"
            minlength="6"
            maxlength="6"
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
            required
            ref="password"
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
        <div class="primary ml-half" @click="toLogin">立即登录></div>
      </div>
    </form>
    <div v-if="areaCode.status" class="full-screen">
      <md-icon name="close" class="close" @click.native="areaCodeClose" />
      <md-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        @scroll="$_onScroll"
      >
        <div
          v-for="group in areaCode.list"
          :key="group.name"
          class="scroll-view-category"
        >
          <p class="scroll-view-category-title">{{ group.name }}</p>
          <div
            v-for="country in group.items"
            :key="country.code"
            :class="{
              active: areaCode.active && country.code === areaCode.active.code
            }"
            @click="setCountry(country)"
            class="scroll-view-list"
          >
            <img class="item-icon" :src="country.ico" :alt="country.name" />
            <p class="scroll-view-item">{{ country.name }}</p>
          </div>
        </div>
      </md-scroll-view>
      <p v-if="activeBlockIndex > 0" class="scroll-view-striky-title">
        {{ areaCode.list[activeBlockIndex - 1].name }}
      </p>
    </div>
    <md-captcha
      v-model="imgCoder.status"
      title="请输入图形验证码"
      system
      :auto-countdown="false"
      :count="0"
      @submit="imgCoderVerify"
    >
      <div class="fill flex align-center justyfy-center">
        <img
          @click="imgCodeRefrash"
          :src="verification.dataSource"
          alt="图形验证码"
        />
        <md-icon @click="imgCodeRefrash" name="refresh" class="ml-2" />
      </div>
    </md-captcha>
  </div>
</template>
<script>
import {
  Icon,
  Button,
  Selector,
  ScrollView,
  Toast,
  Captcha
} from "mand-mobile";
import { mapState, mapActions } from "vuex";

export default {
  name: "forget-password",
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Captcha.name]: Captcha,
    [ScrollView.name]: ScrollView,
    [Selector.name]: Selector
  },
  data() {
    return {
      forgetInfo: {
        imgCode: "",
        phone: "",
        smsCode: "",
        password: ""
      },
      scrollY: 0,
      dimensions: [],
      imgCoder: {
        status: false
      },
      passwordStatus: false
    };
  },
  computed: {
    activeBlockIndex() {
      let activeIndex = -1;
      this.dimensions.forEach((dimension, index) => {
        if (this.scrollY >= dimension[0] && this.scrollY <= dimension[1]) {
          activeIndex = index + 1;
        }
      });
      return activeIndex;
    },
    ...mapState("global", ["areaCode"]),
    ...mapState("user", ["verification"])
  },
  methods: {
    $_onScroll({ scrollTop }) {
      this.scrollY = scrollTop;
    },
    $_initScrollBlock() {
      const blocks = this.$el.querySelectorAll(".scroll-view-category");
      let offset = 0;
      Array.prototype.slice.call(blocks).forEach((block, index) => {
        const innerHeight = block.clientHeight;
        this.$set(this.dimensions, index, [offset, offset + innerHeight]);
        offset += innerHeight;
      });
    },
    changeAreaCode() {
      this.areaCode.status = true;
      this.$nextTick(() => {
        this.$_initScrollBlock();
      });
    },
    areaCodeClose() {
      this.areaCode.status = false;
    },
    imgCodeRefrash() {
      this.imgCode(2);
    },
    setCountry(country) {
      this.areaCode.active = country;
      this.areaCode.status = false;
    },
    toLogin() {
      this.$router.push({ name: "sign_in" });
    },
    async sendverifiCode() {
      if (this.forgetInfo.phone) {
        const code = await this.checkImageShow({ ...this.forgetInfo, type: 2 });
        if (code === 0) {
          await this.imgCode(2);
          this.imgCoder.status = true;
        } else if (code === 1) {
          await this.phoneAuthenticateNoLogin({ ...this.forgetInfo, type: 3 });
        }
      }
    },
    async imgCoderVerify(code) {
      if (code && code.length === 4) {
        this.forgetInfo.imgCode = code;
        await this.phoneAuthenticateNoLogin({ ...this.forgetInfo, type: 3 });
        this.imgCoder.status = false;
      }
    },
    async confirmChange() {
      if (!this.$refs.phone.validity.valid) {
        if (this.$refs.phone.validity.tooShort) {
          Toast.info("手机号太短");
          return;
        } else if (this.$refs.phone.validity.tooLong) {
          Toast.info("手机号太长");
          return;
        } else if (this.$refs.phone.validity.valueMissing) {
          Toast.info("手机号必填");
          return;
        }
      } else if (!this.$refs.password.validity.valid) {
        if (this.$refs.password.validity.tooShort) {
          Toast.info("密码太短");
          return;
        } else if (this.$refs.password.validity.tooLong) {
          Toast.info("密码太长");
          return;
        } else if (this.$refs.password.validity.valueMissing) {
          Toast.info("密码必填");
          return;
        }
      } else if (!this.$refs.smsCode.validity.valid) {
        if (
          this.$refs.smsCode.validity.tooShort ||
          this.$refs.smsCode.validity.tooLong
        ) {
          Toast.info("请输入完整的验证码");
          return;
        } else if (this.$refs.password.validity.valueMissing) {
          Toast.info("请输入验证码");
          return;
        }
      }
      const code = await this.findPwd(this.forgetInfo);
      if (code === 0) {
        this.$router.push({ name: "sign_in", query: this.forgetInfo });
        // await this.login({
        //   ...this.forgetInfo,
        //   accountType: true
        // });
        // this.$router.push({ name: "basic_info" });
      }
    },
    ...mapActions("user", [
      "login",
      "imgCode",
      "phoneAuthenticateNoLogin",
      "checkImageShow",
      "findPwd"
    ])
  },
  mounted() {
    this.$_initScrollBlock();
  }
};
</script>
<style lang="stylus" scoped>
#forget_password {
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;

  .full-screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;

    .close {
      position: absolute;
      top: 25px;
      right: 25px;
      z-index: 999;
      padding: 25px;
      background-color: #909399;
      color: #fff;
      border-radius: 50%;
    }

    .scroll-view-striky-title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .scroll-view-category-title, .scroll-view-striky-title {
      padding: 10px 20px;
      font-size: 32px;
      background-color: #f0f0f0;
    }

    .scroll-view-list {
      display: flex;
      align-items: center;
      border-bottom: 0.5px solid #efefef;

      &.active {
        color: color-primary;
      }

      .item-icon {
        padding: 30px;
      }
    }

    .scroll-view-item {
      padding-left: 30px;
      font-size: 32px;
      flex: 1;
    }
  }

  form.input-fiel {
    padding: 0 10vw;
    box-sizing: border-box;
  }

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
