//微信网络请求封装
const logger = require("./log")
const conf = require("../appConfig")
const mock = require('../conf/mock')
const api = require('../conf/api')
const cache = require('./cache')
const util = require('../utils/util')
const crypt = require('../utils/ibcrypt-vue')
const auth = require('./auth')
const log = require('../service/log')
const isLoading = true
const {
  communityBoard
} = require("../conf/api")

let requestQue = []
let isRefreshing = false

const PRE_KEY = 'CKubi3EHl'

const HTTPHEADERFORM = {
  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
const HTTPHEADERJSON = {
  'content-type': 'application/json;charset=UTF-8'
}

function errorToast(msg) {
  wx.showToast({
    title: msg || "系统繁忙，请稍后再试",
    icon: "none"
  })
}

function wrapHeader(mime, url, salt) {
  let httpHeader = {}
  if (mime == 'FORM') {
    httpHeader = Object.assign(HTTPHEADERFORM, {
      'Authorization': cache.token(),
      'client_id': 'blmp-wxmp',
      'salt': salt,
      'saltter': getRandom(7),
      'accountInfo': cache.openid()
    })
  } else {
    httpHeader = Object.assign(HTTPHEADERJSON, {
      'Authorization': cache.token(),
      'client_id': 'blmp-wxmp',
      'salt': salt,
      'saltter': getRandom(7),
      'accountInfo': cache.openid()
    })
  }
  // 获取新闻和公告详情需要添加头信息
  if (url === '/news/v1/newsInfo/info') {
    httpHeader = Object.assign(httpHeader, {
      'clientType': 'XCX'
    })
  }
  logger.log('请求头：' + JSON.stringify(httpHeader), logger.LOGGER_INFO)
  return httpHeader
}

function getRandom(digit) {
  var random = ""
  for (var i = 0; i < digit; i++) {
    random += Math.floor(Math.random() * 10)
  }
  return random
}

function respDecode(resp) {
  if (resp.data.data != null) {
    let data = resp.data.data.substring(5)
    let key = PRE_KEY + resp.header.salt
    return crypt.decode(key, data)
  } else {
    wx.showToast({
      title: '服务异常',
      icon: 'error'
    })
  }
}

function reqEncode(req, salt) {
  if (req != null) {
    // let data = resp.data.substring(5)
    let key = PRE_KEY + salt
    return crypt.encode(key, req)
  } else {
    wx.showToast({
      title: '服务异常',
      icon: 'error'
    })
  }
}

function wxRequest(options) {
  log.info('当前请求地址：' + options.url)
  if (!options.hideLoading) {
    wx.showLoading({
      title: '加载中',
    })
  }
  return new Promise((resolve, reject) => {
    let salt = getRandom(7)
    options = Object.assign(options, {
      header: wrapHeader(options.type, options.url, salt),
      url: conf.rootUrl + options.url,
      purl: options.url,
      data: options.data || {}, // 加密 reqDecode(options.data, salt)
      method: options.method || 'GET',
      dataType: 'json',
      success(resp) {
        if (!options.hideLoading) {
          wx.hideLoading()
        }
        if (resp.statusCode === 200) {
          let result = resp.data
          if (result.en == 0) { // 密文处理
            result = respDecode(resp)
            resolve(JSON.parse(result))
          } else { // 明文直接返回
            resolve(JSON.parse(JSON.stringify(result)))
          }
          log.info('当前请求地址 ' + options.url + ' 请求成功')
        } else if (resp.statusCode === 401) {
          log.info('当前请求地址 ' + options.url + ' 401')
          new Promise(() => {
            requestQue.push(token => {
              options.url = options.purl
              if (!options.data) {
                options.data = {}
              }
              options.header.Authorization = 'bearer ' + token
              resolve(wxRequest(options))
            })
          })
          if (!isRefreshing) {
            isRefreshing = true
            getNewToken().then(token => {
              requestQue.forEach((cb) => cb(token))
              requestQue = []
            })
          }
        } else if (resp.statusCode === 503) {
          // errorToast('服务不可用')
          log.error('当前请求地址 ' + options.url + ' 响应报错：503')
          reject()
        } else if (resp.statusCode === 500) {
          // errorToast('服务不可用')
          log.error('当前请求地址 ' + options.url + ' 响应报错：500')
          reject()
        } else {
          // if (options.preError) {
          //   reject(JSON.parse(JSON.stringify(resp.data)))
          // } else {
          //   if(resp.data.code != 0){
          //     errorToast(resp.data.msg);
          //   }else{
          //     errorToast('请求服务失败')
          //   }

          // }
        }
      },
      fail(error) {
        log.error('当前请求地址 ' + options.url + ' 请求超时')
        log.error('当前请求超时token： ' + cache.token())
        log.error('当前请求超时原因：' + error ? JSON.stringify(error) : '')
        errorToast()
        reject(error)
      },
      complete() {

      }
    })
    logger.log('请求参数：' + JSON.stringify(options.data), logger.LOGGER_INFO)
    wx.request(options)
  })
}


//获取新token
const getNewToken = () => {
  return new Promise((resolve, reject) => {
    if (cache.openid()) {
      wx.request({
        url: conf.rootUrl + api.login + cache.openid() + '&grant_type=mobile',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': conf.initToken,
          'client_id': 'blmp-wxmp'
        },
        method: 'post',
        success: function (resp) {
          if (resp.statusCode === 200) {
            let result = JSON.stringify(resp.data)
            if (result.indexOf('000A0') != -1) {
              result = respDecode(resp)
            }
            logger.log('返回数据：' + result, logger.LOGGER_INFO)
            result = JSON.parse(result)
            wrapUserAndToken(result)
            resolve()
          }
          resolve()
        },
      })
    } else { // 未注册或缓存已清理
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: conf.rootUrl + api.tempToken,
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': conf.initToken,
                'client_id': 'blmp-wxmp'
              },
              success: function (resp) {
                if (resp.statusCode === 200) {
                  let token = resp.data
                  cache.token(token.token_type + ' ' + token.access_token)
                  wx.request({
                    url: conf.rootUrl + api.login + res.code + '&grant_type=mobile',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                      'Authorization': cache.token(),
                      'client_id': 'blmp-wxmp'
                    },
                    method: 'post',
                    success: function (resp) { // 说明是已注册，只是缓存被清理
                      if (resp.statusCode === 200) {
                        wrapUserAndToken(resp.data)
                      }
                      resolve()
                    },fail: function () { // 未注册
                      resolve()
                    }
                  })
                }
              }
            })
          } else {
            // 微信获取code出错
            wx.showToast({
              title: '获取信息出错',
              icon: 'none'
            })
            reject()
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '服务异常',
            icon: 'none'
          })
        }
      })
    }
  })
}

function wrapUserAndToken(dataObj) {
  const userKeys = ['real_name', 'avatar', 'user_id', 'phone', 'nick_name', 'username', 'refresh_token', 'expires_in']
  const tokenKeys = ['token_type', 'access_token']
  const user = util.getTargetObject(dataObj, userKeys)
  const token = util.getTargetObject(dataObj, tokenKeys)
  cache.user(user)
  cache.token(token[tokenKeys[0]] + ' ' + token[tokenKeys[1]])
}

module.exports = {
  wxRequest: wxRequest
}