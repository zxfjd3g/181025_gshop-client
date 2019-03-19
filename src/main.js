import Vue from 'vue'

import store from './store'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)

new Vue({
  el: '#app',

  /*components: {
    App,
  },
  template: '<App/>',*/
  render: h => h(App),
  /*render: function (createElement) { // 将render返回的标签渲染到页面上去
    return createElement(App)  // '<App/>'
  },*/
  router, // 配置路由器
  store, // 配置vuex
})