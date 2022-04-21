const app = getApp()

import Immutable from 'Immutable'

console.log(Immutable)
​
const initData = Immutable.fromJS({
  globalData: {
    attr: {
      siteId: '11418793',
    },
  },
})

initData.getIn(['globalData', 'attr'])
initData.getIn(['globalData', 'attr', 'siteId'])
console.log()


Page({
  data: {

  },
  dd(){
    wx.addPhoneRepeatCalendar({
      title:'test title', 
      startTime:1645701514,
      allDay:false,
      description:'test description',
      location:'事件位置',
      endTime:1645701800,
      complete(e){
        console.log(e)
      }
    })
  },
  onLoad() {
   

  },
  loadDown: function(){
    wx.downloadFile({
      url: "https://sdk.meibbc.com/sv/f31c225-17f1b7f2f6e/f31c225-17f1b7f2f6e.mp4",
      header: {
        'content-type': 'video/mp4'
      },
      success (ress) {
        console.log(ress)
        if (ress.statusCode === 200) {
          wx.saveVideoToPhotosAlbum({ //保存到相册
            filePath: ress.tempFilePath,
            success(res) {
              wx.showToast({
                title: '保存成功',
                icon: 'none', 
                duration: 2000 
              })
            },
            fail (err) {
              wx.showToast({
                title: '保存失败',
                icon: 'none', 
                duration: 2000 
              })
            }
          })
          
        }
      }
    })
  },
})
