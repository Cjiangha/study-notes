const app = getApp()

Page({
  data: {
    title: "首页标题", // 不设置title，cbar默认显示app.globalData.appName
    showBack: !1,
    showHome: !1,
    showTitle: !1,
    defaultTitle: ""
  },
  onLoad: function () {
    var t = this
    app.getMainAreaHeight(t).then(res => {
      t.setData({
        mainHeight: 'height:-webkit-calc(100vh - ' + res + 'px);height: calc(100vh - ' + res + 'px);'
      })
    })
    wx.onTapNavigationBarRightButton({
      success(res) {
        console.log(res)
      }
    })
  },
  index4: function () {
    wx.navigateTo({
      url: '../index4/index',
    })
  },
  goto: function () {
    wx.navigateTo({
      url: '../index2/index',
    })
  },
  gotoA: function (e) {
    wx.navigateTo({
      url: '../../package_a/pages/index/index?showTip='+e.currentTarget.dataset.custom,
    })
  },
})
