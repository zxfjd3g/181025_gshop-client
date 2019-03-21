/*
首页模块
 */

import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
} from '../mutation-types'

import {
  reqCategorys,
  reqAddress,
  reqShops
} from '../../api'


const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
}

const mutations = {
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_ADDRESS] (state, {address}) { // {address: address数据对象}
    state.address = address
  },
}

const actions = {
// 获取地址的异步action
  async getAddress ({commit, state}) {

    const {longitude, latitude} = state
    // 1. 发异步ajax请求
    const result = await reqAddress(longitude, latitude)
    // 2. 根据提交mutation
    if(result.code===0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address}) // 传递给mutation的是包含数据的对象, 而不是数据本身
    }
  },

  // 获取分类列表的异步action
  async getCategorys ({commit, state}) {

    // 1. 发异步ajax请求
    const result = await reqCategorys()
    // 2. 根据提交mutation
    if(result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },

  // 获取商家列表的异步action
  async getShops({commit, state}) {
    const {longitude, latitude} = state
    // 1. 发异步ajax请求
    const result = await reqShops({longitude, latitude})
    // 2. 根据提交mutation
    if(result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}