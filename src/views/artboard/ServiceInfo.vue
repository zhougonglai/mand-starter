<template>
  <div id="service_info">
    <md-field>
      <md-cell-item
        title="技能类型"
        :addon="skill.active.text ? skill.active.text : '请选择'"
        arrow
        @click="skillToggle"
      />
      <md-cell-item
        title="段位"
        class="border-bottom-1px"
        :addon="level.active.text ? level.active.text : '请选择'"
        @click="levelToggle"
        arrow
        no-border
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
                :style="{
                  backgroundImage: `url(${clipImgs.img})`,
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }"
                @click="chooseImage"
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
          <md-button type="link" size="small" @click="popupEx.status = true"
            >点击查看示例</md-button
          >
        </template>
        <template slot="children">
          <textarea
            v-model="tlInfo"
            :rows="3"
            :maxlength="400"
            class="fiel-input input-textarea"
          />
          <div class="hit">{{ tlInfo.length }} / 400</div>
        </template>
      </md-cell-item>
      <md-cell-item
        title="语音介绍"
        no-border
        brief="请上传您的一段该服务类型的语音介绍，一段好的语音介绍可以提升 200%的接单率(支持mp3/m4a格式的音频建议30s以内)"
      >
        <template slot="children">
          <md-button
            type="primary"
            size="small"
            class="recorder recorder_start"
            :inactive="recorder.status"
            inline
            round
            @click="record"
            >录音</md-button
          >
          <md-button
            type="primary"
            size="small"
            class="recorder recorder_stop"
            :inactive="!recorder.status"
            inline
            round
            @click="stopRecord"
            >停止录音</md-button
          >
          <audio
            v-if="!recorder.isWx"
            controls
            autoplay
            playsinline
            ref="audio"
          />
          <md-button
            type="primary"
            :inactive="!recorder.localId"
            size="small"
            class="recorder recorder_player"
            inline
            round
            @click="playRecord"
            >播放录音</md-button
          >
        </template>
      </md-cell-item>
      <md-cell-item>
        <template slot="children">
          <md-button type="primary" round @click="resultPage">提交</md-button>
        </template>
      </md-cell-item>
    </md-field>
    <md-selector
      title="技能类型"
      v-model="skill.status"
      :data="skill.list"
      @choose="skillChoose"
    />
    <md-selector
      title="选择陪玩段位"
      v-model="level.status"
      :data="level.list"
      @choose="levelChoose"
    />
    <md-image-viewer
      v-model="clipImgs.status"
      :list="[clipImgs.img]"
      :has-dots="false"
      :initial-index="clipImgs.active"
    />
    <md-popup v-model="popupEx.status">
      <div class="popup popup-center">{{ tlInfo }}</div>
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
  ImageViewer,
  ImageReader,
  Button
} from "mand-mobile";
import RecordRTC from "recordrtc";
import { isWx } from "@/utils";

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
    [Button.name]: Button
  },
  data() {
    return {
      skill: {
        status: false,
        active: "",
        list: [
          {
            value: 1,
            text: "英雄联盟"
          },
          {
            value: 2,
            text: "丛林精英"
          }
        ]
      },
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
      clipImgs: {
        status: false,
        img:
          "http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a"
      },
      serviceInfo: {
        img: {
          dataUrl: undefined,
          file: undefined
        }
      },
      popupEx: {
        status: false
      },
      recorder: {
        isWx: isWx(),
        status: false,
        mediaRecorder: null,
        mediaSteam: null,
        blob: null,
        localId: ""
      },
      tlInfo:
        "这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍。"
    };
  },
  methods: {
    skillChoose(skill) {
      this.skill.active = skill;
    },
    skillToggle() {
      this.skill.status = !this.skill.status;
    },
    levelChoose(level) {
      this.level.active = level;
    },
    levelToggle() {
      this.level.status = !this.level.status;
    },
    chooseImage() {
      this.clipImgs.status = true;
    },
    onReaderSelect() {
      Toast.loading("图片读取中...");
    },
    onReaderComplete(name, { dataUrl, file }) {
      Toast.hide();
      this.serviceInfo.img.dataUrl = dataUrl;
      this.serviceInfo.img.file = file;
    },
    record() {
      if (isWx()) {
        window.wx.startRecord({
          success: () => {
            window.wx.onVoiceRecordEnd({
              complete: res => {
                Toast.info(`最多只能录制1分钟,${JSON.stringify(res)}`);
                this.recorder.localId = res.localId;
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
            console.log(stream);
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
    resultPage() {
      this.$router.push({ name: "result_page" });
    }
  },
  mounted() {
    window.wx.error(err => {
      alert(err.toString());
    });
  }
};
</script>
<style lang="stylus" scoped>
#service_info {
  height: 100vh;

  p {
    font-size: 24px;
    color: #909399;
    letter-spacing: 0;
    text-align: justify;
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
      padding: 50px;
      border-radius: radius-normal;
    }
  }
}
</style>
