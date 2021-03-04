<template>
  <div id="account">
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
    <div class="uploadPhoto">
      <div class="left">更新头像：</div>
      <div class="right">
        <cube-upload
          :simultaneous-uploads="1"
          :max="max"
          @files-added="filesAdded"
        />
        <cube-button class="uploadBtn" @click="updatePhoto"
          >确认更新</cube-button
        >
      </div>
    </div>
    <div class="updatePwd">
      <div class="left">修改密码：</div>
      <div class="right">
        <!-- 原密码 -->
        <cube-input
          v-model="password"
          placeholder="请输入原密码"
          type="password"
          :eye="eye"
        ></cube-input>
        <!-- 原密码validator-->
        <cube-validator :model="password"></cube-validator>
        <!-- 新密码 -->
        <cube-input
          v-model="newPassword"
          placeholder="请输入新密码"
          type="password"
          :eye="eye"
        ></cube-input>
        <!-- 新密码validator-->
        <cube-validator
          :model="newPassword"
          :rules="newPwdRules"
          :messages="newPwdMessage"
        ></cube-validator>

        <!-- 确认密码 -->
        <cube-input
          v-model="password_sure"
          placeholder="请再次确认密码"
          type="password"
          :eye="eye"
        ></cube-input>
        <!-- 确认密码validator-->

        <cube-validator
          :model="password_sure"
          :rules="pwdSureRules"
          :messages="pwdSureMessage"
        ></cube-validator>
        <div>
          <cube-button class="pwdBtn" @click="submitPwd">确认修改</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { header } from "common/mixins.js";

import { updatePwd, updatePhoto } from "network/account.js";
export default {
  name: "Account",
  mixins: [header],
  components: {
    NavBar,
  },
  data() {
    return {
      photo: undefined,
      max: 1,
      eye: {
        open: false,
        reverse: false,
      },
      password: "",
      newPassword: "",
      password_sure: "",

      newPwdRules: {
        required: true,
        type: "password",
        pattern: /^[a-zA-Z]\w{6,18}$/,
      },
      newPwdMessage: {
        pattern: "数字、字母、下划线且以字母开头,密码长度在6到10位",
      },
      //确认密码验证
      pwdSureRules: {
        required: true,
        type: "password",
        custom: (val) => {
          return val == this.newPassword;
        },
      },
      pwdSureMessage: {
        custom: "与新密码不一致！",
      },
    };
  },
  computed: {},
  methods: {
    filesAdded(file) {
      // console.log(file);
      const maxSize = 1 * 1024 * 1024; // 1M
      if (file.size > maxSize) {
        file.ignore = true;
        this.$createToast({
          type: "抱歉",
          time: 2000,
          txt: "请选择小于1M的图片",
        }).show();
      } else {
        this.photo = file[0];
        // console.log(this.photo)
      }
    },
    //修改密码
    submitPwd() {
      const toast = this.$createToast({
        time: 0,
        txt: "提交修改中....",
      });
      if (this.username && this.password && this.password_sure) {
        toast.show();
        updatePwd(this.password, this.newPassword)
          .then((res) => {
            console.log(res);
            // 隐藏toast
            toast.hide();
            const myUpdatePwd = res.data;

            if (myUpdatePwd.status == "ok") {
              this.$createToast({
                type: "success",
                txt: "修改密码成功",
                time: 3000,
              }).show();
            } else {
              this.$createToast({
                type: "error",
                txt: myUpdatePwd.err,
                time: 3000,
              }).show();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //修改头像
    updatePhoto() {
      if (this.photo) {
        const toast = this.$createToast({
          time: 0,
          txt: "正在上传头像....",
        });
        toast.show();
        updatePhoto(this.photo).then((res) => {
          toast.hide();
          if (res.data.status == "ok") {
            //修改localStorage里面的headerUrl(登录时存进去的)
            localStorage.setItem("loginHeaderUrl",res.data.headerUrl)
            this.$createToast({
              type: "success",
              txt: "修改头像成功",
              time: 3000,
            }).show();
            this.$router.go(0);
          } else {
            this.$createToast({
              type: "error",
              txt: res.data.err,
              time: 3000,
            }).show();
          }
        });
      } else {
        this.$createToast({
          type: "error",
          txt: "您没有选择图片",
          time: 3000,
        }).show();
      }
    },
  },
};
</script>

<style scoped>
#account {
  background: url(~assets/img/common/account/bg.jpg);
  height: 100vh;
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
.area .user div{
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: #c8d6e5;
}
.home-nav div:first-child {
  cursor: pointer;
}
.register img {
  width: 36px;
  vertical-align: bottom;
}
.uploadPhoto {
  padding-top: 50px;
}
.uploadPhoto,
.updatePwd {
  display: flex;
  width: 70%;
  margin: 0 auto;
  height: 200px;
}
.updatePwd {
  margin-top: 40px;
}
.uploadPhoto .right div:first-child {
  position: relative;
  left: 50%;
  margin-left: -40px;
}
.left {
  width: 30%;
  height: 200px;
  text-align: center;
  line-height: 200px;
}
.right {
  width: 60%;
}
.updatePwd {
  height: 250px;
}
.updatePwd .right {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}
.updatePwd .right div {
  height: 30px;
}
</style>