const app = getApp()

Page({
  data: {

  },
  down() {
    console.log('点击')
    let header = {}
    let url = 'https://txmov2.a.kwimgs.com/upic/2021/09/29/18/BMjAyMTA5MjkxODE2NDZfMjMxNDM4MDc2MV81ODA0NTI0OTQ2MV8wXzM=_b_B5a537b6fbfcb02e116cfc30d0348d406.mp4?clientCacheKey=3xa33s8d77445pu_b.mp4&tt=b&di=6a36a09e&bp=13380'
    let fileName = wx.env.USER_DATA_PATH + '/' + new Date().valueOf() + '.mp4';
    
    wx.downloadFile({
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

    })
  },

  submit(){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(1111)
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      complete(e){
        console.log(e)
      },
      fail(e){
        console.log(e)
      }
    })
  }
})
