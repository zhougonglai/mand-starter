<template>
  <div id="home">
    <div class="app-header">
      <img
        class="logo"
        src="@/assets/logo@2x.png"
        srcset="@/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x"
        alt="nn约玩"
      />
      <div class="app-header-with-search">
        <div class="search">
          输入ID或昵称
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cx" />
          </svg>
        </div>
      </div>
      <div class="app-header-action">
        <md-button
          type="primary"
          class="waving"
          size="small"
          inline
          round
          plain
          @click="gotoSign"
          >申请入驻</md-button
        >
      </div>
    </div>
    <div class="menus">
      <md-swiper :autoplay="0" :is-loop="false">
        <md-swiper-item v-for="(gameArr, index) in gameList" :key="index">
          <ul class="game-box">
            <li
              class="game-item"
              v-for="(game, $index) in gameArr"
              :key="$index"
            >
              <div class="game-icon">
                <img :src="game.selectIcon" :alt="game.name" />
              </div>
              <span class="game-label small text-darker">{{ game.name }}</span>
            </li>
          </ul>
        </md-swiper-item>
      </md-swiper>
    </div>
    <cell-box title="热门推荐" :cellUsers="cellUsers" />
  </div>
</template>
<script>
import { Button, Swiper, SwiperItem } from "mand-mobile";
import { mapActions, mapState } from "vuex";
// import { wxConfig } from "@/utils";
import { chunk } from "lodash";

export default {
  name: "home",
  components: {
    [Button.name]: Button,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    "cell-box": () => import("@/components/CellBox.vue")
  },
  data() {
    return {
      cellUsers: [
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "心悦君兮♕满满呢",
          price: 60,
          avatar:
            "http://img1.tuwandata.com/v2/thumb/jpg/NDVjMiwzNjQsMzY0LDksMywxLC0xLE5PTkUsLCw5MA==/u/www.tuwan.com/uploads/play/2869651548938183.png"
        },
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "她太甜♚小仙女ღ锦梨",
          price: 75,
          avatar:
            "http://img.tuwandata.com/v2/thumb/jpg/ZWU5NSwzNjQsMzY0LDksMywxLC0xLE5PTkUsLCw5MA==/u/www.tuwan.com/uploads/play/1648781535797050.jpg"
        },
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "平台最强♕职业选手包C秒接",
          price: 45,
          avatar:
            "http://img1.tuwandata.com/v2/thumb/jpg/MDQ4NywzNjQsMzY0LDksMywxLC0xLE5PTkUsLCw5MA==/u/www.tuwan.com/uploads/play/1043361563432825.png"
        }
      ],
      localId: ""
    };
  },
  computed: {
    ...mapState("user", {
      gameList: state => chunk(state.gameList.list, 8)
    })
  },
  methods: {
    gotoSign() {
      this.$router.push({ name: "sign_in" });
    },
    trigerTarget(key) {
      this[key]();
    },
    updateAppMessageShareData() {},
    updateTimelineShareData() {},
    onMenuShareWeibo() {},
    onMenuShareQZone() {},
    startRecord() {},
    stopRecord() {},
    playVoice() {},
    chooseImage() {},
    ...mapActions("user", ["getGameList"]),
    ...mapActions("config", ["getWxConfig"])
  },
  async created() {
    if (!this.gameList.length) {
      await this.getGameList(true);
    }
  }
};
</script>
<style lang="stylus" scoped>
#home {
  width: 750px;
  flex: 1;
  overflow-y: auto;

  .menus {
    height: 320px;

    .game-box {
      margin: 0;
      padding: 0;
      display: flex;
      height: 100%;
      align-items: self-start;
      flex-wrap: wrap;
      flex-direction: row;
      padding: 16px;

      .game-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        font-size: 16px;
        flex-direction: column;

        .game-icon {
          width: 72px;
          height: 72px;

          img {
            width: inherit;
            height: inherit;
          }
        }

        .game-label {
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
