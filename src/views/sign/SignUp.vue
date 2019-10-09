<template>
  <div id="sign_up">
    <form class="input-fiel">
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            required
            type="tel"
            name="tel"
            ref="phone"
            autocomplete="tel"
            v-model.number.trim="signUp.phone"
            pattern="^[0-9]*$"
            placeholder="请输入手机号"
          />
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            required
            type="tel"
            ref="smsCode"
            autocomplete="smscode"
            v-model.trim="signUp.smsCode"
            placeholder="请输入6位数验证码"
            maxlength="6"
          />
          <md-button round type="link" size="small" class="button"
            >发送验证码</md-button
          >
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            required
            minlength="6"
            maxlength="18"
            ref="password"
            name="password"
            placeholder="请输入6-18位的新密码，不含空格"
            autocomplete="new-password"
            :type="passwordStatus ? 'text' : 'password'"
            v-model.trim="signUp.password"
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
        <div class="fiel-item fill">
          <input
            type="text"
            v-model.trim="signUp.invitationCode"
            placeholder="输入邀请码(非必填)"
          />
        </div>
      </div>
      <div class="fiel-row between align-center mt-2">
        <p class="line-normal medium gray">
          注册即代表同意
          <span @click="protocol = !protocol">《用户协议》</span>
        </p>
      </div>
      <div class="fiel-row mt-3">
        <md-button type="primary" round :loading="waiting" :inactive="waiting"
          >立即注册</md-button
        >
      </div>
      <div class="fiel-row justyfy-center mt-2 medium">
        已有账号?
        <div class="primary ml-half">立即登录></div>
      </div>
    </form>
    <md-landscape v-model="protocol" full-screen>
      <h1 class="text-center">用户协议</h1>
    </md-landscape>
  </div>
</template>
<script>
import { Icon, InputItem, Button, Landscape, Dialog, Field } from "mand-mobile";

export default {
  name: "sign-up",
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Button.name]: Button,
    [Landscape.name]: Landscape,
    [Dialog.name]: Dialog,
    [Field.name]: Field
  },
  data() {
    return {
      protocol: false,
      waiting: false,
      signUp: {
        phone: "",
        password: "",
        smsCode: "",
        imgCode: "",
        invitationCode: ""
      },
      imgCoder: {
        status: false
      },
      passwordStatus: false
    };
  },
  methods: {
    gotoBasicInfo() {
      this.$router.push({ name: "basic_info" });
    },
    toLogin() {
      this.$router.push({ name: "sign_in" });
    },
    forgetPassword() {
      this.$router.push({ name: "forget_password" });
    }
  }
};
</script>
<style lang="stylus" scoped>
#sign_up {
  padding: 40px 0;

  >>> .md-landscape-content {
    padding: 50px;

    ol {
      margin-top: 16px;

      li {
        text-indent: 50px;
        margin-top: 8px;
        line-height: normal;

        ol {
          li {
            text-indent: 100px;
          }
        }
      }
    }

    p {
      text-indent: 50px;
      line-height: normal;
      margin-top: 16px;
    }

    h1 {
      font-size: x-large;
      line-height: normal;
      margin-top: 16px;
    }

    h2 {
      font-size: large;
      line-height: normal;
      margin-top: 16px;
    }
  }
}
</style>
