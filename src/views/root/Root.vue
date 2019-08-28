<template>
  <div id="root">
    <keep-alive>
      <router-view
        v-wechat-title="$route.meta.title"
        v-if="$route.meta.keepAlive"
      ></router-view>
    </keep-alive>
    <router-view
      v-wechat-title="$route.meta.title"
      v-if="!$route.meta.keepAlive"
    ></router-view>
    <!-- <md-tab-bar v-model="current" :items="items" :ink-length="50" @change="tabChange">
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon" />
          </div>
          <div class="text">
            <span v-text="item.label" />
          </div>
        </div>
      </template>
    </md-tab-bar>-->
  </div>
</template>
<script>
import { TabBar, Icon } from "mand-mobile";

export default {
  name: "root",
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      current: this.$route.name,
      items: [
        {
          name: "home",
          label: "首页",
          icon: "home"
        },
        {
          name: "search",
          label: "找陪玩",
          icon: "search"
        },
        {
          name: "account",
          label: "我的",
          icon: "user"
        }
      ]
    };
  },
  methods: {
    tabChange({ name }) {
      this.$router.push({ name, query: this.$route.query });
    }
  }
};
</script>
<style lang="stylus" scoped>
#root {
  height: 100vh;
  display: flex;
  flex-direction: column;

  >>>.md-tab-bar {
    /* 兼容 iOS < 11.2 */
    padding-bottom: calc(0px + env(safe-area-inset-bottom));
    /* 兼容 iOS >= 11.2 */
    padding-bottom: calc(0px + constant(safe-area-inset-bottom));
    background-color: #fff;

    .md-tab-bar-ink {
      height: 10px;
      border-radius: 10px 10px 0 0;
      box-shadow: 0 -1px 16px 6px alpha(color-primary, 0.2), 1px 0 4px 2px alpha(color-primary, 0.14), 0 0 4px 1px alpha(color-primary, 0.12);
    }
  }

  .custom-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1;

    .text {
      font-size: 20px;
    }
  }
}
</style>
