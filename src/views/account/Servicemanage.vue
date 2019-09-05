<template>
  <div class="servicemanage">
    <div class="cells">
      <div class="cell-item padding" v-for="game of gameApply" :key="game.id">
        {{ game.rank }}
      </div>
    </div>
    <md-action-bar :actions="actions" />
  </div>
</template>

<script>
import { ActionBar } from "mand-mobile";
import { mapActions, mapState } from "vuex";

export default {
  name: "servicemanage",
  components: {
    [ActionBar.name]: ActionBar
  },
  data() {
    return {
      actions: [
        {
          text: "新增技能类型",
          round: true
        }
      ]
    };
  },
  computed: {
    ...mapState("account", ["gameApply"])
  },
  methods: {
    ...mapActions("account", ["playerGameApply"])
  },
  async created() {
    await this.playerGameApply();
  }
};
</script>
<style lang="stylus" scoped>
.servicemanage {
  width: 750px;
  min-height: 100vh;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F7;
}
</style>
