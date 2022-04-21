const app = getApp()

function string2arr(str) {
  return str.match(/[\da-f]{2}/gi).map(function (char) {
    return parseInt(char, 16)
  });
}


Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  startUdp() {
    if (this.udp) {
      console.log('sending');
    } else {
      console.log('start');
      this.udp = wx.createUDPSocket()
      const port = this.udp.bind()
      this.udp.onError((error) => {
        console.log('udp error',error)
      })
      this.discoverItv = setInterval(() => { //300ms定时发送udp请求
        console.log('discover send');
        let arr = string2arr("000000000011")
        let message = Uint8Array.from(arr).buffer;
        this.udp.send({
          address: '255.255.255.255',
          port: 6811,
          message
        })
      }, 500)
    }

  },
  stopUdp() {
    if (this.udp) {
      console.log('stop');
      clearInterval(this.discoverItv);
      this.udp.close();
      this.udp = null;
    }
  }
})