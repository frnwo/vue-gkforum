import Vue from 'vue'
import Cube from 'cube-ui'

import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

//权限验证
router.beforeEach((to, from, next) => {
  //校验是否登陆了
  let isSignin = localStorage.getItem("loginMsg");
  let matched = to.matched.some((item) => {
    return item.meta.login_required;
  });
  if(!isSignin && matched){
    next('/login');
  }else{
    next();
  }
});

Vue.use(Cube)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


