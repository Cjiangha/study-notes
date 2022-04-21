App({
  onLaunch() {
    wx.startLocationUpdateBackground({
      type:'gcj02',
      complete(e){
        console.log(e)
      }

    })
  }
})
