参考：
* [PC端、移动端的页面适配及兼容处理](https://blog.csdn.net/xiangyun20021990/article/details/80653910)
一、关于移动端兼容性

   目前针对跨终端的方案，主要分为两大阵营：一套资源Vs两套资源。

　　第一种是通过响应式或页面终端判断去实现一套资源适配所有终端；

　　第二种是通过终端判断分别调取两套资源以适配所有终端。

　　这两种思路我们并不能斩钉截铁的说哪一个更优选，正所谓”合适的才是最好的”。

#### 　　思路一:通过响应式或页面终端判断去实现一套资源适配所有终端

　　**优势：**只需维护一套资源，维护成本较低。

　　**劣势：**需加载适配各个终端的各个资源，在不同终端通过响应式布局实现不同展现，部分交互效果需要在页面中做终端判断，代价较大，若图片资源为一套，部分图片在超高分辨率设备（例如iphone系列）下会失真，且在非wifi情况下即使加了延时加载也易出现加载慢的情况。

　　**技术选型：**jquery（或原生js等）+ 响应式 + 前端模块加载器（seajs或RequireJS等）+ css预处理器（sass 或less等）。jquery较好的兼容性配合响应式可相对代价较小地实现跨终端。前端模块加载器主要负责按需加载，以提高页面加载速度，css预处理器 的变量、运算、嵌套等特性可大大提高手动计算响应式的效率，妈妈再也不用担心我把比例算错了。当然后两者可参考需求及成本决定是否采用。

#### 　　思路二:通过终端判断分别调取两套资源以适配所有终端

　　**优势：**可根据不同端做个性设计及个性化信息推送且可按需加载，如移动端可配合重力感应、不同手势做各种炫酷拽效果，pc页面可不受流量限制做适合pc端的效果。

　　**劣势：**需维护两套资源，维护成本增加。

　　**技术选型：**zepto（或xui等移动端轻量级框架）+ 响应式 + 前端模块加载器 + css预处理器 + 终端适配。zepto作为jquery的移动端版本，依然延续其自身优势，大幅优化了移动端API且摒弃了兼容”非现代浏览器”的冗余代码，成为移动端轻 便可用的js框架代表，对于习惯了jquery的同学来说简直是不二之选！

　　终端适配目前一般通过ua判断来实现。ua判断可放在服务端也可放在页面中，在代理服务器中做跳转更快、更　　准确且不走应用程序层，即使浏览器禁用了js依然可以跳转到相应的地址，同时秉承着公共服务放在服务端这样的云端服务理念，我们选择了通过代理服务器做终端适配。

User-Agent嗅探，即Web浏览器发送一个Web页面或资源请求时，会发送一个User-Agent首部作为HTTP请求的一部分，那么我们就可以在服务器端获取想要的信息，进而判断并引导用户到达相应的页面地址。





二、pc上的网站在移动端上怎么办？

 如果把移动端的可视区域(320-768)的话，大部分网站都会因为太窄而显示错乱；所以浏览器默认把viewport设置为一个较宽的值 980px或1024px，至少保证PC网站在移动端上可以显示，只不过出现了横向滚动条而已。

（一）几个概念

 1.css[像素](https://so.csdn.net/so/search?q=像素&spm=1001.2101.3001.7020)

- html中度量的单位 用px来计算，在pc中往往 1 css px ＝ 1 物理像素
- css像素时抽象和相对的了，在不同设备中1px对应不同的设备像素；iphone3分辨率是320*480 即 css 1px ＝ 1个物理像素；iphone4 分辨率640x960但屏幕尺寸没有改变，意味着同一块区域像素多了1倍 即 css 1px ＝2个物理像素；

 2.物理像素

- 表示每英寸所拥有的像素数目，数值越高，代表屏幕能够以更高的密度来显示图像

 3.分辨率

- 显示器所能显示的像素多少，显示器可以显示的像素越多，画面就越精细，同样的屏幕区域能显示的信息就越多

  4.devicePixelRatio

- window.devicePixelRadio = 物理像素/css像素 在iphone4中devicePixelRatio＝2 也就是1css像素＝2个物理像素
- devicePixelRatio在不同浏览器中存在一些兼容性问题，并不是完全可靠的

  5.layout viewport

- 移动设备的默认viewport,css布局是以layout viewport 来做为参考系计算的
- document.documenElement.clientWidth 获取
- 该尺寸时动态设置

  6.visual viewport

- 代表浏览器窗口的尺寸，当用户放大浏览器时这个尺寸就会变小
- window.innerWidth 获取

  7.ideal viewport

- 屏幕尺寸 设备屏幕的尺寸 单位是物理像素
- screen.width 获取 屏幕尺寸是不变的
- 在该viewport中用户不需要缩放和横向滚动就可以正常查看网站的所有内容
- 设置移动端网站一般以这个viewport为准,ideal viewport 的宽度等于设备屏幕宽度，使得无论在什么分辨率下，那些针对ideal viewport设计的网站都可以完美的呈现给用户。

（二）如何实现屏幕适配

　　需要用到

```html
<meta name="viewport" content="width=device-width">
```

meta viewport 中有6个通用属性：

- width 设置layout viewport的宽度 正整数或字符串 'width-device'
- initial-scale 设置页面的初始缩放值，数字或小数
- minimum-scale 允许用户的最小缩放值 数字或小数
- maximum-scale 允许用户的最大缩放值 数字或小数
- height 设置layout viewport 的高度，这个属性很少用到
- user-scaleabel 是否允许用户进行缩放 'no'或‘yes’ 还有2个需要特别注意的两个属性
- target-densitydpi 在andriod 4.0一下的设备中，不支持设置viewport的width，android 自带浏览器支持设置 target-densitydpi来达到目的；

```html
target-densitydpi = UI-width/device-width*window.devicePixelRation*160



//UI-width: 布局宽度



//device-width:屏幕分辨率宽度 iphone4为640



//target-densitydpi=device-dpi 标示使用设备本身物理屏幕的像素,不会发生默认缩放
```

- miniual-ui ios的safari为meta表天新增的属性，在网页加载是隐藏顶部的地址栏和底部的导航栏

 （三）相关代码讲解

```html
//移动页面设计 480*854的比例 



//dpi = 480/screen.width*window.devicePixelRatio*160;



//scalevalue = screen.width/480;



//控制适配 分为5种组合



 



/* width ＋ target-densitydpi(计算出来的) */



<meta name="viewport" content="width=480,target-densitydpi=dpi,minimal-ui">



 



/* width */



<meta name="viewport" content="width=480,minimal-ui">



 



/* width+target-densitydpi=device-dpi */



<meta name="viewport" content="width=480,targrt-densitydip=device-dip,minimal-ui">



 



/* width+initial-scale */



<meta name="viewport" content="width=480,initial-scale=scalevalue,maximum-scale=scalevalue,minimum-scale=scalevalue,minimal-ui">



 



/* targrt-densitydpi */



<meta name="viewport" content="targrt-densitydpi=dpi,minimal-ui">



 



//通过顺序设置5次来实现适配 直到



Math.abs(window.innerWidth-480)<=10 表示viewport设置正确了。
```

（四）横竖屏

js代码控制

```javascript
window.addEventListener("orientationchange",function () {



        This.isOrietation = true;



        This.changeOriention();



    });



//建议执行横竖屏的事件都通过一个侦听完成，做一个统一的管理；在屏幕横竖屏切换完成之后再执行相应的事件
```

css控制

```css
//定义横屏显示的样式



@media screen and(orientation:landspace){...}



//定义竖屏显示的样式



@media screen and(orientation:portrait){...}



//某个尺寸的特殊样式 竖屏时宽度为768px 符合一般ipad的条件



@media only screen and(orientation:portrait) and(device-width:768px){...}
```

参考：http://www.uisdc.com/mobile-compatibility-analysis

​     http://www.ituring.com.cn/article/130015