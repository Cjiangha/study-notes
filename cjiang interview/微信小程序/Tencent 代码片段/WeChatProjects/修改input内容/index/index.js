const app = getApp()

Page({
  data: {
    count: 0,
    isend: true
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  addredtc: function (e) {
    var that = this;
    this.setData({
      isend: true
    })
    var va = parseInt(that.data.count);
    var type = e.currentTarget.dataset.type; //加减类型
    if (type == "add") {
      if (va < 10)
        va += 1;
      else return;
    } else if (type = "red") {
      if (va > 0)
        va -= 1;
      else return;
    }
    console.log(va);
    that.setData({
      count: va
    });
  },
  getvalue(e) {
    this.setData({
      count: e.detail.value < 0 ? 0 : e.detail.value > 10 ? 10 : e.detail.value
    });
  },
  show() {
    this.setData({
      isend: false
    })
  }
})