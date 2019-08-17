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

.app-header {
  height: 100px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    height: 74px;
  }

  .app-header-with-search {
    flex: 1;
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .search {
      width: 100%;
      height: 60px;
      background: url('https://res.tuwan.com/templet/play/chat/h5/images/searchicon.png') no-repeat 32px center #f5f5f5; // res.tuwan.com/templet/play/chat/h5/images/searchicon.png) no-repeat 32px center #f5f5f5;
      background-size: 32px;
      background-repeat: no-repeat;
      border-radius: 32px;
      border: 1px solid #e5e5e5;
      padding: 8px;
      box-sizing: border-box;
      background-color: #e8e8e8;
    }
  }

  .app-header-action {
    display: flex;
  }
}
</style>
