<template>
  <div id="service_info">
    <md-field>
      <md-cell-item
        arrow
        title="技能类型"
        @click="toggelGameList"
        :addon="gameList.active.name ? gameList.active.name : '请选择'"
      />
      <md-cell-item
        title="段位"
        class="border-bottom-1px"
        :addon="rankList.active.text ? rankList.active.text : '请选择'"
        @click="toggelRankList"
        no-border
        arrow
      >
        <template
          slot="children"
          v-if="gameList.active.id === '847e9dff77ba495da3cc8176e6bc4a5d'"
        >
          <p>
            说明：积分在1-1599的请选择初级段位，积分在1600-1700的请
            选择中级段位；积分在1800以上的请选择高级段位
          </p>
        </template>
        <template
          slot="children"
          v-if="gameList.active.id === '84aea6416dfc4e7e958056bbb0138876'"
        >
          <p>
            KD值 ≤ 1的请选择初级段位； 1＜KD值 ≤ 2的请选择中级段位； KD值 ＞
            2的请选择高级段位
          </p>
        </template>
      </md-cell-item>
      <md-cell-item
        title="服务截图"
        class="border-bottom-1px"
        no-border
        brief="请上传清晰游戏显示（游戏昵称和段位信息）界面的截图"
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
              <div
                class="img"
                :class="{ add: !serviceInfo.img.dataUrl }"
                :style="
                  serviceInfo.img.dataUrl
                    ? {
                        backgroundImage: `url(${serviceInfo.img.dataUrl})`,
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                      }
                    : {}
                "
              >
                <md-image-reader
                  @select="onReaderSelect"
                  @complete="onReaderComplete"
                />
                <template v-if="!serviceInfo.img.dataUrl">
                  <md-icon name="camera" size="md" color="#ccc" />
                  <p>添加图片</p>
                </template>
              </div>
              <div class="descript mt-2">
                <div class="gray text-center">上传服务截图</div>
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
              v-model="skillInfo"
              :rows="3"
              :maxlength="400"
              placeholder="点击填写"
              class="fiel-input input-textarea"
            />
            <div class="hit">{{ skillInfo.length }} / 400</div>
          </div>
        </template>
      </md-cell-item>
      <md-cell-item
        title="语音介绍"
        no-border
        brief="请上传您的一段该服务类型的语音介绍，一段好的语音介绍可以提升 200%的接单率(支持mp3/m4a格式的音频建议30s以内)"
      >
        <template slot="right">
          <div class="right-content">
            <audio-player
              url="http://techslides.com/demos/samples/sample.aac"
            />
            <p class="gray text-center">示例音频</p>
          </div>
        </template>
        <template slot="children">
          <md-button
            type="primary"
            size="small"
            class="recorder recorder_start"
            :inactive="recorder.status"
            round
            @click="record"
            >{{ recorder.localId ? "重新录制" : "开始录音" }}</md-button
          >
          <template v-if="recorder.localId">
            <audio-player
              class="mt-2"
              title="播放录音"
              :isWx="isWx"
              :url="recorder.localId"
            />
          </template>
          <!-- <audio v-if="!recorder.isWx" controls autoplay playsinline ref="audio" /> -->
        </template>
      </md-cell-item>
    </md-field>

    <md-action-bar :actions="action"></md-action-bar>
    <md-selector
      title="技能类型"
      v-model="gameList.status"
      max-height="calc(100vh - 1.2rem)"
      :data="gameList.list"
      @choose="activeGameList"
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
    />
    <md-image-viewer
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
import RecordRTC from "recordrtc";
import { isWx, round } from "@/utils";
import { mapActions, mapState } from "vuex";

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
      skillInfo: "",
      isWx: isWx(),
      examplesPicture: false,
      popupEx: {
        status: false
      },
      action: [
        {
          text: "返回",
          onClick: this.goBack
        },
        {
          text: "提交",
          onClick: this.resultPage
        }
      ],
      recorder: {
        isWx: isWx(),
        status: false,
        mediaRecorder: null,
        mediaSteam: null,
        blob: null,
        localId: "",
        url: undefined
      },
      tlInfo:
        "这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍。"
    };
  },
  computed: {
    ...mapState("user", ["gameList", "rankList", "serviceInfo", "sampleGraph"])
  },
  methods: {
    levelChoose(level) {
      this.level.active = level;
    },
    levelToggle() {
      this.level.status = !this.level.status;
    },
    chooseImage() {
      this.examplesPicture = true;
    },
    onReaderSelect() {
      Toast.loading("图片读取中...");
    },
    async onReaderComplete(name, { dataUrl, file }) {
      Toast.hide();
      this.serviceInfo.img.dataUrl = dataUrl;
      this.serviceInfo.img.file = file;
      const { code, data } = await this.fileUpload(file);
      if (code === 0) {
        this.serviceInfo.img.url = data[0];
      } else {
        this.serviceInfo.img = {};
      }
    },
    uploadVoice() {
      window.wx.uploadVoice({
        localId: this.recorder.localId,
        isShowProgressTips: 1,
        success: res => {
          console.log("serverId>>> : ", res.serverId);
          this.serviceInfo.serverId = res.serverId;
        }
      });
    },
    record() {
      if (isWx()) {
        window.wx.startRecord({
          success: () => {
            window.wx.onVoiceRecordEnd({
              complete: res => {
                Toast.info(`最多只能录制1分钟,${JSON.stringify(res)}`);
                this.recorder.localId = res.localId;
                this.uploadVoice();
              }
            });
          },
          cancel: () => {
            Toast.info("用户主动取消了录音");
          }
        });
        this.recorder.status = true;
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
              this.recorder.localId = undefined;
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
      if (isWx()) {
        window.wx.stopRecord({
          success: res => {
            alert("停止录音", res);
            this.recorder.localId = res.localId;
            this.recorder.status = false;
            this.uploadVoice();
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
          console.log("url", url);
        });
      }
    },
    replaceAudio(src) {
      this.$refs.audio.src = src;
    },
    playRecord() {
      window.wx.playVoice({
        localId: this.recorder.localId
      });
    },
    resultPage() {
      this.$router.push({ name: "result_page" });
    },
    goBack() {
      this.$router.push({ name: "basic_info" });
    },
    ...mapActions("user", [
      "getgameList",
      "toggelGameList",
      "toggelRankList",
      "activeGameList",
      "activeRankList"
    ]),
    round
  },
  created() {
    this.getgameList();
    this.$nextTick(() => {
      Toast.hide();
    });
  },
  mounted() {
    window.wx.error(err => {
      alert(JSON.stringify(err) + "需要重新配置微信签名");
    });
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
    width: 25vw;
  }

  p {
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
    width: 80vw;

    &.popup-center {
      img {
        width: 100%;
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

      p {
        margin-bottom: 100px;
        font-size: 64px;
        font-weight: 200;
        color: #999;
      }
    }
  }
}
</style>
