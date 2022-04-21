Component({
  properties: {
    menu: {
      type: Object,
      observer(newValue) {
        let propsData = {}
        if (newValue.offset) {
          propsData.offset = newValue.offset
        }
        if (newValue.menuList) {
          propsData.menuList = newValue.menuList
        }
        this.setData({
          propsData
        })
      }
    },
   
  },

  data: {
    initData: null,
    propsData: null,
  },

  lifetimes: {
    ready: function () {
      this.createSelectorQuery().select("#parent").boundingClientRect((res)=>{
        const systemInfo = wx.getSystemInfoSync()
        const maxWidth = systemInfo.windowWidth - res.width
        const maxHeight = systemInfo.windowHeight - res.height
        this.setData({
          initData: {
            maxWidth,
            maxHeight,
            windowWidth: systemInfo.windowWidth,
            windowHeight: systemInfo.windowHeight,
            buttonWidth: res.width,
            buttonHeight: res.height,
          }
        })
      }).exec()
    },
  },
})
