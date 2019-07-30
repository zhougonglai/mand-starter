<template>
  <div id="sign_up">
    <form class="input-fiel">
      <div class="fiel-row">
        <div class="fiel-item area_code inline">
          <div class="code">+{{ area_code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            type="tel"
            :value="signUp.phone"
            placeholder="请输入手机号"
            :maxlength="11"
          />
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            type="text"
            :value="signUp.code"
            placeholder="请输入验证码"
            :maxlength="6"
          />
          <md-button
            type="primary"
            round
            size="small"
            class="button"
            :loging="sendCode.status"
            >发送验证码</md-button
          >
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            :type="passwordStatus ? 'text' : 'password'"
            :value="signUp.password"
            placeholder="请输入登录密码"
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
            :value="signUp.invite"
            placeholder="请输入邀请码"
          />
          <!-- <md-input-item
           type="digit"
           placeholder="请输入邀请码"
           clearable /> -->
        </div>
      </div>
      <div class="fiel-row">
        <md-button type="primary" round>立即注册</md-button>
      </div>
    </form>
  </div>
</template>
<script>
import { Icon, InputItem, Button } from "mand-mobile";

export default {
  name: "sign-up",
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Button.name]: Button
  },
  data() {
    return {
      area_code: 86,
      sendCode: {
        status: false,
        time: 60
      },
      signUp: {
        phone: "",
        password: "",
        code: "",
        invite: ""
      },
      passwordStatus: false
    };
  }
};
</script>
<style lang="stylus" scoped>
#sign_up {
  padding: 32px 0;
}
</style>
