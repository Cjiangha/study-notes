// const app = getApp()

// Page({
//   data: {
//     list: []
//   },
//   onLoad() {
//     this.setData({
//       list: Array.from({ length: 10 }).map(() => {
//         const keys = Array.from({ length: 5 }).map(() => `result${Number.parseInt(Math.random() * 10 + 2)}`)
//         return {
//           keys, // 这个keys记录在别的地方也行，只要能和data关联上
//           data: keys.reduce((data, key) => {
//             data[key] = Number.parseInt(Math.random() * 100 + 2)
//             return data
//           }, {})
//         }
//       })
//     })
//     console.log(this.data.list)
//   },
// })
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            },
            fail(e){
              console.log(e)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  }
})