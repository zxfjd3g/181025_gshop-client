/*
根据接口编写接口请求函数
包含n个接口请求函数的模块
函数的返回值是promise对象
 */
import ajax from './ajax'
// const BASE = 'http://localhost:5000'
const BASE = '/api'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (longitude, latitude)  => ajax(BASE+`/position/${latitude},${longitude}`)


// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategorys = ()  => ajax(BASE + '/index_category')

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = ({latitude, longitude})  => ajax(BASE + '/shops', {latitude, longitude})