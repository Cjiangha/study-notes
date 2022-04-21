// index.js
// 获取应用实例
Page({
  data: {
    placeholder: "这是一串placeholder，模拟view弹框点击事件穿透到底下的输入框",
    isPopup: false,
  },
  clickPopup:function () {
    console.log('begin == ',this.data)

    let result = !this.data.isPopup
    this.setData({
      isPopup: result
    })

    console.log('begin == ',this.data)
  },

})
