const app = getApp()

Page({
  data: {
   index:30,
   userindex:null
  },
  onShow: function () {
  
  },
  dianji(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      userindex:e.currentTarget.dataset.index
    })
  }
})
