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
        <template slot="children">
          <p>
            说明：积分在1-1599的请选择初级段位，积分在1600-1700的请
            选择中级段位；积分在1800以上的请选择高级段位
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
          <audio-player
            title="示例音频"
            url="http://techslides.com/demos/samples/sample.aac"
          />
        </template>
        <template slot="children">
          <div class="row pa-2">
            <div class="col">
              <md-button
                type="primary"
                size="small"
                class="recorder recorder_start"
                :inactive="recorder.status"
                round
                @click="record"
                >录音</md-button
              >
              <!-- <md-button
                type="primary"
                size="small"
                class="recorder recorder_stop mt-2"
                :inactive="!recorder.status"
                inline
                round
                @click="stopRecord"
              >停止录音</md-button>-->
            </div>
            <div class="col pa-1">
              <template v-if="recorder.localId">
                <audio-player title="播放录音" isWx :url="recorder.localId" />
              </template>
            </div>
          </div>
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
    "audio-player": () => import("@/components/AudioPlayer.vue")
  },
  data() {
    return {
      skillInfo: "",
      level: {
        status: false,
        active: "",
        list: [
          {
            value: 1,
            text: "低级段位"
          },
          {
            value: 1600,
            text: "中级段位"
          },
          {
            value: 1800,
            text: "高级段位"
          }
        ]
      },
      examplesPicture: false,
      serviceInfo: {
        img: {
          dataUrl: undefined,
          file: undefined
        }
      },
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
        localId: ""
      },
      testAudio: {
        playing: false,
        data: new Audio("http://techslides.com/demos/samples/sample.aac"),
        duration: 0,
        currentTime: 0,
        ended: false
      },
      tlInfo:
        "这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍。"
    };
  },
  computed: {
    ...mapState("user", ["gameList", "rankList", "sampleGraph"])
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
    onReaderComplete(name, { dataUrl, file }) {
      Toast.hide();
      this.serviceInfo.img.dataUrl = dataUrl;
      this.serviceInfo.img.file = file;
    },
    uploadVoice() {
      window.wx.uploadVoice({
        localId: this.recorder.localId,
        isShowProgressTips: 1,
        success: res => {
          console.log("serverId>>> : ", res.serverId);
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
          this.replaceAudio(url);
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
    playTest() {
      this.testAudio.data.play();
      this.testAudio.data.addEventListener("ended", () => {
        this.testAudio.playing = false;
        this.testAudio.currentTime = 0;
        this.testAudio.ended = true;
        setTimeout(() => {
          this.testAudio.ended = false;
        }, 650);
      });
      this.testAudio.data.addEventListener("timeupdate", () => {
        this.testAudio.currentTime = this.testAudio.data.currentTime;
      });
      this.testAudio.playing = true;
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
    window.wx.ready(() => {
      this.testAudio.data.load();
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
}
</style>
