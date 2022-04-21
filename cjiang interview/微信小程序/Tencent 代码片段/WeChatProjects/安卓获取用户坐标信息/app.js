App({
  onLaunch() {
    wx.setBackgroundColor({
      backgroundColor: '#F7F9FC',
      success: (res)=>{
        console.log(res)
      },
      fail: (err)=>{
        console.error(err)
      }
    })
  }
})
