import Vue from "vue";
import SkeletonSign from "./components/skeleton/SkeletonSign.vue";
import SkeletonHome from "./components/skeleton/SkeletonHome.vue";

export default new Vue({
  components: {
    SkeletonSign,
    SkeletonHome
  },
  template: `
    <div>
      <SkeletonSign id="skeleton-sign" style="display:none"/>
      <SkeletonHome id="skeleton-home" style="display:none"/>
    </div>
  `
});
