const app = getApp()

let interstitialAd = null
Page({
	data: {
		progress: '',
		val: '',
		items: [
			{ value: 'ty1', name: 'MP4', checked: true },
			{ value: 'ty2', name: '原', checked: false },
		],
		downloadType1 : 'ty1',
		items2: [
			{ value: 'd1', name: '源', checked: true },
			{ value: 'd2', name: '备', checked: false },
		],
		downloadType2 : 'd1',
	},
	bindinput(e) {
		this.setData({ val: e.detail.value })
	},
	onShow() {
		// 在页面中定义插屏广告

		// 在页面onLoad回调事件中创建插屏广告实例
		if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-d8d59cd96449d176'
			})
			interstitialAd.onLoad(() => { })
			interstitialAd.onError((err) => { })
			interstitialAd.onClose(() => { })
		}

		// 在适合的场景显示插屏广告
		if (interstitialAd) {
			interstitialAd.show().catch((err) => {
				console.error(err)
			})
		}
	},
	ppp(t) {
		var a = this;
		wx.getClipboardData({
			success: function (t) {
				if (t.data == '') {
					wx.showToast({
						title: "粘贴失败,剪切板为空,请重新复制",
						icon: "none"
					});
				} else {
					a.setData({
						val: t.data
					}), wx.showToast({
						title: "粘贴成功",
						icon: "success"
					});
				}

			}
		});
	},
	down() {
		wx.showToast({
			title: "开始下载...",
			icon: "none"
		});
		console.log('点击')
		var e = this;
		var dt = 'downtask';
		if(e.data.downloadType2 == 'd2'){
			var header = {"ssu": e.data.val}
			var url = '这里测试不需要删掉了。'
		}else{
			var header = {}
			var url = e.data.val
		}
		console.log('下载链接', url)
		console.log('头', header)
		var fileName = wx.env.USER_DATA_PATH + '/' + new Date().valueOf() + '.mp4';

		e[dt] = wx.downloadFile({
			header: header,
			url: url,
			filePath:  (e.data.downloadType1 == 'ty1') ? fileName : '',
			success: function (t) {
				console.log('下载成功', t)
				console.log('准备保存到相册saveVideoToPhotosAlbum')
				try {
					wx.saveVideoToPhotosAlbum({
						filePath: (e.data.downloadType1 == 'ty1') ? t.filePath : t.tempFilePath,
						success: function (st) {
							wx.showModal({
								title: "提示",
								content: "保存成功",
								showCancel: false
							});
						}, fail: function (f) {
							console.log(f)
							wx.showModal({
								title: "保存失败",
								content: f.errMsg,
								showCancel: false
							});
						}, complete: function (t) {
							console.log('complete')
						}

					})
				} catch (err) {
					console.log('异常')
				}
				console.log('走完')
			}, fail: function (t) {
				console.log('下载失败', t)
				wx.showModal({
					title: "下载失败",
					content: t.errMsg,
					showCancel: false
				});
			}

		}), e[dt].onProgressUpdate(function (t) {
			console.log('我回调了！！！这里是问题')
			e.setData({ progress: t.progress + "%" });
		}), e[dt].onHeadersReceived(function (t) {
            console.log('相应头',t)
        })
	},
	radioChange(e) {
		console.log('radio1发生change事件，携带value值为：', e.detail.value)
		this.data.downloadType1= e.detail.value
		const items = this.data.items
		for (let i = 0, len = items.length; i < len; ++i) {
			items[i].checked = items[i].value === e.detail.value
		}
	},
	radioChange2(e) {
		console.log('radio2发生change事件，携带value值为：', e.detail.value)
		this.data.downloadType2= e.detail.value
		const items = this.data.items2
		for (let i = 0, len = items.length; i < len; ++i) {
			items[i].checked = items[i].value === e.detail.value
		}
	}
})
