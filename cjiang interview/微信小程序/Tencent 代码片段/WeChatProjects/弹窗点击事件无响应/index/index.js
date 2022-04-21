const app = getApp()
var  windDialog;
var  tempDialog;
Page({
  data: {
    isTempSync:false,
    isWind:false
  },
  onLoad() {
    windDialog = this.selectComponent('#wind');
    tempDialog = this.selectComponent('#temp');
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },

  showTempDialog:function(){
    tempDialog.showDialog();
    console.log("=====温度弹窗执行=================>")
  },

  showAirDialog:function(){
    console.log("=====风向弹窗执行=================>")
    windDialog.showDialog()
  },

})
