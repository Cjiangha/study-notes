const app = getApp()

Page({
  data: {

  },
  onLoad() {

  },
  onShow() {
    //this.getTabBar()获取的对象为空
    console.log(typeof this.getTabBar==='function')
    console.log('this.getTabBar',this.getTabBar())
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

  }
})