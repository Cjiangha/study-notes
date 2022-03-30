import Vue from 'vue'
import App from './App.vue'
import JQUERY from 'jquery';
import axios from 'axios'     //引入axios的全局
import store from './stores';//仓库
import router from './routers'
import "amfe-flexible";


Vue.prototype.$axios = axios
Vue.prototype.$ = JQUERY;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // window.console.log($);
  },
}).$mount('#app')

