<template>
  <div id="register">
    <div class="goback" @click="goback"><img src="~assets/img/common/goback.png"/></div>
    <!-- 用户名 -->
    <cube-input
      v-model="username"
      placeholder="请输入用户名"
      :autofocus="autofocus"
    ></cube-input>
    <!-- 用户名validator-->
    <cube-validator
      ref="validator0"
      v-model="result[0]"
      :model="username"
      :rules="nameRules"
      :messages="nameMessage"
    ></cube-validator>

    <!-- 邮箱 -->

    <cube-input
      v-model="email"
      placeholder="请输入邮箱"
      type="email"
    ></cube-input>
    <!-- 邮箱validator-->

    <cube-validator
      v-model="result[1]"
      ref="validator1"
      :model="email"
      :rules="eamilRules"
    ></cube-validator>
    <!-- 密码 -->
    <cube-input
      v-model="password"
      placeholder="请输入密码"
      type="password"
      :eye="eye"
    ></cube-input>
    <!-- 密码validator-->
    <cube-validator
     v-model="result[2]"
      ref="validator2"
      :model="password"
      :rules="pwdRules"
      :messages="pwdMessage"
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
     v-model="result[3]"
      ref="validator3"
      :model="password_sure"
      :rules="pwdSureRules"
      :messages="pwdSureMessage"
    ></cube-validator>
    <cube-button :primary="true" @click="submit">注册</cube-button>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password_sure: "",
      autofocus: true,
      eye: {
        open: false,
        reverse: false,
      },
      result:[undefined,undefined,undefined,undefined],
      //邮箱验证规则
      eamilRules: {
        required: true,
        type: "email",
      },
      //用户名验证规则
      nameRules: {
        required: true,
        type: "text",
        custom: (val) => {
          return val.length < 10;
        },
      },
      nameMessage: {
        custom: "用户名不要超过10个字符",
      },
      //密码验证规则
      pwdRules: {
        required: true,
        type: "password",
        pattern:/^[a-zA-Z]\w{6,18}$/,
      },
      pwdMessage: {
        pattern:"数字、字母、下划线且以字母开头,密码长度在6到10位",
      },
      //确认密码验证
      pwdSureRules:{
        required:true,
        type:"password",
        custom:(val)=>{
          return val==this.password
        }
      },
      pwdSureMessage:{
        custom:"与第一个密码不一致！"
      }
    };
  },
  methods: {
   goback(){
     this.$router.go(-1)
   },
   submit() {
      const p1 = this.$refs.validator0.validate()
      const p2 = this.$refs.validator1.validate()
      const p3 = this.$refs.validator2.validate()
      const p4 = this.$refs.validator3.validate()
      Promise.all([p1, p2, p3,p4]).then(() => {
        if (this.result.every(item => item)) {
          
          //最终有效
          this.$createToast({
            type: 'correct',
            txt: '注册成功,请激活邮件',
            time: 2000
          }).show()
          this.$router.push({
            path:'/home'
          })
        }
      })
    }
  },
  mounted() {},
};
</script>

<style scoped>
#register{
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding: 0 20px;
  height: 100vh;
  padding-bottom: 50px;
}
.goback{
  position: absolute;
  left: 5px;
  top:5px;
}
.goback img{
  width: 36px;

}
#register>div{
  width:100%;
  margin-bottom: 10px;
}
</style>