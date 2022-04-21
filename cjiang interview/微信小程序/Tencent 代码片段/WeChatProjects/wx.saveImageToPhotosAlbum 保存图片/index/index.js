const app = getApp()

Page({
  data: {
    errorMsg: ''
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  downloadImg: function() {
    this.setData({
      errorMsg: ''
    })
    const _this = this
    wx.showLoading({
      title: '下载中...'
    })
    // 获取图片信息
    wx.getImageInfo({
      src: 'https://fed.dev.hzmantu.com/unwebp/bingxue-temp444.jpg',
      success: function(res) {
        console.log('path: ', res)
        // 保存到相册
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success() {
            wx.hideLoading()
            wx.showToast({
              title: '照片保存成功',
              icon: 'success'
            })
          },
          fail: function (err) {
            wx.hideLoading()
            console.log('------------------saveImageToMobil---------------------')
            console.error(err.errMsg)
            _this.setData({
              errorMsg: err.errMsg
            })
            if (err.errMsg.indexOf('fail auth deny') > -1) {
              _this.getAlbumAuth()
            } else {
              wx.showToast({
                title: '照片保存失败',
                icon: 'none'
              })
            }
          }
        })
      },
      fail: function(err) {
        console.log('------------------getImageInfo---------------------')
        console.error(err)
        wx.showToast({
          title: '获取图片信息失败',
          icon: 'none'
        });
      }
    })
  },
  // 相册授权
  getAlbumAuth: function() {
    wx.showModal({
      title: '提示',
      content: '授权保存图片到相册',
      success (res) {
        if (res.confirm) {
          wx.openSetting({
            success: function(settingdata) {
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                wx.showToast({ title: '请再次点击保存' })
              } else {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none'
                })
              }
            },
            fail: function(err) {
              console.log('------------------openSetting---------------------')
              console.error(err)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  clipImgPath: function() {
    wx.setClipboardData({
      data: 'https://fed.dev.hzmantu.com/unwebp/bingxue-temp444.jpg'
    })
  }
})
