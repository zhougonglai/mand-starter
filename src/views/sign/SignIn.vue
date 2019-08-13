<template>
  <div id="sign_in">
    <form class="input-fiel">
      <div class="fiel-row" v-if="signIn.accountType">
        <div class="fiel-item area_code inline" @click="toggleAreaSelector">
          <div class="code">+{{ areaCode.active.code }}</div>
          <md-icon name="arrow-down" />
        </div>
        <div class="fiel-item fill">
          <input
            type="tel"
            ref="phone"
            name="phone"
            autocomplete="tel"
            :required="signIn.accountType"
            v-model.number.trim="signIn.phone"
            placeholder="请输入手机号"
            minlength="6"
            maxlength="11"
          />
        </div>
      </div>
      <div class="fiel-row" v-else>
        <div class="fiel-item fill">
          <input
            type="text"
            name="email"
            ref="email"
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
            ref="password"
            autocomplete="current-password"
            :type="passwordStatus ? 'text' : 'password'"
            v-model.lazy="signIn.password"
            required
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
          <div class="line-normal gray mt-1">可使用雷神账号登录</div>
        </div>
        <div class="right align-center">
          <div class="line-normal larger primary" @click="forgetPassword">
            忘记密码?
          </div>
        </div>
      </div>
      <div class="border-top-1px border-bottom-1px py-2 mt-2">
        <md-agree v-model="signIn.wechat">绑定微信账号</md-agree>
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
import { Agree, Icon, InputItem, Button, Toast } from "mand-mobile";
import { mapState, mapActions } from "vuex";

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
      if (this.signIn.accountType) {
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
        }
      } else {
        if (!this.$refs.emailOrAccount.validity.valid) {
          if (this.$refs.emailOrAccount.validity.tooShort) {
            Toast.info("邮箱太短");
            return;
          } else if (this.$refs.emailOrAccount.validity.tooLong) {
            Toast.info("邮箱太长");
            return;
          } else if (this.$refs.emailOrAccount.validity.valueMissing) {
            Toast.info("邮箱必填");
            return;
          } else if (this.$refs.emailOrAccount.validity.typeMismatch) {
            Toast.info("请填写邮箱");
            return;
          }
        }
      }
      if (!this.$refs.password.validity.valid) {
        if (this.$refs.password.validity.tooShort) {
          Toast.info("账号或密码错误");
          return;
        } else if (this.$refs.password.validity.tooLong) {
          Toast.info("密码太长");
          return;
        } else if (this.$refs.password.validity.valueMissing) {
          Toast.info("密码必填");
          return;
        }
      }
      this.waiting = true;
      const code = await this.login(this.signIn);
      this.waiting = false;
      if (!code) {
        const {
          data: { playerDetailsStatus }
        } = await this.playerStatus();
        if (playerDetailsStatus !== 3) {
          await this.playerInfoStatus();
        }
        this.$router.push({
          name: playerDetailsStatus === 3 ? "basic_info" : "result_page"
        });
      }
    },
    ...mapActions("global", ["toggleAreaSelector"]),
    ...mapActions("user", [
      "login",
      "playerStatus",
      "playerInfoStatus",
      "playerGameApply"
    ])
  }
};
</script>
<style lang="stylus" scoped>
#sign_in {
  padding: 40px 0;
}
</style>
