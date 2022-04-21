const app = getApp()

Page({
  data: {

  },
  onLoad() {
    const mapCtx = wx.createMapContext('my-map')
    mapCtx.openMapApp({
      longitude: 40.062603053446,
      latitude: 116.31348553101,
      destination: '这里',
      success: (res) => {
        console.log('====>拉起app成功', res);
      },
      fail: (err) => {
        console.log('====>拉起app失败', err);
      }
    })
  },
})
