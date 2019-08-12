<!--
 * @Description: 基本信息
 * @Author: John Zhou
 * @Date: 2019-08-10 21:01:19
 * @LastEditTime: 2019-08-11 18:27:02
 * @LastEditors: John Zhou
 -->
<template>
  <div id="basic_info">
    <md-field>
      <md-input-item
        type="tel"
        clearable
        v-model="basicInfo.QQNO"
        placeholder="请输入QQ号码"
        align="right"
      >
        <template slot="left">
          <span class="text-dark text-title">QQ号码</span>
          <small class="gray xx-small ml-1">(必填)</small>
        </template>
      </md-input-item>
      <md-input-item
        type="text"
        readonly
        v-model="info.phone"
        placeholder="请输入手机号"
        align="right"
      >
        <template slot="left">
          <span class="text-dark text-title">手机号</span>
          <small class="gray xx-small ml-1">(必填)</small>
        </template>
      </md-input-item>
      <md-cell-item>
        <template slot="left">
          <span class="text-dark text-title">性别</span>
          <small class="gray xx-small ml-1">(必填)</small>
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
          <small class="gray xx-small ml-1">(必填)</small>
        </template>
      </md-cell-item>
      <md-cell-item
        :addon="ageSelector.active.text ? ageSelector.active.text : '请选择'"
        arrow
        @click="toggleAgeSelector"
      >
        <template slot="left">
          <span class="text-dark text-title">年龄</span>
          <small class="gray xx-small ml-1">(必填)</small>
        </template>
      </md-cell-item>
      <md-cell-item no-border class="border-bottom-1px">
        <template slot="left">
          <span class="text-dark text-title">个性标签</span>
          <small class="gray xx-small ml-1">(必填)</small>
        </template>
        <template slot="right">
          <small class="gray smaller"
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
              v-model="basicInfo.hobby"
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
            <template v-if="images.length">
              <li
                class="image-reader-item"
                v-for="(image, index) in images"
                :key="index"
                :style="{
                  backgroundImage: `url(${image.dataUrl})`,
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }"
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
              </li>
            </template>
            <li class="image-reader-item add" v-if="images.length < 6">
              <md-image-reader
                is-multiple
                :amount="6"
                @select="onReaderSelect"
                @complete="onReaderComplete"
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
      max-height="320px"
      title="选择年龄"
      :data="ageSelector.list"
      @choose="ageChoose"
    />
    <md-picker
      v-if="citySelector.list.length"
      ref="citySelector"
      v-model="citySelector.status"
      :data="citySelector.list"
      :cols="3"
      is-cascade
      title="选择地理位置"
      @confirm="cityPicker"
    />
  </div>
</template>
<script>
import {
  Selector,
  TabPicker,
  Picker,
  CellItem,
  InputItem,
  Button,
  Field,
  Radio,
  Tag,
  ImageReader,
  ActionBar,
  Icon,
  Toast
} from "mand-mobile";
import { UUIDGeneratorBrowser } from "@/utils";
import { mapActions, mapState } from "vuex";

export default {
  name: "basic-info",
  components: {
    [Field.name]: Field,
    [Selector.name]: Selector,
    [CellItem.name]: CellItem,
    [InputItem.name]: InputItem,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Radio.name]: Radio,
    [ImageReader.name]: ImageReader,
    [Button.name]: Button,
    [ActionBar.name]: ActionBar,
    [TabPicker.name]: TabPicker,
    [Picker.name]: Picker
  },
  data() {
    return {
      action: [
        {
          text: "下一步",
          onClick: this.gotoServiceInfo
        }
      ]
    };
  },
  computed: {
    ...mapState("user", [
      "info",
      "basicInfo",
      "tags",
      "images",
      "ageSelector",
      "citySelector"
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
    async onReaderComplete(name, { dataUrl, blob, file }) {
      Toast.hide();
      const uuid = UUIDGeneratorBrowser();
      const index = this.images.push({
        name: file.name,
        uuid,
        file,
        blob,
        dataUrl,
        url: ""
      });
      const { code, data } = await this.fileUpload(file);
      if (code === 0) {
        this.images[this.images.findIndex(item => item.uuid === uuid)].url =
          data[0];
      } else {
        this.images.splice(index - 1, 1);
      }
    },
    cityPicker(columns) {
      this.citySelector.active = columns.map(column => column.value);
    },
    gotoServiceInfo() {
      this.$router.push({ name: "service_info" });
    },
    ...mapActions("user", ["fileUpload", "playerInformationAdd"])
  }
};
</script>
<style lang="stylus" scoped>
#basic_info {
  height: 100vh;

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

  >>>.md-field {
    padding-bottom: 50vh;
    padding-top: 20px;
  }

  .image-reader-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .image-reader-item {
      position: relative;
      width: 23%;
      padding-bottom: 23%;
      margin-top: 2%;
      background: #FFF;
      box-shadow: 0 5px 20px rgba(197, 202, 213, 0.25);
      box-sizing: border-box;
      border-radius: 8px;
      background-size: cover;
      overflow: hidden;
      background-color: #F5F5F7;

      &+.image-reader-item {
        margin-left: 2%;
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
