const app = getApp()

Page({
  data: {
    menu: {
      icon: "/assets/image/cash.png", //主图标
      offset: [0,0],
      menuList: [
        "/assets/image/1.png",
        "/assets/image/2.png",
        "/assets/image/3.png",
        "/assets/image/4.png",
        "/assets/image/5.png",
      ]
    }
  },
  handleChange(e) {
    console.log("点击按钮index",e.detail.index)
  }
})