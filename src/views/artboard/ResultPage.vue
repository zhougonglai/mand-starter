<template>
  <div id="result_page">
    <md-result-page
      class="customized"
      :img-url="require('@/assets/images/success.svg')"
      text="提交成功"
      subtext="审核结果将在1-3个工作日通知到您~"
    />
  </div>
</template>
<script>
import { ResultPage } from "mand-mobile";

export default {
  name: "result-page",
  components: {
    [ResultPage.name]: ResultPage
  }
};
</script>
<style lang="stylus" scoped>
#result_page {
  height: 100vh;
}
</style>
