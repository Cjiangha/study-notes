Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toclick: function () {
    setTimeout(() => {
      wx.switchTab({
        url: '/index/index',
      })
    }, 0)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return this.goShare()
  },
  goShare() {
    return {
      path: '/index/index'
    }
  }
})