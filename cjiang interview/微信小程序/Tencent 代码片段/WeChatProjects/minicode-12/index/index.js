const app = getApp()

Page({
  data: {
    circles: [
      {
        color: '#2D8CF025',
        fillColor: '#2D8CF025',
        id: {},
        latitude: '30.695489359588244',
        longitude: '104.07407170685265',
        radius: 1200,
        strokeWidth: 1,
    },
    {
        color: '#2D8CF025',
        fillColor: '#2D8CF025',
        id: {},
        latitude: '30.685316232741236',
        longitude: '104.07312464269503',
        radius: 1200,
        strokeWidth: 1,
    },
    ]
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },

  handleTap() {
    console.log(this.data.circles)
    this.setData({
      circles: []
    })
  }
})
