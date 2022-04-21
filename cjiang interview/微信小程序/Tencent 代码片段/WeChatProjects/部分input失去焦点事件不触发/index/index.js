const app = getApp()

Page({
  data: {
    activeInput: '',
    name: '',
    phone: '',
    oldPassword: '',
    password: '',
    repassword: ''
  },
  onLoad() {
    console.log('在部分机型上键盘关闭，也不会触发input失去焦点事件')
  },
  input (e) {
    let name = e.currentTarget.dataset.name
    let value = e.detail.value
    this.setData({
      [name]: value
    })
  },
  tapInput (e) {
    let name = e.currentTarget.dataset.name
    this.setData({
      activeInput: name
    })
  },
  blurInput (e) {
    console.log('失去焦点~~~')
    this.setData({
      activeInput: ''
    })
  }
})
