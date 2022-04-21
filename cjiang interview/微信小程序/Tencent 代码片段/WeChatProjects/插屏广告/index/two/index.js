const app = getApp()

Page({
  data: {
  },
  onLoad() {
    let interstitialAd = null;
    if (wx.createInterstitialAd) {
			interstitialAd = wx.createInterstitialAd({
				adUnitId: 'adunit-b7eb326d3d9133d3',
			});
			interstitialAd.onLoad(() => {
				console.log('插屏 广告加载成功')
			})
			interstitialAd.onError(err => {
				console.log(err)
			})
			interstitialAd.onClose(res => {
				console.log('插屏 广告关闭')
		})
    }
    console.log(interstitialAd)
		// 在适合的场景显示插屏广告
		if (interstitialAd) {
				console.log('adddd');
				interstitialAd
					.show(res => {
						console.log(res);
						console.log('adddded');
					})
					.catch(err => {
						console.error(err);
						console.log('addddfailed');
					});
		}
  },

})
