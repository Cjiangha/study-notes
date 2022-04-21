const app = getApp()

Page({
  data: {

  },
  onLoad() {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
      },
    })
  },
  chooseImage:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths[0];
        that.createImagePayment(tempFilePaths);
      }
    })
  },
  createImagePayment: function (imgUrl) {
    var that = this;
    var file = imgUrl;
    wx.compressImage({
      src: file, // 图片路径
      quality: 65, // 压缩质量
      success: function (e) {
        console.log(e)
      },
      fail: function (e) {
        console.log(e)
      }
    }) 
  },
  dianwo(){
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res)
      }
    })
  }
})
