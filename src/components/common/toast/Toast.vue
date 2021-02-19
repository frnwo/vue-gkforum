<template>
  <div class="toast" v-show="isShow">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props:{
  //   message:{
  //     type:String,
  //     default:''
  //   },
  //   isShow:{
  //     type:Boolean,
  //     default:false
  //   }
  // }
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    show(message,duration=1500) {
      // duration = duration || 1500
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index:999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 14px 18px;
}
</style>