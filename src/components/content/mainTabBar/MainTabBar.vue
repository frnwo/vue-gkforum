<template>
<div id="main-tab-bar">
  <tab-bar>
      <!-- 因为"/home"是固定值，不是变量，所以path前面不用加: -->
      <tab-bar-item path="/home">
        <img class="" slot="item-icon" src="~assets/img/tabbar/home.png"/>  
        <img class="" slot="item-icon-active" src="~assets/img/tabbar/home_active.png"/>
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/hot">
        <img class="" slot="item-icon" src="~assets/img/tabbar/hot.png"/>
         <img class="" slot="item-icon-active" src="~assets/img/tabbar/hot_active.png"/>
        <div  slot="item-text">热门</div>
      </tab-bar-item>

      <tab-bar-item path="/message">
        <img class="" slot="item-icon" src="~assets/img/tabbar/message.png"/>
         <img class="" slot="item-icon-active" src="~assets/img/tabbar/message_active.png"/>
        <div  slot="item-text">消息</div>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <img class="" slot="item-icon" src="~assets/img/tabbar/profile.png"/>
         <img class="" slot="item-icon-active" src="~assets/img/tabbar/profile_active.png"/>
        <div  slot="item-text">我的</div>
      </tab-bar-item>

    </tab-bar>
</div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem';

export default {
  components:{
    TabBar,
    TabBarItem,
  }
}
</script>

<style>

</style>