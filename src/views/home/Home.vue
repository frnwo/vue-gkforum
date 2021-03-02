<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center"  @click="gohome">广科校园论坛</div>
    </nav-bar>
    <div class="area">
      <div class="user">
        <div v-if="hasLogin" @click="userClick" class="login">
          <img :src="headerUrl" class="header"/>{{ username }}</div>
        <div @click="jumpLogin" v-else>登录</div>
      </div>
      <div @click="jumpRegister" class="register" v-show="!hasLogin">注册</div>
      <div class="dropdown" v-show="showDropDown">
        <div>消息</div>
        <div>个人首页</div>
        <div @click="account">账号设置</div>
        <div @click="logout">退出</div>
      </div>
    </div>
    <posts-list :posts="posts.list" />
    <div class="pagnation">
      <span @click="jumpPage(1)">首页</span>
      <span @click="jumpPage(posts.current - 1)">上页</span>
      <div v-for="n in posts.to" :key="n">
        <span
          @click="jumpPage(n)"
          v-if="n >= posts.from"
          :class="{ active: n == posts.current }"
        >
          {{ n }}
        </span>
      </div>
      <span @click="jumpPage(posts.current + 1)">下页</span>
      <span @click="jumpPage(posts.totalPage)">末页</span>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import PostsList from "components/content/posts/PostsList";

import { getDiscussPosts ,logout} from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    PostsList,

    getDiscussPosts,
  },
  data() {
    return {
      posts: { current: 0, list: [], totalPage: 0, from: 0, to: 0 },
      showDropDown:false,
    };
  },
  computed: {
    hasLogin() {
      return (
        this.$store.state.loginMsg.username || localStorage.getItem("loginMsg")
      );
    },
    username() {
      return (
        this.$store.state.loginMsg.username || localStorage.getItem("loginMsg")
      );
    },
    headerUrl(){
      return localStorage.getItem("loginHeaderUrl")
    }
    
  },
  created() {
    this.getDiscussPosts(1, 20);
  },
  methods: {
    getDiscussPosts(current, limit) {
      getDiscussPosts(current, limit)
        .then((res) => {
          const pageInfo = res.data.pop();
          //总共页数
          this.posts.totalPage = pageInfo.totalPage;
          //获取posts
          this.posts.list = res.data;
          this.posts.current = current;
          this.posts.from = current - 2 <= 0 ? 1 : current - 2;
          this.posts.to =
            current + 2 > this.posts.totalPage
              ? this.posts.totalPage
              : current + 2;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //跳转到注册页面
    jumpRegister() {
      this.$router.push({
        path: "/register",
      });
    },
    //跳转登录
    jumpLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    //分页跳转
    jumpPage(page) {
      this.getDiscussPosts(page, 20);
      //回到顶部
      // this.$nextTick(() => {
        document.documentElement.scrollTop = 0;
      // });
    },
    //退出
    logout(){
      console.log("退出")
      logout().then(res=>{
        //删除的vuex和localStorage的loginMsg
        if(res.data=="ok"){
          this.$store.commit('login',undefined);
          localStorage.removeItem("loginMsg")
          //刷新页面
          this.$router.go(0)
        }
      })
    },
    //点击用户名显示下拉框
    userClick(){
      this.showDropDown = !this.showDropDown;
    },
    //账号设置
    account(){
      this.$router.push({
        path:"/account"
      })
    },
    //点击头部到首页
    gohome(){
      this.$router.push({
        path:"/home",
      })
    }
  },
};
</script>
<style scoped>
.home {
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding-top: 44px;
}
.area {
  position: fixed;
  display: flex;
  width: 300px;
  height: 44px;
  z-index: 99999;
  left: 800px;
  top: 0;
  font-size: 20px;
}
.area div {
  cursor: pointer;
  padding-right: 10px;
}
.area .user .login,.register{
  display: flex;
  justify-content: center;
  align-items: center;
}
.area .user .login{
  height: 100%;
}
.area .header{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
}
.dropdown{
  background-color: pink;
  position: absolute;
  text-align: center;
  width: 100px;
  left: 0;
  top:44px;
  border-radius: 5px;
}
.dropdown div{
  padding: 5px 0;
}
.home-nav {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: #c8d6e5;
  color: #222f3e;
}
.home-nav div:first-child{
  cursor: pointer;
}
.pagnation {
  width: 70%;
  margin: 0 auto;
  display: flex;
}
.pagnation .active {
  color: red;
}
.pagnation span {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}
</style>
