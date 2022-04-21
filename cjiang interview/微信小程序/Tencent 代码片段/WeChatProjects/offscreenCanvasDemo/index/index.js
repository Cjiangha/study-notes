const app = getApp()

Page({
  data: {

  },
  onLoad() {
    this.demo();
  },
  demo() {
    const canvas = wx.createOffscreenCanvas({
      type: '2d',
      width: 300,
      height: 300
    })
    console.log(canvas)
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.fillText('Hello', 20, 20);

    wx.canvasToTempFilePath({
      canvas: canvas,
      success: (resss) => {},
      fail: function (err) {
        console.log(err)
      }
    })
  }
})