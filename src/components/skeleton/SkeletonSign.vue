<template>
  <div class="skeleton-wrapper">
    <div class="logo-box">
      <SkeletonAvatar class="logo" />
    </div>
    <div class="tab-bar border-bottom-1px">
      <div class="tab-item skeleton-animate"></div>
      <div class="tab-item skeleton-animate"></div>
    </div>

    <div class="form-inputs">
      <SkeletonInput />
      <SkeletonInput />
      <div class="describe row">
        <div class="col">
          <div class="twig w-1 skeleton-animate"></div>
          <div class="twig w-2 skeleton-animate"></div>
        </div>
        <div class="col">
          <div class="twig w-1 skeleton-animate"></div>
        </div>
      </div>
      <div class="describe row align-center">
        <div class="role skeleton-animate"></div>
        <div class="twig w-1 skeleton-animate ml-2"></div>
      </div>
      <SkeletonInput />
    </div>
  </div>
</template>
<script>
import SkeletonAvatar from "../SkeletonAvatar";
import SkeletonInput from "../SkeletonInput";

export default {
  name: "SkeletonSign",
  components: {
    SkeletonAvatar,
    SkeletonInput
  }
};
</script>
<style lang="stylus" scope>
.skeleton-wrapper {
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0 10vw;
  position: relative;
  box-sizing: border-box;

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
    margin-bottom: 32px;
  }

  .tab-bar {
    padding: 0 20vw;
    height: 102px;
    display: flex;
    align-items: center;
    justify-content: center;

    .tab-item {
      width: 80px;
      height: 32px;

      & + .tab-item {
        margin-left: 80px;
      }
    }
  }

  .form-inputs {
    .describe {
      margin: 40px 0;
      height: 80px;
      width: 100%;

      .col:first-of-type {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }

      .col:last-of-type {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
      }

      .twig {
        height: 32px;
        width: 100%;

        &.w-1 {
          width: 33%;
        }

        &.w-2 {
          width: 50%;
        }
      }

      .role {
        width: 32px;
        height: 32px;
        border-radius: 32px;
      }
    }
  }
}
</style>
