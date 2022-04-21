const app = getApp()

Page({
  data: {
    tapMap: '',
    tapView: '',
    longitude: 106.63024,
    latitude: 26.64702,
    markers: []
  },
  onLoad() {
    wx.getLocation({
      success: (res) => {
        console.log('res', res)
        const { latitude, longitude } = res
        this.setData({
          latitude, longitude, markers: [{
            latitude,
            longitude,
            iconPath: '/active.png',
            width: 44,
            height: 54,
            id: 1,
            alpha: 1,
          }]
        })
      }
    })
  },
  tapMap(e) {
    console.log('tapMap', e)
    this.setData({ tapMap: 'tapMap' })
  },
  tapView(e) {
    console.log('tapView', e)
    this.setData({ tapView: Date.now() })
  },
  tapMarker(e) {
    if (this.data.tapView) return;
    console.log('tapMarker', Date.now())
    this.setData({ tapMarker: Date.now() })
  }
})
