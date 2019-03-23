/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 去掉#
  routes
})

const paths = ['/a', '/b']

// 定义全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('beforeEach()', to, from)

  // 如果请求的路由为a/b, 如果没有登陆, 直接跳转到登陆界面
  const path = to.path
  if(paths.indexOf(path)!==-1) {
    if(!Vue.store.state.user.user._id) {
      return next('/login')
    }
  }
  // 放行
  next()
})

export default router