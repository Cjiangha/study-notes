const app = getApp()

Page({
  data: {

  },
  onLoad() {
    this.testToast()
  },

  testToast() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 5000
    })
    
    setTimeout(() => {
      wx.hideLoading()
    }, 500);
  }
})
