<template>
  <div id="app">
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
    <md-popup v-model="updatePopup" :hasMask="false" position="top">
      <div class="update_popup">
        <p class="fill">发现新的版本.点击更新</p>
        <md-icon name="refresh" @click.native="updateSite"></md-icon>
      </div>
    </md-popup>
  </div>
</template>
<script>
import { Popup, Icon } from "mand-mobile";
export default {
  name: "app",
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon
  },
  data() {
    return {
      updatePopup: false
    };
  },
  methods: {
    updateSite() {
      location.reload();
    }
  },
  mounted() {
    window.addEventListener("sw.update", () => {
      this.updatePopup = true;
    });
  }
};
</script>
<style lang="stylus" scoped>
.update_popup {
  width: 100%;
  height: 75px;
  line-height: 75px;
  background: #4a4c5b;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 25px;
  box-sizing: border-box;
}
</style>
<style lang="stylus">
svg.icon {
  width: 48px;
  height: 48px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
