var app = getApp()
// let BZRequest = require("../../utils/BZRequest");
let _isLoaded = false;

Page({
  data: {
    addMachineSelected:true,
    // _bluetoothAdapterDisable:false,

  },
  onLoad: function () {
    console.log("Onload MainP");
    let that = this;
    // app.authenUserInfo().then(res => {
      wx.login({
        success: res => {
          console.log("userLogin:" + JSON.stringify(res));
          app.globalData._userInfo = res;
          wx.getLocation({
            type: 'wgs84',
            success (res_1) {
              console.log("getLocation:",res_1);
            }
           })
          
          wx.getSetting({
            withSubscriptions: true,
            success (res) {
              console.log("getSetting:",res);
              console.log(res.subscriptionsSetting);
            }
          })
          // that.queryUserInfo(res.code)
        }, fail: err => {
          wx.showToast({
            title: '请重新打开程序',
          })
        }

      });
    
  },

  AddNewMachine: function (event) {
      this.setData({
        addMachineSelected:true
      })
      wx.showLoading({
        title: '正在添加',
        duration:1000
      })

  },

  onShow: function () {
    let that = this;
      that.setData({
        addMachineSelected:false
      })

  },

  onHide: function () {
    console.log('mainP onHide Taking a break...');
  },
});