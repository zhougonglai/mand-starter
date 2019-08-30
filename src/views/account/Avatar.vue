<template>
  <div class="avatar">
    <input type="file" name="image" accept="image/*" @change="setImage" />
    <br />
    <br />
    <vue-cropper
      ref="cropper"
      drag-mode="crop"
      :checkCrossOrigin="false"
      :guides="true"
      :view-mode="2"
      :auto-crop-area="1"
      :aspectRatio="1"
      :background="true"
      :src="imgSrc"
      :preview="$refs.preview"
      @ready="cropInit"
      alt="Source Image"
      :img-style="{ width: '50vw', height: '50vw' }"
      :container-style="{ width: '80vw', height: '50vw' }"
    ></vue-cropper>
    <br />
    <img
      v-if="cropImg"
      :src="cropImg"
      style="width: 200px; height: 150px; border: 1px solid gray"
      alt="Cropped Image"
    />
    <br />
    <div ref="preview" class="preview"></div>
    <button @click="cropImage" v-if="imgSrc != ''" style="margin-right: 40px;">
      Crop
    </button>
  </div>
</template>
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { mapState } from "vuex";

export default {
  name: "account_avatar",
  components: {
    VueCropper
  },
  data() {
    return {
      imgSrc: "",
      cropImg: ""
    };
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    cropInit() {
      console.log("corpInit");
    }
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
}
</style>
