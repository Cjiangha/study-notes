var m=Object.create,t=Object.defineProperty,d=Object.getPrototypeOf,f=Object.prototype.hasOwnProperty,s=Object.getOwnPropertyNames,u=Object.getOwnPropertyDescriptor;var y=e=>t(e,"__esModule",{value:!0});var _=(e,r,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of s(r))!f.call(e,n)&&n!=="default"&&t(e,n,{get:()=>r[n],enumerable:!(a=u(r,n))||a.enumerable});return e},o=e=>e&&e.__esModule?e:_(y(t(e!=null?m(d(e)):{},"default",{value:e,enumerable:!0})),e);var x=o(require("@alife/anyui-wx-framework/index.js")),i=o(require("@alife/anyui-wx-framework/index.js"));i.createComponent(c({name:"default",mounted(){Promise.resolve().then(()=>{this._ctx.triggerEvent("onAnyUIPageReady")})},data:{},computed:{},methods:{}}));function c(e={}){return e.$renderKeys=["__ready__","__slotObj"],e}
