var d=Object.create,t=Object.defineProperty,m=Object.getPrototypeOf,n=Object.prototype.hasOwnProperty,p=Object.getOwnPropertyNames,r=Object.getOwnPropertyDescriptor;var u=e=>t(e,"__esModule",{value:!0});var C=(e,s)=>{for(var c in s)t(e,c,{get:s[c],enumerable:!0})},i=(e,s,c)=>{if(s&&typeof s=="object"||typeof s=="function")for(let l of p(s))!n.call(e,l)&&l!=="default"&&t(e,l,{get:()=>s[l],enumerable:!(c=r(s,l))||c.enumerable});return e},o=e=>e&&e.__esModule?e:i(u(t(e!=null?d(m(e)):{},"default",{value:e,enumerable:!0})),e);u(exports);C(exports,{default:()=>y});var a=o(require("../utils.js"));function f(e={}){e.onlyFromCamera=!e.hideAlbum||!1,e.scanType=e.scanType||["qrCode","barCode"],delete e.hideAlbum;let s=null;wx.scanCode({...e,success(c){s={},s.code=c.result,c.scanType==="QR_CODE"&&(s.qrCode=c.result),c.scanType==="BAR_CODE"&&(s.barCode=c.result),e.success&&e.success(s)},complete(){s&&e.complete&&e.complete(s)}})}var y=a.promisify(f);
