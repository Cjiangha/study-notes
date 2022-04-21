const app = getApp()
const recorderManager = wx.getRecorderManager()
Page({
  data: {

  },
  onLoad() {
    recorderManager.onError(res=>{
			console.log(res,'recorderManager.onError');
		})
  },
  start(){
    	//设置录音参数
		const options = {
			duration: 60000,
			// sampleRate: 16000,
			numberOfChannels: 1,
			encodeBitRate: 48000,
			format: 'mp3'
		}
		//开始录音
		recorderManager.start(options);
  }
})
