import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'


import store from './store'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'

import './mock/mockServer'
import loading from './common/imgs/loading.gif'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
// 注册全局组件
Vue.component(Button.name, Button)

Vue.use(VueLazyload, { // 内部定义了一个全局指令: lazy
  loading,
})

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