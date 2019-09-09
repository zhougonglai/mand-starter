<template>
  <div class="servicemanage">
    <div class="cells">
      <div
        class="cell-item column"
        :class="{ 'mt-2': index }"
        v-for="(game, index) of gameApply"
        :key="game.id"
      >
        <div class="item-content">
          <div class="content-avatar">
            <img :src="game.pictureUrl" />
          </div>
          <div class="item-tile">
            <div class="item-content-title bold larger">
              {{ game.gameType }}
            </div>
            <div class="item-content-sub-title mt-1">
              <small class="small text-success" v-if="game.status === 0"
                >已通过</small
              >
              <small class="small text-error" v-else-if="game.status === 1"
                >已驳回</small
              >
              <small class="small text-gray" v-else-if="game.status === 2"
                >待审核</small
              >
              <small class="small text-error" v-else-if="game.status === 3"
                >已封禁</small
              >
            </div>
          </div>
          <div class="content-action" v-if="game.status !== 2">
            <svg class="icon" aria-hidden="true" @click="showGameDetails(game)">
              <use xlink:href="#iconic_edit-gray" />
            </svg>
          </div>
        </div>
        <div class="item-foot" v-if="game.status === 1 || game.status === 3">
          <p class="text-darker">
            备注说明:
            <span class="text-grayer">{{ game.reasons }}</span>
          </p>
        </div>
        <div class="item-actions" v-if="game.status === 0 || game.status === 1">
          <md-switch
            v-if="game.status === 0"
            :value="game.obtained"
            :disabled="wait === index"
            @change="statusUpdate(game, index)"
          />
          <md-button
            class="ml-2"
            v-if="!game.obtained"
            size="small"
            inline
            round
            @click="deleteGame(game)"
            >删除</md-button
          >
        </div>
      </div>
    </div>
    <md-action-bar :actions="actions" v-if="gameApply.length < 5" />
  </div>
</template>

<script>
import { ActionBar, Button, Switch, Dialog } from "mand-mobile";
import { mapActions, mapState } from "vuex";

export default {
  name: "servicemanage",
  components: {
    [ActionBar.name]: ActionBar,
    [Button.name]: Button,
    [Switch.name]: Switch
  },
  data() {
    return {
      actions: [
        {
          text: "新增技能类型",
          round: true,
          onClick: () => {
            this.$router.push({
              name: "service_info",
              query: {
                from: this.$route.name,
                to: this.$route.name,
                type: "add"
              }
            });
          }
        }
      ],
      wait: -1
    };
  },
  computed: {
    ...mapState("account", ["gameApply"])
  },
  methods: {
    async statusUpdate(game, index) {
      if (game.obtained) {
        Dialog.confirm({
          title: "下架技能提醒",
          content: `是否确认下架此项技能，下架后将不会再接到此服务类型的订单`,
          cancelText: "我点错了",
          onConfirm: async () => {
            await this.gameUpdate(game, index);
          }
        });
      } else {
        await this.gameUpdate(game, index);
      }
    },
    async gameUpdate(game, index) {
      this.wait = index;
      await this.gameUpdateShelf(game);
      this.wait = -1;
    },
    async showGameDetails(game) {
      const { data, code } = await this.gameDetailsShow(game.id);
      if (!code) {
        this.$router.push({
          name: "service_info",
          query: {
            from: this.$route.name,
            to: this.$route.name,
            id: data.id,
            type: "update"
          }
        });
      }
    },
    async deleteGame(game) {
      Dialog.confirm({
        title: "删除技能提醒",
        content: `是否确认删除此项技能，删除后无法再恢复`,
        cancelText: "我点错了",
        onConfirm: async () => {
          await this.deleteGameApply(game.gameId);
        }
      });
    },
    ...mapActions("account", [
      "playerGameApply",
      "gameUpdateShelf",
      "deleteGameApply"
    ]),
    ...mapActions("user", ["gameDetailsShow"])
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

  .cells {
    margin-bottom: 40vh;
  }
}
</style>
