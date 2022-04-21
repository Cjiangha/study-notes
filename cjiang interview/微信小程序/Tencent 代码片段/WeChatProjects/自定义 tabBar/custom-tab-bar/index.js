Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [    {
      "pagePath": "/index/index",
      "iconPath": "/image/icon_component.png",
      "selectedIconPath": "/image/icon_component_HL.png",
      "text": "组件"
    },
    {
      "pagePath": "/index/index2",
      "iconPath": "/image/icon_API.png",
      "selectedIconPath": "/image/icon_API_HL.png",
      "text": "接口"
    },
    {
      "pagePath": "/index/index3",
      "iconPath": "/image/icon_component.png",
      "selectedIconPath": "/image/icon_component_HL.png",
      "text": "gddfdfsd"
    },
    {
      "pagePath": "/index/index4",
      "iconPath": "/image/icon_API.png",
      "selectedIconPath": "/image/icon_API_HL.png",
      "text": "4"
    }
  ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      console.log(e)
      console.log(e.currentTarget.dataset)
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // this.setData({
      //   selected: data.index
      // })
    }
  }
})