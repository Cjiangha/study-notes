const app = getApp()

Page({
  data: {
    imgSrc:''
  },
  onLoad() {
    // console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    // console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  selectImage(){
    wx.chooseImage({
      count: 1,
      success: res =>{
        const tempFiles = res.tempFiles[0].path
        console.log(tempFiles)
        wx.uploadFile({
          url: 'https://jihebooks.com/api/blogs/upload', 
          filePath: tempFiles,
          header: {
            'X-Pcrm-Token': 'd9dc25f709784e5fa1ed744a73314102'
          },
          name: 'file',
          success: (uploadFileRes) => {
            console.log('成功',uploadFileRes)
            console.log('成功',uploadFileRes.data)
            if (JSON.parse(uploadFileRes.data).code === 200) {
              if ("string" === typeof uploadFileRes.data) {
                console.log(JSON.parse(uploadFileRes.data).data,1)
                this.setData({
                  imgSrc: JSON.parse(uploadFileRes.data).data
                })
              } else {
                console.log(JSON.parse(uploadFileRes.data).data,2)
              }
            } else {
              wx.showToast({
                icon: 'none',
                title: '上传失败'
              })
            //   reject('')
            }
          },
          fail: (err) => {
            console.log('err信息',err)
            wx.showToast({
              icon: 'none',
              title: err.errMsg?err.errMsg:'上传失败'
            })
          }
        });
      }
    })
  }
})
