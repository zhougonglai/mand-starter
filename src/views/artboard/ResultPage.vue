<template>
  <div id="result_page">
    <div class="result-image">
      <img
        :src="
          playerStatus && playerStatus.playerStatus
            ? img[playerStatus.playerStatus]
            : require('@/assets/images/success.svg')
        "
      />
    </div>
    <div class="result-title">
      {{
        playerStatus && playerStatus.playerStatus
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
        <div>{{ gameApply[0].reasons }}</div>
      </template>
      <template v-if="playerStatus.playerStatus === 2">
        <div>审核结果将在1-3个工作日通知到您~</div>
      </template>
    </div>
    <div
      class="result-actions"
      v-if="playerStatus.playerStatus === 1 && gameApply.length"
    >
      <md-button type="primary" round @click="goBasicInfo">修改信息</md-button>
    </div>
  </div>
</template>
<script>
import { Button } from "mand-mobile";
import { mapState } from "vuex";

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
  methods: {
    goBasicInfo() {
      this.$router.push({ name: "basic_info" });
    }
  },
  computed: {
    ...mapState("user", ["playerStatus", "gameApply"])
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
