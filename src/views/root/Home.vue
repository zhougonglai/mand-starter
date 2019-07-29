<template>
  <div id="home">
    <div class="app-header">
      <img class="logo" src="@/assets/logo.png" alt />
      <div class="app-header-with-search">
        <div class="search" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home"
};
</script>
<style lang="stylus" scoped>
#home {
  width: 750px;
  flex: 1;
  overflow-y: auto;
}
</style>
