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
            <li
              class="image_item"
              v-for="(img, $index) in clipImgs.imgs"
              @click="chooseImage($index)"
              :key="$index"
            >
              <div class="img">
                <img :src="img" />
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
          <md-button type="link" size="small">点击查看示例</md-button>
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
            :loading="recorder.recording"
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
            :inactive="recorder.localId"
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
          <md-button type="primary" round>提交</md-button>
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
      :list="clipImgs.imgs"
      :has-dots="true"
      :initial-index="clipImgs.active"
    />
  </div>
</template>
<script>
import { Field, CellItem, Selector, ImageViewer, Button } from "mand-mobile";
import RecordRTC from "recordrtc";
import { isWx, wxConfig } from "@/utils";
import { mapActions } from "vuex";

const isEdge =
  navigator.userAgent.indexOf("Edge") !== -1 &&
  (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default {
  name: "service-info",
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Selector.name]: Selector,
    [ImageViewer.name]: ImageViewer,
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
        active: 0,
        imgs: [
          "http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a",
          "http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7"
        ]
      },
      recorder: {
        isWx: isWx(),
        status: false,
        recording: false,
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
    chooseImage(i) {
      this.clipImgs.active = i;
      this.clipImgs.status = true;
    },
    record() {
      if (isWx()) {
        window.wx.startRecord();
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
            this.recorder.recording = true;
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        alert("该浏览器不支持");
      }
    },
    stopRecord() {
      if (isWx()) {
        window.wx.stopRecord({
          success: res => {
            alert("停止录音", res);
            this.recorder.localId = res.localId;
            this.recorder.status = false;
            this.recorder.recording = false;
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
    ...mapActions("config", ["getWxConfig"])
  },
  mounted() {
    this.getWxConfig().then(data => {
      if (data) {
        wxConfig(data);
      } else {
        alert("微信配置获取失败");
      }
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

      .img {
        img {
          height: 200px;
          width: 200px;
          border-radius: 8px;
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
}
</style>
