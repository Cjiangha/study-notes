const app = getApp()

Page({
  data: {
    hide:true,
    circles:[],
    latitude:"23",
    longitude:"120"
  },
  showcircle(){
    let arr=[{
      latitude:this.data.latitude,
      longitude:this.data.longitude,
      color:"#F4A261",
      fillColor:"#ffffff8e",
      radius:1000,
      strokeWidth:1,
    }];
    this.setData({
      hide:false,
      circles:arr,
    });
  },
  hidecircle(){
    this.setData({
    circles:[],
    hide:true,
    });
  },
})

