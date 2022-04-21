const app = getApp()

Page({
  data: {

  },
  onLoad() {
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
    
  },
  async onShareAppMessage(){
    const res = await new Promise((resolve , reject) => {
      setTimeout(() => {
        reject("ewqewq")
      } , 4000)
    })
    return {
      title:"测试这里",
      res
    }
  },
})
