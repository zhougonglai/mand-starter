<template>
  <div id="home">
    <div class="app-header">
      <img class="logo" src="@/assets/logo.png" alt />
      <div class="app-header-with-search">
        <div class="search" />
      </div>
      <div class="app-header-action">
        <md-button type="primary" size="small" inline round @click="gotoSign"
          >申请入驻</md-button
        >
      </div>
    </div>
    <div class="menus">
      <md-swiper :autoplay="0" :is-loop="false">
        <md-swiper-item v-for="(gameArr, $index) in games" :key="$index">
          <ul class="game-box">
            <li
              class="game-item"
              v-for="(game, $$index) in gameArr"
              :key="$$index"
            >
              <svg
                class="icon game-icon"
                aria-hidden="true"
                @click="trigerTarget(game.key)"
              >
                <use :xlink:href="game.icon" />
              </svg>
              <span class="game-label">{{ game.name }}</span>
            </li>
          </ul>
        </md-swiper-item>
      </md-swiper>
    </div>
    <cell-box title="热门推荐" :cellUsers="cellUsers" />
  </div>
</template>
<script>
import { Button, Swiper, SwiperItem } from "mand-mobile";

export default {
  name: "home",
  components: {
    [Button.name]: Button,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    "cell-box": () => import("@/components/CellBox.vue")
  },
  data() {
    return {
      games: [
        [
          {
            name: "分享给朋友/分享到QQ",
            icon: "#icon-ziyuan4",
            key: "updateAppMessageShareData"
          },
          {
            name: "分享到朋友圈/分享到QQ空间",
            icon: "#icon-ziyuan3",
            key: "updateTimelineShareData"
          },
          {
            name: "分享到腾讯微博",
            icon: "#icon-ziyuan2",
            key: "onMenuShareWeibo"
          },
          {
            name: "分享到QQ空间",
            icon: "#icon-gedou",
            key: "onMenuShareQZone"
          },
          {
            name: "开始录音",
            icon: "#icon-tiyu",
            key: "startRecord"
          },
          {
            name: "停止录音",
            icon: "#icon-xiuxianfangzhi",
            key: "stopRecord"
          },
          {
            name: "播放语音",
            icon: "#icon-ziyuan",
            key: "playVoice"
          },
          {
            name: "拍照或从手机相册中选图",
            icon: "#icon-qipai1",
            key: "chooseImage"
          }
        ],
        [
          {
            name: "益智",
            icon: "#icon-yizhi"
          },
          {
            name: "音乐",
            icon: "#icon-mmp"
          },
          {
            name: "射击",
            icon: "#icon-sheji1"
          }
        ]
      ],
      cellUsers: [
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "心悦君兮♕满满呢",
          price: 60,
          avatar:
            "http://img1.tuwandata.com/v2/thumb/jpg/NDVjMiwzNjQsMzY0LDksMywxLC0xLE5PTkUsLCw5MA==/u/www.tuwan.com/uploads/play/2869651548938183.png"
        },
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "她太甜♚小仙女ღ锦梨",
          price: 75,
          avatar:
            "http://img.tuwandata.com/v2/thumb/jpg/ZWU5NSwzNjQsMzY0LDksMywxLC0xLE5PTkUsLCw5MA==/u/www.tuwan.com/uploads/play/1648781535797050.jpg"
        },
        {
          user_id: 123,
          nickname: "方糖酱酱",
          label: "平台最强♕职业选手包C秒接",
          price: 45,
          avatar:
            "http://img1.tuwandata.com/v2/thumb/jpg/MDQ4NywzNjQsMzY0LDksMywxLC0xLE5PTkUsLCw5MA==/u/www.tuwan.com/uploads/play/1043361563432825.png"
        }
      ],
      localId: ""
    };
  },
  methods: {
    gotoSign() {
      this.$router.push({ name: "binding" });
    },
    trigerTarget(key) {
      this[key]();
    },
    updateAppMessageShareData() {
      window.wx.ready(() => {
        window.wx.updateAppMessageShareData({
          title: "分享给朋友/分享到QQ",
          desc: "描述描述描述",
          link: "http://qq156471181.vicp.cc/binding",
          imgUrl: "https://www.leigod.com/images/leishen_logo725.png",
          success() {
            alert("转发成功");
          }
        });
      });
    },
    updateTimelineShareData() {
      window.wx.ready(() => {
        window.wx.updateTimelineShareData({
          title: "分享到朋友圈/分享到QQ空间",
          link: "http://qq156471181.vicp.cc/binding",
          imgUrl: "https://www.leigod.com/images/leishen_logo725.png",
          success() {
            alert("转发成功");
          }
        });
      });
    },
    onMenuShareWeibo() {
      alert("还没做");
    },
    onMenuShareQZone() {
      alert("还没做");
    },
    startRecord() {
      window.wx.startRecord();
    },
    stopRecord() {
      window.wx.stopRecord({
        success: res => {
          alert("停止录音", res);
          this.localId = res.localId;
        }
      });
    },
    playVoice() {
      console.log(this.localId);
      window.wx.playVoice({
        localId: this.localId
      });
    },
    chooseImage() {
      window.wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          alert("文件Id", localIds);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
#home {
  width: 750px;
  flex: 1;
  overflow-y: auto;

  .menus {
    height: 320px;

    .game-box {
      margin: 0;
      padding: 0;
      display: flex;
      height: 100%;
      align-items: self-start;
      flex-wrap: wrap;
      flex-direction: row;
      padding: 16px;

      .game-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        font-size: 16px;
        flex-direction: column;

        .game-icon {
        }

        .game-label {
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
