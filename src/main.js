import FastClick from "fastclick";
import device from "current-device";
import Vue from "vue";
import App from "./App.vue";
import Http from "./service";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./permission";
import "normalize.css";
import "./index.styl";
import "@/config/wechatTitle";

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV !== "production";
Vue.prototype.$http = Http;
Vue.prototype.$device = device;

// 当 Web App 线上出现紧急问题的时候将值设为 true 并上线
window.SW_TURN_OFF = false;

if ("addEventListener" in document && "ontouchstart" in window) {
  FastClick.prototype.focus = function(targetElement) {
    targetElement.focus();
  };
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered"))
}).$mount("#app");
