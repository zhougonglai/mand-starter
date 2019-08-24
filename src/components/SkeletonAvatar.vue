<template>
  <div class="avatar skeleton-animate"></div>
</template>
<script>
export default {
  name: "SkeletonAvatar"
};
</script>
<style lang="stylus" scope>
.avatar {
  width: 64px;
  height: 64px;
  line-height: 64px;

  &.logo {
    width: 344px;
    height: 96px;
  }

  &.circle {
    border-radius: 50%;
  }

  &.lg {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
}
</style>
