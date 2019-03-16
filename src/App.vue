<template>
  <div id="app">
    <router-view/> <!--在此显示当前路由组件-->

    <FooterGuide/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {
    components: {
      FooterGuide
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>