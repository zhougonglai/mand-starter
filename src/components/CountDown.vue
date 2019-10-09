<template>
  <span class="count-down" v-if="countNumber">
    <template v-if="prefix">{{ prefix }}</template>
    {{ countNumber }}
  </span>
</template>
<script>
import { setInterval, clearInterval } from "timers";
export default {
  name: "CountDown",
  props: {
    time: {
      type: Number,
      required: true
    },
    prefix: {
      type: String
    }
  },
  data() {
    return {
      timeNumber: 0,
      timer: 0
    };
  },
  computed: {
    countNumber: function() {
      if (this.timeNumber) {
        return `${Math.floor(this.timeNumber / 60)} : ${this.timeNumber % 60}`;
      } else {
        return "";
      }
    }
  },
  created() {
    this.timeNumber = this.time;
    this.timer = setInterval(() => {
      if (this.timeNumber >= 1) {
        this.timeNumber -= 1;
      } else {
        this.timeNumber = 0;
        clearInterval(this.timer);
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="stylus" scoped></style>
