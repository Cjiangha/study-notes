App({
  onLaunch() {
    // 在微信无系统定位权限时调用，导致小程序闪退
    wx.getLocalIPAddress({
      success: (result) => {
        console.log('本地IP:', result);
      }
    });
  }
})
