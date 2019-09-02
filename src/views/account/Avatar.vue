<template>
  <div class="avatar">
    <div class="cropper-actions">
      <div class="cropper-content">
        <div class="cropper-action left" v-if="local">
          <svg
            class="icon rotate-180"
            aria-hidden="true"
            @click="cropperRotate(90)"
          >
            <use xlink:href="#iconyouxuanzhuan" />
          </svg>
          <svg
            class="icon rotate--180"
            aria-hidden="true"
            @click="cropperRotate(-90)"
          >
            <use xlink:href="#iconzuoxuanzhuan" />
          </svg>
        </div>
        <vue-cropper
          ref="cropper"
          drag-mode="crop"
          alt="Source Image"
          preview=".crop_img"
          :guides="true"
          :view-mode="2"
          :auto-crop-area="1"
          :aspectRatio="1"
          :background="true"
          :src="imgSrc"
          :img-style="{ width: '50vw', height: '50vw' }"
          :container-style="{
            width: '60vw',
            height: '50vw',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center'
          }"
        />
        <div class="cropper-action right" v-if="local">
          <div class="icon zoom-in" @click="cropperZoom(-0.1)">-</div>
          <div class="icon zoom-out" @click="cropperZoom(0.1)">+</div>
        </div>
      </div>
      <div class="cropper-tips text-center mt-2">
        <small class="small text-gray"
          >支持jpg、jpeg和png格式的图片，文件必须小于1M</small
        >
      </div>
    </div>
    <img class="crop_img" v-if="cropImg" :src="cropImg" alt="Cropped Image" />
    <div class="buttons">
      <md-button type="default" round inline>
        <md-image-reader
          @select="selectImage"
          @complete="onReaderComplete"
          @error="fileError"
        />上传头像
      </md-button>
      <md-button
        type="primary"
        class="button_right"
        @click="cropImage"
        v-if="imgSrc != '' && local"
        round
        inline
        >裁剪</md-button
      >
    </div>

    <md-action-bar :actions="actions" v-if="cropImg" />
  </div>
</template>
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { mapState, mapActions } from "vuex";
import { ImageReader, ActionBar, Toast, Button } from "mand-mobile";
import imageProcessor from "mand-mobile/components/image-reader/image-processor";

export default {
  name: "account_avatar",
  components: {
    VueCropper,
    [Button.name]: Button,
    [ActionBar.name]: ActionBar,
    [ImageReader.name]: ImageReader
  },
  data() {
    return {
      mime: ["jpg", "jpeg", "png"],
      local: false,
      imgSrc: "",
      cropImg: "",
      actions: [
        {
          text: "保存",
          onClick: this.saveAvatar
        }
      ]
    };
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    selectImage() {
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
    onReaderComplete(inputName, { dataUrl, file }) {
      Toast.hide();
      if (this.mime.map(i => file.type.includes(i)).filter(i => i).length) {
        this.imgSrc = dataUrl;
        if (!this.local) {
          this.local = true;
        }
        this.$refs.cropper.replace(dataUrl);
      } else {
        Toast.info("仅支持jpg、jpeg、png格式的图片");
      }
    },
    cropperRotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    cropperZoom(ratio) {
      this.$refs.cropper.relativeZoom(ratio);
    },
    cropImage() {
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        const dataUrl = this.$refs.cropper.getCroppedCanvas().toDataURL();
        const img = new Image();
        img.src = dataUrl;
        img.onload = async () => {
          const resFile = await imageProcessor({
            dataUrl,
            width: img.width,
            height: img.height,
            quality:
              blob.size / 1024 < 1024
                ? 1
                : blob.size / 1024 < 3072
                ? 0.3
                : blob.size / 1024 < 5120
                ? 0.2
                : 0.1
          });
          this.cropImg = resFile.dataUrl;
        };
      });
    },
    async saveAvatar() {
      const { code, data } = await this.base64Upload(this.cropImg);
      if (code === 0) {
        const { code } = await this.memberInformationUpdate({
          imageUrl: data[0]
        });
        if (code === 0) {
          this.$router.push({ name: "account_details" });
        }
      }
    },
    ...mapActions("user", ["memberInformationUpdate", "base64Upload"])
  },
  created() {
    this.imgSrc = this.info.imageUrl;
  }
};
</script>
<style lang="stylus" scoped>
.avatar {
  width: 750px;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;
  box-sizing: border-box;

  .cropper-actions {
    width: 100vw;

    .cropper-content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .cropper-action {
        flex: 1;
        height: 25vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        &.left {
        }

        &.right {
          .icon {
            width: 48px;
            height: 48px;
            font-size: 48px;
            text-align: center;
            line-height: 0.8;
            border-radius: 50%;
            border: 1px solid #000;
          }
        }
      }
    }
  }

  .crop_img {
    width: 50vw;
    height: 50vw;
    margin: 40px 0;
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12) !important;
  }

  .buttons {
    width: 100vw;
    display: flex;
    margin-top: 40px;
    padding: 0 40px;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    >>>button {
      min-width: 300px;

      &+button {
        margin-left: 40px;
      }
    }
  }
}
</style>
