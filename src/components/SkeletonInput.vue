<template>
  <div class="skeleton-input skeleton-animate" />
</template>
<script>
export default {
  name: "SkeletonInput",
  props: {
    animate: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="stylus" scope>
.skeleton-input {
  width: 100%;
  height: 80px;
  margin-top: 40px;
  border-radius: 40px;
}
</style>
