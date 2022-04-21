//app.js

var dtime = '_deadtime';
App({
  data: {

  },


  onLaunch: function(option) {
    var that = this;
	
    that.globalData.resultScene = 'resultScene'

    wx.setStorageSync('server', 'https://iot.cclcp.com')
    
  },
  globalData: {
    SID: null,
    userInfo: {},
		tag:{
      Params: { Locations:''},
		},
    SERVER: '',
    resultScene: '',
    onNetworkStatusChangeRes: {
      isConnected: true
    },
    navigatePage: '',
    aMultiple:1, //分屏数目
   
  },

 
 
  onShow: function(option) {
    var that = this
   
    this.globalData.resultScene = 'resultScene'
    wx.getSystemInfo({
      success: function(res) {
        if(res.windowWidth>1023 && res.windowWidth>res.windowHeight){ //分屏数目
          that.globalData.aMultiple =  Math.ceil(res.windowWidth/750)
        }
        var dpr = 750 / res.windowWidth /**像素比 */
        that.globalData.dpr = dpr
        that.globalData.StatusBar = res.statusBarHeight * dpr
        that.globalData.CustomBar = (res.platform == 'android' ? res.statusBarHeight + 55 : res.statusBarHeight + 50) * dpr
        // that.globalData.windowHeight = res.windowHeight * dpr - that.globalData.CustomBar - 167
        that.globalData.windowHeight = res.windowHeight * dpr - that.globalData.CustomBar
        that.globalData.ShareBar = 105 * dpr
        console.log('   屏幕大小   ', res.bluetoothEnabled,'   分屏数目   ',that.globalData.aMultiple,'res',res,)
      },
    })
  }
})