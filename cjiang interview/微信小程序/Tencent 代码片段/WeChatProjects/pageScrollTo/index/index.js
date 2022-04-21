const app = getApp()

Page({
  jump() {
    wx.pageScrollTo({
      selector: '#item5'
    })
  }
})
