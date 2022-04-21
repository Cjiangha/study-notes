const app = getApp()

const camera = {
  context: null
}

const Distance = 10

Page({
  data: {
    initZoomFlag: true,
    moveXDistance: 0,
    moveYDistance: 0,
    maxZoom: 1,
    zoom: 1,

  },
  onLoad() {
    camera.context = wx.createCameraContext();
  },
  onShow() {
    this.setData({
      initZoomFlag: true
    })
  },
  // camera加载完成
  initDone(e) {
    if(!this.data.initZoomFlag) return
    const zoom = Number(wx.getStorageSync('zoom'))
   
    this.setData({
      initZoomFlag: false,
      maxZoom: e.detail.maxZoom,
      zoom: zoom?zoom:1
    }, () => {
  
      camera.context.setZoom({
        zoom: this.data.zoom,
        success: res => {
          wx.showToast({
            icon: 'none',
            title: '初始化zoom为'+this.data.zoom
          })
        }
      })
  
    })
  },
  wrapStart(e) { // 页面触发 touchstart
    if(e.touches.length === 2) {
      this.setData({
        moveXDistance: Math.abs(e.touches[0].clientX-e.touches[1].clientX),
        moveYDistance: Math.abs(e.touches[0].clientY-e.touches[1].clientY)
      })
    }
  },
  wrapMove(e) { // 页面触发 touchmove
    if(e.touches.length === 2) {
      let xLen = Math.abs(e.touches[0].clientX-e.touches[1].clientX)
      let yLen = Math.abs(e.touches[0].clientY-e.touches[1].clientY)

      if(xLen > this.data.moveXDistance + Distance || this.data.moveYDistance + Distance < yLen) {
        this.setData({
          moveXDistance: xLen,
          moveYDistance: yLen
        })

        if(this.data.zoom >= this.data.maxZoom) return
       
        this.setData({
          zoom: Number((this.data.zoom+0.1).toFixed(2))
        }, () => {
          camera.context.setZoom({
            zoom: this.data.zoom,
            success: res => {
              wx.setStorageSync('zoom', JSON.stringify(this.data.zoom))
              console.log('放大 —— 当前zoom：'+this.data.zoom)
              wx.showToast({
                icon: 'none',
                title: '放大'+this.data.zoom
              })
            }
          })
        })
      }else if(xLen < this.data.moveXDistance - Distance || this.data.moveYDistance - Distance > yLen){

        if(this.data.zoom <= 1) return
        this.setData({
          zoom:  Number((this.data.zoom-0.1).toFixed(2)),
          moveXDistance: xLen,
          moveYDistance: yLen,
        }, () => {
          camera.context.setZoom({
            zoom: this.data.zoom,
            success: res => {
              wx.setStorageSync('zoom', JSON.stringify(this.data.zoom))
              console.log('缩小 —— 当前zoom：'+this.data.zoom)
              wx.showToast({
                icon: 'none',
                title: '缩小'+this.data.zoom
              })
            }
          })
        })
      }
    }
  },
})
