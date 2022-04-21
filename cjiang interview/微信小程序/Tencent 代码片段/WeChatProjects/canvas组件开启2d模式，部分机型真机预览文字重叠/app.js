App({
  onLaunch(e) {
    console.log(e)
    wx.getBatteryInfo({
      success: function (res) {
        const level = res.level
        console.log('getBatteryInfo:success', level)
      },
      fail: function (err) {
        global.logger.log('getBatteryInfo:error', err)
        that.showModalDia('失败', '获取电池电量失败，请重试')
      }
    })
  }
})