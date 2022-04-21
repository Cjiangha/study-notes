//index.js
//获取应用实例
const app = getApp()
var removeFlag = false
var timer
Page({
  data: {
    latitude:'36',
    longitude:'119',
    markers:[{
      id:1,
      latitude: 36,
      longitude: 118.8,
      iconPath: '../../image/start.png',
    },{
        id: 2,
        latitude: 36.4,
        longitude: 119.6,
        iconPath: '../../image/end.png',
    },
      {
        id: 3,
        latitude: 36,
        longitude: 118.8,
        iconPath: '../../image/tmm_nearbyCar@3x.png',
        width:30,
        height:50,
        anchor: { x: 0.5, y: 0.5 },
        rotate:0,
        customCallout:{
          anchorY: 0,
          anchorX: 0,
          display: 'ALWAYS'
        }
      }
    ],
    polyline:[
      {
        id:1,
        color: '#6389f2',
        width: 5,
        points:[
          { latitude: 36, longitude: 118.8 },
          { latitude: 36.1, longitude: 119.1 },
          { latitude: 35.2, longitude: 119.2 },
          { latitude: 35.2, longitude: 119.4 },
          { latitude: 36.3, longitude: 119.3 },
          { latitude: 36.4, longitude: 119.6 },
        ]
      }
    ],
    rotate:0
  },

  onLoad: function () {
    
  },
  move:function(){
    var that = this
    var num = 0
    var points = this.data.polyline[0].points
    let mapCtx = wx.createMapContext("map")
    mapCtx.moveAlong({path:points,markerId: 3,duration: 6000,})
    // timer = setInterval(function(){
    //   if (num < points.length-1){
    //     var point = points[num+1]
    //     var number = that.rotate(points[num].longitude, points[num].latitude, points[num+1].longitude, points[num+1].latitude)
    //     that.setData({
    //       rotate:number
    //     })
        
    //     that.moveTo(point, -number)
    //   }else{
    //     console.log('animation end')
    //     clearInterval(timer)
    //   }
      
    //   num++
    // },1000)
  },
  moveTo:function(point,number){
    //marker移动
    let mapCtx = wx.createMapContext("map")
    mapCtx.translateMarker({
      markerId: 3,
      autoRotate: false,
      duration: 1000,
      destination: point,
      rotate:number
    })
    
  },
  rotate:function(y1,x1,y2,x2){
    var x1 = x1;
    var y1 = y1;
    var x2 = x2;
    var y2 = y2;

    var alpha = Math.acos((y2 - y1) / Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
    if (x2 - x1 < 0) {
      alpha = Math.PI * 2 - alpha;
    }
    console.log(alpha / Math.PI * 180)
    return (alpha / Math.PI * 180)
  }
})
