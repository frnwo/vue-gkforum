<template>
  <div id="login_container">
    <div id="login">
      <cube-input
        v-model="username"
        placeholder="请输入登录用户名"
        :autofocus="autofocus"
      ></cube-input>
      <!-- 用户名validator-->
      <cube-validator
        ref="validator0"
        v-model="result[0]"
        :model="username"
        :rules="nameRules"
        class="vali1"
      ></cube-validator>

      <!-- 密码 -->
      <cube-input
        v-model="password"
        placeholder="请输入登录密码"
        type="password"
        :eye="eye"
      ></cube-input>
      <!-- 密码validator-->
      <cube-validator
        v-model="result[1]"
        ref="validator1"
        :model="password"
        :rules="pwdRules"
        class="vali2"
      ></cube-validator>
      <div class="kaptcha-area">
        <!-- 验证码input -->
        <cube-input
          v-model="kaptcha"
          placeholder="请输入右方的验证码"
          type="text"
        ></cube-input>
        <!-- 验证码validator-->
        <cube-validator
          v-model="result[2]"
          ref="validator2"
          :model="kaptcha"
          :rules="kaptchaRules"
          class="vali3"
        >
        </cube-validator>
        <!-- 验证码图片 -->
        <div class="kaptcha-img">
          <img
            src="http://localhost:8888/forum/kaptcha"
            @click="refreshKaptcha"
          />
        </div>
      </div>

      <cube-button :outline="true" @click="submit" class="login-btn"
        >登录</cube-button
      >
    </div>
  </div>
</template>

<script>
import { login } from "network/login";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      kaptcha: "",
      autofocus: true,
      eye: {
        open: false,
        reverse: false,
      },
      result: [undefined, undefined, undefined],
      //用户名验证规则
      nameRules: {
        required: true,
        type: "text",
      },
      //密码验证规则
      pwdRules: {
        required: true,
        type: "password",
      },
      //验证码 验证规则
      kaptchaRules: {
        required: true,
        type: "text",
      },
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    submit() {
      const p1 = this.$refs.validator0.validate();
      const p2 = this.$refs.validator1.validate();
      const p3 = this.$refs.validator2.validate();
      const toast = this.$createToast({
        time: 0,
        txt: "正在登录中....",
      });
      Promise.all([p1, p2, p3])
        .then(() => {
          if (this.result.every((item) => item)) {
            //正在登录中的toast
            toast.show();
            return login(this.username, this.password, this.kaptcha);
          }
        })
        .then((res) => {
          // 隐藏正在登录的toast
          toast.hide();
          const mylogin = res.data;
          console.log(res);
          if (mylogin.status == "ok") {
            // 登录成功后把用户信息存进vuex和localstorage
            // this.$store.loginMsg.username = this.username;
            this.$store.commit("login", this.username);
            localStorage.setItem("loginMsg", this.username);
            localStorage.setItem("loginHeaderUrl",mylogin.user.headerUrl)
            //跳转到首页
            this.$router.push({
              path: "/home",
            });
          } else {
            //显示登录失败的toast
            const errMsg = Object.values(mylogin).filter(
              (item) => item != null
            )[0];
            this.$createToast({
              type: "error",
              txt: errMsg,
              time: 2000,
            }).show();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refreshKaptcha(e) {
      //刷新验证码
      e.target.src = "http://localhost:8888/forum/kaptcha?p=" + Math.random();
    },
  },
  mounted() {},
};
</script>

<style scoped>
#login {
  position: relative;
  display: flex;
  width: 25%;
  margin-left: 55%;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding: 0 20px;
  height: 100vh;
  padding-bottom: 50px;
}
#login_container {
  background: url(~assets/img/common/login/bg.jpg);
}
.goback {
  position: absolute;
  left: 5px;
  top: 5px;
}

.goback img {
  width: 36px;
}

#login > div {
  width: 100%;
  margin-bottom: 10px;
}
#login .kaptcha-area {
  display: flex;
  position: relative;
}
#login .kaptcha-area div {
  flex-grow: 1;
}
#login .kaptcha-area div:nth-child(2) {
  position: absolute;
  left: 20px;
  bottom: -20px;
}
.kaptcha-img {
  margin-left: 10px;
}
.login-btn {
  margin-top: 40px;
  background-color: #ffb8b8;
}
.vali1 {
  position: absolute;
  left: 300px;
  top: 160px;
}
.vali2 {
  position: absolute;
  left: 300px;
  top: 210px;
}
</style>