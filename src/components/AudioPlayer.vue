<template>
  <!-- <div class="audio-player" @click="playVoice" :class="{ ended }">
    <div class="audio-content">
      <div class="audio-title" v-if="title" v-text="title" />
      <div class="audio-duation">
        {{ data.duration ? round(data.duration) + "s" : "" }}
      </div>
    </div>
    <div class="audio-bar" :class="{ playing }">
      <div class="bar" />
      <div class="bar" />
      <div class="bar" />
    </div>
    <div
      class="audio-animate"
      v-if="currentTime"
      :style="{ left: (currentTime / data.duration) * 110 + '%' }"
    />
  </div>-->
  <md-button type="primary" round size="small" @click="playVoice">
    <div class="audio-title" v-if="title" v-text="title" />
    <div class="audio-title" v-else>{{ round(duration) }}s</div>
    <img class="audio-volume" :src="require('@/assets/images/volume.svg')" />
  </md-button>
</template>
<script>
import { round } from "@/utils";
import { Button } from "mand-mobile";

export default {
  name: "audio-player",
  props: {
    url: {
      type: String,
      required: true
    },
    isWx: {
      type: Boolean,
      default: false
    },
    title: String
  },
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      playing: false,
      data: new Audio(this.url),
      duration: 0,
      currentTime: 0,
      ended: false
    };
  },
  methods: {
    round,
    playVoice() {
      if (this.isWx) {
        window.wx.playVoice({
          localId: this.url
        });
      } else {
        this.data.play();
        this.data.addEventListener("ended", () => {
          this.playing = false;
          this.currentTime = 0;
          this.ended = true;
          this.$emit("ended");
          setTimeout(() => {
            this.ended = false;
          }, 650);
        });
        this.data.addEventListener("timeupdate", () => {
          this.currentTime = this.data.currentTime;
          this.$emit("currentTime", this.data.currentTime);
        });
        this.playing = true;
        this.$emit("playing");
      }
    }
  },
  mounted() {
    // if (!this.wx) {
    //   }
    this.data.load();
    this.data.addEventListener("loadedmetadata", () => {
      this.duration = this.data.duration;
    });
  }
};
</script>
<style lang="stylus" scoped>
.audio-volume {
  width: 32px;
  height: 32px;
  margin-left: 16px;
}

.audio-player {
  width: -webkit-fill-available;
  min-height: 40px;
  border-radius: 4px;
  background-color: rgb(241, 241, 241);
  display: flex;
  position: relative;
  padding: 16px;

  &.ended {
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      border-radius: inherit;
      box-shadow: 0 0 0 0 color-primary;
      opacity: 0.2;
      animation: fadeEffect 2s cubic-bezier(0.08, 0.82, 0.17, 1), waveEffect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
      animation-fill-mode: forwards;
      content: '';
      pointer-events: none;
    }
  }

  .audio-animate {
    background-color: color-primary;
    // filter: blur(1px);
    border-radius: 0 0 4px 4px;
    transition: all 0.625s ease-out;
    right: 0;
    height: 8px;
    bottom: 0;
    position: absolute;
  }

  .audio-bar {
    height: inherit;
    width: 40px;
    flex-shrink: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 99;

    &.playing {
      .bar {
        &:nth-child(1) {
          animation: firstBar 1s infinite;
        }

        &:nth-child(2) {
          animation: secondBar 1s infinite;
        }

        &:nth-child(3) {
          animation: thirdBar 1s infinite;
        }
      }
    }

    .bar {
      &:nth-child(1) {
        width: 8px;
        height: 10px;
        background-color: color-primary;
      }

      &:nth-child(2) {
        width: 8px;
        height: 30px;
        margin: 0 8px;
        background-color: color-primary;
      }

      &:nth-child(3) {
        width: 8px;
        height: 20px;
        background-color: color-primary;
      }
    }
  }

  .audio-content {
    flex: 1;
    color: color-primary;
    z-index: 99;
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
  }
}
</style>
