<template>
  <div id="search">
    <div class="app-header border-bottom-1px">
      <img class="avatar" :src="info.imageUrl" />
      <div class="app-header-with-search">
        <div class="search">
          输入ID或昵称
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cx" />
          </svg>
        </div>
      </div>
      <div class="app-header-action">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-setting" />
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="search-options">
        <div class="search-item">
          <div class="options">
            性别
            <svg
              class="icon"
              aria-hidden="true"
              @click="searchOptions.status = !searchOptions.status"
            >
              <use v-if="searchOptions.status" xlink:href="#icon-Man" />
              <use v-else xlink:href="#icon-woman" />
            </svg>
          </div>
        </div>
        <div class="search-item">
          <div class="options">
            排序
            <div class="triangle"></div>
          </div>
        </div>
        <div class="search-item">
          <div class="options">
            筛选
            <div class="triangle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "mand-mobile";
import { mapState } from "vuex";

export default {
  name: "search",
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  data() {
    return {
      searchOptions: {
        status: false
      }
    };
  },
  computed: {
    ...mapState("user", ["info"])
  }
};
</script>

<style lang="stylus" scoped>
#search {
  width: 750px;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;

  .content {
    flex: 1;

    .search-options {
      padding: 8px 16px;
      display: flex;
      align-items: center;

      .search-item {
        flex: 1;

        .options {
          display: inline-flex;
        }
      }
    }
  }
}

.fill {
  flex: 1;
}
</style>
