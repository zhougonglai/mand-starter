import FastClick from "fastclick";
import "normalize.css";
import Vue from "vue";
import App from "./App.vue";
import Http from "./service";
import device from "current-device";
import "./index.styl";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/config/wechatTitle";

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV !== "production";
Vue.prototype.$http = Http;
Vue.prototype.$device = device;

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
