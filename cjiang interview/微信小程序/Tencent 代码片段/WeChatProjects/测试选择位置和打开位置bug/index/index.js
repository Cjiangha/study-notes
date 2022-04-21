const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },

  //选择本市任意地方位置
  change_meetPoi: function(){
    wx.choosePoi().then(res => {
        console.log(res)
        if(res.type == 2){ //不能为城市名称或空时
        this.openLocation(res.latitude, res.longitude) //测试打开地图位置
      }
    })
  },

  //测试打开地图位置
  openLocation: function(latitude, longitude){
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      success (res) {
      }
    })
  }

})
