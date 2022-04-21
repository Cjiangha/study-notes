/*
 * @Author: Ran
 * @Date: 2021-12-17 16:02:22
 * @LastEditTime: 2021-12-17 16:18:24
 * @LastEditors: Ran
 */
App({
  onLaunch() {
    try {
      wx.initFaceDetect()
    } catch (error) {
    
      console.log('wx.initFaceDetect', error)
    }
  }
})
