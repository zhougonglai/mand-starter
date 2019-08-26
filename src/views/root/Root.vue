<template>
  <div id="root">
    <router-view />
    <md-tab-bar
      v-model="current"
      :items="items"
      :ink-length="50"
      @change="tabChange"
    >
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
    </md-tab-bar>
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
      current: "home",
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
      this.$router.push({ name });
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
      border-radius: 5px;
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
