App({
  onLaunch: function () {
    wx.downloadFile({
      url: 'https://p0.meituan.net/scarlett/fadd222f22071f60735d6c0b380b022254775.png',
      success (res) {
        if (res.statusCode === 200) {
           console.log(res)
        }
      },
    fail(err) {
        console.log(err)
     }
    })
  }
})
