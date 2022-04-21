const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  callAnimation: function (option) {
    console.log('run');
    this.animate('#test', [{
      translateZ: 0,
      ease: 'ease-in-out'
    }, {
      translateZ: 100,
      ease: 'ease-in-out'
    }],2000);
    // this.animate('#test', [{
    //   matrix3d: [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
    // }, {
    //   matrix3d: [1,0,0,0,0,1,0,0,0,0,1,0,0,0,100,1]
    // }], 1000);
    // this.animate('#test', [{matrix: [-1.0, 0.0, 0.0, -1.0, 0.0, 0.0]}, {matrix: [1.0, 2.0, 3.0, 1.0, 0.0, 12.0]}], 1000);

  },
})