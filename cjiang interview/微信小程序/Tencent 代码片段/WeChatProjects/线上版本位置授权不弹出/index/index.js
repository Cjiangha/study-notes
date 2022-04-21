const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
    wx.getSetting({//获取用户已授权的信息
      success(res) { 
        console.log("getsetting")
        console.log(res)
        if (!res.authSetting['scope.userLocation']){//如果没有授权地理位置
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              console.log("authorize")
              console.log(res)
             //获取位置操作
            },
            fail(res){
              console.log("authorize fail")
              console.log(res)
            }
          })
        }else{//用户开启授权后可直接获取地理位置
          wx.getLocation({
            success(res){
              console.log("else getLocation")
            },
            fail(){
              console.log("else getLocation fail")
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
