const app = getApp()

Page({
  data: {
    image: '',
    maxSize: 300, // 图片宽高的最大尺寸
    // canvas
    myCanvas: null,
    myCtx: null,
    dpr: null,
    canvasDisplayW: 300,
    canvasDisplayH: 300
  },
  onLoad: function () {
    this.initCanvas();
  },
  // 初始化canvas
  initCanvas: function () {
    const _ = this;
    // 若在自定义组件中，此处应写为this.createSelectorQuery();
    const query = wx.createSelectorQuery();
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        let myCanvas = res[0].node;
        let myCtx = myCanvas.getContext('2d');
        myCtx.font = "normal bold 18px PingFangSC-Regular";
        const dpr = wx.getSystemInfoSync().pixelRatio;
        this.setData({
          myCanvas: myCanvas,
          myCtx: myCtx,
          dpr: dpr
        })
      })
  },
  // 压缩图片
  compress: function (imgW, imgH) {
    const _ = this;
    const dpr = _.data.dpr;
    const maxSize = _.data.maxSize;
    const ratio = imgW / imgH;
    let canvas = _.data.myCanvas;
    let ctx = _.data.myCtx;

    let canvasWidth = imgW;
    let canvasHeight = imgH;
    while (canvasWidth > maxSize || canvasHeight > maxSize) {
      if (canvasWidth > maxSize) {
        canvasWidth = maxSize;
        canvasHeight = maxSize / ratio;
      } else if (canvasHeight > maxSize) {
        canvasHeight = maxSize;
        canvasWidth = maxSize * ratio;
      }
    }
    _.setData({
      canvasDisplayW: canvasWidth,
      canvasDisplayH: canvasHeight
    })

    canvas.width = dpr * canvasWidth;
    canvas.height = dpr * canvasHeight;
    ctx.scale(dpr, dpr);

    return {
      canvasWidth,
      canvasHeight
    }
  },
  // 图片添加水印
  addMask: function (img, imgW, imgH) {
    const _ = this;
    const date = new Date().toString();
    if (!_.data.myCanvas) {
      _.initCanvas();
    }
    let canvas = _.data.myCanvas;
    let ctx = _.data.myCtx;
    // 1. 压缩图片
    let {
      canvasWidth,
      canvasHeight
    } = _.compress(imgW, imgH);

    return new Promise((resolve, reject) => {
      // 2. 生成图片
      let image = canvas.createImage();
      image.src = img;
      image.onload = (e) => {
        // 3. 绘图
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = "#333"; // 阴影颜色
        ctx.shadowOffsetX = 0; // 阴影x轴位移。正值向右，负值向左。
        ctx.shadowOffsetY = 0; // 阴影y轴位移。正值向下，负值向上。
        ctx.shadowBlur = 5; // 阴影模糊滤镜。数据越大，扩散程度越大。
        ctx.fillText(date, 10, canvasHeight - 10);
        // 4. 将canvas转为图片
        wx.canvasToTempFilePath({
          destWidth: canvasWidth,
          destHeight: canvasHeight,
          canvas: canvas,
          success(res) {
            resolve(res.tempFilePath);
          },
          fail(error) {
            console.log('生成图片出错了', error)
            reject(error)
          }
        })
      }
      image.onerror = (e) => {
        console.error('创建图片错误', e)
      }
    })
  },
  // 选择图片
  chooseImage: function () {
    const _ = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        let imgPath = res.tempFilePaths[0];
        // 1. 检查图片尺寸
        wx.getImageInfo({
          src: imgPath,
          success(res) {
            // 2. 添加水印
            _.addMask(imgPath, res.width, res.height).then(imgPath => {
              // 3. 上传图片
              _.uploadFile(imgPath).then(data => {
                _.setData({
                  image: data.fireUrl
                });
              });
            });
          },
          fail(res) {
            console.log("fail res", res);
          }
        })
      }
    })
  },
  // 上传
  uploadFile(path) {
    const _ = this;
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: '',
        filePath: path,
        name: 'file',
        method: 'POST',
        header: {
          'Content-Type': 'multipart/form-data',
          'token': getToken()
        },
        success(res) {
          let {
            msg,
            data,
            code
          } = JSON.parse(res.data);
          if (code === 0) {
            resolve(data);
          } else {
            reject(msg || 'error');
          }
        },
        fail: function (error) {
          reject(error);
        }
      })
    })
  }
})