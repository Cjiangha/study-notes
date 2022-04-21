// index/page1/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  back() {
    let that = this
    wx.navigateBack({
      delta: 1,
      success() {
        const eventChannel = that.getOpenerEventChannel()
        eventChannel.emit('back', {data: 'test'});
      }
    })
  }
})