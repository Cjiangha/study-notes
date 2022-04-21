export const AUTH_SCOPES = {
  auth_user_amap: "auth_user_amap",
  auth_zhima: "auth_zhima",
  auth_life_msg: "auth_life_msg",
  ant_member_info: "ant_member_info",
  auth_user: "auth_user",
};
export const AUTH_CODE = {
  user_amap_auth_code: "user_amap_auth_code",
};
export const HAS_POPUP_AUTH = {
  has_popup_zhima_auth: "has_popup_zhima_auth",
  has_popup_life_msg_auth: "has_popup_life_msg_auth",
};
export const HAS_AUTHED = {
  has_authed_zhima: "has_authed_zhima",
};
export const AMAP_USER_INFO = "AMAP_USER_INFO";
export const LOGIN_CACHE_KEYS = "LOGIN_CACHE_KEYS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"; // wx 账号是否已经被注册

export const WX_REGISTER = "WX_REGISTER";

export const LOGIN_SUCCESS_HANDLE_TYPE = {
  REDIRECT_TO_URL: "REDIRECT_TO_URL",
  // 登录成功后重定向到该 url 上
  EXECUTE_CALLBACK: "EXECUTE_CALLBACK", // 执行 callback
};
