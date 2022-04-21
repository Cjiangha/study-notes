const app = getApp()

Page({
  data: {

  },
  onLoad() {
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode: "fingerPrint", //facial
      success(res) {
        console.log("fingerPrint:", res.isEnrolled) // 11
      },
    })
  },
  errImg(err){
  console.warn(err);
  }
})
