参考 
* [如何判断是pc端还是移动端](https://blog.csdn.net/ZiChen_Jiang/article/details/121746444)
* [JavaScript 侦测手机浏览器的五种方法](https://www.ruanyifeng.com/blog/2021/09/detecting-mobile-browser.html)

## 一、navigator.userAgent
## 二、window.screen，window.innerWidth
## 三、window.orientation
## 四、touch 事件

第四种方法是，手机浏览器的 DOM 元素可以通过`ontouchstart`属性，为`touch`事件指定监听函数。桌面设备没有这个属性。

> ```javascript
> function isMobile() { 
>   return ('ontouchstart' in document.documentElement); 
> }
> 
> // 另一种写法
> function isMobile() {
>   try {
>     document.createEvent("TouchEvent"); return true;
>   } catch(e) {
>     return false; 
>   }
> }
> ```



## 五、window.matchMedia()