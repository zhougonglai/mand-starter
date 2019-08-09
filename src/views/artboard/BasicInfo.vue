<template>
  <div id="basic_info">
    <md-field>
      <md-cell-item title="性别" brief="(必填)">
        <template slot="right">
          <md-radio name="2" v-model="gender" label="男" inline />
          <md-radio name="1" v-model="gender" label="女" inline />
        </template>
      </md-cell-item>
      <md-cell-item
        title="所在城市"
        :addon="
          citySelector.active.length ? citySelector.active.join('-') : '请选择'
        "
        arrow
        @click="toggleCitySelector"
      />
      <md-cell-item
        title="年龄"
        :addon="ageSelector.age.text ? ageSelector.age.text : '请选择'"
        arrow
        @click="toggleAgeSelector"
      />
      <md-cell-item
        no-border
        class="border-bottom-1px"
        title="个性标签"
        brief="(必填)"
      >
        <template slot="right">
          <small class="gray smaller"
            >最多可选择3个标签({{ tags.active.length }}/3)</small
          >
        </template>
        <template slot="children">
          <md-tag
            size="large"
            shape="circle"
            :type="tags.active.includes(tag.value) ? 'fill' : 'ghost'"
            v-for="tag in tags.list"
            :key="tag.value"
            @click.native="tagChoose(tag)"
            >{{ tag.text }}</md-tag
          >
        </template>
      </md-cell-item>
      <md-cell-item no-border title="兴趣爱好" class="border-bottom-1px">
        <template slot="children">
          <div class="fill relative textarea">
            <textarea
              v-model="fafor"
              :rows="3"
              :cols="35"
              :maxlength="30"
              class="fiel-input input-textarea"
            />
            <div class="hit">{{ fafor.length }} / 30</div>
          </div>
        </template>
      </md-cell-item>
      <md-cell-item no-border title="形象照" brief="(必填)">
        <small class="gray small"
          >至少上传4张，最多上传6张，第一张默认为封面照</small
        >
        <template slot="children">
          <ul class="image-reader-list">
            <template v-if="imageList.length">
              <li
                class="image-reader-item"
                v-for="(image, index) in imageList"
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
            <li class="image-reader-item add" v-if="imageList.length < 6">
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
    <md-tab-picker
      v-model="citySelector.status"
      title="选择地理位置"
      :data="citySelector.list"
      @change="cityPicker"
    />
  </div>
</template>
<script>
import {
  Selector,
  TabPicker,
  CellItem,
  Button,
  Field,
  Radio,
  Tag,
  ImageReader,
  ActionBar,
  Icon,
  Toast
} from "mand-mobile";
import { citys, numList, UUIDGeneratorBrowser } from "@/utils";
import { mapActions } from "vuex";

export default {
  name: "basic-info",
  components: {
    [Field.name]: Field,
    [Selector.name]: Selector,
    [CellItem.name]: CellItem,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Radio.name]: Radio,
    [ImageReader.name]: ImageReader,
    [Button.name]: Button,
    [ActionBar.name]: ActionBar,
    [TabPicker.name]: TabPicker
  },
  data() {
    return {
      ageSelector: {
        status: false,
        age: "",
        list: numList(18, 200).map(i => ({ value: i, text: `${i}岁` }))
      },
      citySelector: {
        status: false,
        active: [],
        list: {
          name: "province",
          label: "请选择",
          options: citys.map(({ children, ...others }) => ({
            ...others,
            children: {
              name: "city",
              label: "请选择",
              options: children.map(({ children, ...$others }) =>
                children
                  ? {
                      ...$others,
                      children: {
                        name: "block",
                        label: "请选择",
                        options: children
                      }
                    }
                  : { ...$others }
              )
            }
          }))
        }
      },
      tags: {
        active: [],
        list: [
          {
            value: 1,
            text: "御姐"
          },
          {
            value: 2,
            text: "萝莉"
          },
          {
            value: 3,
            text: "大叔"
          },
          {
            value: 4,
            text: "颜值担当"
          },
          {
            value: 5,
            text: "阳光帅气"
          },
          {
            value: 6,
            text: "认真专业"
          },
          {
            value: 7,
            text: "成熟稳重"
          },
          {
            value: 8,
            text: "小狼狗"
          },
          {
            value: 9,
            text: "逗比闲聊"
          },
          {
            value: 10,
            text: "电竞大神"
          },
          {
            value: 11,
            text: "人美声甜"
          },
          {
            value: 12,
            text: "强势辅助"
          },
          {
            value: 13,
            text: "叔音易撩"
          },
          {
            value: 14,
            text: "活泼精灵"
          },
          {
            value: 15,
            text: "沉着冷静"
          },
          {
            value: 16,
            text: "温文尔雅"
          },
          {
            value: 17,
            text: "乖巧粘人"
          },
          {
            value: 18,
            text: "皮中带稳"
          }
        ]
      },
      imageList: [],
      remoteList: [],
      action: [
        {
          text: "下一步",
          onClick: this.gotoServiceInfo
        }
      ],
      gender: "2",
      fafor: ""
    };
  },
  methods: {
    toggleAgeSelector() {
      this.ageSelector.status = !this.ageSelector.status;
    },
    toggleCitySelector() {
      this.citySelector.status = !this.citySelector.status;
    },
    ageChoose(age) {
      this.ageSelector.age = age;
    },
    tagChoose(tag) {
      if (this.tags.active.includes(tag.value)) {
        this.tags.active.splice(this.tags.active.indexOf(tag.value), 1);
      } else {
        if (this.tags.active.length < 3) {
          this.tags.active.push(tag.value);
        }
      }
    },
    onDeleteImage(image, index) {
      this.imageList.splice(index, 1);
    },
    onReaderSelect() {
      Toast.loading("图片读取中...");
    },
    async onReaderComplete(name, { dataUrl, blob, file }) {
      Toast.hide();
      const uuid = UUIDGeneratorBrowser();
      const index = this.imageList.push({
        name: file.name,
        uuid,
        file,
        blob,
        dataUrl,
        url: ""
      });
      const { code, data } = await this.fileUpload(file);
      if (code === 0) {
        this.imageList[
          this.imageList.findIndex(item => item.uuid === uuid)
        ].url = data[0];
      } else {
        this.imageList.splice(index - 1, 1);
      }
    },
    cityPicker({ values }) {
      this.citySelector.active = values;
    },
    gotoServiceInfo() {
      this.$router.push({ name: "service_info" });
    },
    ...mapActions("user", ["fileUpload"])
  }
};
</script>
<style lang="stylus" scoped>
#basic_info {
  height: 100vh;

  >>> .md-cell-item-right {
    color: #606166;
  }

  >>> .md-cell-item-brief {
    color: #909399;
  }

  >>> .md-cell-item-children {
    padding-top: 0;

    .md-tag {
      margin-top: 10px;
      margin-left: 10px;

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
