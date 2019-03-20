<template>
  <div id="app">
    <router-view/> <!--在此显示当前路由组件-->

    <FooterGuide v-show="$route.meta.isShow"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  import {reqInfo} from './api'

  export default {

    async mounted () {
      // 异步获取当前地址信息
      this.$store.dispatch('getAddress')
      // 异步获取用户信息
      this.$store.dispatch('getUser')

      const result = await reqInfo()
      console.log('result', result)
    },

    components: {
      FooterGuide
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>