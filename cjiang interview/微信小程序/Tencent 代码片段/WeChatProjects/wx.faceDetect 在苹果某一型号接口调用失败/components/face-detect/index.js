/*
 * @Author: Ran
 * @Date: 2021-11-09 16:57:41
 * @LastEditTime: 2021-12-17 16:22:20
 * @LastEditors: Ran
 */
Component({
  properties: {},

  data: {
    frameData: null,
    snapData: {
      faceRes: null,
      msg: null,
      faceImgUrl: null,
      frameImgUrl: null,
    },
    status: { code: 'NotReady', tip: '请稍等...' },
    confLimit: 0.5,
    cameraVisbile: false,
    dataBuffering: false,

    frameCanvasCtx: null,
    frameWidth: 388,
    frameHeight: 288,
  },

  lifetimes: {
    attached: function () {
			console.log('attached')
			let system = wx.getSystemInfoSync().system
      if (system.indexOf('iOS') >= 0) {
        this.setData({ cameraVisbile: true })
      }
    },
    detached: function () {
      console.log('detached')
    },
  },

  pageLifetimes: {
    show() {
			console.log('show')
			let system = wx.getSystemInfoSync().system
      if (system.indexOf('iOS') < 0) {
        this.setData({ cameraVisbile: true })
      }
    },

    hide() {
			console.log('hide')
			let system = wx.getSystemInfoSync().system
      if (system.indexOf('iOS') < 0) {
        this.setData({ cameraVisbile: false })
      }
    },
  },

  methods: {
    onCameraError(e) {
      console.log('onCameraError>>>>>>', e)
      const errMsg = e.detail.errMsg
      if (errMsg.indexOf('auth deny') >= 0) {
        getApp().showModal(
          '',
          '摄像头权限已关闭',
          () => {
            wx.reLaunch({
              url: '/pages/returnVisit/returnVisit',
            })
          },
          () => {},
          false,
        )
      } else {
        console.error('onBindStop>>>>', errMsg)
      }
    },

    onBindInitDone() {
      const context = wx.createCameraContext(this)

      let count = 0
      const frameListener = context.onCameraFrame((frame) => {
        this.initFrameCanvas(frame)

        count++
        if (count === 6) {
          console.log('frame', frame)
          try {
            this.executeFaceDetect(frame)
          } catch (error) {
            console.log('executeFaceDetect>>>>', error)
          }
          count = 0
        }
      })
      frameListener.start()
    },

    onBindStop(e) {
      console.log('onBindStop', e)
    },

    // 人脸识别
    executeFaceDetect(frame) {
      if (!this.data.dataBuffering) {
        this.data.frameData = frame
      }
      wx.faceDetect({
        frameBuffer: frame.data,
        width: frame.width,
        height: frame.height,
        enablePoint: true,
        enableConf: true,
        enableAngle: true,
        enableMultiFace: true,
        success: (res) => {
          // console.log(' wx.faceDetect res>>', res)
          const tip = this.generateTip(res)
          if (!this.data.dataBuffering) {
            this.data.snapData.faceRes = res
            this.data.snapData.msg = tip
          }
          this.setData({ status: tip })
        },
        fail: (err) => {
          // console.log('wx faceDetect err', err)
          const tip = this.generateTip(err)
          if (!this.data.dataBuffering) {
            this.data.snapData.faceRes = err
            this.data.snapData.msg = tip
          }
          this.setData({ status: tip })
        },
      })
    },
    // 生成结果
    generateTip(res) {
      let status = {}
      if (res.errCode === 5) {
        status = statusMap['FaceLose']
      } else if (res.errCode === 0) {
        if (res.faceInfo.length > 1) {
          status = statusMap['MultiFace']
        } else if (res.faceInfo.length === 1) {
          const { global, leftEye, rightEye, mouth, nose } = res.faceInfo[0].confArray

          this.data.faceRes = res.faceInfo[0]

          if (global > this.data.confLimit) {
            status = statusMap['FaceNormal']
            if (leftEye < this.data.confLimit) {
              status = statusMap['LeftEyeLose']
            }
            if (rightEye < this.data.confLimit) {
              status = statusMap['RightEyeLose']
            }
            if (mouth < this.data.confLimit) {
              status = statusMap['MouceLose']
            }
            if (nose < this.data.confLimit) {
              status = statusMap['NoseLose']
            }
          } else {
            status = statusMap['FaceNotSure']
          }
        }
      } else {
        console.error('人脸识别参数缺失')
        status = statusMap['Error']
      }
      return status
    },

    // 初始化 frameCanvas
    initFrameCanvas(frame) {
      if (!this.data.frameCanvasCtx) {
        const ctx = wx.createCanvasContext('frameCanvas', this)

        this.data.frameCanvasCtx = ctx

        this.setData({
          frameWidth: frame.width,
          frameHeight: frame.height,
        })
      }
    },

    // 将frame画到canvas
    drawFrame(frame) {
      return new Promise((resolve, reject) => {
        wx.canvasPutImageData(
          {
            canvasId: 'frameCanvas',
            x: 0,
            y: 0,
            width: Math.round(frame.width),
            height: Math.round(frame.height),
            data: new Uint8ClampedArray(frame.data),
            success: () => {
              resolve(1)
            },
            fail: (err) => {
              reject(err)
            },
          },
          this,
        )
      })
    },

    // 获取frame图片
    getFrameImg() {
      return new Promise((resolve, reject) => {
        if (!this.data.frameCanvasCtx) {
          reject('frameCanvasCtx尚未初始化完毕')
          return
        }

        this.data.dataBuffering = true

        this.drawFrame(this.data.frameData).then((res) => {
          wx.canvasToTempFilePath(
            {
              canvasId: 'frameCanvas',
              success: (res) => {
                this.data.snapData.frameImgUrl = res.tempFilePath
                if (this.data.snapData.msg?.code !== 'FaceNormal') {
                  reject(wx.deepClone(this.data.snapData))
                  this.data.dataBuffering = false
                  this.data.snapData.faceImgUrl = null
                  this.data.snapData.frameImgUrl = null
                } else {
                  const { originX, originY, width, height } = this.data.faceRes.detectRect
                  wx.canvasToTempFilePath(
                    {
                      x: originX,
                      y: originY,
                      width: width,
                      height: height,
                      destWidth: width,
                      destHeight: height,
                      canvasId: 'frameCanvas',
                      success: (res) => {
                        this.data.snapData.faceImgUrl = res.tempFilePath
                        resolve(wx.deepClone(this.data.snapData))
                        this.data.dataBuffering = false
                        this.data.snapData.faceImgUrl = null
                        this.data.snapData.frameImgUrl = null
                      },
                      fail: (err) => {
                        this.data.snapData.faceImgUrl = err
                        reject(wx.deepClone(this.data.snapData))
                        this.data.dataBuffering = false
                        this.data.snapData.faceImgUrl = null
                        this.data.snapData.frameImgUrl = null
                      },
                    },
                    this,
                  )
                }
              },
              fail: (err) => {
                this.data.snapData.frameImgUrl = err
                reject(wx.deepClone(this.data.snapData))
                this.data.dataBuffering = false
                this.data.snapData.faceImgUrl = null
                this.data.snapData.frameImgUrl = null
              },
            },
            this,
          )
        })
      })
    },
  },
})

const statusMap = {
  NotReady: { code: 'NotReady', tip: '正在初始化...' },
  FaceLose: { code: 'FaceLose', tip: '未检测到人脸' },
  MultiFace: { code: 'MultiFace', tip: '存在多张人脸' },
  FaceNormal: { code: 'FaceNormal', tip: '检测正常' },
  LeftEyeLose: { code: 'LeftEyeLose', tip: '左眼不够清晰' },
  RightEyeLose: { code: 'RightEyeLose', tip: '右眼不够清晰' },
  MouceLose: { code: 'MouceLose', tip: '嘴巴不够清晰' },
  NoseLose: { code: 'NoseLose', tip: '鼻子不够清晰' },
  FaceNotSure: { code: 'FaceNotSure', tip: '人脸检测不全' },
  Error: { code: 'Error', tip: '不兼容机型，判断参数缺失' },
}
