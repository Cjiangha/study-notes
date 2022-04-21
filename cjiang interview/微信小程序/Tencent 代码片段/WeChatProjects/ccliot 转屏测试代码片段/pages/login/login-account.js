// pages/login/login-account.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeRes: '',
    user: '',
    userCode: '',
    pwdCode: '',
    password: '',
    visible: true,
    vhidden: true,
    afocus: false,
    pfocus: false,
    tst:{aa:1,a2:2,a3:4}
  },

 
  login: function() {   
        wx.reLaunch({
          url: '../loading/loading',
        })       
  },
})