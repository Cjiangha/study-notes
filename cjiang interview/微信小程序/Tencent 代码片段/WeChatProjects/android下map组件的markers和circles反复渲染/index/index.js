const app = getApp()

Page({
  data: {
    slider: {
      min: 200,
      max: 1000,
      color: "#E4E4E6",
      selectedColor: "#FED033"
    },

    latitude: 0,
    longitude: 0,
    radius: 200,
    markers: [],
    polyline: [],
    circles: [],
    circleLat: 0,
    circleLong: 0,
    includePoints: [],
  },

  async onLoad() {
    const { latitude, longitude } = await wx.getLocation()
    this.mapContext = wx.createMapContext('myMap', this)
    this.setData({ latitude, longitude }, () => {
      this.setInclude({ latitude, longitude, radius: 1000 })
    })
  },

  // 点击地图
  onTapMap(e) {
    const latitude = e.detail.latitude;
    const longitude = e.detail.longitude;
    this.setCircle({ longitude, latitude, radius: this.data.radius });
    this.setPosition({ latitude, longitude, content: `${this.data.radius}米` })
  },

  // 拖动 slider
  updateCircle(e) {
    const radius = Number(e.detail.value || 200);
    if (radius === this.data.radius) return;
    if (!this.data.circleLat || !this.data.circleLong) return this.setData({ radius })
    this.setCircle({ latitude: this.data.circleLat, longitude: this.data.circleLong, radius });
    this.setPosition({
      latitude: this.data.circleLat,
      longitude: this.data.circleLong,
      content: `${radius}米`
    })
  },

  // 完成 slider
  changeCircle(e) {
    const radius = Number(e.detail.value || 200);
    if (radius === this.data.radius) return;
    let { circleLat, circleLong } = this.data;
    if (!circleLat || !circleLong) return this.setData({ radius })
    this.setCircle({ latitude: circleLat, longitude: circleLong, radius });
    this.setPosition({
      latitude: circleLat,
      longitude: circleLong,
      content: `${radius}米`
    })
  },

  // 设置圆
  setCircle({ longitude, latitude, radius }) {
    this.setData({
      circleLat: latitude,
      circleLong: longitude,
      radius,
      circles: [
        {
          id: "1",
          latitude,
          longitude,
          radius,
          color: '#128FEF',
          fillColor: '#7cb5ec88',
          strokeWidth: 1,
        }
      ]
    })
  },

  // 设置marker
  setPosition({ longitude, latitude, content }) {
    this.setData({
      markers: [{
        id: "1",
        latitude,
        longitude,
        iconPath: './alarm-3.png',
        width: '75rpx',
        height: '75rpx',
        rotate: 0,
        alpha: 1,
        anchor: { x: 0.5, y: 0.5 },
        callout: { content, padding: 10, borderRadius: 2, display: 'ALWAYS' }
      }]
    })
  },

  // 设置缩放点
  setInclude({ latitude, longitude, radius }) {
    const longMi = 0.00001141 * radius;
    const latMi = 0.00000899 * radius;
    const points = [
      { longitude, latitude: latitude + latMi },
      { longitude: longitude + longMi, latitude },
      { longitude, latitude: latitude - latMi },
      { longitude: longitude - longMi, latitude },
    ];
    this.mapContext.includePoints({ points, padding: [20, 20, 20, 20] })
  },
})
