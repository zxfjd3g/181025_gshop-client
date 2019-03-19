import Vue from 'vue'

import store from './store'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'

// 注册全局组件
Vue.component('Header', Header)

new Vue({
  el: '#app',
  render: h => h(App),
  router, // 配置路由器
  store, // 配置vuex
})