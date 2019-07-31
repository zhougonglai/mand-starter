<template>
  <div id="sign_up">
    <form class="input-fiel">
      <div class="fiel-row">
        <div class="fiel-item area_code inline" @click="toggleAreaSelector">
          <div class="code">+{{ areaCode.code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            type="tel"
            :value="signUp.phone"
            @input="fielInput($event, 'phone')"
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
            placeholder="请输入6位数验证码"
            @input="fielInput($event, 'code')"
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
            @input="fielInput($event, 'password')"
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
        <div class="fiel-item fill">
          <input
            type="text"
            :value="signUp.invite"
            @input="fielInput($event, 'invite')"
            placeholder="输入邀请码(非必填)"
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
import { mapState, mapActions } from "vuex";

export default {
  name: "sign-up",
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Button.name]: Button
  },
  data() {
    return {
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
  },
  computed: {
    ...mapState("global", ["areaCode"])
  },
  methods: {
    fielInput(
      {
        target: { value }
      },
      target
    ) {
      this.signUp[target] = value;
    },
    ...mapActions("global", ["toggleAreaSelector"])
  }
};
</script>
<style lang="stylus" scoped>
#sign_up {
  padding: 32px 0;
}
</style>
