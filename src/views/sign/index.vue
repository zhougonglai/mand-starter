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
      sign: {
        current: "sign_in"
      },
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
  methods: {
    paneChange({ name }) {
      this.$router.push({ name });
    }
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
    border-bottom: 1px solid #E9E9ED;

    .md-tab-bar-item {
      font-size: 44px;

      &:not(.is-active) {
        color: #909399;
      }
    }
  }
}
</style>
