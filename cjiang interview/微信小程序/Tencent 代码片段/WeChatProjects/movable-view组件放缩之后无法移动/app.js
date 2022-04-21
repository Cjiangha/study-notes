App({
  onLaunch() {
    console.log(wx.onUnhandledRejection())
    wx.onUnhandledRejection((result) => {
      console.log(result)
    })
  }
})
