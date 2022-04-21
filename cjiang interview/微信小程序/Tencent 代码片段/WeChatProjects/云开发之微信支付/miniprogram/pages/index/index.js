//index.js
const app = getApp()

Page({
  data: {
    trade_no: 'No20191123180700', // 支付订单号
    fee:0.01 // 支付金额
  },

  onLoad: function () {
    var t = this,
      refund_no = 'refund' + t.data.trade_no
    t.setData({
      body: '测试商品支付',
      attach: '一些附加数据',
      refund_no: refund_no,
      total_fee: t.data.fee,
      refund_fee: t.data.fee
    })
  },
  getTradeNo(e) {
    var t = this,
      trade_no = e.detail.value.trim(),
      refund_no = 'refund' + trade_no
    t.setData({
      trade_no: trade_no,
      refund_no: refund_no
    })
  },
  pay() {
    // 支付订单
    var t = this
    t.setData({
      type: 'unify'
    })
    this.wxPayment()
  },
  payCheck() {
    // 支付订单查询
    var t = this
    t.setData({
      type: 'payCheck'
    })
    this.wxPayment()
  },
  refund() {
    // 订单退款
    var t = this
    t.setData({
      type: 'refund'
    })
    this.wxPayment()
  },
  refundCheck() {
    // 订单退款查询
    var t = this
    t.setData({
      type: 'refundCheck'
    })
    this.wxPayment()
  },
  cancelPay() {
    // 取消支付，刚生产的支付订单，5分钟后才能取消支付
    var t = this
    t.setData({
      type: 'cancelPay'
    })
    this.wxPayment()
  },
  wxPayment() {
    var t = this,
      type = t.data.type,
      trade_no = t.data.trade_no,
      refund_no = t.data.refund_no
    wx.cloud.callFunction({
      name: 'wxPayment',
      data: {
        type: type,
        trade_no: trade_no,
        refund_no: refund_no,
        body: t.data.body,
        attach: t.data.attach,
        total_fee: t.data.fee,
        refund_fee: t.data.fee,
        ip: '171.107.61.167'// 用户的客户端IP
      },
      success(res) {
        if (type == 'unify') {
          console.log(res)
          res = res.result
          if (res.return_code && res.return_code == "SUCCESS") {
            if (res.result_code && res.result_code == "SUCCESS") {
              console.log(res)
              wx.requestPayment({
                timeStamp: res.timeStamp,
                nonceStr: res.nonceStr,
                package: res.package,
                signType: res.signType,
                paySign: res.paySign,
                success(res) {
                  console.log(res)
                  wx.showToast({
                    title: '支付成功',
                    icon: 'none'
                  })
                },
                fail(res) {
                  wx.showToast({
                    title: '支付失败',
                    icon: 'none'
                  })
                  console.log(res)
                }
              })
            } else {
              wx.showToast({
                title: '该订单已经支付成功，无法重新支付',
                icon: 'none'
              })
              console.log('出错啦(' + res.err_code_des + ')')
            }
          } else {
            wx.showToast({
              title: '请求失败，请重试',
              icon: 'none'
            })
            console.log('请求失败，请重试', res)
          }

        } else if (type == 'payCheck') {
          console.log(res)
          res = res.result
          if (res.return_code && res.return_code == "SUCCESS") {
            if (res.result_code && res.result_code == "SUCCESS") {
              wx.showToast({
                title: res.trade_state == 'SUCCESS' ? '订单已成功支付了' : res.trade_state_desc,
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.err_code_des,
                icon: 'none'
              })
              console.log('出错啦(' + res.err_code_des + ')')
            }
          } else {
            wx.showToast({
              title: '请求失败，请重试',
              icon: 'none'
            })
            console.log('请求失败，请重试', res)
          }
        } else if (type == 'refund') {
          console.log(res)
          res = res.result
          if (res.return_code && res.return_code == "SUCCESS") {
            if (res.result_code && res.result_code == "SUCCESS") {
              wx.showToast({
                title: '订单退款成功',
                icon: 'none'
              })
            } else {
              var msg = res.err_code == 'ORDERNOTEXIST' ? '退款订单不存在' : res.err_code_des
              wx.showToast({
                title: msg,
                icon: 'none'
              })
              console.log('出错啦(' + msg + ')')
            }
          } else {
            wx.showToast({
              title: '请求失败，请重试',
              icon: 'none'
            })
            console.log('请求失败，请重试', res)
          }
        } else if (type == 'refundCheck') {
          console.log(res)
          res = res.result
          if (res.return_code && res.return_code == "SUCCESS") {
            if (res.result_code && res.result_code == "SUCCESS") {
              wx.showToast({
                title: '订单已成功退款了',
                icon: 'none'
              })
            } else {
              var msg = res.err_code == 'REFUNDNOTEXIST' ? '退款信息不存在' : res.err_code_des
              wx.showToast({
                title: msg,
                icon: 'none'
              })
              console.log('出错啦(' + msg + ')')
            }
          } else {
            wx.showToast({
              title: '请求失败，请重试',
              icon: 'none'
            })
            console.log('请求失败，请重试', res)
          }
        } else if (type == 'cancelPay') {
          console.log(res)
          res = res.result
          if (res.return_code && res.return_code == "SUCCESS") {
            if (res.result_code && res.result_code == "SUCCESS") {
              wx.showToast({
                title: '成功取消支付',
                icon: 'none'
              })
            } else {
              var msg = res.err_code == 'ORDERPAID' ? '订单已支付无法取消' : res.err_code_des
              wx.showToast({
                title: msg,
                icon: 'none'
              })
              console.log('出错啦(' + msg + ')')
            }
          } else {
            wx.showToast({
              title: '请求失败，请重试',
              icon: 'none'
            })
            console.log('请求失败，请重试', res)
          }
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  
})
