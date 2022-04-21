const app = getApp()

Page({
  data: {
    mapCtx:''
  },
  g(g){
    console.log(g)
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  onReady: function(e){
   
  },
  onChangeHeatLayer(event) {
    console.log('onChangeHeatLayer')
    let map = wx.createMapContext('mapId');
    console.log(map)
    map.addVisualLayer({
      layerId: 'd91e97922e94', // 可视化图层ID
      opacity: 0.1, // 设置图层透明度为0.1 并没有效果
      complete: function (res) {
        console.log('……………………addVisualLayer',res);
      },
      success(r){
        console.log(r)
      },
      fail(e){
        console.log(e)
      }
    })

    // this.setData({
    //   isHasHeatLayer: event.detail.value
    // });
    // if (this.data.isHasHeatLayer) {
    //   this.mapCtx.addVisualLayer({
    //     layerId: 'd91e97922e94', // 可视化图层ID
    //     opacity: 0.6, // 设置图层透明度为0.1 并没有效果
    //     complete: function (res) {
    //       console.log('……………………addVisualLayer',res);
    //     },
    //   });
    // } else {
    //   this.mapCtx.removeVisualLayer({
    //     layerId: 'd91e97922e94', // 可视化图层ID
    //     complete: function (res) {
    //       console.log('……………………（移除',res);
    //     },
    //   });
    // }
  },
})
