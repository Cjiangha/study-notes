const app = getApp()

Page({
  data: {

  },
  onLoad() {
    let audioCtx = wx.createWebAudioContext();
    let scriptNode = audioCtx.createScriptProcessor(512, 0, 2);

    let count = 0
    scriptNode.onaudioprocess = (event) => {
      count++
      if (count === 1) {
        console.log('onaudioprocess event: ',event)
      }

      const dst = event.outputBuffer
      const dst_l = dst.getChannelData(0)
      const dst_r = dst.getChannelData(1)
  
      for (var i = 0; i < dst_l.length; i++) {
        dst_l[i] = Math.random() * 2 - 1;
        dst_r[i] = Math.random() * 2 - 1;
      }
    };
    scriptNode.connect(audioCtx.destination);
  },
})
