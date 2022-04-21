const app = getApp()

Page({
  data: {
    imageSrc: "",
    canvasWidth: '',
    canvasHeight: '',
    imageSrc:""
  },
  onLoad: async function () {
    let imageSrc = 'https://img1.elfinbook.com/elfin/image/172dd235bd088487c9b39471915778d5.jpg';
    let imageInfo = await this.getImageInfo(imageSrc);
    let r = 2.165914247136675;
    let canvasWidth = Math.floor(imageInfo.width / r);
    let canvasHeight = Math.floor(imageInfo.height / r);
    this.setData({
      canvasWidth,
      canvasHeight
    })

    let {
      canvas,
      context
    } = await this.initCanvas('#myCanvas', 1);
    let img = await this.createImage(canvas, imageSrc);
    context.drawImage(img, 0, 0, imageInfo.width, imageInfo.height, 0, 0, canvasWidth, canvasHeight)

    let src = await wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvas,
      success:(res)=>{
        this.setData({
          imageSrc:res.tempFilePath
        })
      }
    })

  },
  getImageInfo(src) {
    return new Promise(async (resolve, reject) => {
      wx.getImageInfo({
        src,
        success: (result) => {
          resolve(result);
        },
        fail: (e) => {
          reject(e);
        }
      });
    });
  },
  initCanvas(selector, dpr) {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery()
        .select(selector)
        .fields({
          node: !0,
          size: !0
        })
        .exec((res) => {
          let canvasWidth = res[0].width;
          let canvasHeight = res[0].height;
          let canvas = res[0].node;
          let context = canvas.getContext('2d');
          canvas.width = canvasWidth * dpr;
          canvas.height = canvasHeight * dpr;
          context.scale(dpr, dpr);
          resolve({
            context,
            canvas,
            canvasWidth,
            canvasHeight
          });
        });
    });
  },
  createImage(ctxNode, imageSrc) {
    return new Promise((resolve, reject) => {
      const img = ctxNode.createImage();
      img.src = imageSrc;
      img.onload = () => {
        resolve(img);
      };
    });
  },
})