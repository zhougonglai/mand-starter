<template>
  <div id="home">
    <small class="smaller text-gray app_version">{{ VUE_APP_VERSION }}</small>
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
        <md-button type="primary" class="waving" size="small" inline round plain
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
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="game.icon" />
                </svg>
              </div>
              <span class="game-label small text-darker">{{ game.name }}</span>
            </li>
          </ul>
        </md-swiper-item>
      </md-swiper>
    </div>
    <cell-box title="热门推荐" :cellUsers="cellUsers" />
    <cell-box title="新秀推荐" brief :cellUsers="cellUsers" />
    <cell-box title="当前在线" :cellUsers="cellUsers" direction="vertical" />
    <div class="blok-bottom small">我是有底线的哦~</div>
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
      VUE_APP_VERSION: process.env.VUE_APP_VERSION,
      cellUsers: [
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "心悦君兮满满呢",
          gender: 2,
          age: 23,
          adress: "乌鲁木齐",
          service: {
            game: "英雄联盟",
            rank: "最强王者"
          },
          price: 60,
          audio: {
            url: "https://ywm.leigod.com/voicesamples.m4a",
            duation: 7
          },
          avatar: "https://api.adorable.io/avatars/200/face1.png"
        },
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "她太甜锦梨",
          gender: 2,
          age: 23,
          adress: "乌鲁木齐",
          service: {
            game: "英雄联盟",
            rank: "最强王者"
          },
          price: 75,
          audio: {
            url: "https://ywm.leigod.com/voicesamples.m4a",
            duation: 7
          },
          avatar: "https://api.adorable.io/avatars/200/face2.png"
        },
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "她太甜锦梨",
          gender: 2,
          age: 23,
          adress: "乌鲁木齐",
          service: {
            game: "英雄联盟",
            rank: "最强王者"
          },
          price: 75,
          audio: {
            url: "https://ywm.leigod.com/voicesamples.m4a",
            duation: 7
          },
          avatar: "https://api.adorable.io/avatars/200/face3.png"
        },
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "她太甜锦梨",
          gender: 2,
          age: 23,
          adress: "乌鲁木齐",
          service: {
            game: "英雄联盟",
            rank: "最强王者"
          },
          price: 75,
          audio: {
            url: "https://ywm.leigod.com/voicesamples.m4a",
            duation: 7
          },
          avatar: "https://api.adorable.io/avatars/200/face4.png"
        },
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "平台最强秒接",
          gender: 1,
          age: 23,
          adress: "乌鲁木齐",
          service: {
            game: "英雄联盟",
            rank: "最强王者"
          },
          price: 45,
          audio: {
            url: "https://ywm.leigod.com/voicesamples.m4a",
            duation: 7
          },
          avatar: "https://api.adorable.io/avatars/200/face5.png"
        }
      ],
      gameList: [
        [
          {
            icon: "#icon-ziyuan4",
            name: "模拟经营"
          },
          {
            icon: "#icon-gedou",
            name: "格斗"
          },
          {
            icon: "#icon-ziyuan",
            name: "LOL"
          },
          {
            icon: "#icon-sheji",
            name: "射击"
          },
          {
            icon: "#icon-qiapai",
            name: "卡牌"
          },
          {
            icon: "#icon-jishizhanlve",
            name: "战略"
          },
          {
            icon: "#icon-qipai",
            name: "棋牌"
          },
          {
            icon: "#icon-jiaose",
            name: "角色扮演"
          }
        ],
        [
          {
            icon: "#icon-tiyu",
            name: "体育"
          },
          {
            icon: "#icon-mmp",
            name: "音乐"
          },
          {
            icon: "#icon-yizhi",
            name: "益智"
          }
        ]
      ],
      localId: ""
    };
  },
  methods: {}
};
</script>
<style lang="stylus" scoped>
#home {
  width: 750px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F7;

  .app_version {
    position: absolute;
    top: 4px;
    right: 4px;
  }

  .menus {
    margin-bottom: 16px;
    background-color: #fff;

    >>>.md-swiper-item {
      min-width: 100vw;
    }

    .game-box {
      margin: 0;
      padding: 0;
      display: flex;
      height: 100%;
      width: 100%;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
      padding: 16px 16px 32px 16px;
      box-sizing: border-box;

      .game-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        font-size: 16px;
        flex-direction: column;

        &:nth-child(4)~.game-item {
          margin-top: 32px;
        }

        .game-icon {
          width: 72px;
          height: 72px;

          svg.icon {
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

  .blok-bottom {
    width: 100%;
    height: 80px;
    color: #909399;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
