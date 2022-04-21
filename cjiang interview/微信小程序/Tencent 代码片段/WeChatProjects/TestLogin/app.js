App({
  onLaunch() {
    this.globalData.userInfo = wx.getStorageSync('userInfo');
    console.log('用户信息', this.globalData.userInfo);
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          console.log('微信登录code', res.code);
          //this.login(res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: res => {
        console.log('登录失败！', res);
      },
      complete: res => {
        console.log('登录调用完成！', res);
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})
