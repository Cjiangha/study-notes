var getfile = require('amap-wx.130.js')
Page({
  data:{
    longitude:{},
    latitude:{},
    srcollTop:0,
    Tops:600,
    pageY:0

  },
  buttonMove:function(res){
      var num = res.touches[0].pageY
      this.setData({
        pageY:num.toFixed(0),
        Tops:num.toFixed(0)
      })
     if(num>500){
       this.setData({
         Tops:600
       })
     }
     if(num<350){
      this.setData({
        Tops:0
      })
    }
  },
  touchStart:function(res){
   
    
    
},
  touchEnd:function(cd){
   
  
},

  onLoad:function(){
    wx.startLocationUpdate({
      success:res=>{
        wx.onLocationChange((result) => {
          this.setData({
            longitude:result.longitude,
            latitude:result.latitude
          })
        })
      },fail:err=>[
        console.log(err)
      ]
    })
  }
})