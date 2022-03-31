"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Main = _interopRequireDefault(require("../pages/Main.vue"));

var _Home = _interopRequireDefault(require("../pages/Home.vue"));

var _Category = _interopRequireDefault(require("../pages/Category.vue"));

var _Buycart = _interopRequireDefault(require("../pages/Buycart.vue"));

var _My = _interopRequireDefault(require("../pages/My.vue"));

var _Xiangqing = _interopRequireDefault(require("../pages/Xiangqing.vue"));

var _Buy = _interopRequireDefault(require("../pages/Buy.vue"));

var _Loginandregister = _interopRequireDefault(require("../pages/Loginandregister"));

var _Login = _interopRequireDefault(require("../pages/Login"));

var _Loginstyle = _interopRequireDefault(require("../pages/Loginstyle.vue"));

var _list = _interopRequireDefault(require("../pages/list.vue"));

var _Loginstyle2 = _interopRequireDefault(require("../pages/Loginstyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//引入两个全局的
_vue["default"].use(_vueRouter["default"]);

var routes = [// 初始值的To默认有
{
  path: '/',
  redirect: '/main/home'
}, {
  path: '/main',
  name: 'main',
  component: _Main["default"],
  children: [{
    path: 'home',
    name: 'home',
    component: _Home["default"],
    // 别名
    alias: 'h'
  }, {
    path: 'category',
    name: 'category',
    component: _Category["default"]
  }, {
    path: 'Buycart',
    name: 'Buycart',
    component: _Buycart["default"]
  }, {
    path: 'My',
    name: 'My',
    component: _My["default"]
  }]
}, {
  path: '/xiangqing',
  name: 'xiangqing',
  component: _Xiangqing["default"]
}, {
  path: '/buy',
  name: 'buy',
  component: _Buy["default"]
}, //登录和注册
{
  path: '/login_register',
  name: 'login_register',
  component: _Loginandregister["default"]
}, //登录
{
  path: '/login',
  name: 'login',
  component: _Loginstyle["default"]
}, {
  path: '/List',
  name: 'List',
  component: _list["default"]
}, {
  path: '/ ',
  name: 'test',
  component: _Loginstyle2["default"]
}, {
  path: '/xiangqing/:id',
  name: 'xiangqing',
  component: _Xiangqing["default"]
}, {
  path: '/Loginstyle',
  name: 'Loginstyle',
  component: _Login["default"]
}];
var router = new _vueRouter["default"]({
  // mode: 'history',
  routes: routes
});
var _default = router;
exports["default"] = _default;