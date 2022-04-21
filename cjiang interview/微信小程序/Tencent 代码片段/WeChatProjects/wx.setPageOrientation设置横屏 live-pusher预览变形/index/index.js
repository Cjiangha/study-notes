const app = getApp()

Page({
  data: {
    cameraDert: 'front',//摄像头默认前置
    pusher:null,
    screenOrientation:true
  },
  onLoad() {
    
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  changeName:function(){
    if(this.screenOrientation){
      wx.setPageOrientation({
        orientation: 'landscape',
      })
      this.screenOrientation = false
    }else{
      wx.setPageOrientation({
        orientation: 'portrait',
      })
      this.screenOrientation = true
    }
   

    
  },
 
  onReady(){
    let pusher = wx.createLivePusherContext('pusher');
    this.pusher = wx.createLivePusherContext('pusher');
    console.log(pusher)
    pusher.startPreview()//开启摄像头预览
  },
  
})
