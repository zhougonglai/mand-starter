<template>
  <div id="sign_in">
    <form class="input-fiel">
      <div class="fiel-row" v-if="signIn.accountType">
        <div class="fiel-item area_code inline" @click="toggleAreaSelector">
          <div class="code">+{{ areaCode.item.code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            type="tel"
            name="phone"
            autocomplete="tel"
            :required="signIn.accountType"
            v-model.lazy.number.trim="signIn.phone"
            placeholder="请输入手机号"
            :maxlength="11"
          />
        </div>
      </div>
      <div class="fiel-row" v-else>
        <div class="fiel-item fill">
          <input
            type="text"
            name="email"
            autocomplete="email"
            :required="!signIn.accountType"
            v-model.lazy.trim="signIn.emailOrAccount"
            placeholder="请输入邮箱/账号"
          />
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            name="password"
            autocomplete="current-password"
            :type="passwordStatus ? 'text' : 'password'"
            v-model.lazy="signIn.password"
            placeholder="请输入登录密码"
            :minlength="6"
            :maxlength="18"
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
          <div class="line-normal larger primary">
            {{ signIn.accountType ? "邮箱/账号登录" : "手机号登录" }}
          </div>
          <div class="line-normal gray mt-1">可使用NN账户(原雷神账号)登录</div>
        </div>
        <div class="right align-center">
          <div class="line-normal larger primary" @click="forgetPassword">
            忘记密码?
          </div>
        </div>
      </div>
      <div class="fiel-row mt-5">
        <md-button
          type="primary"
          round
          @click="signInSubmit"
          :inactive="waiting"
          :loading="waiting"
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
        accountType: true,
        phone: "",
        emailOrAccount: "",
        password: ""
      },
      passwordStatus: false,
      waiting: false
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
    forgetPassword() {
      this.$router.push({ name: "forget_password" });
    },
    async signInSubmit() {
      this.waiting = true;
      const code = await this.login(this.signIn);
      this.waiting = false;
      if (!code) {
        this.gotoBasicInfo();
      }
    },
    ...mapActions("global", ["toggleAreaSelector"]),
    ...mapActions("user", ["login"])
  }
};
</script>
<style lang="stylus" scoped>
#sign_in {
  padding: 40px 0;
}
</style>
