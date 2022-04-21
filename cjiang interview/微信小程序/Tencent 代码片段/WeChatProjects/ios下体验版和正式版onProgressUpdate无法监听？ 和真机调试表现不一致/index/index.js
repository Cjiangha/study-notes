const app = getApp()

Page({
  data: {
    progress: ''
  },
  e(e){
    console.log('eeeee',e)
  },
  down() {
    console.log('点击')
    var e = this;
    var dt = 'downtask';
    let header = {}
    let url = 'https://txmov2.a.kwimgs.com/upic/2021/09/29/18/BMjAyMTA5MjkxODE2NDZfMjMxNDM4MDc2MV81ODA0NTI0OTQ2MV8wXzM=_b_B5a537b6fbfcb02e116cfc30d0348d406.mp4?clientCacheKey=3xa33s8d77445pu_b.mp4&tt=b&di=6a36a09e&bp=13380'
    let fileName = wx.env.USER_DATA_PATH + '/' + new Date().valueOf() + '.mp4';
    
    e[dt] =wx.downloadFile({
      header: header,
      url: url,
      filePath:  fileName ,
      success: function (t) {
        console.log('下载成功',t)
        console.log('准备保存到相册saveVideoToPhotosAlbum')
        try {
          wx.saveVideoToPhotosAlbum({
            filePath: t.filePath,
            success: function (st) {
              console.log('保存成功')
            }, fail: function (f) {
              console.log('保存失败')
            },complete: function (t) {
              console.log('complete')
            }

          })
        } catch (err) {
          console.log('异常')
        }
        console.log('走完')
      }

    }), e[dt].onProgressUpdate(function (t) {
      
      e.setData({progress: t.progress + "%"});
  });
  }
})
