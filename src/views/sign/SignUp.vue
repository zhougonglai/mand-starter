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
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            type="password"
            :value="signUp.password"
            placeholder="请输入登录密码"
          />
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            type="text"
            :value="signUp.invite"
            placeholder="请输入邀请码"
          />
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
      signUp: {
        phone: "",
        password: "",
        code: "",
        invite: ""
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
#sign_up {
  padding: 32px 0;
}
</style>
