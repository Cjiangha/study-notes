const app = getApp()

Page({
  data: {
  },
  onLoad() {
  },
  
  downloadfile () {
    const downloadTask = wx.downloadFile({
      // url: 'test.mp4',
      url:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          wx.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (res) {
              wx.showToast({
                title: '保存成功'
              })
            },
            fail: function (res) {
              console.log(res)
              wx.showToast({
                title: '保存失败'
              })
            }
          })
        }
      }
    })
    downloadTask.onProgressUpdate((res) => {
      this.setData({
        progress: res.progress
      })
    })
  },
})
