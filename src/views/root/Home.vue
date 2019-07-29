<template>
  <div id="home">
    <div class="app-header">
      <img class="logo" src="@/assets/logo.png" alt />
      <div class="app-header-with-search">
        <div class="search" />
      </div>
      <div class="app-header-action">
        <md-button type="primary" size="small" inline round>申请入驻</md-button>
      </div>
    </div>
    <div class="menus">
      <md-swiper :autoplay="0" :is-loop="false">
        <md-swiper-item v-for="(gameArr, $index) in games" :key="$index">
          <ul class="game-box">
            <li
              class="game-item"
              v-for="(game, $$index) in gameArr"
              :key="$$index"
            >
              <svg class="icon game-icon" aria-hidden="true">
                <use :xlink:href="game.icon" />
              </svg>
              <span class="game-label">{{ game.name }}</span>
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
      games: [
        [
          {
            name: "星际争霸",
            icon: "#icon-ziyuan4"
          },
          {
            name: "模拟养成",
            icon: "#icon-ziyuan3"
          },
          {
            name: "VR",
            icon: "#icon-ziyuan2"
          },
          {
            name: "格斗",
            icon: "#icon-gedou"
          },
          {
            name: "体育",
            icon: "#icon-tiyu"
          },
          {
            name: "休闲放置",
            icon: "#icon-xiuxianfangzhi"
          },
          {
            name: "LOL",
            icon: "#icon-ziyuan"
          },
          {
            name: "自走棋",
            icon: "#icon-qipai1"
          }
        ],
        [
          {
            name: "益智",
            icon: "#icon-yizhi"
          },
          {
            name: "音乐",
            icon: "#icon-mmp"
          },
          {
            name: "射击",
            icon: "#icon-sheji1"
          }
        ]
      ],
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
      ]
    };
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
        }

        .game-label {
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
