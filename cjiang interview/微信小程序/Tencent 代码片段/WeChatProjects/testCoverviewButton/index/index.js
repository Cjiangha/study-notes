const app = getApp()

Page({
  data: {
    btnStr: '点击一下改变按钮文字'
  },
  onLoad() {
  },
  btnTap() {
    console.log('按钮改变了')
    this.setData({
      btnStr: '按钮改变了'
    })
    console.log('btnStr',this.data.btnStr)
  }
})