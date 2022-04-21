const app = getApp()
// var mIp = '192.168.31.252'
// var mPort = '1660'
var lianjie = false
var tcp 
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('createTCPSocket'),
    recvData:[],
    tcp:''
  },
 
  onLoad: function () {

  },
 
  // onHide:function(){
  //   wx.closeSocket({
  //   })
  // },
 
  // onIpInput:function(e){
  //   console.log("ip="+e.detail.value)
  //   mIp = e.detail.value
  // },
 
  // onPortInput: function (e) {
  //   console.log("port=" + e.detail.value)
  //   mPort = e.detail.value
  // },
 
  onConnectClick:function(){
    const tcp = wx.createTCPSocket()  
    tcp.onError(res=>
      console.log(res))
     
     tcp.connect({address: '192.168.31.8', port: 48600})
    // tcp.onConnect(res=>{
    //   lianjie = true
    //   console.log(res)
    // })
    // tcp.onMessage(res=>{
    //   console.log(res)
    // })
    if (lianjie == true) {
      tcp.write('hello word')
    }
  },
 
// ／**
// *连接服务端
// *／
onoff:function() {

},

  // onCloseClick:function(){
  //   console.log('onCloseClick')
  //   wx.closeSocket({
      
  //   })
  // }
})
