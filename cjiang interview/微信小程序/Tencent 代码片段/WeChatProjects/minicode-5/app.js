//app.js

App({
  onLaunch: function () {
    let that = this;
    console.log("APP.js on Launched 1.9.06182310" + new Date())
    this.globalData.sysinfo = wx.getSystemInfoSync();

    console.log("APP.js on Launched 1.0.927" + JSON.stringify(this.globalData.sysinfo));

  },
  onShow(options) {
  },
  onHide() {
    // Do something when hide.
    console.log("App onHide")
    // wx.closeBluetoothAdapter();
  },
  onError(msg) {
    console.log(msg)
  },
  

  globalData: {
    message: "Global Data Message", 

  },
})
