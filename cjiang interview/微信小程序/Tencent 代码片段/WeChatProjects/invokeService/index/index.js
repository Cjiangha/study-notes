const app = getApp()

Page({
  data: {
    beforeMakeUpImg: '',
    beforeMakeUpImgBase64: '',
    afterMakeUpImg: '',
    errData: {},
    failData: null
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
    console.log('THIS==》',this)
  },
  upPicHandle() {
    let that = this
    wx.chooseImage({
      success (res) {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: function (data) {
            // base64 编码后大小不可超过6M。
            const base64Size = that.getImgSize(data.data)
            console.log('>>>>>>>>base64Size(KB)', base64Size);
            that.setData({
              beforeMakeUpImgBase64: 'data:image/png;base64,' + data.data
            })
            that.setData({
              beforeMakeUpImg: that.data.beforeMakeUpImgBase64
            })
            // console.log('>>>>>>>>beforeMakeUpImg', that.data.beforeMakeUpImg);
          }
        })
      }
    })
  },
  // 点击尝试
  tryLipstickPic() {
    let that = this
    wx.serviceMarket.invokeService({
      service: 'wx2d1fd8562c42cebb',
      api: 'tryLipstickPic',
      data: {
        'Action': 'TryLipstickPic',
        'Image': that.data.beforeMakeUpImgBase64,
        // 红   蓝色   橙色
        'LipColorInfos': [{'RGBA': {'R': 200, 'G': 0, 'B': 0, 'A': 100}}]
        // , {'RGBA': {'R': 0, 'G': 0, 'B': 255, 'A': 100}}, {'RGBA': {'R': 255, 'G': 165, 'B': 0, 'A': 100}}
      }
    }).then(res => {
      console.log('Olivia--------调用试妆成功', res)
      that.setData({
        afterMakeUpImg: res.data?.ResultUrl || '',
        errData:res.data.Error
      })
    }).catch(err => {
      console.error('Olivia--------调用试妆失败', err)
      that.setData({
        failData:JSON.stringify(err)
      })
    })
  },
  // 计算BASE64文件流大小
  getImgSize(str) {
    // 获取base64图片大小，返回KB数字
    var strLength = str.length;
    var fileLength = parseInt(strLength - (strLength / 8) * 2);
    // 由字节转换为KB
    var size = '';
    size = (fileLength / 1024).toFixed(2);
    return parseInt(size);
  }
})
