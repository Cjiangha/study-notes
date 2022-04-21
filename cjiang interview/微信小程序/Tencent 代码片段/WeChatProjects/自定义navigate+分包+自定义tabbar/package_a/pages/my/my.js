const app = getApp()

Page({
    data: {
      title: "分包 - 我的"
    },
    onLoad: function() {
      var t = this
      app.getMainAreaHeight(t).then(res => {
        t.setData({
          mainHeight: 'height:-webkit-calc(100vh - ' + res + 'px);height: calc(100vh - ' + res + 'px);'
        })
      })
    },
    onShow: function() {
      
    }
});