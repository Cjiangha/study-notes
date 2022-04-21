
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
  },

  
  getUserProfile(e) {
    console.log("getUserProfile");
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log("getUserProfile success:",res,this.data.userInfo);
      }
    })
  },
 
  onReady: function() {
    
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that=this;
    // var timeDif=;
    that.setData({
      hasUserInfo:false,
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that =this;
    console.log("UserInfo onShow:",that.data.hasUserInfo)
    if(that.data.hasUserInfo){
      }
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

  },
})