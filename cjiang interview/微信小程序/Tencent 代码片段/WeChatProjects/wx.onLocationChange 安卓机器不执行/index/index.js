const app = getApp()

Page({
  data: {
    tips: '定位中',
    longitude: '',
    latitude: '',
  },
  positioning() {
    wx.showLoading({
      title: '定位中···',
      mask: true
    })
    this.start()
  },
  //监听开启
  start() {
    let _this = this;
    wx.startLocationUpdate({
      success: (res) => {
        console.log(res + "开始了");
      },
      fail: (err) => {
        console.log('获取当前位置失败', err)
        _this.getSetting()
      }
    })
  },
  //结束监听
  end() {
    wx.stopLocationUpdate({
      success: (res) => {
        console.log('stopLocationUpdate', res)
      }
    })

  },
  startBack() {
    let that = this;
    wx.showLoading({
      title: '定位中···',
      mask: true
    })
    let _locationChangeFn = (res) => {
      console.log('location change', res)
      wx.hideLoading()
      that.setData({
        longitude: res.longitude,
        latitude: res.latitude,
        Coordinate: `${res.longitude},${res.latitude}`
      })
    }
    that.start()
    wx.onLocationChange(_locationChangeFn);
  },
  //是否开启定位权限
  getSetting: function () { //获取用户的当前设置
    const _this = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          //未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.startBack();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API
          _this.startBack();
        } else {
          // console.log('授权成功')
          //调用wx.getLocation的API
          _this.startBack();
        }
      }
    })
  },
  onLoad() {
    this.startBack()
  },
})