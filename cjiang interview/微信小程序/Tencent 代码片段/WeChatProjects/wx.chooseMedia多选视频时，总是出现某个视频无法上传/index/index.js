const app = getApp()

Page({
  data: {
    tempFiles: []
  },
  // 上传视频或图片
  uploadMedia: function (e) {
    let _this = this;
    wx.chooseMedia({
      count: 9, 
      sourceType: ['album'],
      mediaType: ['video'],
      success: function (res) {
        console.log("res", res)
        console.log("tempFiles", res.tempFiles)
        _this.setData({
          tempFiles: res.tempFiles
        })
      }
    });
  },
  onLoad() {

  },
})
