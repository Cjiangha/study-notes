const app = getApp()

Page({
  data: {
    show: false,
    slideButtons: [
      {
        text: '保存',
      },
      {
        type: 'warn',
        text: '删除',
      }
    ],
  },
  onLoad() {
  
  },
  onShareAppMessage() {
    return {
      title: '我是阿江分享出来的，但是跳到阿铭了',
      path: '/index2/index2',
      imageUrl:'https://wx.qlogo.cn/mmhead/Q3auHgzwzM53pB3WFXr39IiaCwpKsbUV3YJeGu65HffujGE9lmxcC2g/0',
      // imageUrl:'https://wx.qlogo.cn/mmhead/Q3auHgzwzM5ymx49RS3HvWFMTNPkrKaqx2eDsqQV1oETS8wH7gD2eQ/0',
    }
  },
  dd(){
    wx.openEmbeddedMiniProgram({
      appid:'wx82d43fee89cdc7df',
      complete(e){
        console.log(e)
      }
    })
  },
  tiao(){
    wx.navigateTo({
      url: '../index2/index2',
    })
  },

  tap(){
    wx.chooseMedia({
      count: 9,
      mediaType: ['mix'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
       console.log(res)
      }
    })
  },
  itemTap(e) {
    this.setData({
      show: true
    });
  }
})
