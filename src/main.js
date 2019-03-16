import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  components: {
    App,
  },
  template: '<App/>',
  router, // 配置路由器
})