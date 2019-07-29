<template>
  <div id="sign_in">
    <form class="input-fiel">
      <div class="fiel-row">
        <div class="fiel-item area_code inline">
          <div class="code">+{{ area_code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            type="tel"
            :value="signIn.phone"
            placeholder="请输入手机号"
            :maxlength="11"
          />
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            type="password"
            :value="signIn.password"
            placeholder="请输入登录密码"
          />
        </div>
      </div>
      <div class="fiel-row">
        <md-button type="primary" round>立即登录</md-button>
      </div>
    </form>
  </div>
</template>
<script>
import { Icon, InputItem, Button } from "mand-mobile";

export default {
  name: "sign-in",
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Button.name]: Button
  },
  data() {
    return {
      area_code: 86,
      signIn: {
        phone: "",
        password: ""
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
#sign_in {
  padding: 32px 0;
}
</style>
