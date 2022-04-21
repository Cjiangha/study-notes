App({
  onLaunch() {
    let thisTime = Math.round(new Date());
    wx.setStorageSync("_thisTime", thisTime);
  
  
  }
})
