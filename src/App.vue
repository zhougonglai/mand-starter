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
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
<style lang="stylus">
svg.icon {
  width: 74px;
  height: 74px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.price {
  font-size: large;
}
</style>
