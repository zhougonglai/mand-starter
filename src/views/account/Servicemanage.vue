<template>
  <div class="servicemanage">
    <div class="cells">
      <div class="cell-item" v-for="game of gameApply" :key="game.id">
        <div class="item-content">
          <div class="item-avatar">
            <img :src="game.pictureUrl" />
          </div>
          <div class="item-tile">
            <div class="item-content-title">{{ game.rankName }}</div>
            <div class="item-content-sub-title">
              {{ game.status ? "上架" : "下架" }}
            </div>
          </div>
          <div class="item-action">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconic_edit-gray" />
            </svg>
          </div>
        </div>
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
