(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[8],{60:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var r=a(4),n=a(6),o=a(7),s=a(11),i=a(12),c=a(13),u=a(8),h=a(2),l=a(28),m=a(18),v=a(19),d=a.n(v),p=a(25),g=a(3),f=a.n(g),b=a(27);function w(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function x(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?w(Object(a),!0).forEach((function(t){Object(u["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):w(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function y(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0;return new Promise((function(r,n){e||rejects("\u6682\u65e0\u8be5api"),e(x(x({},t),{},{success:function(e){return r(e)},fail:function(e){return n(e)}}),a)}))}}y(f.a.login),y(f.a.getUserProfile),y(f.a.getUserInfo),y(f.a.getSystemInfo),y(f.a.setClipboardData),y(f.a.chooseImage),y(f.a.uploadFile),y(f.a.getLocation),y(f.a.chooseLocation),y(f.a.clearStorage);var I,k,j=y(f.a.getImageInfo),P=(y(f.a.getVideoInfo),y(f.a.canvasToTempFilePath)),T=y(f.a.getSetting),O=y(f.a.saveImageToPhotosAlbum),S=(y(f.a.saveVideoToPhotosAlbum),y(f.a.authorize)),_=y(f.a.openSetting),N=(y(f.a.downloadFile),y(f.a.chooseAddress),y(f.a.requestPayment),a(60),a(10)),F=new RegExp("http://"),C="#fff",A={},M=30,R=function(e){Object(i["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;Object(n["a"])(this,a);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return e=t.call.apply(t,[this].concat(o)),Object(u["a"])(Object(s["a"])(e),"state",{visible:!1,isVersion:b["a"].isVersion,posterPath:"",ratio:b["a"].systemInfo.pixelRatio,width:646,height:920,canvasId:"canvas_id_".concat((new Date).getTime())}),Object(u["a"])(Object(s["a"])(e),"_timer",void 0),Object(u["a"])(Object(s["a"])(e),"_timeOut",void 0),Object(u["a"])(Object(s["a"])(e),"_initTimer",void 0),Object(u["a"])(Object(s["a"])(e),"_timeTotal",void 0),Object(u["a"])(Object(s["a"])(e),"_shopItem",void 0),e}return Object(o["a"])(a,[{key:"componentWillMount",value:function(){this.props.onRef(this)}},{key:"componentWillUnmount",value:function(){this.clearTime()}},{key:"init",value:function(e){var t=this;e.wxQRCode&&(A[e.shopId]?(this.setState({visible:!0,posterPath:A[e.shopId]}),this.props.onSuccess&&this.props.onSuccess(),f.a["loading"].hide()):this.setState({posterPath:"",canvasId:"canvas_id_".concat((new Date).getTime())},(function(){t.rejectPoster(),t._shopItem=Object.assign({},e,{userDescribe:"\u4e3a\u4f60\u63a8\u8350"}),t._initTimer&&clearTimeout(t._initTimer),t._initTimer=setTimeout((function(){t.state.isVersion?t.getCanvas():t.getContext()}),0)})))}},{key:"rejectPoster",value:function(){var e=this;this.clearTime(),this._timeTotal=0,this._timeOut=setInterval((function(){e._timeTotal+=1,e._timeTotal>=M&&(f.a["toast"]("\u6d77\u62a5\u751f\u6210\u5931\u8d25"),e.setState({visible:!1}),e.clearTime())}),1e3)}},{key:"clearTime",value:function(){this._timer&&clearTimeout(this._timer),this._timeOut&&clearTimeout(this._timeOut),this._initTimer&&clearTimeout(this._initTimer),this._timer=null,this._timeOut=null,this._initTimer=null}},{key:"getNumber",value:function(e){return e*this.state.ratio}},{key:"download",value:function(){this.downloadPoster()}},{key:"show",value:function(){this.setState({visible:!0})}},{key:"hide",value:function(){this.props.onCancel&&this.props.onCancel(),this.setState({visible:!1}),this.clearTime()}},{key:"InitContext",value:function(e){return e.setStrokeStyle=e.setStrokeStyle||function(t){e.strokeStyle=t},e.setFillStyle=e.setFillStyle||function(t){e.fillStyle=t},e.setFontSize=e.setFontSize||function(t){e.font=t+"px PingFangSC-Regular, PingFang SC"},e}},{key:"getContext",value:function(){var e=Object(p["a"])(d.a.mark((function e(){var t,a,r,n,o,s,i;return d.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("getContext"),t=this.state,a=t.width,r=t.height,n=t.ratio,o=t.canvasId,s=this.InitContext(f.a.createCanvasContext(o,this)),s){e.next=5;break}return e.abrupt("return");case 5:return i=s["_context"]?s["_context"].canvas:{width:1,height:1},f.a["loading"].show("\u6d77\u62a5\u751f\u6210\u4e2d..."),i.width=a*n,i.height=r*n,s.clearRect(0,0,i.width,i.height),s.scale(parseFloat((1/n).toFixed(2)),parseFloat((1/n).toFixed(2))),e.prev=11,e.next=14,this.drawPosterBg(s,i.width,i.height);case 14:return e.next=16,this.drawAvatarText(s);case 16:return e.next=18,this.drawAvatarImage({ctx:s,canvas:i});case 18:return e.next=20,this.drawMasterImage({ctx:s,canvas:i});case 20:return e.next=22,this.drawMaterText(s);case 22:return e.next=24,this.drawMaterQRCode({ctx:s,canvas:i});case 24:return e.next=26,this.drawAllSuperpositionImage({ctx:s,canvas:i});case 26:return e.next=28,this.drawMaterLookText(s);case 28:e.next=36;break;case 30:e.prev=30,e.t0=e["catch"](11),console.error(e.t0),this.setState({visible:!1}),f.a["toast"]("\u6d77\u62a5\u751f\u6210\u5931\u8d25"),this.clearTime();case 36:case"end":return e.stop()}}),e,this,[[11,30]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"getCanvas",value:function(){var e=this;console.log("getCanvas");var t=this.state,a=t.width,r=t.height,n=t.ratio,o=t.canvasId,s=f.a.createSelectorQuery();s.select("#".concat(o)).fields({node:!0,size:!0}).exec(function(){var t=Object(p["a"])(d.a.mark((function t(o){var s,i;return d.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(s=o[0].node,s){t.next=3;break}return t.abrupt("return");case 3:return f.a["loading"].show("\u6d77\u62a5\u751f\u6210\u4e2d..."),i=e.InitContext(s.getContext("2d")),s.width=a*n,s.height=r*n,i.clearRect(0,0,s.width,s.height),i.scale(parseFloat((1/n).toFixed(2)),parseFloat((1/n).toFixed(2))),t.prev=9,t.next=12,e.drawPosterBg(i,s.width,s.height);case 12:return t.next=14,e.drawAvatarImage({ctx:i,canvas:s});case 14:return t.next=16,e.drawAvatarText(i);case 16:return t.next=18,e.drawMasterImage({ctx:i,canvas:s});case 18:return t.next=20,e.drawMaterText(i);case 20:return t.next=22,e.drawMaterQRCode({ctx:i,canvas:s});case 22:return t.next=24,e.drawAllSuperpositionImage({ctx:i,canvas:s});case 24:return t.next=26,e.drawMaterLookText(i);case 26:return t.next=28,e.createPosterImage(s);case 28:t.next=36;break;case 30:t.prev=30,t.t0=t["catch"](9),console.error(t.t0),e.setState({visible:!1}),f.a["toast"]("\u6d77\u62a5\u751f\u6210\u5931\u8d25"),e.clearTime();case 36:case"end":return t.stop()}}),t,null,[[9,30]])})));return function(e){return t.apply(this,arguments)}}())}},{key:"setDraw",value:function(e,t,a){e.draw?e.draw(t,(function(){a&&a("true")})):a&&a("true")}},{key:"roundRect",value:function(e,t,a,r,n,o){return new Promise((function(s,i){if(!e)return i("ctx\u5b9e\u4f8b\u4e0d\u5b58\u5728-roundRect");r<2*o&&(o=r/2),n<2*o&&(o=n/2),e.moveTo(t+o,a),e.arcTo(t+r,a,t+r,a+n,o),e.arcTo(t+r,a+n,t,a+n,o),e.arcTo(t,a+n,t,a,o),e.arcTo(t,a,t+r,a,o),e.setStrokeStyle(C),e.stroke(),e.clip(),s("true")}))}},{key:"computeText",value:function(e,t,a,r,n,o){var s=this,i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"...";return new Promise((function(c,u){if(t.length<=0)return c("\u6682\u65e0\u9700\u8981\u7ed8\u5236\u7684\u6587\u5b57");var h=e.measureText(t).width,l=1;if(h<=n)e.fillText(t,a,r),e.restore(),c("\u6587\u5b57\u7ed8\u5236\u6210\u529f");else for(var m="",v=0;v<t.length;v++)if(m+=t[v],e.measureText(m).width>=n){if(l>=o){e.fillText(m.substring(0,m.length-1)+i,a,r+(l-1)*s.getNumber(44)),e.restore(),c("\u6587\u5b57\u7ed8\u5236\u6210\u529f");break}e.fillText(m,a,r+(l-1)*s.getNumber(44)),l+=1,m="",v-(t.length-1)===0&&(e.restore(),c("\u6587\u5b57\u7ed8\u5236\u6210\u529f"))}else v-(t.length-1)===0&&(e.fillText(m,a,r+l*s.getNumber(20)),e.restore(),c("\u6587\u5b57\u7ed8\u5236\u6210\u529f"))}))}},{key:"drawPosterBg",value:function(e,t,a){var r=this;return new Promise((function(n,o){e.save(),r.roundRect(e,0,0,t,a,r.getNumber(24)).then((function(){e.setFillStyle(C),e.fillRect(0,0,t,a),e.restore(),r.setDraw(e,!0,n)})).catch((function(e){console.error(e,"\u753b\u6574\u4f53\u80cc\u666f\u548c\u5706\u89d2-drawPosterBg"),o(e)}))}))}},{key:"getImage",value:function(e,t){var a=this.state.isVersion;return new Promise((function(r,n){return e||r(a?t.createImage():""),e=e.replace(F,"https://"),console.log("\u56fe\u7247\u5730\u5740\uff1a"+e),j({src:e}).then((function(e){if(a){var n=t.createImage();n.src=e.path,n.onload=function(){r(n)},n.onerror=function(){console.log("\u56fe\u7247\u9519\u8bef")}}else r(e.path)})).catch((function(e){f.a["loading"].hide(),console.error(e,"\u83b7\u53d6\u56fe\u7247\u6570\u636e-\u83b7\u53d6\u56fe\u7247\u5931\u8d25-wxGetImageInfo"),n(e)}))}))}},{key:"drawAvatarImage",value:function(e){var t=this,a=e.ctx,r=e.canvas;return new Promise((function(e,n){var o=t.getNumber(96),s=t.getNumber(32),i=t.getNumber(36),c=t.getNumber(48);a.save(),t.roundRect(a,s,i,o,o,c).then((function(){return t.getImage(t._shopItem.userAvatar,r)})).then((function(r){a.beginPath(),a.arc(s+c,i+c,c,0,2*Math.PI),a.clip(),a.drawImage(r,s,i,o,o),a.restore(),t.setDraw(a,!0,e)})).catch((function(e){console.error(e,"\u753b\u5934\u50cf\u5931\u8d25-drawAvatarImage"),n(e)}))}))}},{key:"drawAvatarText",value:function(e){var t=this._shopItem,a=t.userName,r=t.userDescribe;e.save(),e.setFillStyle("#141622"),e.setFontSize(this.getNumber(30)),this.computeText(e,a,this.getNumber(152),this.getNumber(80),Math.floor(this.getNumber(380)),1,""),e.setFillStyle("#9c9c9c"),e.setFontSize(this.getNumber(22)),e.fillText(r||"",this.getNumber(152),this.getNumber(120)),e.restore()}},{key:"drawMasterImage",value:function(e){var t=this,a=e.ctx,r=e.canvas;return new Promise((function(e,n){var o=t.getNumber(32),s=t.getNumber(152),i=t.getNumber(582),c=t.getNumber(582);a.save(),t.roundRect(a,o,s,i,c,t.getNumber(24)).then((function(){return t.getImage(t._shopItem.shopImage,r)})).then((function(r){a.drawImage(r,o,s,i,c),a.restore(),t.setDraw(a,!0,e)})).catch((function(e){console.error(e,"\u753b\u4e2d\u95f4\u4e3b\u56fe\u5931\u8d25-drawMasterImage"),n(e)}))}))}},{key:"drawMaterText",value:function(e){var t=this;return new Promise((function(a,r){var n=(t._shopItem.shopDescribe||"").replace(/\r/g," ").replace(/\n/g," "),o=t.getNumber(380),s=t.getNumber(30),i=t.getNumber(30),c=t.getNumber(784);return e.save(),e.setFillStyle("#141622"),e.setFontSize(s),t.computeText(e,n,i,c,o,2).then(a)}))}},{key:"drawMaterQRCode",value:function(e){var t=this,a=e.ctx,r=e.canvas;return new Promise((function(e,n){t.getImage(t._shopItem.wxQRCode,r).then((function(r){var n=t.getNumber(464),o=t.getNumber(750),s=t.getNumber(152),i=t.getNumber(152);a.save(),a.drawImage(r,n,o,s,i),a.restore(),e("")})).catch((function(e){console.error(e,"\u753b\u4e3b\u56fe\u53f3\u8fb9\u7684\u5c0f\u7a0b\u5e8f\u7801\u5931\u8d25-drawMaterQRCode"),n(e)}))}))}},{key:"drawAllSuperpositionImage",value:function(e){var t=this,a=e.ctx,r=e.canvas;return new Promise((function(e,n){t.drawSuperpositionImage({ctx:a,canvas:r},0,e)}))}},{key:"drawSuperpositionImage",value:function(e,t,a){var r=this,n=e.ctx,o=e.canvas,s=this._shopItem.lookUserAvatar;if(!Array.isArray(s)||s.length<=0)return a("");this.drawMaterLookImage({ctx:n,canvas:o},t,s[t]).then((function(){if(t>=s.length-1||t>=2)return a("");t+=1,r.drawSuperpositionImage({ctx:n,canvas:o},t,a)}))}},{key:"drawMaterLookImage",value:function(e,t,a){var r=this,n=e.ctx,o=e.canvas;return new Promise((function(e,s){var i=r.getNumber(30)+r.getNumber(24*t),c=r.getNumber(860),u=r.getNumber(40),h=r.getNumber(40),l=u/2;n.save(),r.roundRect(n,i,c,u,h,l).then((function(){return r.getImage(a,o)})).then((function(t){n.beginPath(),n.arc(i+l,c+l,l,0,2*Math.PI),n.clip(),n.drawImage(t,i,c,u,u),n.restore(),r.setDraw(n,!0,e)})).catch((function(t){console.error(t,"\u753b\u8fc7\u56fe\u7247-\u53e0\u52a0\u5931\u8d25-drawMaterLookImage"),e(t)}))}))}},{key:"drawMaterLookText",value:function(e){var t=this,a=this._shopItem,r=a.lookUserAvatar,n=a.lookDescribe,o=!Array.isArray(r)||r.length<=0?0:r.length>=3?3:r.length,s=this.getNumber(40),i=o>=1?this.getNumber(16)*o-1-s:0,c=s*o-i+this.getNumber(30);e.save(),e.setFillStyle("#9c9c9c"),e.setFontSize(this.getNumber(24)),e.fillText(n+"\u4eba\u770b\u8fc7",c,this.getNumber(888)),e.restore(),t.setDraw(e,!0,(function(){t.createPosterImageForQW()}))}},{key:"createPosterImageForQW",value:function(){var e=this,t=this,a=this.state,r=a.width,n=a.height,o=a.canvasId;this._timer&&clearTimeout(this._timer),this._timer=setTimeout((function(){P({canvasId:o,destHeight:e.getNumber(n),destWidth:e.getNumber(r)},t).then((function(t){"canvasToTempFilePath:ok"===t.errMsg&&(f.a["loading"].hide(),e.clearTime(),e.setState({posterPath:t.tempFilePath,visible:!0}),A[e._shopItem.shopId]=t.tempFilePath,e.props.onSuccess&&e.props.onSuccess())})).catch((function(e){console.error(e),f.a["toast"]("\u56fe\u7247\u751f\u6210\u5931\u8d25")}))}),100)}},{key:"createPosterImage",value:function(e){var t=this,a=this,r=this.state,n=r.width,o=r.height,s=r.ratio,i=r.canvasId,c=Number((1/s).toFixed(2));this._timer&&clearTimeout(this._timer),this._timer=setTimeout((function(){P({canvas:e,canvasId:i,destHeight:o*s,destWidth:n*s,height:o*c,width:n*c},a).then((function(e){"canvasToTempFilePath:ok"===e.errMsg&&(f.a["loading"].hide(),t.clearTime(),t.setState({posterPath:e.tempFilePath,visible:!0}),A[t._shopItem.shopId]=e.tempFilePath,t.props.onSuccess&&t.props.onSuccess())})).catch((function(e){console.error(e),f.a["toast"]("\u56fe\u7247\u751f\u6210\u5931\u8d25")}))}),100)}},{key:"downloadPoster",value:function(){var e=Object(p["a"])(d.a.mark((function e(){var t,a,r;return d.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,T();case 3:if(a=e.sent,a.authSetting["scope.writePhotosAlbum"]){e.next=17;break}return e.prev=5,e.next=8,S({scope:"scope.writePhotosAlbum"});case 8:r=e.sent,"authorize:ok"===r.errMsg?t.savePictureSystem():t.handleAuthorize(),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](5),t.handleAuthorize();case 15:e.next=18;break;case 17:t.savePictureSystem();case 18:case"end":return e.stop()}}),e,this,[[5,12]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"handleAuthorize",value:function(){f.a.showModal({title:"\u6388\u6743",content:"\u662f\u5426\u6388\u6743\u4fdd\u5b58\u6d77\u62a5\u5230\u76f8\u518c\uff1f",success:function(e){e.confirm?_().then((function(e){e.authSetting={"scope.userInfo":!0,"scope.userLocation":!0}})):f.a["toast"]("\u53d6\u6d88\u6388\u6743,\u6d77\u62a5\u65e0\u6cd5\u4fdd\u5b58\u5230\u76f8\u518c")}})}},{key:"savePictureSystem",value:function(){var e=this;O({filePath:this.state.posterPath}).then((function(){e.hide(),f.a["toast"]("\u4fdd\u5b58\u6210\u529f")})).catch((function(t){console.error(t),f.a["toast"]("\u4fdd\u5b58\u5230\u76f8\u518c\u5931\u8d25"),e.hide()}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.width,r=t.height,n=t.visible,o=t.posterPath,s=t.isVersion,i=t.canvasId,c={width:"".concat(a,"px"),height:"".concat(r,"px")},u={overflow:"hidden",width:"".concat(a,"px"),height:"".concat(r,"px")},h={overflow:"hidden",width:"".concat(a,"rpx"),height:"".concat(r,"rpx")};return Object(N["jsxs"])(N["Fragment"],{children:[Object(N["jsxs"])(m["d"],{className:"shop-poster_fixed ".concat(n?"shop-poster_visible":""," "),children:[Object(N["jsx"])(m["d"],{className:"poster-remove iconfont icon-remove",onClick:function(){return e.hide()}}),o&&Object(N["jsx"])(m["c"],{src:o,mode:"aspectFill",className:"shop-poster_img",style:h}),Object(N["jsx"])(m["d"],{className:"poster-button",onClick:function(){return e.download()},children:"\u4fdd\u5b58\u6d77\u62a5"})]},"canvas_poster_img"),Object(N["jsx"])(m["d"],{className:"shop-poster_layout",style:u,children:Object(N["jsx"])(m["d"],{className:"poster-canvas_wrap",style:c,children:!o&&Object(N["jsx"])(m["b"],{id:i,canvasId:i,className:"shopPoster",type:s?"2d":"",style:c})},"canvas_post")})]})}}]),a}(h["Component"]),D=R,z=(a(61),I=Object(l["b"])("store"),I(k=Object(l["c"])(k=function(e){Object(i["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;Object(n["a"])(this,a);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return e=t.call.apply(t,[this].concat(o)),Object(u["a"])(Object(s["a"])(e),"_shopPosterRef",void 0),e}return Object(o["a"])(a,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"handleShare",value:function(){this.initPoster()}},{key:"initPoster",value:function(){this._shopPosterRef.init({userName:"\u7528\u6237\u540d",userAvatar:"https://nbshop-dev-public.oss-accelerate.aliyuncs.com/1458680108962357250/operator-avatar/619c86f1e4b0c9eaf460f13e.jpeg",shopId:"12312325",wxQRCode:"https://nbshop-dev-public.oss-accelerate.aliyuncs.com/1458680108962357250/wxma-code/619ccd72e4b08ca2fc950a6a.jpeg",shopImage:"https://nbshop-dev-public.oss-accelerate.aliyuncs.com/1458680108962357250/product-media/619cafe1e4b0c9eaf4611473.jpg",shopDescribe:"\u5973\u7ae5\u7761\u8863\u51ac\u5b63\u52a0\u539a\u513f\u7ae5\u5bb6\u5c45\u670d\u52a0\u7ed2\u5939\u68c9\u6cd5\u5170\u7ed2\u5b9d\u5b9d\u73ca\u745a\u7ed2\u4fdd\u6696",lookDescribe:"\u4e3a\u4f60\u63a8\u8350",lookUserAvatar:["https://nbshop-dev-public.oss-accelerate.aliyuncs.com/1458680108962357250/operator-avatar/619c86f1e4b0c9eaf460f13e.jpeg"]})}},{key:"handleSuccess",value:function(){}},{key:"render",value:function(){var e=this;return Object(N["jsxs"])(m["d"],{className:"index",children:[Object(N["jsx"])(m["a"],{onClick:function(){return e.handleShare()},children:"\u6d77\u62a5\u5206\u4eab"}),Object(N["jsx"])(D,{onRef:function(t){return e._shopPosterRef=t},onSuccess:function(){return e.handleSuccess()}})]})}}]),a}(h["Component"]))||k)||k),Q=z,L={};Page(Object(r["createPageConfig"])(Q,"pages/index/index",{root:{cn:[]}},L||{}))}},[[62,0,1,2,3]]]);