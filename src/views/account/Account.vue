<template>
  <div id="account">
    <div class="uploadPhoto">
      <div>
        <div class="text">更新头像：</div>
        <cube-upload
          :simultaneous-uploads="1"
          :max="max"
          @files-added="filesAdded"
        />
      </div>
      <cube-button class="uploadBtn">确认更新</cube-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      photo: undefined,
      max: 1,
    };
  },
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
  },
};
</script>

<style scoped>
.uploadPhoto div:first-child{
  display: flex;
  text-align: center;
  height: 90px;
}
.uploadPhoto .text{
  line-height: 90px;
}
#account{
  width: 60%;
  margin: 0 auto;
  margin-top: 100px;
}

.uploadBtn{
  position:relative;
  width: 70%;
  left:80px;

}
</style>