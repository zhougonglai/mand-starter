<template>
  <div id="sign">
    <div class="logo">
      <img src="@/assets/images/login_logo.png" alt="nn约玩" />
    </div>
    <md-tabs v-model="current" @change="paneChange">
      <md-tab-pane
        class="content"
        v-for="pane in signPane"
        :key="pane.name"
        :name="pane.name"
        :label="pane.label"
      >
        <router-view v-if="current === pane.name" />
      </md-tab-pane>
    </md-tabs>
    <md-selector
      v-model="areaCode.status"
      title="选择手机区号"
      :default-value="86"
      :data="areaCode.list"
      @choose="changeAreaCode"
      max-height="calc(100vh - 1.2rem)"
    >
      <template slot-scope="{ option }">
        <div
          class="selector-item-body"
          :class="{ selected: option.code === areaCode.item.code }"
        >
          <div class="selector-item-left">
            <span class="holder" v-text="option.group" />
          </div>
          <div class="selector-item-content">
            <p class="selector-item-title">
              <small class="gray">({{ option.iso_code }})</small>
              <span v-text="option.name" />
            </p>
            <p class="selector-item-brief" v-text="option.code" />
          </div>
          <div class="selector-item-right flex justyfy-center align-center">
            <img :src="option.ico" class="icon-ico" :alt="option.name" />
          </div>
        </div>
      </template>
    </md-selector>
  </div>
</template>
<script>
import { Tabs, TabPane, Selector } from "mand-mobile";
import { mapState, mapActions } from "vuex";

export default {
  name: "sign",
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Selector.name]: Selector
  },
  data() {
    return {
      current: "sign_in",
      signPane: [
        {
          name: "sign_in",
          label: "登录"
        },
        {
          name: "sign_up",
          label: "注册"
        }
      ]
    };
  },
  computed: {
    ...mapState("global", ["areaCode"])
  },
  methods: {
    paneChange({ name }) {
      this.$router.push({ name });
    },
    ...mapActions("global", ["changeAreaCode"])
  },
  created() {
    this.current = this.$route.name;
  }
};
</script>
<style lang="stylus" scoped>
#sign {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 10vw;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
  }

  .selector-item-body {
    display: flex;
    align-items: center;

    &.selected {
      .selector-item-content {
        color: color-primary;
      }
    }

    &.disabled {
      opacity: 0.3;
    }

    .selector-item-left {
      flex-shrink: 0;
      margin-right: 32px;

      .holder {
        display: block;
        width: 88px;
        height: 88px;
        border-radius: 44px;
        background-color: #e6e6e6;
        font-size: 32px;
        font-weight: 500;
        color: color-primary;
        text-align: center;
        line-height: 88px;
      }
    }

    .selector-item-right {
      flex-shrink: 0;
      width: 88px;
      height: 88px;

      .icon-ico {
      }
    }

    .selector-item-content {
      flex: 1;
      color: #111a34;
      font-size: 32px;
      line-height: 1.2;

      .selector-item-title {
        line-height: 1.2;
      }

      .selector-item-brief {
        color: #858b9c;
        font-size: 24px;
        line-height: 1.4;
        margin-top: 8px;
      }
    }
  }

  >>>.md-tabs {
    margin-top: 32px;

    .md-tab-bar {
      background-color: transparent;
      padding: 0 20vw;
      border-bottom: 1px solid #E9E9ED;

      .md-tab-bar-item {
        font-size: 44px;
      }

      .md-tab-bar-ink {
        height: 8px;
        left: 8%;
        max-width: 48px;
        border-radius: 5px;
      }
    }
  }
}
</style>
