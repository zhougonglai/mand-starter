<template>
  <div id="sign">
    <div class="logo">
      <img
        src="@/assets/logo@2x.png"
        srcset="@/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x"
        alt="nn约玩"
      />
    </div>
    <md-tab-bar
      class="content"
      v-model="sign.current"
      :items="signPane"
      @change="paneChange"
    />
    <router-view></router-view>
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
    <span v-if="!isProduction" v-text="VUE_APP_VERSION" class="app_version" />
  </div>
</template>
<script>
import {
  Icon,
  Tabs,
  TabBar,
  TabPane,
  Landscape,
  Selector,
  ScrollView
} from "mand-mobile";
import { mapState, mapActions } from "vuex";

export default {
  name: "sign",
  components: {
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [TabBar.name]: TabBar,
    [TabPane.name]: TabPane,
    [Selector.name]: Selector,
    [ScrollView.name]: ScrollView,
    [Landscape.name]: Landscape
  },
  data() {
    return {
      isProduction: process.env.NODE_ENV === "production",
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
    ...mapActions("global", ["toggleAreaSelector"])
  },
  mounted() {
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
    top: 0;
    right: 0;
    background-color: #C5CAD5;
    color: #858B9C;
    padding: 5px 10px;
    font-size: xx-small;
    border-radius: 0 0 0 25px;
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
    margin-bottom: 32px;
  }

  >>>.md-tab-bar {
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
      left: 40px;
      max-width: 48px;
      border-radius: 15px;
    }
  }
}
</style>
