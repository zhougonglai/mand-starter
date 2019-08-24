<template>
  <div class="error_content">
    <md-result-page
      class="customized"
      img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
      text="不太确定自己错在了哪里..."
      subtext="要不然刷新试试？"
      :buttons="buttons"
    ></md-result-page>
  </div>
</template>
<script>
import { ResultPage } from "mand-mobile";
export default {
  name: "route-error",
  components: {
    [ResultPage.name]: ResultPage
  },
  data() {
    return {
      buttons: [
        {
          text: "刷新",
          handler() {
            location.reload();
          }
        }
      ]
    };
  }
};
</script>
<style lang="stylus" scope>
.error_content {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
