<template>
  <div id="sign">
    <div class="logo">
      <img
        src="@/assets/logo@2x.png"
        srcset="@/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x"
        alt="nn约玩"
      />
    </div>
    <md-tabs v-model="sign.current" @change="paneChange">
      <md-tab-pane
        class="content"
        v-for="pane in signPane"
        :key="pane.name"
        :name="pane.name"
        :label="pane.label"
      >
        <router-view v-if="sign.current === pane.name" />
      </md-tab-pane>
    </md-tabs>
    <div v-if="areaCode.status" class="full-screen">
      <md-icon name="close" class="close" @click.native="toggleAreaSelector" />
      <md-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        @scroll="$_onScroll"
      >
        <div
          v-for="group in areaCode.list"
          :key="group.name"
          class="scroll-view-category"
        >
          <p class="scroll-view-category-title">{{ group.name }}</p>
          <div
            v-for="country in group.items"
            :key="country.code"
            :class="{
              active: areaCode.active && country.code === areaCode.active.code
            }"
            @click="setCountry(country)"
            class="scroll-view-list"
          >
            <img class="item-icon" :src="country.ico" :alt="country.name" />
            <p class="scroll-view-item">{{ country.name }}</p>
          </div>
        </div>
      </md-scroll-view>
      <p v-if="activeBlockIndex > 0" class="scroll-view-striky-title">
        {{ areaCode.list[activeBlockIndex - 1].name }}
      </p>
    </div>
    <span v-text="VUE_APP_VERSION" class="app_version" />
  </div>
</template>
<script>
import {
  Icon,
  Tabs,
  TabPane,
  Landscape,
  Selector,
  ScrollView
} from "mand-mobile";
import { mapState, mapActions } from "vuex";
import { isWx, wxConfig } from "@/utils";

export default {
  name: "sign",
  components: {
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Selector.name]: Selector,
    [ScrollView.name]: ScrollView,
    [Landscape.name]: Landscape
  },
  data() {
    return {
      scrollY: 0,
      VUE_APP_VERSION: process.env.VUE_APP_VERSION,
      dimensions: [],
      signPane: [
        {
          name: "sign_in",
          label: "登录"
        },
        {
          name: "sign_up",
          label: "注册"
        }
      ]
    };
  },
  computed: {
    activeBlockIndex() {
      let activeIndex = -1;
      this.dimensions.forEach((dimension, index) => {
        if (this.scrollY >= dimension[0] && this.scrollY <= dimension[1]) {
          activeIndex = index + 1;
        }
      });
      return activeIndex;
    },
    ...mapState("global", ["areaCode", "sign"])
  },
  methods: {
    changeAreaCode() {
      this.areaCode.status = true;
      this.$nextTick(() => {
        this.$_initScrollBlock();
      });
    },
    setCountry(country) {
      this.areaCode.active = country;
      this.toggleAreaSelector();
    },
    setPane(name) {
      console.log(name);
    },
    paneChange({ name }) {
      this.$router.push({ name });
    },
    $_onScroll({ scrollTop }) {
      this.scrollY = scrollTop;
    },
    $_initScrollBlock() {
      const blocks = this.$el.querySelectorAll(".scroll-view-category");
      let offset = 0;
      Array.prototype.slice.call(blocks).forEach((block, index) => {
        const innerHeight = block.clientHeight;
        this.$set(this.dimensions, index, [offset, offset + innerHeight]);
        offset += innerHeight;
      });
    },
    ...mapActions("global", ["toggleAreaSelector"]),
    ...mapActions("config", ["getWxConfig"]),
    ...mapActions("user", ["resetVerification"])
  },
  created() {
    this.sign.current = this.$route.name;
    this.resetVerification();
  },
  mounted() {
    if (isWx()) {
      this.getWxConfig().then(data => {
        if (data) {
          wxConfig(data);
          console.log("nnplayer_version: ", process.env.VUE_APP_VERSION);
          window.wx.ready(() => {
            window.wx.checkJsApi({
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData"
              ],
              success: ({
                checkResult: {
                  updateAppMessageShareData,
                  updateTimelineShareData
                }
                // errMsg
              }) => {
                if (updateAppMessageShareData) {
                  window.wx.updateAppMessageShareData({
                    title: "入驻NN游戏陪玩，瓜分百万现金奖励",
                    desc: "开心玩，轻松赚，千万用户量的陪玩平台",
                    link: "http://ywm.nnn.com/sign/in",
                    imgUrl: "http://ywm.nnn.com/nnlogoshare.jpg"
                  });
                }
                if (updateTimelineShareData) {
                  window.wx.updateTimelineShareData({
                    title: "入驻NN游戏陪玩，瓜分百万现金奖励",
                    link: "http://ywm.nnn.com/sign/in",
                    imgUrl: "http://ywm.nnn.com/nnlogoshare.jpg"
                  });
                }
              }
            });
          });
        } else {
          alert("微信配置获取失败");
        }
      });
    }
    this.$_initScrollBlock();
  }
};
</script>
<style lang="stylus" scoped>
#sign {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 10vw;
  position: relative;

  .app_version {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #C5CAD5;
    color: #858B9C;
    padding: 5px 10px 0 10px;
    font-size: xx-small;
    border-radius: 25px 0 0;
  }

  .full-screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;

    .close {
      position: absolute;
      top: 25px;
      right: 25px;
      z-index: 999;
      padding: 25px;
      background-color: #909399;
      color: #fff;
      border-radius: 50%;
    }

    .scroll-view-striky-title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .scroll-view-category-title, .scroll-view-striky-title {
      padding: 10px 20px;
      font-size: 32px;
      background-color: #f0f0f0;
    }

    .scroll-view-list {
      display: flex;
      align-items: center;
      border-bottom: 0.5px solid #efefef;
      height: 80px;

      &.active {
        color: color-primary;
      }

      .item-icon {
        padding: 10px;
      }
    }

    .scroll-view-item {
      padding-left: 20px;
      font-size: 32px;
      flex: 1;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
  }

  >>>.md-tabs {
    margin-top: 32px;

    .md-tab-bar {
      background-color: transparent;
      padding: 0 20vw;
      border-bottom: 1px solid #E9E9ED;

      .md-tab-bar-item {
        font-size: 44px;

        &:not(.is-active) {
          color: #909399;
        }
      }

      .md-tab-bar-ink {
        height: 8px;
        left: 8%;
        max-width: 48px;
        border-radius: 5px;
      }
    }
  }
}
</style>
