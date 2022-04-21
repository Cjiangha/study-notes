// https://docs.aosdev.amap.com/docs/v3/passport/mini/wechatMini/auth_check

export const wxAuthCheckRequest = (param = null) => {
}; // 本接口用于微信小程序打车（扫码）授权登录绑定手机等操作.
// https://docs.aosdev.amap.com/docs/v3/passport/mini/wechatMini/auth_login

export const wxAuthLoginRequest = (param = null) => {
};
export const ErrEnum = {
  wxAuthCheck: {
    0: "未知错误",
    1: "成功",
    2: "失败",
    3: "参数错误",
    4: "签名错误",
    5: "license到期",
    11: "服务协议不支持",
  },
  wxAuthLogin: {
    0: "未知错误",
    1: "成功",
    2: "失败",
    3: "参数错误",
    4: "签名错误",
    5: "license到期",
    11: "服务协议不支持",
    10003: "未绑定手机、手机号信息无效",
    10019: "无效的授权码",
    10080: "当前账号有未完成的订单",
    10084: "新手机号被其他授权绑定（需要强制绑定）",
  },
};
