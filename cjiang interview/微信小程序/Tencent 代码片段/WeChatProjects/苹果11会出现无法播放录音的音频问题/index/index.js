// pages/test.js
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  playHandler()
  {
    // wx.setStorage({
    //   key:'tt',
    //   value:'this is tt'
    // })
    // wx.navigateTo({
    //   url: '/pages/test1',
    // })
    let innerAudioContext = wx.createInnerAudioContext();
    let str = "https://ysxk-data.oss-cn-beijing.aliyuncs.com/dev/homeworktmp_35f976df30175be4032b1f62b751cb77e1497fdcd6f12d0b.mp3";
    innerAudioContext.src = str;
    console.log('url--------------------',str);
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      this.setData({
        curPlayIndex: this.data.curPlayIndex
      });
    });
    innerAudioContext.onEnded(() => {
      console.log('onended');
      this.setData({
        curPlayIndex: -1
      });
    });
    innerAudioContext.onStop(() => {
      console.log('onstop');
      this.setData({
        curPlayIndex: -1
      });
    });
    innerAudioContext.onError((res) => {
      console.log('onerror',res);
      this.setData({
        curPlayIndex: -1
      });
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
})