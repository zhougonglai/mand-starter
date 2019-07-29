<template>
  <router-view />
</template>
<style lang="stylus">
.app-header {
  height: 100px;
  padding: 8px;
  display: flex;

  .logo {
    height: 100%;
  }

  .app-header-with-search {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .search {
      width: 300px;
      height: 60px;
      background-image: url('https://res.tuwan.com/templet/play/chat/h5/images/searchicon.png');
      background-repeat: no-repeat;
      background-size: 32px;
      background-position: 16px center;
      background-repeat: no-repeat;
      border-radius: 32px;
      border: 1px solid #e5e5e5;
      padding: 8px;
      box-sizing: border-box;
      background-color: #e8e8e8;
    }
  }
}
</style>
