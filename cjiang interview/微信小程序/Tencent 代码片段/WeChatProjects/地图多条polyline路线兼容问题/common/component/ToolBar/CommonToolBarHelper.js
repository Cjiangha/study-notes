/**
 * 当前tools的所有type枚举
 */
export const toolsType = {
  // 紧急求助
  EMERGENCY_ALARM: 1,
  // 拨打电话
  CALL_DRIVER: 2,
  // 分享行程
  SHARE_LINE: 3,
  // 联系客服
  CONTACT_SERVICE: 4,
  // 取消行程
  CANCEL_TRIP: 5,
  // 投诉反馈
  FEEDBACK: 6,
  // 开发票
  GET_INVOICE: 7,
  // 更多
  MORE: 999,
  // 发消息
  SEND_MESSAGE: 9,
  // 修改目的地
  MODIFY_END_LOCATION: 10,
  // 路线选择
  CHOOSE_PATH: 8,
  // 常见问题
  COMMON_QUESTION: 14,
};
export const toolAddEmitClick = (tools) => {
  const actionEmit = {
    [toolsType.EMERGENCY_ALARM]: "emergencyAlarm",
    [toolsType.CALL_DRIVER]: "callDriver",
    [toolsType.SHARE_LINE]: "shareLine",
    [toolsType.CONTACT_SERVICE]: "contactService",
    [toolsType.CANCEL_TRIP]: "cancelTripClick",
    [toolsType.FEEDBACK]: "feedback",
    [toolsType.GET_INVOICE]: "getInvoice",
    [toolsType.MORE]: "",
    [toolsType.SEND_MESSAGE]: "sendMessage",
    [toolsType.MODIFY_END_LOCATION]: "modifyEndLocation",
    [toolsType.CHOOSE_PATH]: "choosePath",
    [toolsType.COMMON_QUESTION]: "commonQuestion",
  };
  const { highlight = [], more = [], all = [] } = tools; // 将所有的tool进行合并 265 及以前版本使用 highlight + more 来控制展示, highlight 中下发 more按钮。270 之后统一在 all 中下发，并且不再下发 more 按钮
  // V365版本：小程序UI要求tool超过5个展示更多功能，H5和主板要求超过6个展示功能，服务端若针对小程序做单独判断略微有点麻烦，故前端这边自己筛出更多功能，自己控制

  const allTools = all.length ? all : [...highlight, ...more];
  let currentTools = allTools.filter(
    (item) => item.actionType !== toolsType.MORE
  ); // 筛出更多功能按钮

  currentTools = currentTools.map((item) => {
    item.emitClick = actionEmit[item.actionType];
    return item;
  });
  return currentTools;
};
export const buttonidJSON = {
  emergencyAlarm: 1,
  shareLine: 2,
  cancelTripClick: 3,
  feedback: 4,
  callDriver: 5,
  contactService: 6,
  getInvoice: 7,
  openToolMask: -1,
  sendMessage: 9,
  choosePath: 8,
  commonQuestion: 14,
};
export const defaultDriverHeadImg =
  "https://img.alicdn.com/imgextra/i3/O1CN01lvmNXM202KNDsb1YI_!!6000000006791-2-tps-87-87.png";
export const defaultDriverTagImg =
  "https://img.alicdn.com/imgextra/i2/O1CN01PdAut11EvegUafVGJ_!!6000000000414-2-tps-120-65.png";
export const statusMap = {
  103: 1,
  104: 2,
  105: 3,
};
