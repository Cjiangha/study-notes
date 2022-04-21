// 云函数入口文件
const cloud = require('wx-server-sdk')
const wxFactory = require('wxPayment');

cloud.init()

const db = cloud.database({
  env: 'lucky-buy'
})


// 云函数入口函数
exports.main = async (event, context) => {
  const _ = db.command
  const $ = db.command.aggregate
  
  let pay = wxFactory.payment({
    openid: event.openid || cloud.getWXContext().OPENID,
    spbill_create_ip: event.ip
  })

  if (event.type == 'unify') {// 统一下单

    await pay.unify({
      attach: event.attach,
      body: event.body,
      out_trade_no: event.trade_no,
      total_fee: event.total_fee,
      trade_type: 'JSAPI'
    })

    return await pay.sdkConfig()

  } else if (event.type == 'payCheck') { // 查询订单支付状态

    var out_trade_no = event.trade_no
    return await pay.payCheck({ out_trade_no })

  } else if (event.type == 'refund') { // 订单退款

    var out_trade_no = event.trade_no, out_refund_no = event.refund_no,
      total_fee = event.total_fee, refund_fee = event.refund_fee

    // 真正的退款成功
    // res.return_code && res.return_code === 'SUCCESS' && res.result_code && res.result_code === 'SUCCESS'

    return await pay.refund({ out_refund_no, out_trade_no, total_fee, refund_fee})

  } else if (event.type == 'refundCheck') { // 订单退款查询

    var out_trade_no = event.trade_no, out_refund_no = event.refund_no,
      refund_id = event.refund_id, transaction_id = event.transaction_id
    return await pay.refundCheck({ out_refund_no, out_trade_no, transaction_id, refund_id })

  } else if (event.type == 'cancelPay') { // 订单取消支付

    var out_trade_no = event.trade_no
    var res = await pay.cancelPay(out_trade_no)

    return res

  }
}