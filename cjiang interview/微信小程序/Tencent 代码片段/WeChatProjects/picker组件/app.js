App({
  onLaunch: function () {
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode: 'facial',
      complete(res) {
        console.log(res)
      }
    })
  }
})
