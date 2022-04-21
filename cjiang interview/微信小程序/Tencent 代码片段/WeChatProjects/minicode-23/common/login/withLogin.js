import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
anyui._wrapApi('navigateTo', _a_u_navigateTo)
import User from "./User.js";
import { LOGIN_SUCCESS_HANDLE_TYPE } from "./module/Constant";
const emptyFunction = () => {
  /** */
};
/**
 * LOGIN_SUCCESS_HANDLE_TYPE.EXECUTE_CALLBACK 该情况下执行的 callback
 */

let useLoginAuthPageCallback = emptyFunction;
export const getUseLoginAuthPageCallback = () => useLoginAuthPageCallback;
export const setUseLoginAuthPageCallback = (c) => {
  useLoginAuthPageCallback = c || emptyFunction;
};
export const resetUseLoginAuthPageCallback = () =>
  setUseLoginAuthPageCallback(emptyFunction);
/**
 * 使用登录页面，以及登录成功后逻辑处理
 *
 * @param { string } handleType LOGIN_SUCCESS_HANDLE_TYPE
 * @param { string } redirectUrl 重定向的 url
 * @param { function } callback 登录成功后执行的 callback
 */

export const useLoginAuthPage = ({ handleType, redirectUrl, callback }) => {

  if (handleType === LOGIN_SUCCESS_HANDLE_TYPE.EXECUTE_CALLBACK) {
    setUseLoginAuthPageCallback(callback);
  }

  anyui.navigateTo({
    url: "/page/login_auth/LoginAuth",
    query: {
      handleType,
      redirectUrl,
    },
  });
};
/**
 * withLogin 返回参数
 */

const withLoginReturn = {
  useLoginAuthPage: emptyFunction,
};
/**
 * 对依赖登录的流程应用登录逻辑
 *
 * @param { function } callback 如果已登录，需要执行的逻辑
 * @returns
 */

export const withLogin = (callback) => {

  if (User.isLogin()) {
    callback();
    return withLoginReturn;
  }

  return { ...withLoginReturn, useLoginAuthPage };
};
export { LOGIN_SUCCESS_HANDLE_TYPE };
