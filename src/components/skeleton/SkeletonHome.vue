<template>
  <div class="skeleton">
    <div class="app-header">
      <div class="logo"></div>
      <div class="app-header-with-search">
        <div class="search"></div>
      </div>
      <div class="app-header-action"></div>
    </div>
    <div class="menus border-bottom-1px">
      <div class="game-item"></div>
      <div class="game-item"></div>
      <div class="game-item"></div>
      <div class="game-item"></div>
      <div class="game-item"></div>
      <div class="game-item"></div>
      <div class="game-item"></div>
      <div class="game-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonHome"
};
</script>

<style lang="stylus" scoped>
.skeleton {
  width: 100%;

  .app-header {
    .logo {
      background: #F4F5F7;
    }

    .app-header-action {
      background: #F4F5F7;
      height: 56px;
    }
  }

  .menus {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 16px 16px 32px 16px;
    box-sizing: border-box;

    .game-item {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F4F5F7;
      border-radius: 50%;
      width: 72px;
      height: 72px;
      margin: 16px 50px 32px;
    }
  }
}
</style>
