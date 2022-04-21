var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'Cloud Corner Led',
    groms:[[5643,'功能厅'],[5633,'会议室']],
  },
  
	decideSid: function (){
		var that = this
		let sid = wx.getStorageSync('sid') || ''
			let loginMethod = wx.getStorageSync('loginMethod') || ''
			console.log('sid 过期', '登录方式', loginMethod)
				console.log('account 方式登录')
				let user = wx.getStorageSync('user')
				let pwd = wx.getStorageSync('password')
				let oProId = wx.getStorageSync('oProId')
				let oAreaId = wx.getStorageSync('oAreaId')
				that.indexLogin(user, pwd, oProId, oAreaId);
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    // options = decodeURIComponent(options).replace(/&amp;/g, '&')
    console.log(app.globalData,'loading页面', options)
    var that = this;
    
			that.decideSid()
    
  },
  processing: function(e) {
    var that = this
    var enIntention = [];

      //指向多信标,弹出框现在展示信标
      that.setData({
        modalName: 'DialogModal2',
      })

  },
  /**请选择要展示的区域 */
  locationBind: function(e) {
    var that = this;
    var Locations = [e.currentTarget.id];
    // wx.setStorageSync('Locations', Locations)
		app.globalData.tag.Params.Locations = Locations,
		
    wx.reLaunch({
      url: '../Intention/Intention',
    })
  },

  indexLogin: function(user, password, oProId, oAreaId) {
    var that = this;
        app.globalData.userInfo = {
          user: user
        }
        wx.setStorageSync('sid', 'sid')
        wx.setStorageSync('user', 'user')
        wx.setStorageSync('password', 'password')
        // wx.setStorageSync('parameters', parameters)
        if (oProId != '') {
          wx.setStorageSync('oProId', 'oProId')
        }
        if (oAreaId != '') {
          wx.setStorageSync('oAreaId', 'oAreaId')
        }
        that.processing();
        console.log(wx.getStorageSync('sid'), '  账号密码登录成功')
        
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})