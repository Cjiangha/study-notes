

let arr3 = [{
    title: '购物指南',
    con: ["购物流程", "用户协议", "会员介绍", "积分说明", "订单状态", "优惠券", "常见问题"]
}, {
    title: '配送方式',
    con: ["自提说明", "送货上门"]
}, {
    title: '售后服务',
    con: ["接收验货", "退换货政策", "退换货流程", "退款说明", "发票说明", "联系客服", "食品安全制度"]
}, {
    title: '支付方式',
    con: ["货到付款", "在线支付", "银行转帐", "支票付款", "预存消费"]
}, {
    title: '特色服务',
    con: ["用药咨询", "连锁招商", "寻医问药"]
}
];


var str = arr3.map(function (item) {
    var html = '';
    for (var i = 0; i < item.con.length; i++) {
        html += `<a href="">${item.con[i]}</a>`;
    }
    return ` 
            <dl>
                <dt>${item.title}</dt>
                <dd>${html}</dd>
             </dl>`
}).join('');

$('.service').eq(0).html(str);


