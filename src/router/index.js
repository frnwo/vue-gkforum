import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('views/home/Home')
const Hot = () => import('views/hot/Hot')
const Message = () => import('views/message/Message')
const Profile = () => import('views/profile/Profile')
const Register = ()=> import('views/register/Register')
const Login = ()=> import('views/login/Login')
const routes = [
  {
    path:'',
    redirect:'/home',
  },
  {
    path:'/hot',
    component:Hot,
  },
  {
    path:'/message',
    component:Message,
  },
  {
    path:'/home',
    component:Home,
  },
  {
    path:'/profile',
    component:Profile,
  },
  {
    path:'/register',
    component:Register,
  },
  {
    path:'/login',
    component:Login,
  }
  // {
  //   // path:'/detail/:iid',
  //   path:'/detail',
  //   component:Detail,
  // }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
