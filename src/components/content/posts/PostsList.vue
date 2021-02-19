<template>
  <div class="posts-list">
    <posts-list-item v-for="(item,index) in posts" :key="index" :posts-item="item"/>
  </div>
</template>

<script>
import PostsListItem from './PostsListItem';
export default {
  name:"PostsList",
  components:{
    PostsListItem,
  },
  props:{
    posts:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>