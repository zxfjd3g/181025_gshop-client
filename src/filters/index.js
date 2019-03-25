/*
自定义过滤器的模块
 */
import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'

// 定义全局过滤器
Vue.filter('data-format', function (value, formatStr) { // 解析的回调函数
  //return moment(value).format('YYYY-MM-DD HH:mm:ss' || formatStr)
  return format(value, 'YYYY-MM-DD HH:mm:ss' || formatStr)
})
