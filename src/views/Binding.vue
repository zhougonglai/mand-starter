<template>
  <div id="binding">
    <div class="info-board">
      <div class="info">
        <p class="label">
          当前登录账户尚未绑定NN约玩账号，请选择一种方式完成操作
        </p>
      </div>
      <div class="info-actions">
        <md-button type="primary" round @click="gotoSignUp"
          >注册新账号</md-button
        >
        <md-button type="link" @click="gotoSignIn">绑定已有账号</md-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from "mand-mobile";
export default {
  name: "binding",
  components: {
    [Button.name]: Button
  },
  methods: {
    gotoSignUp() {
      this.$router.push("/sign/up");
    },
    gotoSignIn() {
      this.$router.push("/sign/in");
    }
  }
};
</script>
<style lang="stylus" scoped>
#binding {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .info-board {
    width: 80vw;
    transform: translateY(-10vh);

    .info {
      font-size: 36px;
      color: #606166;
      letter-spacing: 0;
      text-align: left;
      line-height: 52px;
    }
  }

  .info-actions {
    margin-top: 100px;

    button.md-button {
      font-size: 32px;

      & + .md-button {
        margin-top: 16px;
      }

      &.link {
        width: 100%;
        height: 80px;
        font-weight: bold;
      }
    }
  }
}
</style>
