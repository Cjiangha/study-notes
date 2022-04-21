const app = getApp()

Page({
  data: {
    load: true,
    mapWidth: '',
    mapHeight: '',
    scale: 3.9,
    longitude: 109.65152253124998,
    latitude: 34.04178916644127,
    showLocation: true,
    markers: [
      {
        alpha: 0,
        id: 1,
        latitude: 29.40268,
        longitude: 106.54041,
        callout: {
          color: "#ffffff",
          borderRadius: 5,
          bgColor: "#1890ff",
          padding: 8,
          textAlign: "center",
          anchorY: 34,
          anchorX: 0,
          display: 'ALWAYS',
          content: "重庆 5",
          fontSize: 12,
        },
      }, {
        alpha: 0,
        id: 4,
        latitude: 30.65984,
        longitude: 104.10194,
        callout: {
          color: "#ffffff",
          borderRadius: 5,
          bgColor: "#1890ff",
          padding: 8,
          textAlign: "center",
          anchorY: 34,
          anchorX: 0,
          display: 'ALWAYS',
          content: "成都 5",
          fontSize: 12,
        },
      },
      {
        alpha: 0,
        id: 2,
        latitude: 34.72468,
        longitude: 113.6401,
        callout: {
          color: "#ffffff",
          borderRadius: 5,
          bgColor: "#1890ff",
          padding: 8,
          textAlign: "center",
          anchorY: 34,
          anchorX: 0,
          display: 'ALWAYS',
          content: "郑州 5",
          fontSize: 12,
        },
      },
      {
        alpha: 0,
        id: 3,
        latitude: 31.19603,
        longitude: 107.51177,
        callout: {
          color: "#ffffff",
          borderRadius: 5,
          bgColor: "#1890ff",
          padding: 8,
          textAlign: "center",
          anchorY: 34,
          anchorX: 0,
          display: 'ALWAYS',
          content: "达州 8",
          fontSize: 12,
        },
      },
    ],
  },
  onLoad() {
    var sy = wx.getSystemInfoSync(),
      mapWidth = sy.windowWidth * 2,
      mapHeight = sy.windowHeight * 2;
    this.setData({
      mapWidth: mapWidth,
      mapHeight: mapHeight,
      markers: this.data.data1
    })
  },
})
