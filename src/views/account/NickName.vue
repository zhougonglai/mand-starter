<template>
  <div class="nickname">
    <md-field plain>
      <md-input-item
        placeholder="昵称"
        brief="输入一个响亮的昵称"
        :maxlength="20"
        clearable
        v-model.trim="nickName"
      ></md-input-item>
    </md-field>
    <div class="row">
      <md-button type="primary" round @click="submit">提交修改</md-button>
    </div>
  </div>
</template>
<script>
import { Field, InputItem, Button } from "mand-mobile";
import { mapState, mapActions } from "vuex";

export default {
  name: "nickname",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [InputItem.name]: InputItem
  },
  data: () => ({
    nickName: ""
  }),
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    async submit() {
      if (this.nickName) {
        const { code } = await this.memberInformationUpdate({
          nickName: this.nickName
        });
        if (!code) {
          this.$router.push({ name: "account_details" });
        }
      }
    },
    ...mapActions("user", ["memberInformationUpdate"])
  },
  created() {
    this.nickName = this.info.nickName;
  }
};
</script>
<style lang="stylus" scoped>
.nickname {
  width: 750px;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  background: #F5F5F7;

  >>> .md-field {
    margin-top: 20px;

    .md-field-item-content {
      background-color: #fff;
      padding: 0 16px;

      &::before {
        display: none;
      }
    }

    .md-input-item-brief {
      padding-left: 32px;
    }
  }

  .row {
    margin-top: 40px;
    padding: 0 50px;
  }
}
</style>
