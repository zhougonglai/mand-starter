<template>
  <div class="details">
    <div class="app-header">
      <div
        class="header-action left"
        @click="$router.push({ name: 'account' })"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </div>

      <div
        class="header-action right"
        @click="$router.push({ name: 'account_avatar' })"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconic_edit" />
        </svg>
      </div>
    </div>

    <div class="user-cover">
      <img class="avatar" :src="info.imageUrl" :alt="info.nickName" />
    </div>

    <div class="user-content">
      <div class="cells">
        <div class="cell-header">
          <div class="cell-title larger border-bottom-1px bold">资料</div>
        </div>
        <div
          class="cell-item"
          @click="$router.push({ name: 'account_nickname' })"
        >
          <div class="item_content border-bottom-1px">
            <p class="larger">昵称</p>
            <div class="biref text-gray">{{ info.nickName }}</div>
            <div class="content_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconchakangengduojiantou" />
              </svg>
            </div>
          </div>
        </div>

        <div class="cell-item">
          <div class="item_content border-bottom-1px">
            <p class="larger">ID</p>
            <div class="biref text-gray">{{ info.memberNo }}</div>
          </div>
        </div>
        <div class="cell-item">
          <div class="item_content border-bottom-1px">
            <p class="larger">邀请码</p>
            <div class="biref text-gray">{{ info.memberNo }}</div>
          </div>
        </div>
        <div class="cell-item">
          <div class="item_content border-bottom-1px">
            <p class="larger">性别</p>
          </div>
        </div>
        <div class="cell-item">
          <div class="item_content border-bottom-1px">
            <p class="larger">年龄</p>
          </div>
        </div>
        <div class="cell-item">
          <div class="item_content border-bottom-1px">
            <p class="larger">QQ</p>
            <div class="biref text-gray">{{ info.qQNo }}</div>
          </div>
        </div>
        <div class="cell-item">
          <div class="item_content border-bottom-1px">
            <p class="larger">手机号</p>
            <div class="biref text-gray">{{ info.plainTextPhone }}</div>
          </div>
        </div>
        <div class="cell-item">
          <div class="item_content border-bottom-1px">
            <p class="larger">地区</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "account_details",
  computed: {
    ...mapState("user", ["info"])
  }
};
</script>
<style lang="stylus" scoped>
.details {
  width: 750px;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

  .app-header {
    position: fixed;
    z-index: 99;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    opacity: 0.4;

    .left {
      .icon {
        transform: rotate(180deg);
      }
    }
  }

  .user-cover {
    width: 100%;
    position: fixed;
    z-index: -1;
    top: 0;
  }

  .user-content {
    margin-top: 100vw;
    z-index: 11;
  }
}
</style>
