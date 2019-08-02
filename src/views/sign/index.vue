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
      :default-value="86"
      :data="areaCode.list"
      @choose="changeAreaCode"
    />
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

  /deep/.md-tabs {
    margin-top: 16px;

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
<style lang="stylus">
.input-fiel {
  width: 100%;
  display: flex;
  flex-direction: column;

  .fiel-row {
    display: flex;
    height: 80px;
    font-size: 24px;
    line-height: 80px;

    & + .fiel-row {
      margin-top: 32px;
    }
  }

  .fiel-item {
    border-radius: 40px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    font-size: 32px;
    line-height: 32px;
    font-weight: lighter;
    font-size: 28px;
    display: flex;
    align-items: center;
    padding: 8px;

    &:focus-within, &.active {
      border-color: rgba(193, 88, 254, 1);
    }

    input {
      border: none;
      padding-left: 16px;
      width: 100%;
      height: 100%;
      line-height: 1.5;
      border-radius: 32px;
    }

    button.button.small {
      width: fit-content;
    }

    & + .fiel-item {
      margin-left: 32px;
    }

    &.area_code {
      width: 33%;
    }

    .code {
      flex: 1;
      text-align: center;
    }

    i.md-icon {
      flex-basis: 54px;
      text-align: center;
    }

    svg.icon {
      width: 32px;
      height: 32px;

      &:last-child {
        margin-right: 16px;
      }
    }

    &.inline {
      display: inline-flex;
    }
  }
}
</style>
