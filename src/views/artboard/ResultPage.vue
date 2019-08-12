<template>
  <div id="result_page">
    <md-result-page
      class="customized"
      :img-url="
        playerStatus && playerStatus.playerStatus
          ? img[playerStatus.playerStatus]
          : require('@/assets/images/success.svg')
      "
      text="提交成功"
      subtext="审核结果将在1-3个工作日通知到您~"
    />
  </div>
</template>
<script>
import { ResultPage } from "mand-mobile";
import { mapState } from "vuex";

export default {
  name: "result-page",
  components: {
    [ResultPage.name]: ResultPage
  },
  data() {
    return {
      img: [
        require("@/assets/images/success.svg"),
        require("@/assets/images/fail.svg"),
        require("@/assets/images/success.svg"),
        require("@/assets/images/success.svg")
      ],
      text: ["审核通过", "审核失败", "提交成功"],
      subtext: [
        ` 恭喜您成功入驻NN约玩平台，
          快去NN约玩官方网站开启接单吧！
          官网：yuewan.nn.com
        `,
        `这里是驳回理由，
         您提交的图片不符合要求重新提交。
        `,
        `审核结果将在1-3个工作日通知到您~`
      ]
    };
  },
  computed: {
    ...mapState("user", ["playerStatus"])
  }
};
</script>
<style lang="stylus" scoped>
#result_page {
  height: 100vh;

  >>>.md-result-image {
    width: 120px;
  }
}
</style>
