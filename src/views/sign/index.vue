<template>
  <div id="sign">
    <div class="logo">
      <img
        src="@/assets/logo@2x.png"
        srcset="@/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x"
        alt="nn约玩"
      />
    </div>
    <md-tabs v-model="current" @change="paneChange">
      <md-tab-pane
        class="content"
        v-for="pane in signPane"
        :key="pane.name"
        :name="pane.name"
        :label="pane.label"
      >
        <router-view v-if="current === pane.name" />
      </md-tab-pane>
    </md-tabs>
    <div v-if="areaCode.status" class="full-screen">
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
    <!-- <md-selector
      v-model="areaCode.status"
      title="选择手机区号"
      :default-value="86"
      :data="areaCode.list"
      @choose="changeAreaCode"
      max-height="calc(100vh - 1.2rem)"
    >
      <template slot-scope="{ option }">
        <div
          class="selector-item-body"
          :class="{ selected: option.code === areaCode.item.code }"
        >
          <div class="selector-item-left">
            <span class="holder" v-text="option.group" />
          </div>
          <div class="selector-item-content">
            <p class="selector-item-title">
              <small class="gray">({{ option.iso_code }})</small>
              <span v-text="option.name" />
            </p>
            <p class="selector-item-brief" v-text="option.code" />
          </div>
          <div class="selector-item-right flex justyfy-center align-center">
            <img :src="option.ico" class="icon-ico" :alt="option.name" />
          </div>
        </div>
      </template>
    </md-selector>-->
  </div>
</template>
<script>
import { Tabs, TabPane, Landscape, Selector, ScrollView } from "mand-mobile";
import { mapState, mapActions } from "vuex";
import { isWx, wxConfig } from "@/utils";

export default {
  name: "sign",
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Selector.name]: Selector,
    [ScrollView.name]: ScrollView,
    [Landscape.name]: Landscape
  },
  data() {
    return {
      current: "sign_in",
      scrollY: 0,
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
    ...mapState("global", ["areaCode"])
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
      this.areaCode.status = false;
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
    ...mapActions("config", ["getWxConfig"])
  },
  created() {
    this.current = this.$route.name;
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
                    title: "分享给朋友/分享到QQ",
                    desc: "描述描述描述",
                    link: "http://ywm.nnn.com/sign/in",
                    imgUrl: "http://139.224.119.40/img/head-logo.png"
                  });
                }
                if (updateTimelineShareData) {
                  window.wx.updateTimelineShareData({
                    title: "分享到朋友圈/分享到QQ空间",
                    link: "http://ywm.nnn.com/sign/in",
                    imgUrl: "http://139.224.119.40/img/head-logo.png"
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

  .full-screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;

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

      &.active {
        color: color-primary;
      }

      .item-icon {
        padding: 30px;
      }
    }

    .scroll-view-item {
      padding-left: 30px;
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
