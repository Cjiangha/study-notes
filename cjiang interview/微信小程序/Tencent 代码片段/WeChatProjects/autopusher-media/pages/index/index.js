// pages/move/move.js
const app = getApp();
var statusTimer = null;
var roomStatus = null;
const pabm = requirePlugin("PABMedia");

// const backgroundAudioManager = wx.createInnerAudioContext();
// backgroundAudioManager.obeyMuteSwitch = false;
// backgroundAudioManager.src = "http://music.163.com/song/media/outer/url?id=492857516.mp3";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    enableCamera: false,
    enableMic: false,
    autopush: false,
    isBack: false, //模式切换
    peopleIn: false,
    x: 0,
    y: 0,
    switchCamera: false,
    beauty: 0,
    whiteness: 0,
    light: "front",
    maike: true,
    roomId: "",
    roomNo: "",
    playDebug: true,
    pushUrl: 'rtmp:123',
    // pullUrl: "2",
    managerId: "",
    baNo: "",
    clewNo: "",
    status: false,
    videoContext: "",
    playStatus: "",
    playMuted: false,
    playMod: "RTC",
    distory: false,
    back: null,
    tipStatus: false,
    lbsLong: "",
    lbsLat: "",
    seconds: "",
    useCertNo: "",
    useName: "",
    tryNub: 0,
    isUnload: true,
    lbsLong: "",
    lbsLat: "",
    useTel: "",
    showPanel: true,
    animation: "",
    isAuth: false,
    bookType: "",
    custId: "",
    userName: "",
    userNo: "",
    pushConfig: {
      width: "300",
      height: "500",
      x: 0,
      y: 0
    },
    pullConfig: {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    },
    minBitrate: 800,
    maxBitrate: 1500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let _this = this

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          playMod: res.system.indexOf("iOS") > -1 ? "live" : "RTC",
        });
      },
    });
    console.log("当前模式:");
    let sysInfo = wx.getSystemInfoSync()
    let wWidth = sysInfo.windowWidth
    let wHeight = sysInfo.windowHeight
    // console.warn(111, wx.getSystemInfoSync())
    this.setData(
      {
        'pushConfig.width': wWidth,
        'pushConfig.height': wHeight,
      });
    this.getDateFn();
  },
  _getPlayerComponent(id) {
    const pabPlayer = this.selectComponent(`#${id}`)
    console.warn('_getPlayerComponent:', pabPlayer)
    return pabPlayer
  },
  reconnectStream() {
    console.warn('[reconnectStream]')
    let _this = this
  },
  reconnectStreamAfter(duration = 0) {
    
  },
  getDateFn() {
    var now = new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var str = year + "年" + (month - 0 > 9 ? month : "0" + month) + "月" + (day - 0 > 9 ? day : "0" + day) + "日";
    this.setData({
      userDate: str,
    });
  },
  clostUserTip() {
    this.setData({
      tipStatus: false,
    });
  },
  gopherCdd(message) {
    try {
      app.PDA_SDK.trackEvent({
        otitle: message,
      });
    } catch (e) { }
  },
  changeLight() {
    let switchCamera = !this.data.switchCamera
    this.setData({
      switchCamera
    })
    this.gopherCdd("切换摄像头");
  },

  joinMeet() {
    var _this = this;
    var deviceName = "";
    var deviceSystem = "";

    // 入会通知
    try {
      const res = wx.getSystemInfoSync();
      deviceName = res.model;
      deviceSystem = res.system;
    } catch (e) {
      // Do something when catch error
    }
    this.joinPabmRoom()
    // }
  },
  joinPabmRoom() {
    var _this = this;
    // wx.showLoading({
    //   title: "请稍后...",
    //   mask: true,
    // });
    let opts = {
      to: 'qr04432',
      // to: 'qr04874' || this.data.managerId.toLowerCase(),
      // to: 'huwen241',
      // to: this.data.managerId.toLowerCase(),
      content: {
        type: "01",
        roomId: this.data.roomId,
        useChannel: "WECHAT",
        useRole: "CUST",
        useName: this.data.useName || '',
        wechatId: this.data.openId,
        useId: this.data.openId,
        managerId: this.data.managerId,
        baNo: this.data.baNo,
        clewNo: this.data.clewNo,
        roomNo: this.data.roomNo,
        useTel: this.data.useTel,
      }
    }
    // console.warn(111, opts)
    this.setSettingPoint()
    pabm.videoCall(opts)
    // 客户端超时70秒未有人进入报超时
    this.localAcceptTimeout = setTimeout(() => {
      if (!this.data.peopleIn) {
        console.warn('[localCallTimeOut]')
        _this.quotaMeetingWithTip("视频连接超时，请重试")
      }
    }, 70000)
  },
  sendMessage(type) {
    //信令通知
    var _this = this;
    // wx.showLoading({
    //   title: "请稍后...",
    //   mask: true,
    // });
    const content = {
      type: type,
      roomId: _this.data.roomId,
      useId: wx.getStorageSync("openId"),
      useChannel: "WECHAT",
      useRole: "CUST",
      useName: _this.data.useName || "",

      wechatId: wx.getStorageSync("openId"),
      managerId: _this.data.managerId,
      baNo: _this.data.baNo,
      clewNo: _this.data.clewNo,
      useTel: _this.data.useTel,
      roomNo: _this.data.roomNo,
      lbsLong: _this.data.lbsLong,
      lbsLat: _this.data.lbsLat,
    };
    const data = {
      roomId: _this.data.roomId,
      msgType: "IM",
      useId: wx.getStorageSync("openId"),
      touser: _this.data.managerId,
      sourcesys: "106",
      content: JSON.stringify(content),
    };
  },
  getRoomStatus(type) {
    var _this = this;

    // console.log("type");
    // console.log(type);
    // if (_this.data.tryNub >= Number(_this.data.seconds)) {
    //   clearInterval(statusTimer);
    //   wx.showModal({
    //     title: "温馨提示",
    //     content: "视频连接超时，请重试",
    //     showCancel: false,
    //     confirmColor: "#f37938",
    //     success(res) {
    //       if (res.confirm) {
    //         _this.quotaMeeting(); //退出会议
    //       }
    //     },
    //   });
    //   return;
    // }
    // _this.setData({
    //   tryNub: _this.data.tryNub + 2,
    // });
    // if (type == "0") {
    //   if (_this.data.status) {
    //     return;
    //   }
    // }
    // if (_this.data.distory) {
    //   return;
    // }

  },
  getStatus() {
    // 查询坐席状态轮训
    var _this = this;
    if (_this.data.status) {
      console.log(" 清楚定时器statusTimer");
      clearInterval(statusTimer);
      return;
    }
    wx.request({
      url: utils.SingedApi.queryManagerStatus,
      data: {
        type: _this.data.tryNub == 0 ? "01" : "02",
        roomId: _this.data.roomId,
        useId: wx.getStorageSync("openId"),
        useChannel: "WECHAT",
        useRole: "CUST",
        useName: _this.data.useName || "",
        wechatId: wx.getStorageSync("openId"),
        managerId: _this.data.managerId,
        baNo: _this.data.baNo,
        clewNo: _this.data.clewNo,
      },
      success(res) {
        //对方繁忙请稍后再试
        console.log("queryManagerStatus");
        console.log(res);
        if (res.data.responseCode == "0") {
          _this.getRoomStatus("0"); //第一次进来查询是否挂断
        } else {
          clearInterval(statusTimer);
          wx.showModal({
            title: "温馨提示",
            content: res.data.responseMsg,
            showCancel: false,
            confirmColor: "#f37938",
            success(res) {
              if (res.confirm) {
                _this.quotaMeeting(); //退出会议
              }
            },
          });

          return;
        }
      },
      fail() {
        clearInterval(statusTimer);
        return;
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.warn('[people onReady]')
    wx.setStorageSync("openId", "oA27pwPx2M2ZIXamgJdCW7oa3-CU");
    this.setData({openId:'oA27pwPx2M2ZIXamgJdCW7oa3-C'})
    let _this = this
    // backgroundAudioManager.play();
    this.initPabMedia().then(
      () => {
        let roomNo = `${new Date().getTime()}`
        _this.mediaStart(roomNo).then(data => {
          _this.bindMediaEvent()
          // 入会通知
          _this.joinMeet();
        }).catch(reason => {
          console.warn('err',reason)
          // pabm.destroyImMedia().then(() => {
          //   _this.setData({ pabmReady: false })
          //   _this.errTip({
          //     title: '呼叫失败',
          //     content: reason
          //   })
          // })
        })
      }
    )
  },
  quotaMeeting(s) {
    var _this = this;
    var returnParams = `managerId=${_this.data.managerId}&bizNo=${_this.data.baNo}&caseNo=${_this.data.clewNo}&useName=${_this.data.useName}&useCertNo=${_this.data.useCertNo}&useTel=${_this.data.useTel}&bookType=${_this.data.bookType}&custId=${_this.data.custId}&userName=${_this.data.userName}&userNo=${_this.data.userNo}&taskDate=${_this.data.taskDate}`;
    _this.setData({
      isUnload: false,
    });
    // backgroundAudioManager.stop();
    if (s && s.type === 'tap') {
      pabm.setGopherPoint({
        otitle: '点击挂断按钮'
      })
    }

    _this.gopherCdd("退出会议");
    console.log("退出会议");

    clearInterval(statusTimer);
    _this.quitMeeting("QUIT");
    if (s == "0") {
      wx.reLaunch({
        url: "../pabmIndex/pabmIndex?" + returnParams,
      });
    } else {
    }
  },
  quotaMeetingWithTip(message) {
    let _this = this
    wx.showModal({
      title: "温馨提示",
      content: message,
      showCancel: false,
      confirmColor: "#f37938",
      success(res) {
        if (res.confirm) {
          _this.quotaMeeting(); //退出会议
        }
      },
    });
  },
  quitMeeting(type) {
    //退出会议
    // type01 网络情况放回前一个页面
    // type02 用户挂断
    var _this = this;
    clearTimeout(_this.localAcceptTimeout) // 清除本地超时挂断
    if (!this.data.peopleIn && !this.receiveMsg) {
      
    }
    pabm.leaveRoom()
  },
  playChange(e) {
    //坐席端播放状态变化事件
    var _this = this;
    console.log("坐席端播放状态变化事件", e);
    console.log(e.detail.code);
    if (e.detail.code == -2301 || e.detail.code == -2302) {
      _this.getRoomStatus("1");
    } else if (e.detail.code == 2003 || e.detail.code == 2004) {
      // 停止轮训
      console.log("编码code");
      console.log(e.detail.code);
      if (_this.data.status) {
        return;
      }
      _this.setData({
        status: true,
        tipStatus: true,
      });
      // backgroundAudioManager.stop();
    } else if (e.detail.code == 3005) {
    }
  },
  playNetChange(e) {
    //  //坐席端网络状态变化事件
    // console.log('坐席端网络状态变化事件')
    // console.log(e)
  },
  pusherChange(e) {
    var _this = this;
    // 客户状态变化事件
    // console.log('坐席端网络状态变化事件')
    // console.log(e)
    if (e.detail.code == -1310) {
      wx.showModal({
        title: "温馨提示",
        content: "会话失败,尝试重试",
        showCancel: false,
        confirmColor: "#f37938",
        success(res) {
          if (res.confirm) {
            _this.onReady();
          }
        },
      });
    }
  },
  pusherNetChange(e) {
    // 客户网络状态通知
    // console.log('客户网络状态通知')
    // console.log(e)
  },
  pusherError(e) {
    // 渲染错误事件
    // console.log('渲染错误事件')
    console.log(e)
  },
  bindchange(e) {
    this.setData({
      x: e.detail.x,
      y: e.detail.y,
    });
  },
  musicBig(e) {
    // console.log('e')
    // console.log(e)
  },
  changeBack() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setKeepScreenOn({
      keepScreenOn: true,
    }); // 保持屏幕常亮
  },
  bindnetstatus(res) {
    console.log(res);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUNLOAD");

    if (this.data.isUnload) {
      this.quotaMeeting();
    }
  },
  // 获取音视频初始化信息
  getMediaConfig(env = 'dev') {
    console.warn("[getMediaConfig]")
    let fatConfig = {
      "appKey": "62d378730e5514bfee9e7bcbe79e550d",
      "channelConfig": {
        "nos_downloader": "mediaproc5.pingan.com.cn/{bucket}/{object}",
        "https_enabled": true,
        "nos_accelerate_host": "",
        "nos_uploader_web": "https://mediaproc5.pingan.com.cn/",
        "nos_accelerate": "",
        "link_ssl_web": true,
        "nt_server": "",
        "lbs_web": "https://mediaproc5.pingan.com.cn/lbs/webconf.jsp"
      }
    }
    fatConfig.userAccess = {
      accid: "oa27pwpx2m2zixamgjdcw7oa3-cu",
      token: "219b0e4878203d0d75a3322705aa62304c4ba2f4dc53d4d5ceeb6ba202ea15f1"
    }
    let devConfig = {
      "appKey": "f657902c8fa09bb729fe8d6003846fb1",
      "channelConfig": {
        "nos_downloader": "dev-media-videocenter.pingan.com.cn/{bucket}/{object}",
        "https_enabled": true,
        "nos_accelerate_host": "",
        "nos_uploader_web": "https://dev-media-videocenter.pingan.com.cn/",
        "nos_accelerate": "",
        "link_ssl_web": true,
        "nt_server": "",
        "lbs_web": "https://dev-media-videocenter.pingan.com.cn/lbs/webconf.jsp"
      }
    }
    devConfig.userAccess = {
      accid: "lijian3",
      token: "e10adc3949ba59abbe56e057f20f883e"
    }

    let demoConfig = {
      "appKey": "9a244511b347e13f4bc13a4aba11579d",
      "channelConfig": {
        "nos_downloader": "mediaproc5.pingan.com.cn/{bucket}/{object}",
        "https_enabled": true,
        "nos_accelerate_host": "",
        "nos_uploader_web": "https://mediaproc5.pingan.com.cn/",
        "nos_accelerate": "",
        "link_ssl_web": true,
        "nt_server": "",
        "lbs_web": "https://mediaproc5.pingan.com.cn/lbs/webconf.jsp"
      }
    }
    demoConfig.userAccess = {
      "accid": '600043878774',
      "token": 'fef91b364f5aef84f73fc2df01ba8cfcc337e365c520710cd335449d2b97163f'
    }
    let dev2 = {
      "appKey": "fa0572960c0919f557a194917f8fe240",
      "channelConfig": {
        https_enabled: true,
        lbs_web: "https://dev-media-videocenter.pingan.com.cn/lbs/webconf.jsp",
        link_ssl_web: true,
        nos_accelerate: "",
        nos_accelerate_host: "",
        nos_downloader: "dev-media-videocenter.pingan.com.cn/{bucket}/{object}",
        nos_uploader_web: "https://dev-media-videocenter.pingan.com.cn/",
        nt_server: ""
      }
    }
    dev2.userAccess = {
      accid: "600066715350",
      token: "b6df34a7f4c47c31139bff9035647bd7b65347f960f4a72be82695e2e11811ed"
    }

    let config = {
      demo: demoConfig,
      dev: devConfig,
      fat: fatConfig,
      dev2: dev2
    }
    return config[env]
  },
  initPabMedia() {
    console.log(111,'initPabMedia')
    let _this = this;
    let openId = this.data.openId
    let channelConfig = {
      env: 'fat',
      openId: openId,
      channelId: '40009',
      channelCode: 'b3bf9311c26d6cf1ef1adb28a2023846',
      clewId: "999999",
      BA: "88888",
      name: 123123 || '',
      icon: 'https://',
      sessionId: "oA27pwPx2M2ZIXamgJdCW7oa3-CU1626680628258",
      identity: '客户',
      showLog: true
    }
    let opts = {}, envDebug = true
    if (envDebug) {
      opts = this.getMediaConfig('dev')
      // console.warn('1111',opts)
    }
    return new Promise((resolve, reject) => {
      let meetconfig = {
        ...channelConfig,
        ...opts,
        identity: '客户',
        debug: false,
        envDebug: envDebug,
        recordSwitch: true,
        imSuccess: function () {
          console.warn("now media channel is ready")
          _this.setData({
            pabmReady: true
          })
          // wx.hideLoading()
          resolve()
          // wx.navigateTo({
          //   url: '../test/test?' + str,
          // })
        },
        imError: function (e) {
          console.error('init error:', e)
          _this.errTip({
            title: '音视频通道初始化失败',
            content: e
          })
          // wx.hideLoading()
          reject(e)
        }
      }
      console.warn("meetconfig", meetconfig)

      pabm.initImMedia(meetconfig).catch(e => {
        console.error('init error:', e)
        _this.errTip({
          title: '音视频通道初始化失败',
          content: e
        })
        // wx.hideLoading()
        reject(e)
      })
    })
  },
  async createPabmRoom(roomNo) {
    let roomData = await pabm.createRoom(roomNo)
    console.warn(roomData)
    let cData = await pabm.joinRoom(roomNo, {
      recordSwitch: true,
      // renameRecord:true,name:'minpg_moto' 
    })
    // wx.authorize({
    //   scope: 'scope.record',
    //   success: () => { 
    //     wx.showModal({
    //       cancelColor: 'cancelColor',
    //       title: '麦克风授权成功'
    //     })
    //   },
    //   fail: () => {
    //     wx.showModal({
    //       title: `请打开${scopeType[type]}授权`,
    //       showCancel: false,
    //       success: () => {
    //         wx.openSetting({
    //           success(res) {
    //             console.log(res.authSetting)
    //           },
    //           fail(e) {
    //             console.error(e)
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    console.warn(123,cData)
    this.setData({
      roomId: cData.cid
    })

    return cData
  },
  sysTime() {
    function getMakeZero(s) {
      return s < 10 ? "0" + s : s;
    }
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();
    var now = year + "-" + getMakeZero(month) + "-" + getMakeZero(date) + " " + getMakeZero(h) + ":" + getMakeZero(m) + ":" + getMakeZero(s);
    return now;
  },
  markBookRoom(meetInfo) {
    
  },
  async mediaStart(roomNo) {
    let _this = this
    console.warn('mediaStart start now')
    const [pushUrl, cData] = await Promise.all([
      new Promise((resolve, reject) => {
        pabm.bindMediaEvent({
          mediaStart: function (data) {
            console.warn('mediaStart:', data)
            let openId = _this.data.openId.toLowerCase()
            let url = ""
            data.userlist.forEach(user => {
              if (user.account === openId || true) {
                console.warn(user.url)
                url = user.url
                // _this.setData({ autopush: true })
                // setTimeout(() => {
                  //   _this.setData({ enableCamera: true, maike: true })
                  // }, 1000)
                  _this.setData({ pushUrl: url })
                  _this.setData({autopush:true, enableCamera: true, maike: true })
                resolve(url)
              }
            })
            if (!url) {
              // wx.hideLoading({
              //   success: (res) => { },
              // })
              reject('用户ID不匹配')
            }
          }
        })
      }),
      _this.createPabmRoom(roomNo)
    ])
    cData.pushUrl = pushUrl
    console.warn('mediaStart:end')
    // wx.hideLoading({
    //   success: (res) => { },
    // })

    return cData
  },
  async getOpenId() {
    return Promise.resolve('openid')
  },
  bindMediaEvent() {
    let _this = this
    let meetEvent = {
      clientJoin(data) {
        console.warn('clientJoin', data)
        _this.setData({
          pullUrl: data.url,
          peopleIn: true
        },
          () => {
            console.warn(_this.data.peopleIn)
          }
        )
      },
      clientLeave(data) {
        console.warn('clientLeave', data)
        _this.quotaMeetingWithTip("坐席挂断")
      },
      refuse(data) {
        console.warn('refuse', data)
        _this.receiveMsg = true
        _this.quotaMeetingWithTip("坐席挂断，请稍后重试")
      },
      busy(data) {
        console.warn('busy', data)
        _this.receiveMsg = true
        _this.quotaMeetingWithTip("对方繁忙请稍后再试")
      },
      acceptTimeOut(data) {
        console.warn('acceptTimeOut', data)
        _this.receiveMsg = true
        _this.quotaMeetingWithTip("视频连接超时，请重试")
      },
      bekicked() {
        console.warn('bekicked:')
        pabm.destroyImMedia().then(() => {
          _this.setData({ pabmReady: false })
          _this.errTip({
            title: '异常提示',
            content: '用户被踢'
          })
        })
      },
      netcallError(e) {
        console.warn('netcallError:')
        pabm.destroyImMedia().then(() => {
          _this.setData({ pabmReady: false })
          _this.errTip({
            title: '异常提示',
            content: '音视频异常,请重新呼叫'
          })
        })
      }
    }
    pabm.bindMediaEvent(meetEvent)
  },
  setSettingPoint() {
    console.warn('[setSettingPoint]')
    wx.getSetting({
      withSubscriptions: true,
      success(settings) {
        console.warn(settings.authSetting)
        pabm.setGopherPoint({
          otitle: '设备授权信息',
          param: settings.authSetting
        })
      }
    })
  },
  errTip(errMsg) {
    let _this = this
    let title = errMsg.title || '异常提示'
    let content = errMsg.content || ""
    content = typeof content === 'string' ? content : JSON.stringify(content)
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      confirmColor: "#f37938",
      success(res) {
        if (res.confirm) {
          _this.quotaMeeting(); //退出会议
        }
      },
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
});
