const app = getApp()

Page({
  data: {
    mainHeight: 0, // 页面窗口高度，默认0
  },
  onReady () {
    this.getWindowHeight()
  },
  // 获取页面可视窗口高度
  getWindowHeight () {
    let that = this
    wx.getSystemInfo({
      success (res) {
        that.setData({
          mainHeight: res.windowHeight
        })
      }
    })
  },
  // 处理输入
  onChange (e) {
    const field = e.currentTarget.dataset.name
    const fieldVal = e.detail.trim()
    if (field) {
      this.setData({
        [field]: fieldVal
      })
    }
  },
  // 失去焦点校验
  onBlurValidate (e) {
    let field = e.currentTarget.dataset.name
    let key = field.split('.')[1]
    let keyname = `errorsMessage.${key}.isUnFixed`
    if (!this.form[key]) {
      this.setData({
        [keyname]: true
      })
    } else {
      this.setData({
        [keyname]: false
      })
    }
  },
  // 日期选择
  bindDateChange (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let field = e.currentTarget.dataset.name
    let key = field.split('.')[1]
    let keyname = `errorsMessage.${key}.isUnFixed`
    this.setData({
      [field]: e.detail.value
    })
    if (key === 'zcsj') {
      this.setData({
        [keyname]: false
      })
    }
  }
})
