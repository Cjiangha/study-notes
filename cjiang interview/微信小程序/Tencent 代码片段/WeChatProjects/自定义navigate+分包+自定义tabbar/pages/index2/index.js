const app = getApp()

Page({
  data: {
    title: "Custom Bar", // 不设置title，cbar默认显示app.globalData.appName
    showBack: !0,
    showHome: !1,
    showTitle: !1,
    notOnTabbar: !1,
    homeOpenType: "",
    homePath: "", 
    defaultTitle: "",
    test:0
  },
  onLoad: function () {
    this.setData({
      defaultTitle: this.data.title
    })
  },
  onShow:function(){
    // console.log(this.data.test)
  },
  showNotTabberHome: function (e) {
    this.setData({
      notOnTabbar: !this.data.notOnTabbar,
      homeOpenType: this.data.notOnTabbar ? "" : "navigateTo",
      homePath: this.data.notOnTabbar ? "" : "/pages/index3/index"
    })
  },
  showTitle: function (e) {
    this.setData({
      showTitle: !this.data.showTitle,
      title: this.data.showTitle ? this.data.defaultTitle : e.currentTarget.dataset.title
    })
  },
  showBack: function () {
    this.setData({
      showBack: !this.data.showBack
    })
  },
  showHome: function () {
    this.setData({
      showHome: !this.data.showHome
    })
  },
})
