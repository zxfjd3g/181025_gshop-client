/*
商家模块
 */
import Vue from 'vue'
import {
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from '../mutation-types'
import {
  reqGoods,
  reqRatings,
  reqInfo
} from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [], // 购物项列表
}

const mutations = {
  [RECEIVE_INFO](state, info) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, ratings) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, goods) {
    state.goods = goods
  },

  [INCREMENT_FOOD_COUNT] (state, food) {
    if(food.count) {
      food.count++
    } else {
      // 添加新的属性: count=1
      // food.count = 1 // 新添加的属性没有数据绑定
      // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新
      Vue.set(food, 'count', 1)

      // 将新添加的food添加到购物车
      state.cartFoods.push(food)
    }
  },
  [DECREMENT_FOOD_COUNT] (state, food) {
    if(food.count>0) {
      food.count--
      // food的数量一旦减为0, 从购物车中移除它
      if(food.count===0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }

  },
}

const actions = {
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, info)
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, callback) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, ratings)
      // 状态数据更新之后立即调用
      typeof callback ==='function' && callback()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, goods)
      // 状态数据更新之后立即调用
      typeof callback ==='function' && callback() // 调用回调函数相当于发了一个通知
    }
  },

  // 更新food数量
  updateFoodCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, food)
    } else {
      commit(DECREMENT_FOOD_COUNT, food)
    }
  }
}

const getters = {
  /*cartFoods (state) {
    const foods = []

    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if(food.count) {
          foods.push(food)
        }
      })
    })

    return foods
  }*/
  // 总数量
  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },

  // 总价格
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count*food.price, 0)
  },

  totalRatingCount (state) {
    return state.ratings.length
  },

  // 推荐评价的数量
  totalPositiveRatingCount (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType===0 ? 1 : 0), 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}