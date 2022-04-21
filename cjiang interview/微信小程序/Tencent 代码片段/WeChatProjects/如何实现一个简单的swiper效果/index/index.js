const app = getApp()

Page({
  data: {
    punchList: [{
      "bannerUrl": "https://ojlf2aayk.qnssl.com/1536067857379_122.png"
    }, {
      "bannerUrl": "https://ojlf2aayk.qnssl.com/1536068379879_115.png",
    }, {
      "bannerUrl": "https://ojlf2aayk.qnssl.com/1536068319939_230.png",
    }, {
      "bannerUrl": "https://ojlf2aayk.qnssl.com/1536068074140_695.png",
    }, {
      "bannerUrl": "https://ojlf2aayk.qnssl.com/1536068213758_796.png",
    }],
    autoplay: false,
    duration: 200,
    current: 0,
    isLogin: false
  },
  currentHandle(e) {
    let {
      current
    } = e.detail
    this.setData({
      current
    })
  }
})