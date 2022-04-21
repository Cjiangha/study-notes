// store/map-store/map-store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapSetting: {
      latitude: '28.13486328125',
      longitude: '113.0149769422743',
      showLocation: true,
      scale: 14
    },
    markers: [
      {
        id: 1,
        // clusterId: 1,
        joinCluster: false,
        latitude: '28.142464',
        longitude: '113.016724',
        title: '测试',
        iconPath: '/images/location-icon.png',
        width: '80rpx',
        height: '80rpx',
        customCallout: {
          anchorY: 2,
          anchorX: 0,
          display: 'ALWAYS',
        }
      }
    ]
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

  }
})