<template>
  <div id="sign_in">
    <form class="input-fiel">
      <div class="fiel-row">
        <div class="fiel-item area_code inline" @click="toggleAreaSelector">
          <div class="code">+{{ areaCode.code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            type="tel"
            v-if="signIn.accountType"
            v-model="signIn.phone"
            placeholder="请输入手机号"
            :maxlength="11"
          />
          <input
            type="email"
            v-else
            v-model="signIn.email"
            placeholder="请输入邮箱/账号"
          />
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            :type="passwordStatus ? 'text' : 'password'"
            v-model="signIn.password"
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
        <div class="fill" @click="changeAccountType">
          <div class="font-normal">邮箱/账号登录</div>
          <div class="font-normal gray">可使用NN账户(原雷神账号)登录</div>
        </div>
        <div class="right center">
          <md-button type="link" size="small" inline>忘记密码?</md-button>
        </div>
      </div>
      <div class="fiel-row">
        <md-button type="primary" round @click="gotoBasicInfo"
          >立即登录</md-button
        >
      </div>
    </form>
  </div>
</template>
<script>
import { Icon, InputItem, Button } from "mand-mobile";
import { mapState, mapActions } from "vuex";

export default {
  name: "sign-in",
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Button.name]: Button
  },
  data() {
    return {
      signIn: {
        accountType: false,
        phone: "",
        email: "",
        password: ""
      },
      passwordStatus: false
    };
  },
  computed: {
    ...mapState("global", ["areaCode"])
  },
  methods: {
    gotoBasicInfo() {
      this.$router.push({ name: "basic_info" });
    },
    changeAccountType() {
      this.signIn.accountType = !this.signIn.accountType;
    },
    ...mapActions("global", ["toggleAreaSelector"])
  }
};
</script>
<style lang="stylus" scoped>
#sign_in {
  padding: 32px 0;
}
</style>
