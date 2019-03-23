/*
使用mockjs定义mock数据接口
 */
import Mock from 'mockjs'
import shop from './shop.json' // json对象===> js对象

// 返回goods的接口
// 返回ratings的接口
// 返回info的接口
Mock.mock('/goods', {code: 0, data: shop.goods})
Mock.mock('/ratings', {code: 0, data: shop.ratings})
Mock.mock('/info', {code: 0, data: shop.info})

// export   不需要暴露任何东西, 只需要被执行一次
console.log('mockServer')

