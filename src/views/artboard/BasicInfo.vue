<template>
  <div id="basic_info">
    <div v-if="reasons" class="popup top">{{ reasons }}</div>
    <md-field>
      <md-input-item
        ref="qqNo"
        type="tel"
        clearable
        v-model="basicInfo.qQNO"
        placeholder="请输入QQ号码"
        align="right"
      >
        <template slot="left">
          <span class="text-dark text-title">QQ号码</span>
          <small class="text-gray align-self-flex-end small ml-1">(必填)</small>
        </template>
      </md-input-item>
      <md-input-item
        type="text"
        readonly
        ref="phone"
        v-model="info.phone"
        placeholder="请输入手机号"
        align="right"
      >
        <template slot="left">
          <span class="text-dark text-title">手机号</span>
          <small class="text-gray align-self-flex-end small ml-1">(必填)</small>
        </template>
      </md-input-item>
      <md-cell-item>
        <template slot="left">
          <span class="text-dark text-title">性别</span>
          <small class="text-gray small ml-1">(必填)</small>
        </template>
        <template slot="right">
          <md-radio name="1" v-model="basicInfo.gender" label="男" inline />
          <md-radio name="2" v-model="basicInfo.gender" label="女" inline />
        </template>
      </md-cell-item>
      <md-cell-item
        :addon="
          citySelector.active.length ? citySelector.active.join('-') : '请选择'
        "
        arrow
        @click="toggleCitySelector"
      >
        <template slot="left">
          <span class="text-dark text-title">所在城市</span>
          <small class="text-gray small ml-1">(必填)</small>
        </template>
      </md-cell-item>
      <md-cell-item
        :addon="
          ageSelector.active.value ? `${ageSelector.active.value}岁` : '请选择'
        "
        arrow
        @click="toggleAgeSelector"
      >
        <template slot="left">
          <span class="text-dark text-title">年龄</span>
          <small class="text-gray small ml-1">(必填)</small>
        </template>
      </md-cell-item>
      <md-cell-item no-border class="border-bottom-1px">
        <template slot="left">
          <span class="text-dark text-title">个性标签</span>
          <small class="text-gray small ml-1">(必填)</small>
        </template>
        <template slot="right">
          <small class="text-gray smaller"
            >最多可选择3个标签({{ tags.active.length }}/3)</small
          >
        </template>
        <template slot="children" v-if="tags.active">
          <md-tag
            size="large"
            shape="circle"
            :type="tags.active.includes(tag.text) ? 'fill' : 'ghost'"
            v-for="tag in tags.list"
            :key="tag.value"
            @click.native="tagChoose(tag)"
            >{{ tag.text }}</md-tag
          >
        </template>
      </md-cell-item>
      <md-cell-item no-border class="border-bottom-1px">
        <template slot="left">
          <span class="text-dark text-title">兴趣爱好</span>
        </template>
        <template slot="children">
          <div class="fill relative textarea">
            <textarea
              v-model.trim="basicInfo.hobby"
              @change="hobbyInput"
              :rows="3"
              :cols="35"
              :maxlength="30"
              class="fiel-input input-textarea"
            />
            <div class="hit">{{ basicInfo.hobby.length }} / 30</div>
          </div>
        </template>
      </md-cell-item>
      <md-cell-item no-border>
        <template slot="left">
          <span class="text-dark text-title">形象照</span>
          <small class="gray xx-small ml-1">(必填)</small>
          <div class="gray small">
            至少上传4张，最多上传6张，第一张默认为封面照
          </div>
        </template>
        <template slot="children">
          <ul class="image-reader-list">
            <template v-if="images.filter(({ url }) => url).length">
              <!-- 表单填写用 dataUrl,表单回显用 url -->
              <li
                class="image-reader-item"
                v-for="(image, index) in images.filter(({ url }) => url)"
                :key="index"
              >
                <md-tag
                  class="image-reader-item-del"
                  size="small"
                  shape="quarter"
                  fill-color="#111a34"
                  type="fill"
                  font-color="#fff"
                  @click.native="onDeleteImage(image, index)"
                >
                  <md-icon name="close" />
                </md-tag>
                <img
                  :src="image.url"
                  class="image-file"
                  @click="viewImage(index)"
                />
              </li>
            </template>
            <li
              class="image-reader-item add"
              v-if="images.filter(({ url }) => url).length < 6"
            >
              <md-image-reader
                is-multiple
                :size="8192"
                :amount="6"
                @select="onReaderSelect"
                @complete="onReaderComplete"
                @error="fileError"
              />
              <md-icon name="camera" size="md" color="#CCC"></md-icon>
              <p>添加图片</p>
            </li>
          </ul>
        </template>
      </md-cell-item>
    </md-field>
    <md-action-bar :actions="action"></md-action-bar>
    <md-selector
      v-model="ageSelector.status"
      :default-value="ageSelector.active.value"
      max-height="320px"
      title="选择年龄"
      :data="ageSelector.list"
      @choose="ageChoose"
    />
    <md-image-viewer
      v-model="viewImages.status"
      :list="images.filter(({ url }) => url).map(({ url }) => url)"
      :initial-index="viewImages.active"
      :has-dots="false"
    />
    <md-picker
      v-if="citySelector.list.length"
      v-model="citySelector.status"
      :data="citySelector.list"
      @confirm="cityPicker"
      title="选择地理位置"
      ref="citySelector"
      :cols="3"
      is-cascade
    />
  </div>
</template>
<script>
import {
  Selector,
  TabPicker,
  Popup,
  Picker,
  CellItem,
  InputItem,
  Button,
  Field,
  Radio,
  Tag,
  ImageViewer,
  ImageReader,
  ActionBar,
  Icon,
  Toast
} from "mand-mobile";
import imageProcessor from "mand-mobile/components/image-reader/image-processor";
import { UUIDGeneratorBrowser, dataURLtoFile, isWx, wxConfig } from "@/utils";
import { mapActions, mapState } from "vuex";
import device from "current-device";

export default {
  name: "basic-info",
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Selector.name]: Selector,
    [CellItem.name]: CellItem,
    [InputItem.name]: InputItem,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [Radio.name]: Radio,
    [ImageReader.name]: ImageReader,
    [ImageViewer.name]: ImageViewer,
    [Button.name]: Button,
    [ActionBar.name]: ActionBar,
    [TabPicker.name]: TabPicker,
    [Picker.name]: Picker
  },
  data() {
    return {
      viewImages: {
        status: false,
        active: 0
      },
      action: [
        {
          text:
            this.$route.query.from && this.$route.query.from === "account"
              ? "提交"
              : "下一步",
          round: true,
          onClick: this.nextMove
        }
      ],
      mime: ["jpg", "jpeg", "png"]
    };
  },
  computed: {
    ...mapState("config", ["config"]),
    ...mapState("user", [
      "tags",
      "info",
      "images",
      "reasons",
      "basicInfo",
      "ageSelector",
      "citySelector",
      "playerApply"
    ])
  },
  methods: {
    toggleAgeSelector() {
      this.ageSelector.status = !this.ageSelector.status;
    },
    toggleCitySelector() {
      this.citySelector.status = !this.citySelector.status;
    },
    ageChoose(age) {
      this.ageSelector.active = age;
    },
    tagChoose(tag) {
      if (this.tags.active.includes(tag.text)) {
        this.tags.active.splice(this.tags.active.indexOf(tag.text), 1);
      } else {
        if (this.tags.active.length < 3) {
          this.tags.active.push(tag.text);
        }
      }
    },
    onDeleteImage(image, index) {
      this.images.splice(index, 1);
    },
    onReaderSelect() {
      Toast.loading("图片读取中...");
    },
    viewImage(index) {
      this.viewImages.active = index;
      this.viewImages.status = true;
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
    async onReaderComplete(inputName, { dataUrl, file }) {
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
              file.size / 1024 < 1024
                ? 1
                : file.size / 1024 < 3072
                ? 0.3
                : file.size / 1024 < 5120
                ? 0.2
                : 0.1
          });
          const fileCompress = dataURLtoFile(resFile.dataUrl, file.name);
          const uuid = UUIDGeneratorBrowser();
          const index = this.images.push({
            name: fileCompress.name,
            uuid,
            file: fileCompress,
            blob: resFile.blob,
            dataUrl: resFile.dataUrl,
            url: ""
          });
          const res = await this.fileUpload(fileCompress);
          Toast.hide();
          if (res && res.data && res.data[0] && res.code === 0) {
            this.images[this.images.findIndex(item => item.uuid === uuid)].url =
              res.data[0];
          } else {
            this.images.splice(index - 1, 1);
          }
        };
      } else {
        Toast.info("仅支持jpg、jpeg、png格式的图片");
      }
    },
    hobbyInput() {
      // 表情包过滤
      const ranges = [
        "\ud83c[\udf00-\udfff]",
        "\ud83d[\udc00-\ude4f]",
        "\ud83d[\ude80-\udeff]"
      ];
      this.basicInfo.hobby = this.basicInfo.hobby.replace(
        new RegExp(ranges.join("|"), "g"),
        ""
      );
    },
    cityPicker(columns) {
      this.citySelector.active = columns.map(column => column.value);
    },
    async nextMove() {
      if (
        !this.basicInfo.QQNO ||
        !new RegExp(/^[1-9][0-9]{4,14}$/).test(this.basicInfo.QQNO)
      ) {
        Toast.info("QQ号格式错误");
        return;
      } else if (!this.citySelector.active.length) {
        Toast.info("请选择所在城市");
        return;
      } else if (!this.ageSelector.active.value) {
        Toast.info("请填写您的年龄");
        return;
      } else if (!this.tags.active.length) {
        Toast.info("请填写您的个性标签");
        return;
      } else if (
        !this.images.filter(({ url }) => url).length ||
        this.images.filter(({ url }) => url).length < 4
      ) {
        Toast.info("至少上传4张照片");
        return;
      }
      if (this.$route.query.from && this.$route.query.from === "account") {
        const { msg, code } = await this.playerDetailsUpdate();
        if (!code) {
          this.$router.replace(
            {
              name: this.$route.query.redirect
            },
            () => {
              Toast.succeed(msg);
            }
          );
        }
      } else {
        this.$router.push({
          name: "service_info",
          query: { from: this.$route.name, to: "result_page" }
        });
      }
    },
    ...mapActions("config", ["getWxConfig"]),
    ...mapActions("user", [
      "fileUpload",
      "playerInformationAdd",
      "playerDetailsUpdate"
    ])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.playerApply.playerStatus === 2) {
        vm.$router.forward();
        Toast.info("您已经提交过入驻申请资料，请耐心等待官方的审核");
      }
    });
  },
  async mounted() {
    if (isWx() && device.android()) {
      const config = await this.getWxConfig();
      wxConfig(config);
      window.wx.ready(() => {
        Toast.hide();
        window.wx.updateAppMessageShareData({
          title: "入驻NN游戏陪玩，瓜分百万现金奖励",
          desc: "开心玩，轻松赚，千万用户量的陪玩平台",
          link: `${process.env.VUE_APP_BASE_URL}sign/in`,
          imgUrl: `${process.env.VUE_APP_BASE_URL}nnlogoshare.jpg`
        });
        window.wx.updateTimelineShareData({
          title: "入驻NN游戏陪玩，瓜分百万现金奖励",
          link: `${process.env.VUE_APP_BASE_URL}sign/in`,
          imgUrl: `${process.env.VUE_APP_BASE_URL}nnlogoshare.jpg`
        });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
#basic_info {
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px 36px 44vh 36px;
  box-sizing: border-box;

  .popup {
    padding: 20px;
    font-size: 28px;
    color: #FFFFFF;

    &.top {
      background-color: #FD4A53;
    }
  }

  .text-title {
    font-size: 32px;
  }

  >>> .md-cell-item-right {
    color: #606166;
  }

  >>> .md-cell-item-brief {
    color: #909399;
  }

  >>> .md-cell-item-children {
    padding-top: 0;

    .md-tag {
      margin-top: 20px;
      margin-left: 20px;

      .default {
        padding: 14px;
        color: #606166;
        border-color: #e9e9ed;
      }

      .type-fill {
        border: 1px solid transparent;
        color: #fff;
      }
    }
  }

  .image-reader-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .image-reader-item {
      position: relative;
      width: 23%;
      height: 22vw;
      margin-top: 15px;
      background: #FFF;
      box-shadow: 0 5px 20px rgba(197, 202, 213, 0.25);
      box-sizing: border-box;
      border-radius: 8px;
      background-size: cover;
      overflow: hidden;
      background-color: #F5F5F7;
      display: flex;

      &+.image-reader-item {
        margin-left: 15px;
      }

      .image-file {
        width: 100%;
        height: 100%;
      }

      &:nth-of-type(5n) {
        margin-left: 0 !important;
      }

      .image-reader-item-del {
        position: absolute;
        top: -3px;
        right: -3px;
        z-index: 3;
        opacity: 0.8;
        margin-top: 0;

        &>>>.md-icon-close {
          font-size: 24px;
        }
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
</style>
