const app = getApp()

Page({
  data: {
    a:'./a.wxml',
    mediaList: []
  }
  , chooseVideo: function (e) {
    let _this = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],//视频来源album==相册，camera==相机
      maxDuration: 30,//拍摄视频最长拍摄时间，单位秒
      camera: 'back',
      compressed: false,
      success(ress) {
        console.log('压缩前', ress);
        wx.getVideoInfo({
          src: ress.tempFilePath,
          success: function (res) {
            console.log('压缩前视频信息', res)
            if (res.duration > 30) {
              wx.alert('视频时长不能超过30秒');
              return;
            }
            if (res.size < 10240) {
              console.log('视频小于10M')
              _this.data.mediaList.push({
                local: ress.tempFilePath,
                title: res.duration,
                type: 4,
                des: res.size
              });
              _this.setData({
                mediaList: _this.data.mediaList
              });
              return
            }
            // var resolution=640/Math.max(res.height,res.width)
            console.log(resolution)
            //符合标准，压缩视频				
            wx.showLoading('视频压缩中');
            wx.compressVideo({
              src: ress.tempFilePath,
              // quality: 'medium', //'low':低，'medium':中，'high':高  
              bitrate:4000,
              fps:res.fps,
              resolution:0.5,
              complete: function () {
                wx.hideLoading();
              },
              success: function (r) {
                console.log('压缩后', r);
                wx.getVideoInfo({
                  src: r.tempFilePath,
                  success: function (a) {
                    console.log('压缩后视频信息', a)
                  }
                })
                _this.data.mediaList.push({
                  local: r.tempFilePath,
                  title: res.duration,
                  type: 4,
                  des: r.size * 1024
                });
                _this.setData({
                  mediaList: _this.data.mediaList
                });
                console.log(_this.data.mediaList)
              },
              fail: function (err) {
                wx.showToast({
                  title: err.errMsg,
                })
              }
            });
          }
        })

      }
    })
  },
})
