<template>
  <div id="tabbar">
     <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar',
}
</script>

<style>

  #tabbar {
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* x（正数阴影往右）,y（正数阴影往下）,模糊程度，颜色 */
    box-shadow: 0 -1px 7px rgba(175, 171, 171, 0.8);

  }
  
</style>