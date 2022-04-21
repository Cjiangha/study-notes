const app = getApp()
import Toast from "@vant/weapp/toast/toast.js";
Page({
  data: {
    msg: ''
  },
  onLoad() {},
  toPage1() {
    let that = this
    wx.navigateTo({
      url: '/index/page1/page1',
      events: {
        back(data) {
          that.innerFun(data.data)
        }
      }
    })
  },
  innerFun(msg) {
    this.setData({
      msg
    })
    // wx.showLoading({
    //   title: '111111',
    // })
    // setTimeout(() => {
    //   wx.hideLoading()
    // }, 1500)
    Toast.success(msg)
  }
})
