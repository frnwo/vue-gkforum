// import {debounce} from './utils';
// import BackTop from "components/content/backTop/BackTop";
import {logout} from "network/home";

export const header = {
  data(){
    return{
      showDropDown: false,
    }
  },
  computed:{
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
 
  methods:{
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
    //退出
    logout() {
      console.log("退出");
      logout().then((res) => {
        //删除的vuex和localStorage的loginMsg
        if (res.data == "ok") {
          this.$store.commit("login", undefined);
          localStorage.removeItem("loginMsg");
          //刷新页面
          this.$router.push({
            path:"/home"
          })
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
    gohome(){
      this.$router.push({
        path:"/home",
      })
    }
  }
}

// export const itemListListener = {
//   data(){
//     return {
//       itemImgListener:null,
//       newRefresh: null,
//     }
//   },
//   mounted(){
//     //1.监听GoodListItem中图片加载完成 //刷新高度
//     this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
//     this.itemImgListener = () => this.newRefresh();
//     this.$bus.$on("itemImageLoad", this.itemImgListener );
//   }
// }

// export const backTop = {
//   components:{
//     BackTop,
//   },
//   data(){
//    return{
//     isShowBackTop: false,
//    }
//   },
//   methods:{
//     backTop() {
//       this.$refs.scroll.scrollTo(0, 0);
//     },
//   }
// }