const app = getApp()
​
Page({
  data: {
​
  },
  onfocus(e) {
    console.log(e, "focus")
    wx.showToast({
      title: 'focus',
      duration: 500
    })
  },
  onblur(e) {
    console.log(e, "blur")
    wx.showToast({
      title: 'blur',
      duration: 500
    })
  }
})