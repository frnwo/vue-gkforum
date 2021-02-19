<template>
  <div class="posts-item">
    <div class="header-img">
      <img :src="postsItem.user.headerUrl" alt="" @load="imageLoad">
    </div>
    <div class="title">
      {{postsItem.post.title}}
    </div>
    <div class="up" v-if="postsItem.post.type==1">置顶</div>
    <div class="info">
      <span class="user">{{postsItem.user.username}}</span>
      <span class="time">{{postsItem.post.createTime|calcTime}}</span>
      <span class="comment-count">{{postsItem.post.commentCount}}</span>
    </div>
  </div>
</template>

<script>
import {debounce} from "common/utils";

export default {
  name:"PostsListItem",
  props:{
    postsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
       //发射事件
      this.$bus.$emit("itemImageLoad")
    }
  },
  filters:{
    //调整时间格式
    calcTime(data){
      let t = data.split('T');
      let date = t[0].substring(5);
      let time = t[1].substring(0,5);
      // console.log(time);
      return date+' '+time;
    }
  }
  
}
</script>

<style scoped>
.posts-item{
  position: relative;
  width: 100%;
  padding: 18px 5px 5px;
  border-bottom: 2px solid #000;
  font-size: 22px;
}
.header-img{
  position: absolute;
  left: 5px;
  top:18px;
  width: 36px;
  height: 36px;
}
.header-img img{
  width: 100%;
  height: 100%;
}
.title{
  margin-left: 50px;
  color: #000;
}
.up{
  position: absolute;
  right: 5px;
  top:18px;
  padding: 5px 8px;
  background-color: #ee5253;
  color: #fff;
  font-size: 16px;
}
.info{
  margin-top: 22px;
  font-size: 16px;
}
.info .user{
  display: inline-block;
  width: 90px;
}
.info .comment-count{
  float: right;
  margin-right: 20px;
}
</style>