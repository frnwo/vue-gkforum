<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">广科校园论坛</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <posts-list :posts="posts.list" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import PostsList from "components/content/posts/PostsList";

import {itemListListener,backTop} from 'common/mixins';

import { getDiscussPosts } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    PostsList,

    getDiscussPosts,
  },
  data() {
    return {
      posts: { current: 0,  list: [] ,totalPage:0},
      isShowBackTop:false,
    };
  },
  mixins:[itemListListener,backTop],
  created() {
    this.getDiscussPosts(1,10);
  },
  methods: {
    getDiscussPosts(limit) {
      const current = this.posts.current+1;
      getDiscussPosts(current,limit)
        .then((res) => {
          const pageInfo = res.data.pop();
          //总共页数
          this.posts.totalPage = pageInfo.totalPage;
          //获取posts
          this.posts.list.push(...res.data);
          this.posts.current++;
          this.$refs.scroll.finishPullUp();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    contentScroll(position) {
      // this.$refs.scroll.refresh();
      this.isShowBackTop = -position.y > 400;
    },
    loadMore() {
      console.log("pulling up");
      if(this.posts.current >= this.posts.totalPage) return;
      this.getDiscussPosts(10);
    },
  },
};
</script>
<style scoped>
.home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: #c8d6e5;
  color: #222f3e;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
