const app = getApp()

Page({
    data: {
      title:"分包 - 首页",
      showTip: !1
    },
    onShow: function() {
    },
    onLoad: function(e) {
      var t = this
      app.getMainAreaHeight(t).then(res => {
        t.setData({
          mainHeight: 'height:-webkit-calc(100vh - ' + res +'px);height: calc(100vh - ' + res +'px);'
        })
      })
      e.showTip && this.setData({
        showTip: e.showTip == 1 ? !0 : !1
      })
    }
});