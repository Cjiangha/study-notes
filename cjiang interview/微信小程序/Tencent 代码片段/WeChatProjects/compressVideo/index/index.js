const app = getApp()

Page({
  data: {
    videoList: []
  },
  onLoad() {

  },
  //选择视频
  chooseVideo: function (e) {
		let _this = this;
		if (this.data.videoList.length >= this.data.videolimit) {
			wx.showToast({
				title: '最多只能选择' + this.data.videolimit + '个视频',
				icon: 'none'
			})
		} else {
			wx.chooseMedia({
				count: 1,
				mediaType: ['video'],
				sourceType: ['album', 'camera'],//视频来源album==相册，camera==相机
				maxDuration: 30,//拍摄视频最长拍摄时间，单位秒
				camera: 'back',
				compressed: false,
				success(res) {
					let imageArr = []
					console.log(res)
					if (res.duration > 30) {
						wx.showToast({
							title: '时长大于30秒',
							icon: 'error',
							duration: 2000
						})
					} else {
						//符合标准，压缩视频
						wx.compressVideo({
							src: res.tempFiles[0].tempFilePath,
							quality: 'high', //'low':低，'medium':中，'high':高  
							success: function (r) {
								wx.hideLoading()
								console.log('压缩后', r)
								imageArr = res.tempFiles[0]
								imageArr.tempFilePath = r.tempFilePath
								_this.setData({
									showActionSheet_1: false,
									videoList: _this.data.videoList.concat(imageArr)
								})
								console.log(_this.data.videoList)
							},
							fail: function (err) {
								console.log(err)
								wx.hideLoading()
								wx.showToast({
									title: '视频压缩失败',
									icon: 'none'
								}, 2000)
							}
						})
					}
				}
			})
		}

	}
})
