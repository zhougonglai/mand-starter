<template>
  <div id="search">
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
    <div class="content">正文区域</div>
  </div>
</template>
<script>
import { Swiper, SwiperItem, DropMenu } from "mand-mobile";
import { mapState } from "vuex";
import { chunk } from "lodash";

export default {
  name: "search",
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [DropMenu.name]: DropMenu
  },
  computed: {
    ...mapState("user", {
      gameList: state => chunk(state.gameList.list, 8)
    })
  },
  data() {
    return {
      data: [
        {
          text: "排量",
          options: [
            {
              value: "0",
              text: "1.6L"
            },
            {
              value: "1",
              text: "1.8L"
            },
            {
              value: "2",
              text: "2.0L"
            },
            {
              value: "3",
              text: "1.2T"
            },
            {
              value: "4",
              text: "1.4T"
            },
            {
              value: "5",
              text: "1.6T"
            }
          ]
        },
        {
          text: "变速箱",
          options: [
            {
              value: "7",
              text: "手动挡"
            },
            {
              value: "8",
              text: "自动挡"
            },
            {
              value: "9",
              text: "手自一体"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
#search {
  width: 750px;
  flex: 1;
  overflow-y: auto;

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
