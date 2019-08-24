<template>
  <div class="skeleton">
    <div class="skeleton-head">
      <div class="head-item"></div>
      <div class="head-item"></div>
      <div class="head-item"></div>
    </div>
    <div class="skeleton-content"></div>
    <div class="skeleton-content"></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonHome"
};
</script>

<style scoped>
.skeleton {
  padding: 10px;
}

.skeleton-head {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.head-item {
  width: 30%;
  height: 50px;
}

.skeleton-content {
  width: 100%;
  height: 200px;
  margin-top: 20px;
  border-radius: 10px;
}

.skeleton .head-item,
.skeleton .skeleton-content {
  background: rgb(194, 207, 214);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%
  );
  background-size: 20rem 20rem;
  animation: skeleton-stripes 1s linear infinite;
}

@keyframes skeleton-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 20rem 0;
  }
}
</style>
