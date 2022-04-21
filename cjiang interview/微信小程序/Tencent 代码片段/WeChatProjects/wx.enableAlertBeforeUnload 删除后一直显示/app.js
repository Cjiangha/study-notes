App({
  onLaunch() {
    wx.setEnableDebug({
      enableDebug: true,
      complete(res){
        console.log(res)
      }
    })
  }
})
