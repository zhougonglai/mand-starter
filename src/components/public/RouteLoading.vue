<template>
  <div class="loading_content">
    <div class="LoaderBalls">
      <div class="LoaderBalls__item"></div>
      <div class="LoaderBalls__item"></div>
      <div class="LoaderBalls__item"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "route-loading"
};
</script>
<style lang="stylus" scope>
.loading_content {
  width: 100%;
  height: 100vh;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes bouncing {
    0% {
      transform: translate3d(0, 10px, 0) scale(1.2, 0.85);
    }

    100% {
      transform: translate3d(0, -20px, 0) scale(0.9, 1.1);
    }
  }

  .LoaderBalls {
    width: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__item {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #8C5FFE;

      &:nth-child(1) {
        animation: bouncing 0.4s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95);
      }

      &:nth-child(2) {
        animation: bouncing 0.4s 0.1s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
      }

      &:nth-child(3) {
        animation: bouncing 0.4s 0.2s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
      }
    }
  }
}
</style>
