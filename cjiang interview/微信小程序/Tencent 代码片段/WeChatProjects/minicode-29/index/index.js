const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
    wx.getSetting({//获取用户已授权的信息
      success(res) { 
        if (!res.authSetting['scope.userLocation']){//如果没有授权地理位置
          wx.getLocation({
            success(res) {
              console.log("getlocaition")
              console.log(res)
             //获取位置操作
            },
            fail(res){
              wx.showModal({
                showCancel:false,
                title: '提示',
                content: '打开定位失败，请前往设置页面打开',
                success (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(res) {
                        console.log(res)
                        res.authSetting = {//打开授权位置页面，让用户自己开启
                          "scope.userLocation": true
                        }
                  
                      }
                    })
                  } 
                }
              })
            }
          })
        }else{//用户开启授权后可直接获取地理位置
          wx.getLocation({
            success(res){
              console.log("else getLocation")
            },
            fail(res){
              console.log("else getLocation fail")
              console.log(res)
              wx.showModal({
                showCancel:false,
                title: '提示',
                content: '打开定位失败，请前往设置页面打开',       
                success (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(res) {
                        console.log(res)
                        res.authSetting = {//打开授权位置页面，让用户自己开启
                          "scope.userLocation": true
                        }
                      }
                    })
                  } 
                }
              })
            }
          })
        }       
      },
      fail(res){
        console.log("getsettingfail")
        console.log(res)
      }
    })
  },
})
