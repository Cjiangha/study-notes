const app = getApp()

Page({
  data: {
    animation: [
      {
        animationData:{}
      },
      {
        animationData:{}
      }
    ],
    index:0,
  },
  onLoad() {
    this.move()
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  dd(){
    wx.setClipboardData({
      data: 'data',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res) // data
          }
        })
      }
    })


  },

  move() {
    var animation=this.data.animation
    var animations = wx.createAnimation({
      duration: 400,
    })
    //描述动画步骤
    animations.top(-500).scale(0.8).step()
    animation[0].animationData=animations.export()
    //导出动画数据传递给组件的animation属性,否则动画不会执行
    this.setData({
      animation,
    })
  },
  jieshu() {
    debugger
    var animation=this.data.animation
    var animations = wx.createAnimation({
      duration: 400,
    })
    animations.top(-600).scale(0.8).step()
    animation[this.data.index+1].animationData=animations.export()
    
    console.log(animation)
    this.setData({
      animation,
      index:this.data.index+1,
    })
  }
})
