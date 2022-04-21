App({
  onLaunch() {
    wx.chooseMedia({  
      count: 9,
      sizeType: ['compressed'],
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
    })
  }
})
