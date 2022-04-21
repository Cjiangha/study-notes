App({
  onLaunch() {
    console.log()
    wx.onAccelerometerChange(function(e){
        console.log(e)
    })
  }
})
