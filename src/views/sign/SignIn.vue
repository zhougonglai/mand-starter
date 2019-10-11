<template>
  <div id="sign_in">
    <form class="input-fiel">
      <div class="fiel-row" v-if="signIn.accountType">
        <div class="fiel-item fill">
          <input
            type="tel"
            ref="phone"
            name="phone"
            autocomplete="tel"
            :required="signIn.accountType"
            v-model.number.trim="signIn.phone"
            pattern="^[0-9]*$"
            placeholder="请输入手机号"
          />
        </div>
      </div>
      <div class="fiel-row" v-else>
        <div class="fiel-item fill">
          <input
            type="text"
            name="email"
            ref="emailOrAccount"
            autocomplete="email, phone"
            :required="!signIn.accountType"
            v-model.trim="signIn.emailOrAccount"
            placeholder="请输入邮箱/账号"
          />
        </div>
      </div>
      <div class="fiel-row">
        <div class="fiel-item fill">
          <input
            required
            name="password"
            ref="password"
            autocomplete="current-password"
            :type="passwordStatus ? 'text' : 'password'"
            v-model.trim="signIn.password"
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
        <div class="fill">
          <div class="line-normal larger primary">
            <p class="inline">
              {{ signIn.accountType ? "邮箱/账号登录" : "手机号登录" }}
            </p>
          </div>
        </div>
        <div class="fill justyfy-end flex">
          <div class="line-normal larger primary inline-flex">忘记密码?</div>
        </div>
      </div>
      <div class="small border-top-1px border-bottom-1px py-2 mt-2">
        <md-agree v-model="signIn.wechat">绑定微信账号</md-agree>
      </div>
      <div class="fiel-row mt-5">
        <md-button
          round
          type="primary"
          :loading="waiting"
          :inactive="waiting"
          @click="login"
          >立即登录</md-button
        >
      </div>
    </form>
  </div>
</template>
<script>
import { Agree, Icon, InputItem, Button } from "mand-mobile";
import { mapActions } from "vuex";
import { isWx } from "@/utils";

export default {
  name: "sign-in",
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Agree.name]: Agree,
    [Button.name]: Button
  },
  data() {
    return {
      isWx: isWx(),
      signIn: {
        wechat: false,
        // { true = '手机', false = 'email'}
        accountType: true,
        phone: "",
        emailOrAccount: "",
        password: ""
      },
      passwordStatus: false,
      waiting: false
    };
  },
  methods: {
    async login() {
      const status = await this.getUserInfo(this.signIn);
      if (status) {
        this.$router.push({ name: "account" });
      }
    },
    ...mapActions("user", ["getUserInfo"])
  }
};
</script>
<style lang="stylus" scoped>
#sign_in {
  padding: 40px 0;
}
</style>
