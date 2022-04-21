const app = getApp()

Page({
  data: {
    currentIndex: 0,
    windowHeight: 0,
    windowWidth: 0,
    isFlip: false,
    ebookList: [{
        "picUrl": "https://img.qn.xiaohebook.com/9a883500065411ec8e7de17bd82dc18b.jpg"
      },
      {
        "picUrl": "https://img.qn.xiaohebook.com/9cb6fbe0065411ec8e7de17bd82dc18b.jpg"
      },
      {
        "picUrl": "https://img.qn.xiaohebook.com/9eb7ade0065411ec8e7de17bd82dc18b.jpg"
      }
    ]
  },
  onLoad: function () {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  flip() {
    this.setData({
      isFlip: !this.data.isFlip
    })
  }
})