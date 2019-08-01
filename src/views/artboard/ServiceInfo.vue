<template>
  <div id="service_info">
    <md-field>
      <md-cell-item
        title="技能类型"
        :addon="skill.active.text"
        arrow
        @click="skillToggle"
      />
      <md-cell-item
        title="段位"
        :addon="level.active.text"
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
        brief="好的描述可以让别人更了解你，提高接单率"
        no-border
      >
        <template slot="right">
          <md-button type="link" size="small">点击查看示例</md-button>
        </template>
        <template slot="children"
          >这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。这里是兴趣爱好的介绍。</template
        >
      </md-cell-item>
      <md-cell-item
        title="语音介绍"
        brief="请上传您的一段该服务类型的语音介绍，一段好的语音介绍可以提升 200%的接单率(支持mp3/m4a格式的音频建议30s以内)"
      >
        <template slot="children">
          <md-button type="primary" size="small" inline round @click="record"
            >录音</md-button
          >
          <input type="file" accept="audio/*" @onchange="playRecord" />
        </template>
      </md-cell-item>
      <md-cell-item>
        <template slot="children">
          <md-button type="primary" round>提交</md-button>
        </template>
      </md-cell-item>
    </md-field>
    <md-selector
      v-model="skill.status"
      :data="skill.list"
      @choose="skillChoose"
    />
    <md-selector
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
      }
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
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          console.log(stream);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    recordSteam(stream) {
      const audioContext =
        new window.AudioContext() || window.webkitAudioContext;
      const mediaNode = audioContext.createMediaStreamSource(stream);
      mediaNode.connect(audioContext.destination);
    },
    playRecord(stream) {
      console.log(stream);
    }
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
}
</style>
