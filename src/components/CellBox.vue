<template>
  <div class="cell-box">
    <div class="cell-header">
      <div class="cell-title" v-text="title" />
      <div class="cell-action" @click="$emit('more')">更多 ></div>
    </div>
    <div class="cell-list">
      <template v-if="cellUsers.length">
        <div
          class="cell-item"
          v-for="(cellUser, $index) in cellUsers"
          :key="$index"
        >
          <img
            class="item-avatar"
            :src="cellUser.avatar"
            :alt="cellUser.nickname"
          />
          <p class="item-label" v-text="cellUser.label" />
          <p class="item-price">
            ￥
            <span class="price" v-text="cellUser.price" /> 元/小时
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "cell-box",
  props: {
    title: String,
    cellUsers: Array
  }
};
</script>
<style lang="stylus" scoped>
.cell-box {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 16px;
  padding: 16px;
  box-sizing: border-box;

  .cell-header {
    display: flex;

    .cell-title {
      flex: 1;
      font-size: 32px;
      border-radius: 8px 0 0 8px;
      border-left: 8px solid #8c4efc;
      padding-left: 16px;
    }

    .cell-action {
      font-size: 32px;
    }
  }

  .cell-list {
    display: flex;
    padding: 16px 0;

    .cell-item {
      flex: 1;
      width: 33%;

      &+.cell-item {
        margin-left: 16px;
      }

      .item-avatar {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
