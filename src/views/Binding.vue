<template>
  <div id="binding">
    <div class="logo-top">
      <img
        src="@/assets/logo@2x.png"
        srcset="@/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x"
        alt="nn约玩"
      />
      <h1 class="logo-title">欢迎入驻NN约玩</h1>
    </div>
    <div class="info-board">
      <div class="info">
        <p class="label">
          当前登录账户尚未绑定NN约玩账号，请选择一种方式完成操作
        </p>
      </div>
      <div class="info-actions">
        <md-button type="primary" round @click="gotoSignUp" :loading="false"
          >注册新账号</md-button
        >
        <md-button type="link" @click="gotoSignIn" :loading="false"
          >绑定已有账号</md-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from "mand-mobile";
import { mapActions } from "vuex";
import { isWx, wxConfig } from "@/utils";

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
    },
    ...mapActions("config", ["getWxConfig"])
  },
  mounted() {
    if (isWx()) {
      this.getWxConfig().then(data => {
        if (data) {
          wxConfig(data);
          console.log("nnplayer_version: ", process.env.VUE_APP_VERSION);
          window.wx.ready(() => {
            window.wx.checkJsApi({
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData"
              ],
              success: ({
                checkResult: {
                  updateAppMessageShareData,
                  updateTimelineShareData
                }
                // errMsg
              }) => {
                if (updateAppMessageShareData) {
                  window.wx.updateAppMessageShareData({
                    title: "分享给朋友/分享到QQ",
                    desc: "描述描述描述",
                    link: "http://ywm.nnn.com/binding",
                    imgUrl: "http://139.224.119.40/img/head-logo.png"
                  });
                }
                if (updateTimelineShareData) {
                  window.wx.updateTimelineShareData({
                    title: "分享到朋友圈/分享到QQ空间",
                    link: "http://ywm.nnn.com/binding",
                    imgUrl: "http://139.224.119.40/img/head-logo.png"
                  });
                }
              }
            });
          });
        } else {
          alert("微信配置获取失败");
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
#binding {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 8vh;
  box-sizing: border-box;

  // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  .logo-top {
    img.logo {
      width: 343px;
    }

    h1.logo-title {
      margin-top: 28px;
      text-align: center;
      font-size: 40px;
      color: #606166;
      line-height: 44px;
      font-family: PingFangSC-Medium;
    }
  }

  .info-board {
    width: 80vw;
    margin-top: 160px;

    .info {
      .label {
        font-size: 28px;
        color: #606166;
        letter-spacing: 0;
        text-align: left;
        line-height: 52px;
        text-align: center;
      }
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
