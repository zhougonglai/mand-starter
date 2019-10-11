<template>
  <div class="cell-box" v-if="cellUsers.length">
    <div class="cell-header">
      <div class="cell-title large bold" v-text="title" />
      <small class="cell-action small" v-if="direction === 'vertical'"
        >查看更多 ></small
      >
    </div>
    <md-scroll-view
      v-if="direction === 'horizontal'"
      ref="scrollView"
      :scrolling-y="false"
      :touch-angle="80"
      :is-prevent="false"
    >
      <div class="cell-list horizontal">
        <div
          class="cell-item"
          v-for="(cellUser, $index) in cellUsers"
          :key="$index"
        >
          <div class="item-avatar">
            <img
              class="avatar"
              :srcset="
                `${cellUser.avatar}, ${cellUser.avatar} 2x, ${
                  cellUser.avatar
                } 3x`
              "
              :alt="cellUser.nickname"
            />
            <div class="avatar-info" v-if="!brief">
              <svg class="icon gender" aria-hidden="true">
                <use v-if="cellUser.gender === 1" xlink:href="#icon-Man" />
                <use v-if="cellUser.gender === 2" xlink:href="#icon-woman" />
              </svg>
              <small class="small text-white">{{ cellUser.age }}</small>

              <svg class="icon adress ml-2" aria-hidden="true">
                <use xlink:href="#icon-geo" />
              </svg>
              <small class="small text-white">{{ cellUser.adress }}</small>
            </div>
          </div>
          <p class="item-label larger bold" v-text="cellUser.label" />
          <div class="item-info align-center justyfy-between" v-if="!brief">
            <div class="audio-player inline-flex align-center justyfy-between">
              <small class="small">{{ cellUser.audio.duation }}s</small>
              <img class="audio-volume" src="@/assets/images/volume.svg" />
            </div>
            <div class="price-info">
              <span class="price small bold" v-text="cellUser.price" />
              <small class="smaller">元/小时</small>
            </div>
          </div>
        </div>
      </div>
    </md-scroll-view>
    <div class="cell-list vertical" v-else-if="direction === 'vertical'">
      <div
        class="cell-item"
        :class="{ 'border-bottom-1px': index < cellUsers.length - 1 }"
        v-for="(cellUser, index) in cellUsers"
        :key="index"
      >
        <img
          class="item-avatar"
          :src="cellUser.avatar"
          :alt="cellUser.nickname"
        />
        <div class="item-content">
          <p class="item-title larger bold" v-text="cellUser.label" />
          <div class="content-info">
            <svg class="icon gender" aria-hidden="true">
              <use v-if="cellUser.gender === 1" xlink:href="#icon-Man" />
              <use v-if="cellUser.gender === 2" xlink:href="#icon-woman" />
            </svg>
            <small class="small text-grayer">{{ cellUser.age }}</small>

            <svg class="icon adress ml-2" aria-hidden="true">
              <use xlink:href="#icon-geo" />
            </svg>
            <small class="small text-grayer">{{ cellUser.adress }}</small>
          </div>
          <div class="price-info">
            <span class="price small bold" v-text="cellUser.price" />
            <small class="smaller">元/小时</small>
          </div>
        </div>
        <div class="item-info">
          <div
            class="info-item audio-player inline-flex align-center justyfy-between"
          >
            <small class="small">{{ cellUser.audio.duation }}s</small>
            <img
              class="audio-volume"
              :src="require('@/assets/images/volume.svg')"
            />
          </div>
          <p class="larger bold" v-text="cellUser.service.game" />
          <tag size="small" shape="square" type="ghost">{{
            cellUser.service.rank
          }}</tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ScrollView, Tag } from "mand-mobile";

export default {
  name: "cell-box",
  props: {
    title: String,
    cellUsers: Array,
    brief: {
      type: Boolean,
      default: false
    },
    direction: {
      validator: val => ["horizontal", "vertical"].indexOf(val) !== -1,
      default: "horizontal"
    }
  },
  components: {
    Tag,
    [ScrollView.name]: ScrollView
  }
};
</script>
<style lang="stylus" scoped>
.cell-box {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 40px 0;

  .cell-header {
    display: flex;
    align-items: flex-end;
    padding: 0 40px;

    .cell-title {
      flex: 1;
    }

    .cell-action {
      color: #909399;
    }
  }

  .audio-player {
    min-width: 100px;
    background: #8C5FFE;
    color: #fff;
    height: 40px;
    border-radius: 20px;
    border-radius: 20px;
    padding: 0 16px;
    box-sizing: border-box;

    .audio-volume {
      width: 24px;
      height: 24px;
    }
  }

  .price-info {
    .price {
      color: #FD4A53;
    }

    small {
      color: #FF555D;
    }
  }

  .cell-list {
    display: flex;

    // 垂直
    &.vertical {
      flex-direction: column;
      padding: 20px 0 0 40px;

      .cell-item {
        padding: 16px 0;
        display: flex;

        .item-avatar {
          width: 160px;
          height: 160px;
          background-color: #f5f5f7;
          background-image: url('../assets/loading.png');
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 16px;
          box-sizing: border-box;
        }

        .item-content {
          flex: 1;
          padding: 8px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .item-title {
          }

          .content-info {
            .icon {
              width: 24px;
              height: 24px;
            }
          }
        }

        .item-info {
          width: 25vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          .info-item {
            width: 56px;
          }

          >>>.md-tag {
            .default.size-small {
              padding: 8px 12px;
              border-radius: 4px;
            }
          }
        }
      }
    }

    // 水平
    &.horizontal {
      padding: 20px 20px 0 40px;

      .cell-item {
        flex: 1;

        &+.cell-item {
          margin-left: 20px;
        }

        .item-avatar {
          background-color: #f5f5f7;
          background-image: url('../assets/loading.png');
          background-repeat: no-repeat;
          background-position: center;
          width: 265px;
          height: 265px;
          border-radius: 8px;
          overflow: hidden;
          box-sizing: border-box;
          position: relative;

          .avatar-info {
            position: absolute;
            box-sizing: border-box;
            bottom: 0;
            width: 100%;
            height: 60px;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-image: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.01) 0%,
              rgba(0, 0, 0, 0.66) 100%
            );

            .icon {
              width: 24px;
              height: 24px;
            }
          }
        }

        .item-label {
          margin: 20px 0;
        }

        .item-info {
          display: flex;

          .price-info {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>
