const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  onShow(){
    this.setAdv();
  },
  setAdv() {
    let thisTime = Math.round(new Date());
    let lastTime = wx.getStorageSync("_thisTime");
    if (thisTime - lastTime > 15000) {
     console.log('大于15s');
     const diff = t => {
      // 24 * 3600 * 1000
      return Date.now() - t < 24 * 3600 * 1000 ? true : false;
     };
     const lock = wx.getStorageSync("lock2");
     const e = diff(lock);
     console.log("e", e);
     wx.setStorageSync("lock2", Date.now());
     if (!e) {
      console.log("在页面中定义插屏广告");
      // 在页面中定义插屏广告
      let interstitialAd = null;
  
      // 在页面onLoad回调事件中创建插屏广告实例
      if (wx.createInterstitialAd) {
       console.log('wx.createInterstitialAd',wx.createInterstitialAd);
       interstitialAd = wx.createInterstitialAd({
        adUnitId: "adunit-b90697eb60b5cdd1"
       });
       interstitialAd.onLoad(() => { });
       interstitialAd.onError(err => { });
       interstitialAd.onClose(() => { });
      }
      wx.setStorageSync("_thisTime", thisTime);
  
      // 在适合的场景显示插屏广告
      console.log('interstitialAd',interstitialAd);
      if (interstitialAd) {
       interstitialAd.show().catch(err => {
        console.error(err);
       });
      }
     }
    }
   },
})
