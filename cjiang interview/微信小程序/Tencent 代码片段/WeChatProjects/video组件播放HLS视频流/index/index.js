const app = getApp();
Page({
	data: {
		src: ''
	},
	onLoad() {
		let _this = this;
		
		wx.request({
			url: 'https://wx.5gwlxc.cn/wxapp/index/camera4303_preview/token/177KW5dvF315mit7L/camera_index_code/16869121',
			success(res){
				console.log('获取视频地址:', res.data);
				_this.setData({
					src: res.data.data.url
				})
				console.log(_this.data.src)
			}
		})
	},
	//视频源加载完成
	loadEnd(e){
		console.log('视频源加载完成', e);
	},
	//视频源加载进度
	progress(e){
		console.log('加载进度:', e.detail.buffered);
	},
	//开始播放
	play(e){
		console.log('开始播放:', e);
	},
})