<template>
  <div id="basic_info">
    <md-field>
      <md-cell-item title="性别" brief="(必填)">
        <template slot="right">
          <md-radio name="2" v-model="gender" label="男" inline />
          <md-radio name="1" v-model="gender" label="女" inline />
        </template>
      </md-cell-item>
      <md-cell-item title="所在城市" arrow />
      <md-cell-item
        title="年龄"
        :addon="ageSelector.age.text"
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
          <small class="gray">最多可选择3个标签(3/3)</small>
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
        <template slot="children"
          >这里是兴趣爱好的介绍，这里是兴趣爱好的介绍这里是兴趣爱好的。</template
        >
      </md-cell-item>
      <md-cell-item no-border title="形象照" brief="(必填)">
        <template slot="children">
          <ul class="image-reader-list">
            <li class="image-reader-item add">
              <md-image-reader is-multiple />
              <md-icon name="camera" size="md" color="#CCC"></md-icon>
              <p>添加图片</p>
            </li>
          </ul>
        </template>
      </md-cell-item>
      <md-cell-item>
        <template slot="children">
          <md-button type="primary" round @click="gotoServiceInfo"
            >下一步</md-button
          >
        </template>
      </md-cell-item>
    </md-field>
    <md-selector
      v-model="ageSelector.status"
      :data="ageSelector.list"
      @choose="ageChoose"
    />
  </div>
</template>
<script>
import {
  Selector,
  CellItem,
  Button,
  Field,
  Radio,
  Tag,
  ImageReader,
  Icon,
  Toast
} from "mand-mobile";
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
    [Button.name]: Button
  },
  data() {
    return {
      ageSelector: {
        status: false,
        age: "",
        list: [
          {
            value: 18,
            text: "18"
          },
          {
            value: 19,
            text: "19"
          },
          {
            value: 20,
            text: "20"
          },
          {
            value: 21,
            text: "21"
          },
          {
            value: 22,
            text: "22"
          }
        ]
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
            text: "颜值担当"
          },
          {
            value: 3,
            text: "成熟稳重"
          },
          {
            value: 4,
            text: "风情万种范"
          },
          {
            value: 5,
            text: "御姐"
          },
          {
            value: 6,
            text: "话多不高冷"
          },
          {
            value: 7,
            text: "御姐"
          },
          {
            value: 8,
            text: "颜值担当"
          },
          {
            value: 9,
            text: "成熟又稳重"
          }
        ]
      },
      gender: "2"
    };
  },
  methods: {
    toggleAgeSelector() {
      this.ageSelector.status = !this.ageSelector.status;
    },
    ageChoose(age) {
      this.ageSelector.age = age;
    },
    tagChoose(tag) {
      this.tags.active.push(tag.value);
    },
    gotoServiceInfo() {
      this.$router.push({ name: "service_info" });
    }
  }
};
</script>
<style lang="stylus" scoped>
#basic_info {
  height: 100vh;

  >>> .md-cell-item-children {
    .md-tag {
      margin-top: 14px;

      .default {
        padding: 14px;
      }

      .type-fill {
        border: 1px solid transparent;
      }

      &+.md-tag {
        margin-left: 14px;
      }
    }
  }

  .image-reader-list {
    float: left;
    width: 100%;

    .image-reader-item {
      position: relative;
      float: left;
      width: 23.5%;
      padding-bottom: 23.5%;
      margin-bottom: 2%;
      margin-right: 2%;
      background: #FFF;
      box-shadow: 0 5px 20px rgba(197, 202, 213, 0.25);
      box-sizing: border-box;
      list-style: none;
      border-radius: 4px;
      background-size: cover;
      overflow: hidden;

      &:nth-of-type(4n) {
        margin-left: 0;
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
