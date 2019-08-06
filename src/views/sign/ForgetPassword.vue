<template>
  <div id="forget_password">
    <form class="input-fiel">
      <div class="fiel-row">
        <div class="fiel-item area_code inline">
          <div class="code">+{{ areaCode.code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            type="tel"
            v-model="forgetInfo.phone"
            placeholder="请输入手机号"
            :maxlength="11"
          />
        </div>
      </div>

      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            type="text"
            v-model="forgetInfo.code"
            placeholder="请输入6位数验证码"
            :maxlength="6"
          />
          <md-button
            type="link"
            round
            size="small"
            class="button"
            :loging="forgetInfo.status"
            >获取短信验证码</md-button
          >
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
        <md-button type="primary" round>确认修改</md-button>
      </div>

      <div class="fiel-row justyfy-center">
        已有账号?
        <md-button type="link">立即登录></md-button>
      </div>
    </form>
  </div>
</template>
<script>
import { Icon, Button } from "mand-mobile";
export default {
  name: "forget-password",
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  data() {
    return {
      forgetInfo: {
        phone: "",
        code: "",
        status: false,
        password: ""
      },
      areaCode: {
        code: "86"
      },
      passwordStatus: false
    };
  }
};
</script>
<style lang="stylus" scoped>
#forget_password {
  height: 100vh;
  display: flex;
  padding: 10vw;
}
</style>
