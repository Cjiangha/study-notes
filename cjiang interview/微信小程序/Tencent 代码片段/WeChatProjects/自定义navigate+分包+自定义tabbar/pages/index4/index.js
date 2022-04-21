const app = getApp()

Page({
  data: {
    title: '自定义导航'
  },
  onLoad: function () {
  },
  showLoading: function () {
    wx.showNavigationBarLoading({
      complete() {
        console.log('showNavigationBarLoading')
      }
    })
  },
  hideLoading: function () {
    wx.hideNavigationBarLoading({
      complete() {
        console.log('hideNavigationBarLoading')
      }
    })
  },
})
