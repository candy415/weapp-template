import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'lib-flexible'; // 移动端适配
import './app.js'

window.console.log(process.env.VUE_APP_URL)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
