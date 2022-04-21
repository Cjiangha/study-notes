const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 获取当前日期以-拼接 如2019-09-04
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}




const BASE_URL = 'https://cszhdy.cnvp.com.cn';
//const BASE_URL = 'http://192.168.0.33:8030/';
// const BASE_URL = 'http://192.168.0.254:8030/';

function getReq(url, data, cb) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  wx.request({
    url: BASE_URL + url,
    data: data,
    method: 'get',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function uploadMore(fileArr, start, length, target, trueImgArr, baseUrl, otherOptions, cb, back = 0) {
  console.log(fileArr);
  wx.uploadFile({
    url: `${baseUrl}`, //仅为示例，非真实的接口地址
    filePath: fileArr[start].src,
    name: 'files',
    formData: otherOptions,
    success: function (res) {
      console.log(res);
      var data = JSON.parse(res.data);
      if (res) {
        trueImgArr.push(data.data);
        target.setData({
          start: start,
          trueImgArr: trueImgArr
        });
        if (data.type == 0) {
          return typeof cb == "function" && cb(data)
        } else {
          wx.hideLoading();
          wx.showModal({
            title: data.msg,
            icon: "none",
            duration: 3000,
            success(res) {
              if (back > 0) {
                wx.navigateBack({
                  delta: back
                })
              }
            }
          })
        }
      }
      //do something
    }
  })
}

function uploadMore2(fileArr, start, length, target, trueImgArr, baseUrl, otherOptions, cb) {
  let isUpload = start + 1;
  wx.showLoading({
    title: `上传中${isUpload}/${length}`,
  });
  console.log(fileArr[start].src);
  wx.uploadFile({
    url: `${baseUrl}`, //仅为示例，非真实的接口地址
    filePath: fileArr[start].src,
    name: 'files',
    formData: otherOptions,
    success: function (res) {
      console.log(res)
      var data = JSON.parse(res.data);
      console.log(data);
      if (res) {
        start++;
        trueImgArr.push(data.data);
        target.setData({
          start: start,
          trueImgArr: trueImgArr
        });
        if (start < length) {
          uploadMore2(fileArr, start, length, target, trueImgArr, baseUrl, otherOptions, cb);
        } else {
          wx.hideLoading();
          if (data.type == 0) {
            return typeof cb == "function" && cb(data)
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
        }
      }
      //do something
    },
    fail: function (res) {
      console.log('fail' + JSON.stringify(res));

      wx.showToast({
        title: JSON.stringify(res),
        icon: 'none'
      });
    },
    complete: function (res) {
      console.log('complete' + JSON.stringify(res));
      wx.showToast({
        title: JSON.stringify(res),
        icon: 'none'
      });
    },
  })
}


var phoneReg = /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; // 电话正则
//https://blog.csdn.net/loa_loa/article/details/81737086
var passReg15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/; // 第一代身份证15位正则
var passReg18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; // 第二代身份证18位正则
module.exports = {
  formatTime: formatTime,
  getNowFormatDate: getNowFormatDate,
  getReq: getReq,
  uploadMore: uploadMore,
  uploadMore2: uploadMore2,

  passReg15: passReg15,
  passReg18: passReg18,
  phoneReg: phoneReg,
}