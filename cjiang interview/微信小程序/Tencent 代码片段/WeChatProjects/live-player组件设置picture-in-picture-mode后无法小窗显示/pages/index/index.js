// index.js
// const app = getApp()
const app = getApp()
Page({
  data: {
    headerHeight: app.globalData.headerHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    entryInfos: [
      { icon: '../../static/images/doubleroom.png', title: '双人通话', navigateTo: '../videocall/videocall' }
    ],
  },

  onLoad() {

  },
  selectTemplate(event) {
    console.log('index selectTemplate', event)
    this.setData({
      template: event.detail.value,
    })
  },
  handleEntry(e) {
    const url = this.data.entryInfos[e.currentTarget.id].navigateTo
    wx.navigateTo({
      url,
    })
  },
})
