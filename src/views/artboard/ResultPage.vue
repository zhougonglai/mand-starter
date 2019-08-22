<template>
  <div id="result_page">
    <div class="result-image">
      <img
        :src="
          'playerStatus' in playerStatus
            ? img[playerStatus.playerStatus]
            : require('@/assets/images/success.svg')
        "
      />
    </div>
    <div class="result-title">
      {{
        "playerStatus" in playerStatus
          ? text[playerStatus.playerStatus]
          : "提交成功"
      }}
    </div>
    <div class="result-subtitle">
      <template v-if="playerStatus.playerStatus === 0">
        <div>恭喜您成功入驻NN约玩平台，</div>
        <div>快去NN约玩官方网站开启接单吧！</div>
        <div>官网：yuewan.nn.com</div>
      </template>
      <template v-if="playerStatus.playerStatus === 1">
        <div>{{ reasons }}</div>
      </template>
      <template v-if="playerStatus.playerStatus === 2">
        <div>审核结果将在1-3个工作日通知到您~</div>
      </template>
    </div>
    <div
      class="result-actions"
      v-if="playerStatus.playerStatus === 1 && reasons"
    >
      <md-button type="primary" round @click="goBasicInfo">修改信息</md-button>
    </div>
  </div>
</template>
<script>
import { Button, Toast } from "mand-mobile";
import { isWx, wxConfig } from "@/utils";
import { mapState, mapActions } from "vuex";
import device from "current-device";

export default {
  name: "result-page",
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      img: [
        require("@/assets/images/success.svg"),
        require("@/assets/images/fail.svg"),
        require("@/assets/images/success.svg"),
        require("@/assets/images/success.svg")
      ],
      text: ["审核通过", "审核失败", "提交成功"]
    };
  },
  computed: {
    ...mapState("config", ["config"]),
    ...mapState("user", ["info", "playerStatus", "reasons"])
  },
  methods: {
    goBasicInfo() {
      this.$router.push({ name: "basic_info" });
    },
    ...mapActions("config", ["getWxConfig"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.info.token) {
        vm.$router.push({ name: "sign_in" });
      }
    });
  },
  async mounted() {
    if (isWx() && device.android()) {
      const config = await this.getWxConfig();
      wxConfig(config);
      window.wx.ready(() => {
        Toast.hide();
        window.wx.updateAppMessageShareData({
          title: "入驻NN游戏陪玩，瓜分百万现金奖励",
          desc: "开心玩，轻松赚，千万用户量的陪玩平台",
          link: `${process.env.VUE_APP_BASE_URL}sign/in`,
          imgUrl: `${process.env.VUE_APP_BASE_URL}nnlogoshare.jpg`
        });
        window.wx.updateTimelineShareData({
          title: "入驻NN游戏陪玩，瓜分百万现金奖励",
          link: `${process.env.VUE_APP_BASE_URL}sign/in`,
          imgUrl: `${process.env.VUE_APP_BASE_URL}nnlogoshare.jpg`
        });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
#result_page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .result-image {
    width: 120px;
    height: 120px;
    transform: translateY(-10vh);

    img {
      width: inherit;
      height: inherit;
    }
  }

  .result-title {
    color: #303033;
    font-size: 40px;
    margin: 20px 0;
    transform: translateY(-10vh);
  }

  .result-subtitle {
    text-align: center;
    width: 70vw;
    font-size: 32px;
    color: #606166;
    line-height: 52px;
    transform: translateY(-10vh);
  }

  .result-actions {
    transform: translateY(-10vh);
    margin-top: 40px;
  }
}
</style>
