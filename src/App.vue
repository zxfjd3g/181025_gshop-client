<template>
  <div id="app">
    <router-view/> <!--在此显示当前路由组件-->

    <FooterGuide v-show="$route.meta.isShow"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {

    async mounted () {
      // 异步获取当前地址信息
      this.$store.dispatch('getAddress')
      // 异步获取用户信息
      this.$store.dispatch('getUser')
    },

    components: {
      FooterGuide
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>