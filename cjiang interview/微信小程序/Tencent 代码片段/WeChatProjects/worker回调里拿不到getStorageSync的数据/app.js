App({
  onShow() {
    wx.setStorageSync('abc','写入数据')
    let worker = wx.createWorker('workers/index.js', {
      useExperimentalWorker: true
    }) // 文件名指定 worker 的入口文件路径，绝对路径
    worker.postMessage()
    worker.onMessage((res) => {
      console.log("wx.getStorageSync('abc')",wx.getStorageSync('abc'))
    })
  }
})
