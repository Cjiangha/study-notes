App({
  onLaunch() {
    let audioCtx = wx.createWebAudioContext()
    const sampleSize = 4096
    console.log(audioCtx)

    audioCtx.createScriptProcessor(sampleSize, 1, 1)
  }
})
