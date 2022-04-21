const app = getApp()

Page({
  data: {
    listIamge: [
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122843855256.png', x: 46, y: 73, Zindex: 2, wth: 307, ght: 415 }, //爱慕0
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122828736785.png', x: 1522, y: 5, Zindex: 2, wth: 276, ght: 373 }, //LC1
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122897550976.png', x: 318, y: 342, Zindex: 1, wth: 296, ght: 180 },  //皇锦2
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122801134599.png', x: 926, y: 30, Zindex: 1, wth: 220, ght: 297 }, //呼吸3
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122885922011.png', x: 2013, y: 76,Zindex: 2, wth: 290, ght: 392 }, // 爱美丽4
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122838523345.png', x: 776, y: 60, Zindex: 2,wth: 286, ght: 386 }, //爱慕先生5 
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122889499092.png', x: 365, y: 35,Zindex: 1, wth: 220, ght: 297 },//chuang6
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122852050462.png', x: 1126, y: 187,Zindex: 2, wth: 276, ght: 373 }, //儿童7
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122836632866.png', x: 1642, y: 381, wth: 331, ght: 201 }, //宝迪8
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122813597015.png', x: 947, y: 390,Zindex: 1, wth: 359, ght: 217 }, //彳亍9
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122836230052.png', x: 1208, y: 30,Zindex: 1, wth: 296, ght: 180 }, //慕蓝10
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122831336345.png', x: 1810, y: 36,Zindex: 1, wth: 180, ght: 296 }, //纽格夫11
      { img: 'https://newimg.aimer.com.cn/materials/2021/12/28/21122806582404.png', x: 1419, y: 287, wth: 180, ght: 296 }, //nyc12
    ]
  },
  onLoad() {
    if (wx.canIUse('reportPerformance')) {
      console.log(1)
      wx.reportPerformance(1001, 680, 'custom')
    }
    // console.log(wx.getPerformance().getEntries())

    const performance = wx.getPerformance() // 获取当前小程序性能相关的信息
const observer = performance.createObserver((entryList) => { // 创建全局性能事件监听器
  console.log(entryList.getEntries())
})
observer.observe({ entryTypes: ['render', 'script', 'navigation'] })// 监测这几类性能指标

    this.animation = wx.createAnimation({
      duration: 30000,
      timingFunction: 'linear',
      delay: 0
    })
    this.animation.translate(-650).step()
    this.animation.translate(-160).step()
    this.setData({
      animation: this.animation.export()   //输出动画  
    })
    setInterval(function () {
      this.animation.translate(0).step()
      this.animation.translate(-650).step()
      this.setData({
        animation: this.animation.export()   //输出动画  
      })
    }.bind(this), 30000)

    this.animation1 = wx.createAnimation({
      duration: 30000,
      timingFunction: 'linear',
      delay: 0
    })
    this.animation1.translate(-980).step()
    this.animation1.translate(-160).step()
    this.setData({
      animation1: this.animation1.export()   //输出动画  
    })
    setInterval(function () {
      this.animation1.translate(0).step()
      this.animation1.translate(-980).step()
      this.setData({
        animation1: this.animation1.export()   //输出动画  
      })
    }.bind(this), 30000)
  },
})
