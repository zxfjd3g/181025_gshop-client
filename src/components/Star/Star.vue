<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(c, index) in starClasses" :key="index" :class="c"></span>
  </div>
</template>
<script>
  
  const CLASS_ON = 'on' // 全星
  const CLASS_HALF = 'half' // 半星
  const CLASS_OFF = 'off' // 灰星

  export default {
    // 声明接收哪些属性
    props: {
      score: Number, // 评分
      size: Number // 尺寸
    },

    computed: {
      // 3.5 = 3 + 1 + 1
      starClasses () {
        const arr = []
        const {score} = this
        const scoreInteger = Math.floor(score)
        // 1. 向arr中添加n个on
        for (let i = 0; i < scoreInteger; i++) {
          arr.push(CLASS_ON)
        }
        // 2. 可能向arr中添加1个half
        if(score*10 - scoreInteger*10>=5) {
          arr.push(CLASS_HALF)
        }
        // 3. 向arr中添加m个off
        while(arr.length<5) {
          arr.push(CLASS_OFF)
        }

        return arr
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

  @import "../../common/stylus/mixins.styl"

  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>