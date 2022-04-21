
Page({
  data: {
    latitude: 22.811951,
    longitude: 108.42435,
  },
  onLoad: function () {
    this.mapCtx = wx.createMapContext('mapId')

    this.mapCtx.on('markerClusterClick', res =>{
      console.log('markerClusterClick', res)
    })

    // 使用默认聚合效果时可注释下一句
    this.bindEvent()
  },

  bindEvent() {
    this.mapCtx.initMarkerCluster({
      enableDefaultStyle: false,
      zoomOnClick: true,
      gridSize: 60,
      complete(res) {
        console.log('initMarkerCluster', res)
      }
    })

    // enableDefaultStyle 为 true 时不会触发改事件
    this.mapCtx.on('markerClusterCreate', (e) => {
      console.log('markerClusterCreate', e)
      const markers = e.clusters.map((cluster, index) => {
        const { center, clusterId, markerIds } = cluster
        return {
          ...center,
          width: 53,
          height: 53,
          clusterId, // 必须
          iconPath: '/image/clusterer.png',
          label: {
            content: markerIds.length + '',
            fontSize: 12,
            width: 50,
            height: 50,
            borderRadius: 25,
            textAlign: 'center',
            anchorX: -25, // 开发者工具与真机表现不同
            anchorY: -50
          }
        }
      })
      this.mapCtx.addMarkers({
        markers,
        clear: false,
        complete(res) {
          console.log('clusterCreate addMarkers', res)
        }
      })
    })
  },

  addMarkers() {
    const markersData = require('./poiData')
    this.mapCtx.addMarkers({
      markers: markersData.map((item, index) => {
        item.iconPath = '/image/alarm_1.png'
        item.height = 24
        item.width = 24
        item.joinCluster = true
        return item
      }),
      clear: false,
      complete(res) {
      }
  })
  },

  removeMarkers() {
    const markersData = require('./poiData')
    this.mapCtx.removeMarkers({
      markerIds: markersData.map(item => {
        return item.id
      }),
      complete(res) {
      }
    })
  },

  onMarkerTap(e) {
    console.log('@@ markertap', e)
  },
  
  onCalloutTap(e) {
    console.log('@@ onCalloutTap', e)
  },

  onLabelTap(e) {
    console.log('@@ labletap', e)
  }
})
