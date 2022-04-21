//获取应用实例
const app = getApp();
Page({
  data: {
    src:''
  },
  onLoad: function (options) {
    this.cropper = this.selectComponent("#image-cropper");
    console.log('进来了');
    console.log(this.cropper)
    this.cropper.upload(); //上传图片
  },

  upload() {
    // let that = this;
    this.cropper.upload(); //上传图片
  },
});
