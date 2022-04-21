const app = getApp()

Page({
  data: {
    A:1,
    latitude: 24.463713,
    longitude: 118.082085,
    markers: [{
      latitude: 24.463713,
      longitude: 118.082085,
      id: 1
    }]
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '自定义转发标题'
        })
      }, 2000)
    })
    return {
      title: '自定义转发标题',
      path: '/index/index?123',
      promise 
    }
  },
  onShareTimeline(){
    return{
      title:'abc',
      query:'a=123',
      imageUrL:'http://mmbiz.qpic.cn/mmbiz_png/noF2H9nbRENG4XQSQcUs59J1oytmtomiapDk9ibicfHLeX3iageMa1c6LrjANsfkC80YCiccgQ6uuI9gYQc5oVfEz0g/0?wx_fmt=png'
    }
  },


  handleTapMap(e) {
    console.warn('map')
  },

  handleTapMarker(e) {
    console.warn('marker')
  },

  onLoad(e) {
    wx.getBackgroundFetchData({
      fetchType:'periodic',
      complete(e){
        console.log(e)
      }
    })
   console.log('------onload------',e)
   this.setData({
     A:e.a
   })
  },
})