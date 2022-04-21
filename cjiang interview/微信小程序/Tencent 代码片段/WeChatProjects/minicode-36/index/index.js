Page({
  data: {
    latitude: 24.6576256467628135,
    longitude: 116.9769287109375,
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.addGroundOverlay({
      id: 1,
      src: 'https://s3.bmp.ovh/imgs/2021/10/f6ff9c3d31d2e8bc.png',
      visible:true,
      zIndex: 10,
      opacity: 1, 
      bounds: {
        southwest : {
          longitude: 116.965942382812500,
          latitude: 24.645768980151789,
        },
        northeast: {
          longitude:  116.987915039062500,
          latitude: 24.669482313373838,
          }
      },
      success: res=>{
        console.log('手绘图加载成功:' + JSON.stringify(res) )
      },
      fail: res=>{
        console.log('手绘图加载失败:' + JSON.stringify(res) )
      },
      complete: res=> {
        console.log(res)
      }
    })
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:23.10229,
        longitude:113.3345211,
      }, {
        latitude:23.00229,
        longitude:113.3345211,
      }]
    })
  }
})
