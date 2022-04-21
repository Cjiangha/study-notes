(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-nav-bar/uni-status-bar"],{2709:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"UniStatusBar",data:function(){return{statusBarHeight:20}},mounted:function(){this.statusBarHeight=t.getSystemInfoSync().statusBarHeight+"px";t.getSystemInfoSync();var n=t.getSystemInfoSync().platform;n&&-1!==n.indexOf("window")&&(this.statusBarHeight="0px")}};n.default=e}).call(this,e("543d")["default"])},"7fb9":function(t,n,e){"use strict";e.r(n);var a=e("eba1"),u=e("8b79");for(var r in u)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(r);e("e516");var i,f=e("f0c5"),c=Object(f["a"])(u["default"],a["b"],a["c"],!1,null,"bd573434",null,!1,a["a"],i);n["default"]=c.exports},"8b79":function(t,n,e){"use strict";e.r(n);var a=e("2709"),u=e.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=u.a},e516:function(t,n,e){"use strict";var a=e("f550"),u=e.n(a);u.a},eba1:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},r=[]},f550:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-nav-bar/uni-status-bar-create-component',
    {
        'components/uni-nav-bar/uni-status-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7fb9"))
        })
    },
    [['components/uni-nav-bar/uni-status-bar-create-component']]
]);
