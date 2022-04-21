const app = getApp()

Page({
  data: {
    siteData: Array.from(new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]))
  },
  onLoad() {
    
  },
  getPhoneNumberFn(e) {
    console.log('----------:', e.detail)
  }
})