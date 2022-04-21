const app = getApp()
const points = [{
  latitude: 39.852338,
  longitude: 116.676387
}, {
  latitude: "39.9177516246599",
  longitude: "116.39704755195879",
}]
Page({
  data: {
    points: points,
    polyline: [{
      points,
      color: "#008B74",
      width: 2
    }],
    markers: [{
        id: 1,
        latitude: points[0].latitude,
        longitude: points[0].longitude,
        iconPath: "2.png",
        width: 30,
        height: 30,
        zIndex: 2
      },
      {
        id: 2,
        latitude: points[1].latitude,
        longitude: points[1].longitude,
        iconPath: "1.png",
        width: 30,
        height: 30,
        zIndex: 1
      }
    ],
    point: {
      latitude: 39.852338,
      longitude: 116.676387
    },
  },
  onLoad() {

    setTimeout(() => {
      wx.createSelectorQuery().select('#map').context(res => {
        const mapCtx = res.context
        // mapCtx.moveAlong({
        //   markerId: 1,
        //   path: points,
        //   duration: 10000,
        //   autoRotate: false,
        //   complete: res => {
        //     console.log(res)
        //   }
        // })
        mapCtx.translateMarker({
          markerId: 1,
          destination: {
            latitude: points[1].latitude,
            longitude: points[1].longitude,
          },
          duration: 10000,
          autoRotate: false,
          animationEnd: () => {
            console.log("动画结束")
          },
          complete: res => {
            console.log(res)
          }
        })
      }).exec()
    }, 3000);
  },
})