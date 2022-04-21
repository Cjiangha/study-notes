(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/bd-scroll-tabtitle/bd-scroll-tabtitle"],{"327b":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c},r=[]},5647:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=getApp(),u={name:"BdScrollTabtitle",props:{tabList:{type:Array,default:function(){return[{name:"全部"},{name:"待审核"},{name:"待审核"},{name:"待审核"},{name:"待审核"},{name:"待审核"},{name:"待审核"}]}},showTabNum:{type:Boolean,default:!1},hasLeftWin:{type:Boolean,default:!1}},data:function(){return{tabIndex:0}},computed:{statusBarHeight:function(){return a.globalData.statusBarHeight}},methods:{handleTab:function(t){var e=t.currentTarget.dataset.index;this.tabIndex=e,this.$emit("submit-tab",e)}}};e.default=u},"6c60":function(t,e,n){"use strict";n.r(e);var a=n("5647"),u=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=u.a},a791:function(t,e,n){"use strict";n.r(e);var a=n("327b"),u=n("6c60");for(var r in u)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(r);n("edbc");var c,i=n("f0c5"),o=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,"55b77993",null,!1,a["a"],c);e["default"]=o.exports},b3be:function(t,e,n){},edbc:function(t,e,n){"use strict";var a=n("b3be"),u=n.n(a);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/bd-scroll-tabtitle/bd-scroll-tabtitle-create-component',
    {
        'components/bd-scroll-tabtitle/bd-scroll-tabtitle-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a791"))
        })
    },
    [['components/bd-scroll-tabtitle/bd-scroll-tabtitle-create-component']]
]);
