<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="loading" v-else>
    </nav>

    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  import ShopList from '../../components/ShopList/ShopList.vue'

  import {msMixin} from '../../util/mixins'

  export default {

    mixins: [msMixin],

    data () {
      return {
        msg2: 123
      }
    },

    // 初始显示之后
    mounted () {
      // 异步请求获取shops
      this.$store.dispatch('getShops')
      // 异步请求获取categorys
      this.$store.dispatch('getCategorys')

      /*setTimeout(() => {
        // 创建swiper对象的时机? 必须在列表页面显示之后
        new Swiper('.swiper-container', {
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true, // 循环模式
        })
      }, 2000)*/
    },

    computed: {
      // ...mapState(['address', 'categorys']),
      ...mapState({
        address: state => state.msite.address,
        categorys: state => state.msite.categorys,
      }),

      /*
      分类的二维数组
      小数组中的最大长度为8
       */
      categorysArr () {
        const {categorys} = this
        // 空二维数组
        const bigArr = []
        let smalArr = []

        // 遍历总数组
        categorys.forEach(c => {

          // 将小数组保存到大数组(只能保存1次)
          if (smalArr.length===0) { // 如果当前小数组是空的
            bigArr.push(smalArr)
          }

          // 将c保存小数组 (最大长度是8)
          smalArr.push(c)
          // 如果当前小数组满了, 准备一个新的小数组
          if(smalArr.length===8) {
            smalArr = []
          }
        })

        return bigArr

      }
    },

    watch: {
      categorys () { // categorys状态数据已经更新了(但界面还没有更新, 更新界面是最后异步执行)

        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(() => {
          // 创建swiper对象的时机? 必须在列表页面显示之后
          new Swiper('.swiper-container', {
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            loop: true, // 循环模式
          })
        })
      }
    },

    components: {
      ShopList
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>