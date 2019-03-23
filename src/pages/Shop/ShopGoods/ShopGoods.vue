<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current: currentIndex-->
          <li class="menu-item" v-for="(good, index) in goods"
              :key="index" :class="{current: currentIndex===index}" @click="clickLeft(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <!--组件标签对象就是组件对象-->
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  import Food from '../../../components/Food/Food.vue'
  // import ShopCart from '@/components/ShopCart/ShopCart.vue'

  export default {
    data () {
      return {
        scrollY: 0, // 右侧列表的滑动坐标, 在滑动过程中实时设置
        tops: [], // 右侧所有分类li的top组成的数组, 在初始显示列表时设置
        food: {}, // 需要显示的food
      }
    },

    async mounted () {
      this.$store.dispatch('getShopGoods', () => { // 状态数据更新之后立即调用(界面还没有更新)
        this.$nextTick(() => {
          this._initScroll()
          this._initTops()
        })
      })

      /*await this.$store.dispatch('getShopGoods') // 内部在数据更新且界面更新之后调用resolve
      // 必须在列表显示之后创建: watch + $nextTick()
      new BScroll('.menu-wrapper', {})
      new BScroll('.foods-wrapper', {})*/

    },

    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      //当前分类项下标
      currentIndex () {
        const {scrollY, tops} = this
        /*
        tops = [0, 5, 8, 12, 15]
        scrollY in [top, nextTop)
         */
        const index = tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])
        // 每次currentIndex变化, 左侧滚动到最新分类项(可能达不到)
        if(index !== this.index && this.leftScroll) { // 当前下标变化了
          // 将最新的index保存想来
          this.index = index
          // 左侧滚动到最新分类项
          this.leftScroll.scrollToElement(this.$refs.leftUl.children[index], 300)
        }


        return index

      }
    },

    methods: {
      // 初始化滚动对象
      _initScroll () {
        // 必须在列表显示之后创建: watch + $nextTick()
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true, // 分发自定义点击事件
        })
        this.rightScroll = new BScroll('.foods-wrapper', {
          probeType: 1, // 触摸  非实时
          // probeType: 2, // 触摸  实时
          // probeType: 3,  // 触摸/惯性/编码  实时
          click: true,
        })

        // 给右侧列表绑定滚动的监听
        this.rightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', y, x)
          this.scrollY = Math.abs(y)
        })
        // 给右侧列表绑定滚动结束的监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', y, x)
          this.scrollY = Math.abs(y)
        })

      },

      // 初始化所有分类li的top
      _initTops () {

        // 统计tops
        const tops = []
        let top = 0
        tops.push(top)

        const lis = this.$refs.rightUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        // 更新tops状态数据
        this.tops = tops
        console.log('tops', tops)
      },

      clickLeft (index) {
        console.log('clickLeft')
        // 右侧对应位置的坐标
        const top = this.tops[index]

        // 设置scrollY为目标top
        this.scrollY = top

        // 让右侧滑动到对应的位置
        this.rightScroll.scrollTo(0, -top, 300)
      },

      showFood (food) {
        // 更新food数据
        this.food = food
        // 显示food组件界面
        this.$refs.food.toggleShow()
      }
    },

    components: {
      ShopCart,
      Food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
