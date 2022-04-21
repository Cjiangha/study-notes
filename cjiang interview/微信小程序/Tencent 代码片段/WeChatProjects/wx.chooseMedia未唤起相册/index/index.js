const app = getApp()

Page({
  data: {

  },
  upload() {
    wx.navigateTo({
      url: '/cropper/cropper',
    })
  }
})
