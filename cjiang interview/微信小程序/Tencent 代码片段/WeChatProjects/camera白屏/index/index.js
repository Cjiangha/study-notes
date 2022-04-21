
const app = getApp();

const compressImage = (imagePath) => new Promise((resolve, reject) => {
  wx.getFileInfo({
    filePath: imagePath,
    success(fileInfo) {
      // 后台图片上传限制 1m
      const LIMIT_SIZE = 1024 * 1024;
      // 超出限制需要压缩
      if (fileInfo.size > LIMIT_SIZE) {
        log.I('IMAGE_OVER_SIZE', fileInfo, LIMIT_SIZE);
        wx.compressImage({
          src: imagePath,
          quality: LIMIT_SIZE / fileInfo.size,
          success(compressedFileInfo) {
            log.I('IMAGE_COMPRESSED', compressedFileInfo);
            resolve(compressedFileInfo.tempFilePath);
          },
          fail(error) {
            reject(error);
          },
        });
      } else {
        resolve(imagePath);
      }
    },
    fail(error) {
      reject(error);
    },
  });
});

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cameraPosition: 'back',
    imageQualityCaption: '',
    pic: '',
    showTakeBtn: false,
  },
  /** ``
   * 生命周期函数--监听页面加载
   */
  onLoad() {
      const isStaff = true;
      const cameraPosition = isStaff ? 'front' : 'back';
      this.setData({
        cameraPosition,
      });
  },
  onShow() {
    this.setData({
      imageQualityCaption: '请将人脸置于镜头中间',
      pic: '',
    });
  },
  onUnLoad() {
    this.clearCamera();
    wx.offAppHide();
  },
  bindFlip() {
    const cameraPosition =
      this.data.cameraPosition === "back" ? "front" : "back";

    this.setData({
      cameraPosition,
    });
  },
  bindCameraError() {
    wx.showModal({
      icon: "none",
      title: "打开摄像头失败",
      showCancel: false,
      confirmText: "我知道了",
    });
  },
  bindInitCameraDone() {
    this.setData({
      showTakeBtn: true,
    });

    if (!this.data.cameraContext) {
      this.data.cameraContext = wx.createCameraContext();
    }
  },
  bindPhotoTake() {
    console.log('bindPhotoTake')
    if (!this.data.cameraContext) {
      this.data.cameraContext = wx.createCameraContext();
    }

    this.data.cameraContext.takePhoto({
      quality: "high",
      success: (res) => {
        console.log(res)
        this.setData({
          pic: res.tempImagePath
        });
      },
    });
  },
  async bindPhotoConfirm() {
    console.log('原相机图片', this.data.pic);
    let pic;
    try {
      pic = await compressImage(this.data.pic);
    } catch (err) {
      log.error('压缩图片失败', err);
      pic = this.data.pic;
    }
    console.log('压缩之后的图片', pic);
    app.globalData.pic = pic;
    const url = '/result/result';
    wx.navigateTo({ url });

    setTimeout(() => {
      this.setData({
        imageQualityCaption: "",
        pic: "",
      });

      this.clearCamera();
    }, 4e2);
  },
  bindPhotoReTake() {
    this.setData({
      imageQualityCaption: "",
      pic: "",
    });
  },
  clearCamera() {
    this.data.cameraContext = null;
    this.data.cameraFrameListener = null;
  },
});
