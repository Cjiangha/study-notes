const app = getApp()

var sc 
var filewj
var hairfile
Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },

  openfile:function(){
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFiles)
        sc = res.tempFiles[0].path
        console.log(sc)

        filewj = wx.getFileSystemManager()
        // const ab = new ArrayBuffer(10)
        //读取文件
        filewj.readFile({
          filePath: sc,
          success(res) {
            console.log(res.data.byteLength)
            hairfile = res.data
          },
          fail(res) {
            console.error(res)
          }
        })
      }
    })
  },
})
