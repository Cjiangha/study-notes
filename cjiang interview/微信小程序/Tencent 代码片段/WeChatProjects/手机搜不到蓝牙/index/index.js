var app = getApp();
var bt2 = ['5A', 'A5'];
var writeValueUnlock = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', 51, '00', '00', '00']
var writeValueLock = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', 195, '00', '00', '00']
var writeValueConnection = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', 60, '00', '00', '00']
var writeValueQuery = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', 204, '00', '00', '00']

function getWriteValue(type) {
  var value = 0;
  var writeValue = [];
  if (type == 'connect') {
    writeValue = writeValueConnection;
  } else if (type == 'query' || type == "confirm") {
    writeValue = writeValueQuery;
  } else if (type == 'unlock') {
    writeValue = writeValueUnlock;
  } else if (type == 'lock') {
    writeValue = writeValueLock;
  }
  return writeValue;
}

function setWriteValue(type) {
  var value = 0;
  var writeValue = getWriteValue(type);
  for (var i = 0; i < writeValue.length; i++) {
    value += writeValue[i] * (i + 1);
  }
  console.log('运算值', (value).toString(16));
  return (value).toString(16);
}
//校验1
function setXYValue1(type) {
  var value = setWriteValue(type);
  var value1 = ('0x' + value & 0x00ff).toString(16);
  console.log('校验值vlue', value);
  console.log('校验值vlue1', value1);
  console.log('校验值1', value1);
  return value1;
}
//校验2
function setXYValue2(type) {
  var value = setWriteValue(type);
  var value2 = (('0x' + value & 0xff00) >> 8).toString(16);
  console.log('校验值2', value2);
  return value2;
}

//var secInterval = null;


// pages/blue/index.js
Page({

  data: {
    msg: '蓝牙正在适配...',
    text: 'Test',
    deviceList: [],
    currentDevice: {},
    nowDevice: false,
    searchDevice: true,
    windowHeight: 0,
    deviceService: {},
    nowService: false,
    sendData: '',
    dataResult: {},
    writeDatas: '',
    reMessage: [],
    blueStatus: false,
    vin: '',
    kzq_code: '',
    source: '0',
    is_force: '0',
    is_replace: '0',
    secInterval: null,
    sendType: '',
    responses: [],
    showMsg: false,
    devLock: true, //锁定状态 false:已解锁 true:已锁定
    roleUnlock: false,
    roleLock: false,
    isLock: null,
    sec: 20, //解锁秒数
    step: 1, //1连接2校验解锁状态3解锁
    sendSec: 0,
    sendNum: 1,
    sendInterval: null,
    errorNum: 0,
    audioCtx: null,
    src: '/images/audit.mp3',

  },
  startSec: function (type) {
    var that = this;
    var responses = that.data.responses;
    var typeName = "";
    switch (type) {
      case "connect":
        typeName = "连接中";
        break;
      case "query":
        typeName = "校验解锁";
        break;
      case "confirm":
        typeName = "确认解锁";
        break;
      case "unlock":
        typeName = "解锁中";
        break;
      case "lock":
        typeName = "上锁中";
        break;

    }
    if (type == "connect") {
      responses = [];
    } else {
     // responses.splice(responses.length - 1, 1);
    }
    responses=[];
    responses.push({
      type: type,
      title: typeName + '：校验中',
      loading: true,
      success: false
    })
    that.setData({
      responses: responses,
      typeName: typeName,
      sec: 20
    });
    that.showModal();
    that.timeSec(type, typeName);

  },
  timeSec: function (type, typeName) {
    var that = this;
    var t = setTimeout(function () {
      var responses = that.data.responses;
      if (that.data.sec > 0) {
        that.showModal();
        if (that.data.sendNum <= 3) {
          var sendNum = that.data.sendNum;
          that.setData({
            sendNum: that.data.sendNum + 1,
            sendSec: 0
          });

          console.log(type + "发送第" + sendNum + "次")
          if (sendNum <= 3) {
            that.sendMessage(type);
            if (sendNum >= 2) { //第2、3次间隔200ms再发送一次
              setTimeout(function () {
                that.sendMessage(type);
              }, 200);
              console.log("SETTIMEOUT");
            }
          }
        } else {
          //that.deleteSendInterval();
        }
        that.setData({
          sec: that.data.sec - 1
        });
        console.log('SEC', (that.data.sec - 1));
        that.timeSec(type, typeName);
      } else {
        //responses.splice(responses.length - 1, 1);
        responses=[];
        responses.push({
          type: type,
          title: typeName + '：操作失败，请重试',
          loading: false,
          success: false
        })
        that.setData({
          responses: responses,
          typeName: typeName
        });
        that.deleteInterval();
        that.setData({
          sec: 20
        });
        that.hideModal();
        // app.toast({
        //   icon: 'fail',
        //   title: "操作失败"
        // });

      }

    }, 1000);
    that.setData({
      secInterval: t
    })
  },

  startSendTimeSec: function (type) {
    var that = this;

    var t = that.sendTimeSec(type);
    that.setData({
      sendInterval: t
    })
  },
  sendTimeSec: function (type) {
    var that = this;

    var t = setInterval(function () {
      if (that.data.sendSec >= 1500) {
        console.log('SENDSEC', (that.data.sendSec));
        console.log('SENDNUM', that.data.sendNum);


        if (that.data.sendNum <= 3) {
          var sendNum = that.data.sendNum;
          that.setData({
            sendNum: that.data.sendNum + 1,
            sendSec: 0
          });

          console.log(type + "发送第" + sendNum + "次")
          that.sendMessage(type);
          if (sendNum >= 2) { //第2、3次间隔200ms再发送一次
            setTimeout(function () {
              that.sendMessage(type);
            }, 200);
          }
        } else {
          that.deleteSendInterval();
        }

      } else {
        that.setData({
          sendSec: that.data.sendSec + 500
        });
        console.log('SENDSEC', (that.data.sendSec));
      }
    }, 1000);
    return t;
  },
  //字符串转ArrayBuffer
  string2buffer: function (str) {
    // 首先将字符串转为16进制
    let val = ""
    for (let i = 0; i < str.length; i++) {
      if (val === '') {
        val = str.charCodeAt(i).toString(16)
      } else {
        val += ',' + str.charCodeAt(i).toString(16)
      }
    }
    // 将16进制转化为ArrayBuffer
    return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    })).buffer
  },
  onLoad: function onLoad(options) {
    // this.setData({
    //   vin: options.vin,
    //   kzq_code: options.kzq_code ? options.kzq_code : '',
    //   source: options.source ? options.source : '0',
    //   is_replace: options.is_replace ? options.is_replace : '0',
    //   is_force: options.is_force ? options.is_force : '0'
    // });
    console.log(options);
    this.getSystemInfo();
    this.openBluetooth();
  },
  onShow: function onShow() {
    var that = this;
    var userdata = wx.getStorageSync('userdata');
    if (userdata) {
      console.log('userdata', userdata);
      if (userdata.roles) {
        var roles = userdata.roles;
        this.setData({
          roleUnlock: (roles.unlock == '1'),
          roleLock: (roles.lock == '1')
        });
      }
    }
    wx.onBluetoothAdapterStateChange(function (res) {
      console.log('\u84DD\u7259\u8BBE\u5907\u72B6\u6001\u66F4\u6539', res.available);
      that.openBluetooth();
    });
  },
  getSystemInfo: function getSystemInfo() {
    var that = this;
    wx.getSystemInfo({
      success: function success(res) {
        that.windowHeight = res.windowHeight;
      }
    });
  },
  switchChange: function () {
    var that = this;

    //if (!that.data.searchDevice) {
    that.setData({
      searchDevice: true // !that.data.searchDevice
    });
    console.log('打开蓝牙设备搜索');
    wx.getBluetoothAdapterState({
      success: function (res) {
        console.log('getBluetoothAdapterState');
        console.log(res);
      },
      fail: function (res) {
        console.log("getBluetoothAdapterState", res)
      }
    });
    wx.onBluetoothAdapterStateChange(function (res) {
      console.log('onBluetoothAdapterStateChange');
      console.log(res.available);
    });
    wx.startBluetoothDevicesDiscovery({
      success: function (res) {
        console.log('startBluetoothDevicesDiscovery');
        console.log(res);
      },
      fail: function (res) {
        console.log("startBluetoothDevicesDiscovery", res)
      }
    });
    wx.onBluetoothDeviceFound(function (devices) {
      console.log('onBluetoothDeviceFound', devices);
      var foundDevice = that.data.deviceList;

      var isnotExist = true
      if (devices.deviceId) {
        for (var i = 0; i < foundDevice.length; i++) {
          if (devices.deviceId == foundDevice[i].deviceId) {
            isnotExist = false
          }
        }
        if (isnotexist)
          foundDevice.push(devices)
      } else if (devices.devices) {
        for (var i = 0; i < foundDevice.length; i++) {
          if (devices.devices[0].deviceId == foundDevice[i].deviceId) {
            isnotExist = false
          }
        }
        if (isnotExist)
          foundDevice.push(devices.devices[0])
      } else if (devices[0]) {
        for (var i = 0; i < foundDevice.length; i++) {
          if (devices[0].deviceId == foundDevice[i].deviceId) {
            isnotExist = false
          }
        }
        if (isnotExist)
          foundDevice.push(devices[0])
      }

      that.setData({
        deviceList: foundDevice
      });
    });
    wx.getBluetoothDevices({
      success: function (res) {
        console.log('getBluetoothDevices', res);
        // var deviceList = that.data.deviceList;
        // deviceList=res.devices;
        // console.log(deviceList);
        that.setData({
          deviceList: res.devices
        });
      },
      fail: function (res) {
        console.log("getBluetoothDevices", res)
      }
    });
    // } else {
    //   that.setData({
    //     nowDevice: false,
    //     deviceList: [],
    //     currentDevice: {}
    //   });
    //   wx.stopBluetoothDevicesDiscovery({
    //     success: function success(res) {
    //       that.setData({
    //         searchDevice: !that.data.searchDevice
    //       });
    //       console.log('关闭蓝牙设备搜索');
    //     }
    //   });
    // }
  },
  openBluetooth: function () {
    var that = this;
    this.closeblue();
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log('初始化蓝牙适配器成功');
        that.setData({
          msg: '初始化蓝牙适配器成功',
          blueStatus: true
        });
        // wx.showModal({
        //   title: '蓝牙适配情况',
        //   content: '初始化蓝牙适配器成功'
        // });
        that.switchChange();


      },
      fail: function (e) {
        console.log(e);
        that.setData({
          msg: '初始化蓝牙适配器失败',
          blueStatus: false
        });
        wx.showModal({
          title: '蓝牙适配情况',
          content: '蓝牙适配失败，请检查手机蓝牙和定位功能是否打开'
        });
      },
      complete: function () {
        console.log('初始化蓝牙适配器完成');
      }
    });
  },
  chooseDevice: function (e) {
    var that = this;
    that.setData({
      currentDevice: that.data.deviceList[e.currentTarget.dataset.index],
      nowDevice: true
    });
    wx.pageScrollTo({
      scrollTop: that.data.windowHeight,
      duration: 100
    });
    that.connectTo(that.data.deviceList[e.currentTarget.dataset.index].deviceId);
  },
  confirmConnect: function (e) {
    var that = this;
    var deviceId = e.currentTarget.dataset.deviceId;
    wx.showModal({
      title: '连接当前蓝牙设备',
      success: function (res) {
        if (res.confirm) {
          that.connectTo(deviceId);
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },
  connectTo: function (deviceId) {
    var that = this;
    console.log('连接蓝牙设备搜索', deviceId);
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        that.setData({
          searchDevice: false
        });
        console.log('关闭蓝牙设备搜索');
      }
    });
    app.loadingToast.open({
      title: '蓝牙连接中...',
      mask: true
    });
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function (res) {
        console.log('蓝牙设备连接成功');
        wx.hideLoading();
        app.loadingToast.close();
        wx.getBLEDeviceServices({
          deviceId: deviceId,
          success: function success(res) {
            that.setData({
              deviceService: res.services
            });
            for (var t = 0; t < that.data.deviceService.length; t++) {
              var service = that.data.deviceService[t];
              var serviceId = service.uuid.substring(4, 8);
              if (serviceId === 'FFE0') {
                that.setData({
                  serviceId: service.uuid
                });
              }
            }
            that.setData({
              nowDevice: !that.data.nowDevice,
              nowService: !that.data.nowService
            });
            // var responses = that.data.responses;
            var responses=[];
            responses.push({
              type: 'query',
              title: '查询解锁状态：检索中',
              loading: true,
              success: false
            })
            that.setData({
              responses: responses
            });
            that.startSec('query');
            //  that.startSendTimeSec('connect');
            // that.sendMessage('connect')
            console.log('获取蓝牙设备Service' + res.errMsg);
          },
          fail: function fail(res) {
            console.log('getBLEDeviceServices', res);
            wx.showModal({
              title: '设备Service信息',
              content: '蓝牙设备连接成功' + '\n' + '设备信息获取错误' + res.errMsg
            });
          }
        });
      },
      fail: function fail(res) {
        console.log('蓝牙连接失败，请稍后重试');
        wx.hideLoading()
        app.loadingToast.close();
        app.toast({
          title: '蓝牙连接失败，请重试',
          icon: 'fail'
        });
      },
      complete: function complete() {
        console.log('蓝牙设备连接完成');
        // wx.hideLoading();
        // app.loadingToast.close();
      }
    });
  },
  sendMessage2: function (e) {
    var that = this;
    var type = "";
    if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.type) {
      type = e.currentTarget.dataset.type;
      //that.sendMessage(e.currentTarget.dataset.type);
    } else {
      type = e;
      //that.sendMessage(e);
    }
    that.setData({sendType: type})
    that.startSec(type);
    //that.startSendTimeSec(type);

  },
  sendMessage: function (e) {
    var type = '';
    var that = this;

    if (e && e.currentTarget != undefined) {
      type = e.currentTarget.dataset.type
    } else {
      type = e;
    }
    var writeValue = getWriteValue(type);
    var v1 = setXYValue1(type);
    var v2 = setXYValue2(type);
    var sendData = bt2[0] + ',' + bt2[1]
    for (var i = 0; i < writeValue.length; i++) {
      sendData += ',' + writeValue[i];
    }
    sendData += ',' + v1 + ',' + v2;
    that.setData({
      sendData: sendData,
      sendType: type
    });
    console.log(type)
    console.log(that.data.sendData);
    console.log(bt2[1])
    console.log(v1)
    console.log(v2)

    var data = that.data.sendData.split(',');
    var dataBuffer = new ArrayBuffer(data.length);
    var dataView = new DataView(dataBuffer);
    for (var j = 0; j < data.length; j++) {
      if (data[j] == '51') {
        dataView.setUint8(j, '0x33');
      } else if (data[j] == '204') {
        dataView.setUint8(j, '0xcc');
      } else if (data[j] == '60') {
        dataView.setUint8(j, '0x3c');
      } else if (data[j] == '195') {
        dataView.setUint8(j, '0xc3');
      } else {
        dataView.setUint8(j, '0x' + data[j]);
      }
    }
    that.setData({
      deviceId: that.data.currentDevice.deviceId
    });
    //if (e != 'connect' && e != 'lock' && e != 'unlock') {

    // }


    wx.getBLEDeviceCharacteristics({
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      success: function success(res) {
        console.log(res.characteristics);
        that.setData({
          deviceCharacteristics: res.characteristics
        });
        for (var i = 0; i < that.data.deviceCharacteristics.length; i++) {
          that.setData({
            characteristic: that.data.deviceCharacteristics[i]
          });
          that.setData({
            characteristicProperties: that.data.characteristic.properties
          });
          if (that.data.characteristicProperties.notify === true) {
            that.setData({
              characteristicId: that.data.characteristic.uuid
            });
            wx.notifyBLECharacteristicValueChange({
              state: true, // 启用 notify 功能
              deviceId: that.data.deviceId,
              serviceId: that.data.serviceId,
              characteristicId: that.data.characteristicId,
              success: function success(res) {
                console.log('开启notify成功' + that.data.characteristic.uuid);
                for (var _i = 0; _i < dataView.byteLength; _i++) {
                  var writeData = '0x' + dataView.getUint8(_i).toString(16);
                  that.setData({
                    writeDatas: that.data.writeDatas + '\n' + writeData
                  });
                }
                wx.writeBLECharacteristicValue({
                  deviceId: that.data.deviceId,
                  serviceId: that.data.serviceId,
                  characteristicId: that.data.characteristicId,
                  value: dataBuffer,
                  success: function success(res) {
                    console.log('发送的数据：' + that.data.writeDatas);
                    console.log('message发送成功');
                    // wx.showModal({
                    //   title: '数据发送成功',
                    //   content: that.data.writeDatas
                    // });
                    wx.readBLECharacteristicValue({
                      deviceId: that.data.deviceId,
                      serviceId: that.data.serviceId,
                      characteristicId: that.data.characteristicId,
                      success: function success(res) {
                        console.log('读取数据成功', res);
                      }
                    });
                    that.receiveMessage();
                  },
                  fail: function fail(res) {
                    // fail
                    console.log('message发送失败' + that.data.characteristicIdw);
                    that.setData({
                      errorNum: that.data.errorNum + 1
                    })
                    // wx.showToast({
                    //   title: '数据发送失败，请稍后重试',
                    //   icon: 'none'
                    // });
                  },
                  complete: function complete(res) {
                    // fail
                    console.log('message发送完成', res);
                  }
                });
              },
              fail: function fail() {
                console.log('开启notify失败' + that.data.characteristicId);
              }
            });
            // that.writeMessage(that.deviceId, that.serviceId, that.characteristicIdw, that.characteristicIdr, that.characteristicIdn)
          }
        }
      },
      fail: function fail() {
        console.log('获取characteristic失败');
        that.hideModal();
        that.deleteInterval();
        that.disconnect();
        app.toast({
          title: '获取蓝牙信息失败，请断开重新连接蓝牙',
          icon: 'fail'
        });

      }
    });
    that.setData({
      writeDatas: []
    });
  },
  receiveMessage: function receiveMessage() {
    var that = this;
    that.setData({
      deviceId: this.data.currentDevice.deviceId
    });
    that.setData({
      serviceId: that.data.serviceId
    });
    wx.getBLEDeviceCharacteristics({
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      success: function success(res) {
        console.log(res.characteristics);
        that.setData({
          deviceCharacteristics: res.characteristics
        });
        for (var i = 0; i < that.data.deviceCharacteristics.length; i++) {
          that.setData({
            characteristic: that.data.deviceCharacteristics[i]
          });
          that.setData({
            characteristicProperties: that.data.characteristic.properties
          });
          if (that.data.characteristicProperties.notify === true) {
            that.setData({
              characteristicId: that.data.characteristic.uuid
            });
            wx.notifyBLECharacteristicValueChange({
              state: true, // 启用 notify 功能
              deviceId: that.data.deviceId,
              serviceId: that.data.serviceId,
              characteristicId: that.data.characteristicId,
              success: function success(res) {
                console.log('开启notify成功' + that.data.characteristic.uuid);
                console.log(that.data.characteristicProperties.write);
                console.log(that.data.characteristicProperties.read);
                wx.readBLECharacteristicValue({
                  deviceId: that.data.deviceId,
                  serviceId: that.data.serviceId,
                  characteristicId: that.data.characteristicId,
                  success: function success(res) {
                    console.log('接收数据成功', res);
                  }
                });
                wx.onBLECharacteristicValueChange(function (res) {
                  console.log('接收数据:', that.ab2hex(res.value));
                  var recMessage = that.ab2hex(res.value);

                  var sendType = that.data.sendType;
                  var responses = that.data.responses;
                  if (sendType == 'connect' && recMessage == "5aa5") //接收响应成功
                  {
                    that.setData({
                      errorNum: 0
                    });
                    responses.splice(responses.length - 1, 1);
                    console.log('连接校验成功');
                    responses.push({
                      type: 'connect',
                      title: '连接校验：成功',
                      success: true
                    })
                    responses.push({
                      type: 'query',
                      title: '查询解锁状态：检索中',
                      success: true,
                      loading: true
                    })
                    that.setData({
                      step: 1,
                      responses: responses
                    });
                    app.loadingToast.close();
                    that.deleteInterval();
                    that.hideModal();
                    //that.sendMessage('query');
                    that.startSec('query');
                    //that.startSendTimeSec('query');
                  }
                  if (sendType == 'query') {
                    that.setData({
                      errorNum: 0
                    });
                    if (recMessage == "9669") //查询解锁结果-未解锁
                    {
                      that.deleteInterval();

                      that.hideModal();
                    //  responses.splice(responses.length - 1, 1);
                    responses=[];
                      responses.push({
                        type: sendType,
                        title: '查询结果：未解锁',
                        loading: false,
                        success: true
                      })
                      console.log('查询解锁状态-未解锁');
                      that.setData({
                        step: 2,
                        devLock: true,
                        responses: responses
                      });
                      //that.sendMessage('unlock');
                    }
                    if (recMessage == "6996") //查询解锁结果-已解锁
                    {
                      console.log('查询解锁状态-已解锁');
                      // responses.splice(responses.length - 1, 1);
                      responses=[];
                      responses.push({
                        type: sendType,
                        title: '查询结果：解锁成功',
                        success: true
                      })
                      that.deleteInterval();
                      that.hideModal();
                      //
                      if ((that.data.kzq_code != '' && that.data.kzq_code != null) && that.data.step == 1 && (that.data.source == '4' || that.data.source == '1')) {
                        var url = '/v1/ble/unlockLog?access_token=' + app.globalData.access_token;
                        var data = {
                          vin: that.data.vin,
                          status: 1,
                          source: that.data.is_replace == '1' ? 5 : (that.data.source=='4'?6:7),
                          is_replace:that.data.is_replace,
                          kzq_code: that.data.kzq_code
                        };
                        app.requestPost(url, data, function (res) {
                          app.toast({
                            title: '已解锁更新成功',
                            icon: 'success',
                            duration: 5000
                          });
                        });
                      } else if ((that.data.kzq_code == '' || that.data.kzq_code == null) && that.data.step == 1) {
                        var url = '/v1/ble/unlockLog?access_token=' + app.globalData.access_token;
                        var data = {
                          vin: that.data.vin,
                          status: 1,
                          source: 3
                        };

                        app.requestPost(url, data, function (res) {
                          //that.data.audioCtx.play();
                          app.confirm({
                            title: '解锁提示',
                            content: '控制器已解锁,是否更新车辆信息？',
                            cancelText: '否',
                            confirmText: '是',
                            callback: function (dd) {
                              if (dd.confirm) {
                                wx.navigateTo({
                                  url: '/pages/scankzq/index?vin=' + that.data.vin + '&source=3&status=3',
                                })
                              }
                            }
                          })
                        });
                      }
                      that.setData({
                        step: 3,
                        devLock: false,
                        responses: responses
                      });
                      // that.submitVin(1);
                    }
                  }
                  if (sendType == 'confirm') {
                    that.setData({
                      errorNum: 0
                    });
                    if (recMessage == "9669") //解锁结果-未解锁
                    {
                      that.deleteInterval();
                      that.hideModal();
                      // responses.splice(responses.length - 1, 1);
                      responses=[];
                      responses.push({
                        type: sendType,
                        title: '解锁结果：未解锁',
                        loading: false,
                        success: true
                      })
                      console.log('查询解锁状态-未解锁');
                      that.setData({
                        step: 4,
                        devLock: true,
                        responses: responses
                      });
                      that.submitVin(1);

                    }
                    if (recMessage == "6996" && that.data.isLock != false) //解锁结果-已解锁
                    {
                      console.log('查询解锁状态-已解锁');
                      //responses.splice(responses.length - 1, 1);
                      responses=[];
                      responses.push({
                        type: sendType,
                        title: '解锁结果：已解锁',
                        success: true
                      })
                      that.setData({
                        step: 4,
                        devLock: false,
                        isLock: false,
                        responses: responses
                      });
                      that.deleteInterval();
                      that.hideModal();
                      that.submitVin(1);
                    }
                  }
                  if (sendType == 'unlock' && recMessage == "5aa5" && that.data.isLock != false) //接收响应成功
                  {
                    that.setData({
                      errorNum: 0
                    });
                    console.log('解锁成功');
                    // responses.splice(responses.length - 1, 1);
                    responses=[];
                    responses.push({
                      type: 'unlock',
                      title: '解锁结果：解锁成功',
                      success: true
                    })
                    that.setData({
                      step: 3,
                      devLock: false,
                      isLock: false,
                      responses: responses
                    });
                    that.data.audioCtx.play();

                    that.deleteInterval();
                    that.hideModal();
                    that.submitVin(1);
                    // responses.splice(responses.length - 1, 1);
                    // responses.push({
                    //   type: 'confirm',
                    //   title: '确认解锁状态：确认中',
                    //   success: true,
                    //   loading: true
                    // })
                    // that.setData({
                    //   step: 4,
                    //   responses: responses
                    // });
                    // that.deleteInterval();
                    // that.hideModal();

                    // that.sendMessage('confirm');
                    // that.startSec('confirm');
                    // that.startSendTimeSec('confirm');
                  }
                  if (sendType == 'lock' && recMessage == "5aa5" && that.data.isLock != true) //接收响应成功
                  {
                    that.setData({
                      errorNum: 0
                    });
                    console.log('上锁成功');
                  //  responses.splice(responses.length - 1, 1);
                  responses=[];
                    responses.push({
                      type: 'lock',
                      title: '上锁结果：上锁成功',
                      success: true
                    })
                    that.setData({
                      step: 3,
                      devLock: true,
                      isLock: true,
                      responses: responses
                    });
                    that.deleteInterval();
                    that.hideModal();
                    that.submitVin(2);

                  }

                  var re = that.data.reMessage;
                  re.push(recMessage);
                  that.setData({
                    reMessage: re
                  });
                });
              },
              fail: function fail() {
                console.log('开启notify失败' + that.data.characteristicId);
                console.log(that.data.characteristicProperties.write);
                console.log(that.data.characteristicProperties.read);
              },
              complete: function complete() {
                console.log('开启完成');
              }
            });
          }
        }
      },
      fail: function fail() {
        console.log('获取characteristic失败');
      }
    });
  },
  deleteInterval: function () {
    clearTimeout(this.data.secInterval);
    this.setData({
      secInterval: null,
      sec: 20,
      sendNum: 1
    })
    //this.deleteSendInterval();

  },

  deleteSendInterval: function () {
    clearInterval(this.data.sendInterval);
    this.setData({
      sendInterval: null,
      sendSec: 0,
      sendNum: 1
    });
    console.log("关闭计时器")
  },
  bindMessageInput: function bindMessageInput(e) {
    var that = this;
    that.setData({
      inputValue: e.detail.value
    });
  },
  mathodDisConnect:function(){
    this.disconnect();
    app.alert({
      title: '请关闭车钥匙10S后重新上电，点击JP001',
    });
  },
  disconnect: function disconnect() {
    var that = this;
    that.setData({
      deviceId: this.data.currentDevice.deviceId,
      step: 0,
      responses: [],
      devLock: true,
      isLock: null
    });

    wx.closeBLEConnection({
      deviceId: that.data.deviceId,
      success: function success(res) {
        app.loadingToast.close();
        app.toast({
          title: '设备已断开',
          icon: 'success'
        });
        that.setData({
          nowDevice: false,
          currentDevice: {},
          nowService: false,
          deviceService: {},
          reMessage: []
        })
      },
      fail: function (res) {
        app.loadingToast.close();
        console.log("设备断开错误", res);
        app.toast({
          title: '设备断开失败'
        })
        that.setData({
          nowDevice: false,
          currentDevice: {},
          nowService: false,
          deviceService: {},
          reMessage: []
        })
      }
    });
  },
  closeblue: function () {
    var that = this;
    wx.closeBluetoothAdapter({
      success: function (res) {
        console.log(res);
        that.setData({
          msg: '关闭蓝牙适配器',
          blueStatus: false
        });
      }
    })

  },
  ab2hex: function ab2hex(buffer) {
    var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
      return ('00' + bit.toString(16)).slice(-2);
    });
    return hexArr.join('');
  },
  submitVin: function (status) {
    var url = '/v1/ble/unlockLog?access_token=' + app.globalData.access_token;
    var data = {
      vin: this.data.vin,
      status: status,
      source: this.data.source,
      kzq_code: this.data.kzq_code,
      is_replace:this.data.is_replace
    };
    var that = this;
    app.requestPost(url, data, function (res) {
      console.log(res);
      app.alert({
        content: (status == 1 ? '解' : (status == 2 ? '上' : "强制解")) + '锁成功',
        title: '解锁提示'
      })
      // if(status==1){
      //   that.data.audioCtx.play()
      // }
      // wx.showToast({
      //   title: (status == 1 ? '解' : (status == 2 ? '上' : "强制解")) + '锁成功',
      //   icon: 'success',
      //   duration: 2000,
      //   mask: true
      // })


    });
  },
  hideModal: function () {
    this.setData({
      showMsg: false
    })
  },
  showModal: function () {
    this.setData({
      showMsg: true
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.openBluetooth();
  },
  onUnload: function () {
    this.deleteInterval();
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.setData({
      audioCtx: wx.createAudioContext('myAudio')
    });
  },
  funerror: function (e) {
    console.log(e);
  },
  hexCharCodeToStr: function (hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16);
      resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
  },
  goDevice: function () {
    wx.navigateTo({
      url: '../helpdevice/index',
    })
  }

})