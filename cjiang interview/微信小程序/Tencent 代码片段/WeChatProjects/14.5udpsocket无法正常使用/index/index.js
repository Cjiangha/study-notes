const app = getApp()

Page({
  data: {
    socket:null,
    port:null,
  },
  onLoad() {
    this.createUdp()
  },
  createUdp(){
    this.data.socket = wx.createUDPSocket()
    let that = this
    this.data.socket.onMessage(function(res){
        console.log(res)
        var unit8Array = new Uint8Array(res['message'])
        var encodeString = String.fromCharCode.apply(null, unit8Array)
        var data = JSON.parse(decodeURIComponent(escape(encodeString))) 
        console.log('udp接收到:',data)
        that.data.socket.send({
            address:'192.168.0.10',
            port:8087,
            message:'hello world zzz'
        })
        console.log('udp发送数据')
    })
    this.data.port = this.data.socket.bind(9527)
    console.log('port:',this.data.port)
     this.data.socket.onClose(function(){
         console.log('关闭udp') 
     })
     console.log('socket:',this.data.socket)
 },
 onUnload: function () {
  if(this.data.socket){
    this.data.socket.close()
  }
},
})
