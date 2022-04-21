App({
  onLaunch: function () {
    wx.login({
      complete(e){
        console.log(e)
        wx.getWeRunData({
          complete(e){
            console.log('getWeRunData',e)
          }
        })
      }
    })
  }
})
