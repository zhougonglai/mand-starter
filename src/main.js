import Vue from 'vue';
import FastClick from 'fastclick';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './index.styl';

Vue.config.productionTip = false;
if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function(targetElement) {
    targetElement.focus();
  };
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
