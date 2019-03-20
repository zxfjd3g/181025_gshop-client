/*
包含n个直接更新状态数据的方法的对象
 */
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_USER
} from './mutation-types'

export default {

  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_ADDRESS] (state, {address}) { // {address: address数据对象}
    state.address = address
  },
  [RECEIVE_USER] (state, user) { // {address: address数据对象}
    state.user = user
  },
}
