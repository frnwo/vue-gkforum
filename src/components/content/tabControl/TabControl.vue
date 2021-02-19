<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"  @click="choose(index)">
      <span :class="{active:index===currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    titles:{
      type:Array,
      default(){
        return []
      },
    },
  },
  data(){
    return{
      currentIndex:0,
    }
  },
  methods:{
    choose(index){
      this.currentIndex = index;
      //往外面发出事件，并让外面去监听该事件
      this.$emit('tabClick',index)
    }
  },

}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
}
.tab-control div{
  flex:1;
  height: 40px;
  line-height: 40px;
}
.tab-control span{
  padding-bottom: 5px;
}
.active{
  color:pink;
  border-bottom: 1px solid pink;
}
</style>