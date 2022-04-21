Page({
  data: {
    value: '123'
  },
  onInput(res) {
    console.log('onInput', res)
    this.setData({
      value: res.detail.value,
    })
  },
  onClear() {
    this.setData({
      value: '',
    })
  },
  onConfirm() {
    console.log('confirm')
  },
  onBlur(res) {
    console.log('onBlur', res)
    this.setData({
      detail: JSON.stringify(res.detail, null, 2)
    })
  },
})