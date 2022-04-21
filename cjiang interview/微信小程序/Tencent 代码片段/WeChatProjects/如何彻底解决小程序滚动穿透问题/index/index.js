const app = getApp()

Page({
  data: {
    visible: false
  },
  onLoad() {
   
  },
  handleClick() {
    this.setData({
      visible: !this.data.visible
    })
  }
})
