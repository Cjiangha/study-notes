const app = getApp()

Page({
  data: {
    message:'hello'
  },
  onLoad() {
    var worker_func = function(input) {
      input.setData({
        message: 'make worker'
      })
      const worker = wx.createWorker('workers/index.js', {
        useExperimentalWorker: true
      })
      worker.postMessage({msg:'msg from main'});
      worker.onMessage(function (res) {
        console.log('from worker ',res);
        input.setData({
          message: 'make worker1' + String(res.msg)
        })
      })

    }

    setTimeout(worker_func(this), 200);
  
    var func = function (input) {
      console.log('1');
      input.setData({
        message: 'MINA1'
      })
    }
    setTimeout(func(this), 1000);
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})
