const app = getApp()

Page({
  data: {
    latitude: "",
    longitude: "",
    polyline: [{
      points: [],
      color: "#42a4ff",
      width: 3,
      arrowLine: true
    }],
  },
  onLoad() {
    let that = this;
    wx.getLocation({
      altitude: true,
      isHighAccuracy: true,
      highAccuracyExpireTime: 2000,
      success(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
    this.backgroundLocation();
  },
  //开启后台持续监听地理位置
  backgroundLocation() {
    let that = this;
    wx.startLocationUpdateBackground({
      success(res) {
        that.onLocationUpdate();
      },
      fail(error) {
        if (error.errMsg == "startLocationUpdateBackground:fail auth deny") {
          wx.showModal({
            title: '授权提示',
            content: '需要开启使用小程序期间和离开小程序后获取位置权限！否则无法使用',
            showCancel: false,
            success() {
              wx.openSetting({
                complete(res) {
                  if (!res.authSetting["scope.userLocationBackground"]) {
                    that.backgroundLocation();
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  //监听地理位置变化
  onLocationUpdate() {
    let points = this.data.polyline[0].points;
    wx.onLocationChange((res) => {
      console.log("change", res)
      points.push({
        latitude: res.latitude,
        longitude: res.longitude
      })
      this.setData({
        ["polyline[0].points"]: points
      })
    })
  }
})