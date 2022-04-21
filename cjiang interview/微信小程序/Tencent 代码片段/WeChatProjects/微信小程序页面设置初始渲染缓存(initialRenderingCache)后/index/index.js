// index.js
Page({
  data: {
    msg: "默认值"
  },
  onLoad() {
    // 模拟阻塞代码。增加小程序启动时间，根据机型性能调整循环次数
    for (let i = 0; i < 5000000000; i++) {
     
    }
    
    this.setData({
      msg: "值改变"
    })
  }
})