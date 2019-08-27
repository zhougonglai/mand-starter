<template>
  <div id="account">
    <div class="account_header">
      <div class="account_avatar">
        <img class="avatar" :src="info.imageUrl" :alt="info.nickName" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "account",
  computed: {
    ...mapState("user", ["info"])
  }
};
</script>
<style lang="stylus" scoped>
#account {
  width: 750px;
  flex: 1;
  overflow-y: auto;

  .account_header {
    height: 180px;
    padding: 40px 0 40px 40px;
    background-image: linear-gradient(90deg, #A16AFF 0%, #9D5DFB 100%);
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .account_avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #fff;
    }
  }
}
</style>
