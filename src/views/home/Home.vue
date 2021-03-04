<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="left" class="publish" @click="showPublish">
        <img src="~assets/img/publish/publish.png" />
      </div>
      <div slot="center" @click="gohome">广科校园论坛</div>
    </nav-bar>
    <div class="area">
      <div class="user">
        <div v-if="hasLogin" @click="userClick" class="login">
          <img :src="headerUrl" class="header" />{{ username }}
        </div>
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
    <!-- 帖子类型 考研区，闲聊区。。。 -->
    <div class="posts-area">
      <div>闲聊区</div>
      <div>考研区</div>
      <div>新生区</div>
      <div>毕业生区</div>
      <div>教师区</div>
    </div>
    <div class="body">
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
    <div class="gong-gao">公告板</div>
    <div class="publish_area" v-show="publish_area_show">
      <!-- 标题区 -->
      <cube-input
        v-model="title"
        placeholder="标题"
        :autofocus="autofocus"
      ></cube-input>
      <!-- 内容区 -->
      <cube-textarea
        v-model="content"
        :indicator="indicator"
        :maxlength="maxlength"
        placeholder="内容"
      ></cube-textarea>
      <!-- 帖子图片  -->
      <cube-upload
        :simultaneous-uploads="2"
        :max="max"
        @files-added="filesAdded"
      />
      <span style="font-size: 15px" class="pic_txt">最多4张图片</span>
      <span>发帖到:</span>
      <!-- 发布区域选择 -->
      <cube-checker
        class="selectArea"
        v-model="postArea"
        :options="options"
        type="radio"
      />
      <cube-button class="publish_btn" @click="publish">发布</cube-button>
    </div>
    <!-- 遮罩层 -->
    <div
      class="cover"
      @click="hidePublishArea"
      v-show="publish_area_show"
    ></div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import PostsList from "components/content/posts/PostsList";

import { getDiscussPosts, logout, publish } from "network/home";

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
      showDropDown: false,
      title: "",
      content: "",
      postArea: "",
      files: [],
      max: 4,
      autofocus: true,
      options: [
        {
          value: "闲聊区",
          text: "闲聊区",
        },
        {
          value: "考研区",
          text: "考研区",
        },
        {
          value: "新生区",
          text: "新生区",
        },
        {
          value: "毕业生区",
          text: "毕业生区",
        },
        {
          value: "教师区",
          text: "教师区",
        },
      ],
      maxlength: 120,
      indicator: true,
      publish_area_show: false,
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
    headerUrl() {
      return localStorage.getItem("loginHeaderUrl");
    },
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
    logout() {
      console.log("退出");
      logout().then((res) => {
        //删除的vuex和localStorage的loginMsg
        if (res.data == "ok") {
          this.$store.commit("login", undefined);
          localStorage.removeItem("loginMsg");
          //刷新页面
          this.$router.go(0);
        }
      });
    },
    //点击用户名显示下拉框
    userClick() {
      this.showDropDown = !this.showDropDown;
    },
    //账号设置
    account() {
      this.$router.push({
        path: "/account",
      });
    },
    //点击头部到首页
    gohome() {
      this.$router.push({
        path: "/home",
      });
    },
    filesAdded(files) {
      // console.log(file);
      const maxSize = 1 * 1024 * 1024; // 1M
      for (const f of files) {
        if (f.size > maxSize) {
          f.ignore = true;
          this.$createToast({
            type: "抱歉",
            time: 2000,
            txt: "请选择小于1M的图片",
          }).show();
        }else{
          this.files.push(f);
        }
      }
    },
    //显示发帖div
    showPublish() {
      //显示遮罩层和发布区域
      if(!localStorage.getItem("loginMsg")){
        this.$router.push("/login");
        return;
      }
      this.publish_area_show = true;
    },
    //发帖
    publish() {
      //隐藏遮罩层
      // console.log(this.title,this.content,this.files,this.postArea)
      publish(this.title, this.content, this.postArea, this.files).then(
        (res) => {
          this.publish_area_show = false;
          this.$createToast({
              type: "success",
              txt: "发布成功!",
              time: 2000,
            }).show();
          this.$router.go(0);
          // console.log(res)
        }
      );
    },
    hidePublishArea(){
      this.publish_area_show = false;
      this.title = "";
      this.content = "";
      this.postArea = "";
      this.files = []
    }
  },
};
</script>
<style scoped>
.home {
  position: relative;
  width: 45%;
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
.area .user .login,
.register {
  display: flex;
  justify-content: center;
  align-items: center;
}
.area .user .login {
  height: 100%;
}
.area .user div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.area .header {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
}
.dropdown {
  background-color: pink;
  position: absolute;
  text-align: center;
  width: 100px;
  left: 0;
  top: 44px;
  border-radius: 5px;
}
.dropdown div {
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
.home-nav div:first-child {
  cursor: pointer;
}
.home-nav .publish {
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: 150px;
}
.posts-area {
  position: fixed;
  left: 60px;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 20%;
  height: 300px;
  background: pink;
}
.posts-area > div {
  cursor: pointer;
  width: 140px;
  padding: 10px 10px;
  text-align: right;
}
.posts-area > div:hover {
  font-size: 1.2em;
  border-right: 2px solid blue;
}
.publish img {
  width: 100%;
}
.gong-gao {
  position: fixed;
  right: 60px;
  top: 60px;
  width: 20%;
  height: 300px;
  text-align: center;
  line-height: 300px;
  background: url(~assets/img/home/gongGao.jpg);
  background-size: cover;
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
.publish_area {
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  margin-left: -300px;
  margin-top: -254px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 600px;
  height: 560px;
  background: #d1d8e0;
  border-radius: 10px;
}
.publish_area div {
  width: 100%;
}
.publish_area ul {
  width: 100%;
  display: flex;
  justify-content: center;
}
.selectArea li {
  display: inline-block;
  width: 70px;
}
.cover {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
}
</style>
