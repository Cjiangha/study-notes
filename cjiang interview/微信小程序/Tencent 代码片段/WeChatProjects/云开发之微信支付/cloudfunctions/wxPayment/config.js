let config = {
  appid: '与商户关联的小程序appid',
  mch_id: '商户id',
  mch_key: '商户key',
  cert_file: __dirname + '/ssl/cert.pem', // 微信支付秘钥cert文件,退款接口会用到
  key_file: __dirname + '/ssl/key.pem', // 微信支付秘钥key文件,退款接口会用到
  notify_url: '通知地址',
  trade_type: 'JSAPI'
}, httpsOpts = {
  hostname: 'api.mch.weixin.qq.com',
  port: 443,
  method: 'POST',
  path: ''
}

module.exports = {
  config,
  httpsOpts
}