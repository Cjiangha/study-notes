//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
		userInfo: app.globalData.userInfo.user,
    // userInfo: wx.getStorageSync('user') || '',
    StatusBar: app.globalData.StatusBar, //状态栏高度
    CustomBar: app.globalData.CustomBar, //手机信息栏高度
  },
		
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  logoutBindtap: function() {
      try {
        wx.clearStorageSync();
        app.globalData = {
          SID: null,
          userInfo: {},
          tag: {
            Params: { Locations: '' },
          },
          SERVER: '',
          resultScene: '',
          onNetworkStatusChangeRes: {
            isConnected: true
          },
          navigatePage: '',
         
        }
        wx.reLaunch({
          url: '../login/login-account',
        })
      } catch (e) {}
  
  }
})