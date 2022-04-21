// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    title: 'map',
    latitude: 39.909,  //纬度
    longitude: 116.39742,//经度
    markers: [
          {	
            id: 339,
            latitude: 39.909,
            longitude: 116.39742,
            height:50,
            width:50,
            iconPath: '../img/icon.png',
            label :{
              content:'label',
              textAlign  : 'left',
              fontSize : 16
            }
          }, 
          {	id : 200,
            title : '点位2',
            latitude: 39.90,
            longitude: 116.39,
            height:50,
            width:50,
            iconPath: '../img/icon.png',
            label :{
              content:'label',
              textAlign : 'center',
              fontSize : 16
            }
          },
    ],
  },
  onload(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  }
 
})
