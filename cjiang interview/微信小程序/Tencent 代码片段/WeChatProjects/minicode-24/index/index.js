const app = getApp()

Page({
  data: {
    src: 'http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNTTiaKet81gQJDXYnPiaJFSzRlp9frTTX2hSN01xhiackVLHHrG7ZQI3XQsbM7Gr9USZdN4f26SO5xjg/0?wx_fmt=png',
    info: '',
  },
  getImageInfo() {
    wx.getImageInfo({
      src: this.data.src,
      complete: (res) => {
        console.log(res)
        this.setData({
          info: this.format(res)
        })
      }
    })
  },
  format(obj) {
    return '{\n' +
      Object.keys(obj).map(function (key) { return '  ' + key + ': ' + obj[key] + ',' }).join('\n') + '\n' +
    '}'
  }
})
