App({
  onLaunch() {
wx.onNetworkStatusChange(function (res) {
  console.log(res)
})
  }
})
