App({
  onLaunch() {
    wx.showModal({
      title: 'Intl',
      content: Intl.DateTimeFormat(new Date()).format(),
    })
    console.log('Intl')
    console.log(Intl)
  }
})
