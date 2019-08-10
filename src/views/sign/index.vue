<template>
  <div id="sign">
    <div class="logo">
      <img
        src="@/assets/logo@2x.png"
        srcset="@/assets/logo@2x.png 2x, @/assets/logo@3x.png 3x"
        alt="nn约玩"
      />
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
import { isWx, wxConfig } from "@/utils";

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
    ...mapActions("global", ["changeAreaCode"]),
    ...mapActions("config", ["getWxConfig"])
  },
  created() {
    this.current = this.$route.name;
  },
  mounted() {
    if (isWx()) {
      this.getWxConfig().then(data => {
        if (data) {
          wxConfig(data);
          console.log("nnplayer_version: ", process.env.VUE_APP_VERSION);
          window.wx.ready(() => {
            window.wx.checkJsApi({
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData"
              ],
              success: ({
                checkResult: {
                  updateAppMessageShareData,
                  updateTimelineShareData
                }
                // errMsg
              }) => {
                if (updateAppMessageShareData) {
                  window.wx.updateAppMessageShareData({
                    title: "分享给朋友/分享到QQ",
                    desc: "描述描述描述",
                    link: "http://ywm.nnn.com/sign/in",
                    imgUrl: "http://139.224.119.40/img/head-logo.png"
                  });
                }
                if (updateTimelineShareData) {
                  window.wx.updateTimelineShareData({
                    title: "分享到朋友圈/分享到QQ空间",
                    link: "http://ywm.nnn.com/sign/in",
                    imgUrl: "http://139.224.119.40/img/head-logo.png"
                  });
                }
              }
            });
          });
        } else {
          alert("微信配置获取失败");
        }
      });
    }
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

  >>>.md-tabs {
    margin-top: 32px;

    .md-tab-bar {
      background-color: transparent;
      padding: 0 20vw;
      border-bottom: 1px solid #E9E9ED;

      .md-tab-bar-item {
        font-size: 44px;

        &:not(.is-active) {
          color: #909399;
        }
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
