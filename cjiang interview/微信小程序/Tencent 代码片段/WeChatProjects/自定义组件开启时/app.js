App({
  onLaunch() {
    wx.downloadFile({
      url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
      success: (res) => {
        wx.showShareImageMenu({
          path: res.tempFilePath
        })
      }
    })
  }
})
