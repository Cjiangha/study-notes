// page3/page3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  backPage2(){
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('dataFromPage3', {
      data:"hello"
    });
    wx.navigateBack();
  },

  backPage1(){
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('dataFromPage3', {
      data:"hello"
    });
    wx.navigateBack({
      delta:2
    });
  }
})