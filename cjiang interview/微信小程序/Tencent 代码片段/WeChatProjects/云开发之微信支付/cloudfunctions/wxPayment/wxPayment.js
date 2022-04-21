var wxpay = function() {
  const fs = require("fs");
  const https = require('https')
  const crypto = require('crypto');
  let { config, httpsOpts } = require("config");
  let responseData = { }
  return {
    assign: function(...args){
      var ret = args[0] ? args[0] : {}
      for (var i in args) {
        if(i == 0) continue
        var tmp = args[i] ? args[i] : {}
        for (var k in tmp) {
          ret[k] = tmp[k]
        }
      }
      return ret
    },
    payment: function(cfg){
      config = this.assign(cfg||{}, config)
      config.timestamp = this.createTimeStamp()
      config.trade_type = config.trade_type || 'JSAPI'
      config.package = config.package || 'Sign=WXPay'
      config.openid = config.openid || ''

      return this
    },
    //把金额转为分
    getCentMoney: function (money) {
      return parseFloat(money) * 100;
    },

    // 随机字符串产生函数  
    createNonceStr: function () {
      return Math.random().toString(36).substr(2, 15);
    },

    // 时间戳产生函数  
    createTimeStamp: function () {
      return parseInt(new Date().getTime() / 1000) + '';
    },
    message(err_msg = '未知错误', err_code = 'UNKNOW') {
      return {
        return_code: 'SUCCESS',
        return_msg: 'OK',
        result_code: 'FAIL',
        err_code: 'CUSTOM:' + err_code,
        err_code_des: err_msg
      }
    },
    xml2json: (xmlData) => {
      var xml2js = require('xml2js');
      return new Promise((rs, rj) => {
        new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false })
          .parseString(xmlData, function (err, json) {
            rs(err ? {} : json)
          });
      })
    },
    raw: function (args, toLowerCase) {
      var keys = Object.keys(args);
      keys = keys.sort()
      var tlc = toLowerCase == !0 ? !0 : !1
      var newArgs = {};
      keys.forEach(function (key) {
        newArgs[tlc ? key.toLowerCase() : key] = args[key];
      });
      var string = '';
      for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
      }
      string = string.substr(1);
      return string;
    },
    //签名加密算法
    paySignJsApi: function ({ appid, attach, openid, body, mch_id, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type }) {
      var t = this,
        o = { appid, attach, openid, body, mch_id, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type },
        d = this.assign(o, config)
      var ret = {
        appid: appid || d.appid,
        attach: attach || d.attach || '0',
        body: body,
        mch_id: mch_id || d.mch_id,
        nonce_str: this.createNonceStr(),
        notify_url: notify_url || d.notify_url,
        openid: openid || d.openid,
        out_trade_no: out_trade_no,
        spbill_create_ip: spbill_create_ip || d.spbill_create_ip,
        total_fee: this.getCentMoney(total_fee),
        trade_type: trade_type || d.trade_type
      };

      var string = this.raw(ret, !0) + '&key=' + d.mch_key
      console.log('paySignJsApi string:', string)
      ret.sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()
      return ret
    },
    //签名加密算法,第二次的签名
    paySignJsApiFinal: function ({ appid, prepay_id, timestamp, sign_type, package }) {
      var t = this,
        o = { appid, prepay_id, timestamp, sign_type, package },
        d = this.assign(o, config)

      console.log('paySignJsApiFinal responseData:', responseData)
      if (!d.prepay_id && !responseData.prepay_id) {
        return responseData
      }
      var ret = {
        appId: appid || d.appid,
        nonceStr: this.createNonceStr(),
        package: package || ("prepay_id=" + (prepay_id || responseData.prepay_id)),
        signType: sign_type || 'MD5',
        timeStamp: (timestamp || d.timestamp)+''
      }
      var string = this.raw(ret) + '&key=' + d.mch_key
      console.log('paySignJsApiFinal string:', string)
      ret.paySign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()
      ret.return_code = 'SUCCESS'
      ret.result_code = 'SUCCESS'
      console.log('paySignJsApiFinal ret:', ret)
      return ret
    },
    unify: function (o) {
      var t = this
      
      if (!config.openid && !o.openid) {
        return Promise.resolve(this.message('openid 为空', 'OPENID_EMPTY'))
      }
      
      o = this.paySignJsApi(o)
      formData = this.xmlData(o)

      console.log('formData:', formData);

      return this.postData('pay/unifiedorder', formData)
    },
    sdkConfig: function (prepay_id) {
      var t = this
      return new Promise((rs, rj) => {
        rs(t.paySignJsApiFinal({ prepay_id }))
      })
    },
    xmlData(o) {
      var formData = "<xml>";
      for (var i in o) {
        var tmp = o[i] || config[i] || ''
        if (typeof tmp == 'object') {
          try {
            var json = JSON.stringify(tmp)
            if(/^(\[|\{)(.*)?(\}|\])$/.test(json)){
              tmp = '<![CDATA['+json+']]>'
            }
          } catch (e) {
            console.log('xmlData error:', e)
          }
        }
        formData += "<" + i + ">" + (o[i] || config[i] || '') + "</" + i + ">"
      }
      formData += "</xml>";

      return formData
    },
    initRequestOption(o={
      hostname: 'api.mch.weixin.qq.com',
      port: 443,
      method: 'POST',
      path:''
    }) {
      console.log('payCheck o:', o)
      console.log('payCheck httpsOpts:', httpsOpts)
      o = this.assign(o, httpsOpts)
      console.log('payCheck new o:', o)

      if (config.key_file) o.key = fs.readFileSync(config.key_file).toString()
      if (config.cert_file) o.cert = fs.readFileSync(config.cert_file).toString()

      return o
    },
    payCheck({ transaction_id, out_trade_no }) {
      var t = this,
        o = { transaction_id, out_trade_no },
        d = this.assign(o, config)

      if (!d.transaction_id && !d.out_trade_no) {
        return Promise.resolve(this.message('查询订单号 为空', 'PAY_NO_EMPTY'))
      }
      console.log('payCheck:',d)
      var ret = {
        appid: d.appid,
        nonce_str: this.createNonceStr(),
        mch_id: d.mch_id,
        sign_type: 'MD5'
      }
      if (d.transaction_id && d.transaction_id != ''){
        ret.transaction_id = d.transaction_id
      }else{
        ret.out_trade_no = d.out_trade_no
      }

      var string = this.raw(ret) + '&key=' + d.mch_key
      console.log('payCheck string:', string)
      ret.sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()

      var formData = this.xmlData(ret)
      
      console.log('formData:', formData);
      
      return this.postData('pay/orderquery', formData)
    },
    refund({ out_refund_no, out_trade_no, transaction_id, total_fee, refund_fee, optional}) {
      var t = this,
        o = { out_refund_no, out_trade_no, transaction_id, total_fee, refund_fee },
        optional = typeof optional != 'object' ? {} : optional,
        d = this.assign(o, optional, config)

      if (!d.transaction_id && !d.out_trade_no) {
        return Promise.resolve(this.message('原支付订单号 为空', 'ORIGIN_PAY_NO_EMPTY'))
      } else if (!d.out_refund_no) {
        return Promise.resolve(this.message('退款订单号 为空', 'REFUND_NO_EMPTY'))
      } else if (!d.key_file || !d.cert_file) {
        return Promise.resolve(this.message('退款接口需要验证证书', 'REFUND_MISSING_CERTIFICATE_FILE'))
      }
      console.log('refund:', d)
      var ret = {
        appid: d.appid,
        mch_id: d.mch_id,
        nonce_str: this.createNonceStr(),
        out_refund_no: d.out_refund_no,
        refund_fee: this.getCentMoney(d.refund_fee),
        total_fee: this.getCentMoney(d.total_fee)
      }
      if (d.transaction_id && d.transaction_id != '') {
        ret.transaction_id = d.transaction_id
      } else {
        ret.out_trade_no = d.out_trade_no
      }

      var string = this.raw(ret) + '&key=' + d.mch_key
      console.log('refund string:', string)
      ret.sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()

      var formData = this.xmlData(ret)

      console.log('formData:', formData);

      return this.postData('secapi/pay/refund', formData)
    },
    refundCheck({ refund_id, out_refund_no, transaction_id, out_trade_no }) {
      var t = this,
        o = { refund_id, out_refund_no, transaction_id, out_trade_no },
        d = this.assign(o, config)

      if (!d.transaction_id && !d.out_trade_no) {
        return Promise.resolve(this.message('查询退款原单号 为空', 'REFUND_PAY_NO_EMPTY'))
      } else if (!d.refund_id && !d.out_refund_no) {
        return Promise.resolve(this.message('查询退款单号 为空', 'REFUND_NO_EMPTY'))
      }
      console.log('refundCheck:', d)
      var ret = {
        appid: d.appid,
        nonce_str: this.createNonceStr(),
        mch_id: d.mch_id
      }
      if (d.refund_id && d.refund_id != '') {
        ret.refund_id = d.refund_id
      } else if (d.out_refund_no && d.out_refund_no != '') {
        ret.out_refund_no = d.out_refund_no
      }else if (d.transaction_id && d.transaction_id != '') {
        ret.transaction_id = d.transaction_id
      } else {
        ret.out_trade_no = d.out_trade_no
      }

      var string = this.raw(ret) + '&key=' + d.mch_key
      console.log('refundCheck string:', string)
      ret.sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()

      var formData = this.xmlData(ret)

      console.log('formData:', formData);

      return this.postData('pay/refundquery', formData)
    },
    cancelPay(out_trade_no) {
      var t = this,
        o = { out_trade_no },
        d = this.assign(o, config)

      if (!d.out_trade_no) {
        return Promise.resolve(this.message('支付订单号 为空', 'PAY_NO_EMPTY'))
      }
      console.log('refund:', d)
      var ret = {
        appid: d.appid,
        mch_id: d.mch_id,
        nonce_str: this.createNonceStr(),
        out_trade_no: d.out_trade_no
      }

      var string = this.raw(ret) + '&key=' + d.mch_key
      console.log('cancelPay string:', string)
      ret.sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()

      var formData = this.xmlData(ret)

      console.log('formData:', formData);

      return this.postData('pay/closeorder', formData)
    },
    postData(uri, data){
      var t = this
      uri = /^\//.test(uri) ? uri : '/' + uri
      return new Promise((rs, rj) => {
        var body = '';
        const req = https.request(t.initRequestOption({ path: uri }), (res) => {
          console.log('状态码:', res.statusCode);
          console.log('请求头:', res.headers);

          res.on('data', function (d) {
            body += d;
          })
          res.on('end', function () {
            t.xml2json(body).then(res => {
              responseData = res
              console.log('请求返回:', res);
              rs(res)
            }, fail => {
              rj(fail)
            })
          })
        });

        req.on('error', (e) => {
          rj(e);
        });
        req.write(data);
        req.end();
      })
    }

  }
}


module.exports = wxpay();