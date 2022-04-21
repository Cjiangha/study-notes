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
  gorequest: function () {
    wx.showLoading({
      title: '正在请求。。。',
    })
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: 'https://zxbb.zwb.tjbh.gov.cn//JCHnaccForm/Api/Public/Index/SceneInfoList.ashx',
      header: {
          "content-type": "application/json;charset=UTF-8"    
      },
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        wx.showModal({
          cancelColor: 'cancelColor',
          content:'324234'
        })
      },
      fail:function(){
        wx.hideLoading()
        wx.showModal({
          cancelColor: 'cancelColor',
          content:'请求超时'
        })
      }
    })
  }
})