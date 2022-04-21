const app = getApp()

Page({
  jump: function () {
    wx.navigateTo({
      url: './test?id=1',
      events: {
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'send from opener page'
        })
      }
    })
  },
  onShow() {},
  onLoad(){
    this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
    })
    console.log(this.getOpenerEventChannel())
  }
})