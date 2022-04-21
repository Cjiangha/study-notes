App({
  onLaunch: function () {
    const performance = wx.getPerformance()
    const observer = performance.createObserver((entryList) => {
      console.log(entryList.getEntries())
    })
    observer.observe({ entryTypes: ['render', 'script', 'navigation'] })
  }
})
