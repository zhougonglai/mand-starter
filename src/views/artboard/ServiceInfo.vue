<!--
 * @Author: John Zhou
 * @LastEditors: John Zhou
 * @Description: 服务信息
 * @Date: 2019-08-10 21:01:19
 * @LastEditTime: 2019-08-11 18:27:15
 -->
<template>
  <div id="service_info">
    <md-field>
      <md-cell-item
        arrow
        title="技能类型"
        @click="gameList.status = true"
        :addon="gameList.active.name ? gameList.active.name : '请选择'"
      />
      <md-cell-item
        title="段位"
        class="border-bottom-1px"
        :addon="rankList.active.rankName ? rankList.active.rankName : '请选择'"
        @click="rankList.status = true"
        no-border
        arrow
      >
        <template
          slot="children"
          v-if="gameList.active.id === '847e9dff77ba495da3cc8176e6bc4a5d'"
        >
          <p class="description">
            说明：积分在1-1599的请选择初级段位，积分在1600-1700的请
            选择中级段位；积分在1800以上的请选择高级段位
          </p>
        </template>
        <template
          slot="children"
          v-if="gameList.active.id === '84aea6416dfc4e7e958056bbb0138876'"
        >
          <p class="description">
            KD值 ≤ 1的请选择初级段位； 1＜KD值 ≤ 2的请选择中级段位； KD值 ＞
            2的请选择高级段位
          </p>
        </template>
      </md-cell-item>
      <md-cell-item
        title="技能截图"
        class="border-bottom-1px"
        no-border
        :brief="
          gameList.active.type === 2
            ? '请上传真人正面清晰照片'
            : '请上传清晰游戏显示（游戏昵称和段位信息）界面的截图'
        "
      >
        <template slot="children">
          <ul class="image_box">
            <li class="image_item">
              <div
                class="img"
                :style="
                  sampleGraph.server_icon
                    ? {
                        backgroundImage: `url(${sampleGraph.server_icon})`,
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                      }
                    : {}
                "
                @click="sampleGraph.server_icon && chooseImage()"
              ></div>
              <div class="descript mt-2">
                <div class="gray text-center">资料示例图</div>
                <div class="gray mt-2 text-center">认证图片内容清晰</div>
              </div>
            </li>
            <li class="image_item">
              <div class="img add">
                <md-image-reader
                  :size="8192"
                  @error="fileError"
                  @select="onReaderSelect"
                  @complete="onReaderComplete"
                />
                <template v-if="!serviceInfo.img.url">
                  <md-icon name="camera" size="md" color="#ccc" />
                  <p>添加图片</p>
                </template>
                <img v-else class="image-file" :src="serviceInfo.img.url" />
              </div>
              <div class="descript mt-2">
                <div class="gray text-center">上传技能截图</div>
                <div class="gray mt-2 text-center">
                  点击{{ serviceInfo.img.dataUrl ? "更换" : "上传" }}
                </div>
              </div>
            </li>
          </ul>
        </template>
      </md-cell-item>
      <md-cell-item
        title="技能介绍"
        class="border-bottom-1px"
        brief="好的描述可以让别人更了解你，提高接单率"
        no-border
      >
        <template slot="right">
          <small class="smaller" @click="popupEx.status = true"
            >点击查看示例</small
          >
        </template>
        <template slot="children">
          <div class="fill relative textarea">
            <textarea
              v-model="serviceInfo.skillInfo"
              @change="skillInput"
              :rows="3"
              :maxlength="300"
              placeholder="点击填写"
              class="fiel-input input-textarea"
            />
            <div class="hit">{{ serviceInfo.skillInfo.length }} / 300</div>
          </div>
        </template>
      </md-cell-item>
      <md-cell-item
        title="语音介绍"
        no-border
        brief="请上传您的一段该技能类型的语音介绍，一段好的语音介绍可以提升 200%的接单率(支持mp3/m4a格式的音频建议30s以内)"
      >
        <template slot="right">
          <div class="right-content">
            <audio-player
              ref="voice"
              class="mt-2"
              url="http://ywm.nnn.com/voicesamples.m4a"
            />
            <p class="gray text-center description">示例音频</p>
          </div>
        </template>
        <template slot="children">
          <div class="row gute-3">
            <div class="col">
              <md-button
                type="primary"
                size="small"
                class="recorder recorder_start"
                :inactive="recorder.status"
                round
                plain
                @click="record"
                >{{ serviceInfo.voiceUrl ? "重新录制" : "开始录音" }}</md-button
              >
            </div>
            <div class="col" v-if="serviceInfo.voiceUrl">
              <audio-player
                ref="recorder"
                class="ml-5"
                title="播放录音"
                :url="serviceInfo.voiceUrl"
                @loadedmetadata="loadedmetadata"
              />
            </div>
          </div>
        </template>
      </md-cell-item>
    </md-field>

    <md-action-bar :actions="action" />
    <md-selector
      title="技能类型"
      v-model="gameList.status"
      max-height="calc(100vh - 1.2rem)"
      :data="gameList.list"
      @choose="activeGame"
      @cancel="gameList.status = false"
    >
      <template slot-scope="{ option }">
        <div class="selector-item-body">
          <div class="selector-item-left">
            <img :src="option.unselectIcon" />
          </div>
          <div class="selector-item-content">
            <p calss="selector-item-title text-center" v-text="option.name" />
          </div>
          <div class="selector-item-right" />
        </div>
      </template>
    </md-selector>
    <md-selector
      title="选择陪玩段位"
      v-model="rankList.status"
      :data="
        rankList.list.map(item => ({
          ...item,
          value: item.rankId,
          text: item.rankName
        }))
      "
      @choose="activeRankList"
      @cancel="rankList.status = false"
    />
    <md-image-viewer
      v-if="sampleGraph.server_icon"
      v-model="examplesPicture"
      :list="[sampleGraph.server_icon]"
      :has-dots="false"
    />
    <md-popup v-model="popupEx.status">
      <div class="popup popup-center">
        <img :src="sampleGraph.skill_icon" />
      </div>
    </md-popup>
    <md-popup
      v-model="recorder.status"
      position="bottom"
      :mask-closable="false"
    >
      <md-popup-title-bar
        title-align="left"
        ok-text="完成"
        large-radius
        @confirm="stopRecord"
      />
      <div class="popup-content popup-bottom">
        <p>录制中</p>
        <svg
          width="55"
          height="80"
          viewBox="0 0 55 80"
          xmlns="http://www.w3.org/2000/svg"
          fill="#C158FE"
        >
          <g transform="matrix(1 0 0 -1 0 80)">
            <rect width="10" height="20" rx="3">
              <animate
                attributeName="height"
                begin="0s"
                dur="4.3s"
                values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="15" width="10" height="80" rx="3">
              <animate
                attributeName="height"
                begin="0s"
                dur="2s"
                values="80;55;33;5;75;23;73;33;12;14;60;80"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="30" width="10" height="50" rx="3">
              <animate
                attributeName="height"
                begin="0s"
                dur="1.4s"
                values="50;34;78;23;56;23;34;76;80;54;21;50"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="45" width="10" height="30" rx="3">
              <animate
                attributeName="height"
                begin="0s"
                dur="2s"
                values="30;45;13;80;56;72;45;76;34;23;67;30"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        </svg>
        <small>{{ this.recorder.time }}s</small>
      </div>
    </md-popup>
  </div>
</template>
<script>
import {
  Icon,
  Field,
  Toast,
  Popup,
  CellItem,
  Selector,
  ActionBar,
  ImageViewer,
  ImageReader,
  PopupTitleBar,
  Button
} from "mand-mobile";
import imageProcessor from "mand-mobile/components/image-reader/image-processor";
import RecordRTC from "recordrtc";
import { isWx, round, wxConfig, dataURLtoFile } from "@/utils";
import { mapActions, mapState } from "vuex";
import device from "current-device";

const isEdge =
  navigator.userAgent.indexOf("Edge") !== -1 &&
  (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default {
  name: "service-info",
  components: {
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [CellItem.name]: CellItem,
    [Selector.name]: Selector,
    [ImageViewer.name]: ImageViewer,
    [ImageReader.name]: ImageReader,
    [ActionBar.name]: ActionBar,
    [Button.name]: Button,
    [PopupTitleBar.name]: PopupTitleBar,
    "audio-player": () => import("@/components/AudioPlayer.vue")
  },
  data() {
    return {
      isWx: isWx(),
      examplesPicture: false,
      popupEx: {
        status: false
      },
      mime: ["jpg", "jpeg", "png"],
      action: [
        {
          text: "返回",
          onClick: this.goBack
        },
        {
          text: "提交",
          disabled: false,
          onClick: this.resultPage
        }
      ],
      recorder: {
        isWx: isWx(),
        timer: 0,
        time: 0,
        status: false,
        mediaRecorder: "",
        mediaSteam: "",
        blob: "",
        localId: "",
        url: ""
      },
      tlInfo:
        "这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍。"
    };
  },
  computed: {
    ...mapState("config", ["config"]),
    ...mapState("user", [
      "info",
      "gameList",
      "rankList",
      "serviceInfo",
      "sampleGraph",
      "playerStatus"
    ])
  },
  methods: {
    levelChoose(level) {
      this.level.active = level;
    },
    levelToggle() {
      this.level.status = !this.level.status;
    },
    activeGame(game) {
      this.activeGameList({ ...game, refresh: true });
    },
    chooseImage() {
      this.examplesPicture = true;
    },
    onReaderSelect() {
      Toast.loading("图片读取中...");
    },
    fileError(name, { code }) {
      const errorMessage = {
        "100": "浏览器不支持",
        "101": "图片超过8M",
        "102": "图片读取失败",
        "103": "图片数量超过限制"
      };
      Toast.failed(errorMessage[code]);
    },
    async onReaderComplete(name, { dataUrl, file }) {
      Toast.hide();
      if (this.mime.map(i => file.type.includes(i)).filter(i => i).length) {
        const img = new Image();
        img.src = dataUrl;
        img.onload = async () => {
          const resFile = await imageProcessor({
            dataUrl,
            width: img.width,
            height: img.height,
            quality:
              file.size < 1024
                ? 1
                : file.size < 3072
                ? 0.3
                : file.size < 5120
                ? 0.2
                : 0.1
          });
          const fileCompress = dataURLtoFile(resFile.dataUrl, file.name);
          this.serviceInfo.img.dataUrl = resFile.dataUrl;
          this.serviceInfo.img.file = fileCompress;
          const res = await this.fileUpload(fileCompress);
          if (res.code === 0) {
            this.serviceInfo.img.url = res.data[0];
          } else {
            this.serviceInfo.img = {};
          }
        };
      } else {
        Toast.info("仅支持jpg、jpeg、png格式的图片");
      }
    },
    uploadVoice() {
      window.wx.uploadVoice({
        localId: this.recorder.localId,
        isShowProgressTips: 1,
        success: ({ serverId }) => {
          this.serviceInfo.serverId = serverId;
          this.getWxMedia(serverId).then(({ rtnInfo: { data } }) => {
            if (typeof data === "string") {
              this.serviceInfo.voiceUrl = data;
            }
          });
        }
      });
    },
    loadedmetadata(duration) {
      this.serviceInfo.duration = round(duration);
    },
    record() {
      if (isWx()) {
        if (
          this.$refs.voice.playing ||
          ("recorder" in this.$refs && this.$refs.recorder.playing)
        ) {
          Toast.info("有音频正在播放中");
          return;
        }
        window.wx.startRecord({
          success: () => {
            this.recorder.status = true;
            this.recorder.timer = setInterval(() => {
              if (this.recorder.time < 30) {
                this.recorder.time += 1;
              } else {
                if (this.recorder.status) {
                  // 超过30秒自动停止
                  this.stopRecord();
                  Toast.info("录音不能超过30s");
                }
              }
            }, 1000);
          },
          fail: ({ errMsg }) => {
            console.log("startRecord fail", errMsg);
          },
          cancel: () => {
            Toast.info("此次录音已取消");
          }
        });
      } else if (
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia
      ) {
        navigator.mediaDevices
          .getUserMedia({
            audio: isEdge
              ? true
              : {
                  echoCancellation: false
                }
          })
          .then(stream => {
            let config = {
              type: "audio",
              numberOfAudioChannels: isEdge ? 1 : 2,
              checkForInactiveTracks: true,
              bufferSize: 16384
            };
            if (isSafari || isEdge) {
              config.recorderType = RecordRTC.StereoAudioRecorder;
              this.recorder.localId = "";
            }
            this.recorder.mediaSteam = stream;
            this.recorder.mediaRecorder = new RecordRTC(stream, config);
            this.recorder.mediaRecorder.startRecording();
            this.recorder.status = true;
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        alert("该浏览器不支持录音");
      }
    },
    stopRecord() {
      if (this.recorder.status) {
        if (isWx()) {
          window.wx.stopRecord({
            success: res => {
              clearInterval(this.recorder.timer);
              this.serviceInfo.duration = this.recorder.time;
              if (this.recorder.time >= 5) {
                if (this.serviceInfo.voiceUrl) {
                  this.serviceInfo.voiceUrl = "";
                }
                this.recorder.localId = res.localId;
                this.uploadVoice();
              } else {
                Toast.info("录音不能低于5S，请重新录音");
              }
              this.recorder.time = 0;
              this.recorder.timer = 0;
              this.recorder.status = false;
            },
            fail: () => {
              clearInterval(this.recorder.timer);
              this.recorder.time = 0;
              this.recorder.timer = 0;
              this.recorder.status = false;
            }
          });
        } else {
          this.recorder.mediaRecorder.stopRecording(() => {
            this.recorder.status = false;
            const url = URL.createObjectURL(
              this.recorder.mediaRecorder.getBlob()
            );
            this.recorder.mediaSteam.stop();
            this.recorder.localId = url;
          });
        }
      }
    },
    // 过滤部分表情包
    skillInput() {
      const ranges = [
        "\ud83c[\udf00-\udfff]",
        "\ud83d[\udc00-\ude4f]",
        "\ud83d[\ude80-\udeff]"
      ];
      this.serviceInfo.skillInfo = this.serviceInfo.skillInfo.replace(
        new RegExp(ranges.join("|"), "g"),
        ""
      );
    },
    playRecord() {
      window.wx.playVoice({
        localId: this.recorder.localId
      });
    },
    async resultPage() {
      if (!this.rankList.active.value) {
        Toast.info("需要选择段位");
        return;
      } else if (!this.serviceInfo.img.url) {
        Toast.info("需要上传技能截图");
        return;
      } else if (!this.serviceInfo.skillInfo) {
        Toast.info("需要填写技能介绍");
        return;
      }
      this.action[1].disabled = true;
      const rtnInfo = await this.playerInformationAdd();
      if (rtnInfo.code === 0) {
        const res = await this.getPlayerStatus();
        if (res) {
          this.$router.push({ name: "result_page" }, () => {
            this.action[1].disabled = false;
          });
        }
      }
      this.action[1].disabled = false;
    },
    activeRankList(active) {
      this.rankList.active = active;
    },
    goBack() {
      this.$router.push({ name: "basic_info" });
    },
    ...mapActions("config", ["getWxConfig", "getWxMedia"]),
    ...mapActions("user", [
      "fileUpload",
      "getgameList",
      "getPlayerStatus",
      "activeGameList",
      "playerInformationAdd"
    ]),
    round
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.info.token) {
        vm.$router.push({ name: "sign_in" });
      } else if (vm.playerStatus.playerStatus === 2) {
        vm.$router.forward();
        Toast.info("您已经提交过入驻申请资料，请耐心等待官方的审核");
      }
    });
  },
  async created() {
    this.getgameList().then(({ data }) => {
      // 游戏类型文案 补偿
      if (!this.gameList.active.type) {
        this.gameList.active.type = data.find(
          ({ id }) => id === this.gameList.active.id
        ).type;
      }
    });
    this.$nextTick(() => {
      Toast.hide();
    });
    if (isWx() && device.android()) {
      const config = await this.getWxConfig();
      wxConfig(config);
      window.wx.ready(() => {
        window.wx.updateAppMessageShareData({
          title: "入驻NN游戏陪玩，瓜分百万现金奖励",
          desc: "开心玩，轻松赚，千万用户量的陪玩平台",
          link: "http://ywm.nnn.com/sign/in",
          imgUrl: "http://ywm.nnn.com/nnlogoshare.jpg"
        });
        window.wx.updateTimelineShareData({
          title: "入驻NN游戏陪玩，瓜分百万现金奖励",
          link: "http://ywm.nnn.com/sign/in",
          imgUrl: "http://ywm.nnn.com/nnlogoshare.jpg"
        });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
#service_info {
  height: 100vh;

  >>>.md-field {
    padding-bottom: 50vh;
  }

  >>>.md-cell-item-children {
    padding-top: 0;
  }

  .right-content {
    min-width: 25vw;

    >>>.md-button {
      background-color: #909399;
    }
  }

  p.description {
    font-size: 24px;
    color: #909399;
    letter-spacing: 0;
    line-height: 40px;
  }

  .image_box {
    display: flex;

    .image_item {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 50%;

      .img {
        height: 200px;
        width: 200px;
        border-radius: 8px;
        position: relative;
        background: #FFF;
        box-shadow: 0 5px 20px rgba(197, 202, 213, 0.25);
        box-sizing: border-box;
        border-radius: 8px;
        background-size: cover;
        overflow: hidden;
        background-color: #F5F5F7;

        img.image-file {
          width: 100%;
          height: 100%;
        }

        &.add {
          >>> .md-icon {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.5;
          }

          p {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            margin-top: 15px;
            font-size: 22px;
            color: #ccc;
            text-align: center;
          }
        }
      }
    }
  }

  >>>.recorder {
    width: 25vw;

    &+.recorder {
      margin-left: 16px;
    }
  }

  audio {
    margin-top: 16px;
  }

  .popup {
    position: relative;
    font-size: 28px;
    font-weight: 500;
    box-sizing: border-box;
    background-color: #FFF;
    width: 90vw;

    &.popup-center {
      overflow: hidden;

      img {
        width: 100%;
        height: inherit;
      }

      border-radius: radius-normal;
    }
  }

  .popup-content {
    background-color: #FFF;
    position: relative;
    font-size: font-minor-large;
    background: color-bg-base;
    box-sizing: border-box;
    text-align: center;

    &.popup-bottom {
      width: 100%;
      padding: 0 0 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      svg {
        margin: 50px 0;
      }

      p {
        font-size: 64px;
        line-height: 64px;
        font-weight: 200;
        color: #999;
      }
    }
  }
}
</style>
