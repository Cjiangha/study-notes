const customCallout1 = {
  id: 2,
  latitude: 23.097994,
  longitude: 113.323520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS'
  },
}

const allMarkers = [customCallout1]

Page({
  data: {
    latitude: 23.096994,
    longitude: 113.324520,
    markers: [],
    customCalloutMarkerIds: [],
    num: 1
  },
  onReady: function (e) {

    this.mapCtx = wx.createMapContext('myMap')
  },

  addMarker() {
    const markers = allMarkers
    this.setData({
      markers,
      customCalloutMarkerIds: [2,3,4],
    })
  },

  removeMarker() {
    this.setData({
      markers: [],
      customCalloutMarkerIds: []
    })
  },

  changeMarkerId() {
    const customCalloutMarkerIds = this.data.customCalloutMarkerIds.slice()
    const top = customCalloutMarkerIds.shift()
    customCalloutMarkerIds.push(top)

    this.setData({
      customCalloutMarkerIds
    })
  },
  markertap(e) {
    console.log('@@@ markertap', e)
  },
  callouttap(e) {
    console.log('@@@ callouttap', e)
  },
  labeltap(e) {
    console.log('@@@ labeltap', e)
  },
  translateMarker: function () {
    const length = this.data.markers.length
    if (length === 0) return

    const index = Math.floor(Math.random() * length)
    const markers = this.data.markers
    const marker = markers[index]
    marker.latitude = marker.latitude + 0.002
    marker.longitude = marker.longitude + 0.002
    const that = this
    this.mapCtx.translateMarker({
      markerId: marker.id,
      duration: 1000,
      destination: {
        latitude: marker.latitude,
        longitude: marker.longitude
      },
      animationEnd() {
        that.setData({markers})
        console.log('animation end')
      },
      complete(res) {
        console.log('translateMarker', res)
      }
    })
  },
  changeContent() {
    const num = Math.floor(Math.random() * 10)
    this.setData({num})
  }
})
