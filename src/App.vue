<template>
  <div id="appzzz">
    <!-- <keep-alive exclude="Detail"> -->
    <keep-alive exclude="Register">
      <router-view />
    </keep-alive>
    <!-- <main-tab-bar></main-tab-bar> -->
  </div>
</template>
<script>
// import MainTabBar from 'components/content/mainTabBar/MainTabBar'
export default {
  name:'App',
  components:{
    // MainTabBar,
  }
}
</script>
<style lang="less">
/**引入base.css */
@import "assets/css/base.css";
</style>
