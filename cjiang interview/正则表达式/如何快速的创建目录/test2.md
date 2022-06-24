- [Record the interview's questions:](#record-the-interviews-questions)
  - [面试题](#面试题)
    - [1、响应式数据原理](#1响应式数据原理)
    - [2、Vue.$nextTick()](#2vuenexttick)
    - [3、强缓存与协商缓存](#3强缓存与协商缓存)
    - [4、页面的性能优化有哪些？](#4页面的性能优化有哪些)
    - [5、为什么Vue中有些数据会监听不到，具体是哪些？](#5为什么vue中有些数据会监听不到具体是哪些)
    - [6、Vue组件的传递方式](#6vue组件的传递方式)
    - [7、Vue中 props和data的区别](#7vue中-props和data的区别)
    - [8、Vue的生命周期](#8vue的生命周期)
    - [9、封装过element-UI组件的二次组件吗？具体怎么做](#9封装过element-ui组件的二次组件吗具体怎么做)
    - [10、Vue的computed 和 watch的区别及应用](#10vue的computed-和-watch的区别及应用)
    - [11、js的数据类型](#11js的数据类型)
    - [12、怎么判断一个数据类型？](#12怎么判断一个数据类型)
    - [13、ajax 请求放在Vue的哪个生命周期，为什么？](#13ajax-请求放在vue的哪个生命周期为什么)
    - [14、深拷贝和浅拷贝](#14深拷贝和浅拷贝)
    - [15、在Vue中，页面刷新的时候会更新数据，你怎么做？](#15在vue中页面刷新的时候会更新数据你怎么做)
    - [16、vue-router有什么方法](#16vue-router有什么方法)
    - [17、axios的封装](#17axios的封装)
    - [18、移动端以及PC端 两端的适配方案](#18移动端以及pc端-两端的适配方案)
    - [19、为什么Vue中的data是一个函数](#19为什么vue中的data是一个函数)
    - [20、Vue后台的权限控制的设计](#20vue后台的权限控制的设计)
    - [21、小程序有什么优化的策略](#21小程序有什么优化的策略)
    - [图片渲染优化](#图片渲染优化)
    - [减小代码包体积](#减小代码包体积)
    - [分包加载](#分包加载)
    - [22、小程序登录的流程 如何 获取openid](#22小程序登录的流程-如何-获取openid)
    - [23、虚拟DOM](#23虚拟dom)
    - [24、webpack的loader有啥？](#24webpack的loader有啥)
      - [loader是什么？](#loader是什么)
    - [25、keep-alive](#25keep-alive)
      - [原理](#原理)
      - [使用方法](#使用方法)
    - [26、argument的使用](#26argument的使用)
    - [27、Jquery封装组件的思路，有几种封装的思路，哪种封装的思路比较好？](#27jquery封装组件的思路有几种封装的思路哪种封装的思路比较好)
    - [28、面向对象设计模式的理解](#28面向对象设计模式的理解)
      - [设计模式是什么？](#设计模式是什么)
        - [设计模式可以分为以下三种模式](#设计模式可以分为以下三种模式)
    - [29、对闭包的理解](#29对闭包的理解)
    - [30、对响应式布局的理解](#30对响应式布局的理解)
    - [31、对原型链的理解？__proto__理解吗？](#31对原型链的理解__proto__理解吗)
    - [32、函数式编程语言有哪些（程序员常用的编程语言介绍）](#32函数式编程语言有哪些程序员常用的编程语言介绍)
    - [33、文档的加载顺序](#33文档的加载顺序)
      - [总结](#总结)
    - [34、ES6](#34es6)
    - [35、路由守卫的钩子函数和created哪个优先级更高？](#35路由守卫的钩子函数和created哪个优先级更高)
  - [笔试题：](#笔试题)
    - [1、盒模型包括几部分，分别叫什么？](#1盒模型包括几部分分别叫什么)
    - [2、position包括几种属性？absolute和relative的区别？](#2position包括几种属性absolute和relative的区别)
    - [3、vue的常用指令有哪些](#3vue的常用指令有哪些)
    - [4、vuex应用程序的状态管理模式有哪些代表的作用是什么？](#4vuex应用程序的状态管理模式有哪些代表的作用是什么)
    - [5、Javascript 中的定时器有哪些?他们的区别及用法是什么](#5javascript-中的定时器有哪些他们的区别及用法是什么)
      - [**尽量不用setInterval()**](#尽量不用setinterval)
        - [原因一、setInterval()无视代码错误](#原因一setinterval无视代码错误)
        - [原因二、setInterval无视网络延迟](#原因二setinterval无视网络延迟)
        - [原因三、setInterval不保证执行](#原因三setinterval不保证执行)
    - [6、JSONP 是什么?它是如何实现跨域的?为什么它可以实现跨域?](#6jsonp-是什么它是如何实现跨域的为什么它可以实现跨域)
    - [7、Vue的父组件和子组件生命周期钩子函数的执行顺序?](#7vue的父组件和子组件生命周期钩子函数的执行顺序)
    - [8、Vue组件间通信有哪几种方式](#8vue组件间通信有哪几种方式)
    - [9、Vue-router路由模式有几种?分别是什么?](#9vue-router路由模式有几种分别是什么)
    - [10、ajax请求原理解析](#10ajax请求原理解析)
    - [11、http和https的区别](#11http和https的区别)
    - [12、小程序的实现原理是什么](#12小程序的实现原理是什么)
    - [13、小程序生命周期函数](#13小程序生命周期函数)


# Record the interview's questions:
Vue相关底层问题参考下[Big shark@LX](https://juejin.cn/user/3104676570214286)的文章

[最全的 Vue 面试题+详解答案](https://juejin.cn/post/6961222829979697165)


## 面试题
### [1、响应式数据原理](https://juejin.cn/post/7099773052224798750/)

### 2、Vue.$nextTick()
参考文章：

* 原理篇
[你真的理解$nextTick么](https://juejin.cn/post/6844903843197616136#heading-6)

* 具体怎么用

[# created里面怎么拿取dom之$nextTick怎么用？
](https://blog.csdn.net/qq_54753561/article/details/122577051)

[<Vue篇> 异步更新队列 - $nextTick()](https://www.jianshu.com/p/a844aa1c9986)



### 3、强缓存与协商缓存
[你知道304吗？图解强缓存和协商缓存](https://juejin.cn/post/6974529351270268958#heading-31)


### 4、页面的性能优化有哪些？
[前端的项目构建性能优化和页面性能优化](https://juejin.cn/post/7084149224312897549)

### 5、为什么Vue中有些数据会监听不到，具体是哪些？
`对于对象`

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property。

-   `Vue.set(vm.someObject, 'b', 2)`
-   `this.$set(this.someObject,'b',2)`
-   `this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })`



`数组`

Vue 不能检测以下数组的变动：

1.  当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue；
2.  当你修改数组的长度时，例如：vm.items.length = newLength；

Vue重新了数组的方法可以正常的改动
同时重写了 Array 的多个方法：（ *能改变原有数组的API基本都重写了* ）

-   push
-   pop
-   shift
-   unshift
-   splice
-   sort
-   reverse


### 6、Vue组件的传递方式
1.  props、$emit

2.  $parent,$children 获取当前组件的父组件和当前组件的子组件

3.  $attrs 和$listeners A->B->C。Vue 2.4 开始提供了$attrs 和$listeners 来解决这个问题

4.  父组件中通过 provide 来提供变量，然后在子组件中通过 inject 来注入变量。(官方不推荐在实际业务中使用，但是写组件库时很常用)

5. $refs 获取组件实例

6. eventBus 兄弟组件数据传递 这种情况下可以使用事件总线的方式.

7. vuex 状态管理


### 7、Vue中 props和data的区别 
       prop ——> 只读，咨询了下网友是可以进行修改的，只是官方文档不建议这样子做
       data ——> 可读可写
       
[官网API->data](https://cn.vuejs.org/v2/api/#data)

[单向数据流]( https://cn.vuejs.org/v2/guide/components-props.html#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81)


### 8、Vue的生命周期
参考自己的文章：https://juejin.cn/post/7112358736663937054/


       
### 9、封装过element-UI组件的二次组件吗？具体怎么做
参考下 里面的common组件（src->component->common）

[vue-management-demo](https://github.com/Cjiangha/vue-management-demo/tree/master/vue-manager/src/components)

### 10、Vue的computed 和 watch的区别及应用
computed 是计算属性，依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容，它可以设置 getter 和 setter。

watch 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

计算属性一般用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑
    

### 11、js的数据类型
[JavaScript 数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
JavaScript 语言中类型集合由[*原始值*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8E%9F%E5%A7%8B%E5%80%BC)和[*对象*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%AF%B9%E8%B1%A1)组成。

-   [原始值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8E%9F%E5%A7%8B%E5%80%BC)（直接表示在语言底层的不可变数据）

    -   [布尔类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%B8%83%E5%B0%94%E7%B1%BB%E5%9E%8B)
    -   [Null 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#null_%E7%B1%BB%E5%9E%8B)
    -   [Undefined 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#undefined_%E7%B1%BB%E5%9E%8B)
    -   [数字类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E6%95%B0%E5%AD%97%E7%B1%BB%E5%9E%8B)
    -   [BigInt 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#bigint_%E7%B1%BB%E5%9E%8B)
    -   [字符串类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%B1%BB%E5%9E%8B)
    -   [符号类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E7%AC%A6%E5%8F%B7%E7%B1%BB%E5%9E%8B)

-   [对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%AF%B9%E8%B1%A1)（一组属性的集合）

### 12、怎么判断一个数据类型？ 
[# js中判断对象数据类型的方法](https://blog.csdn.net/q1424966670/article/details/83898136)
*  **1、typeof**
*  **2、instanceof**
*  **3、constructor**
*  **4、**利用tostring()方法****



### 13、ajax 请求放在Vue的哪个生命周期，为什么？
直接上代码来的快，因为ajax请求其实就是一个宏任务，即和setTimeout一致的fn，那么当我们执行的时候，
setTimeout的时候，用以下代码，自行测试，可以看到setTimeout 其实可以作用于 beforeCreate、created、beforeMount 都可以成功执行的，外面面试官是讲要放在created，那后面回答就这个吧，毕竟你要顺他的意思，emm，who know these questions？
```HTML
<body>
    <div id="demo">
        {{name}}
    </div>
    <script src="vue.js"></script>
    <script>
        var vm = new Vue({
            // 选项
            el: '#demo',
            data: {
                name: 'yao'
            },
            // 创建前 没M没有V(虚拟DOM真实DOM)
            beforeCreate() {
                console.log('--------------beforeCreate---------------')
                console.log('View', this.$el)
                console.log('Model', this.$data)
                setTimeout(()=>{
                    this.name = 'ming'
                },100)
            },
            // 创建后
            created() {
                console.log('--------------created---------------')
                console.log('View', this.$el)
                console.log('Model', this.$data)
            },
            beforeMount(){
                console.log('beforeMount')
            }
        })
    </script>
</body>
```


### 14、深拷贝和浅拷贝
可以根据两个问题去思考
1. 浅拷贝和深拷贝是什么
2. 浅拷贝和深拷贝具体的方法
```js
    //1、浅拷贝和深拷贝
     //单纯的拷贝指针，后面修改会互相影响，这个就是浅拷贝
    var arr = [1,2,3];
    var arr2 = arr;//拷贝
    arr2.push(66);
    console.log(arr);
    console.log(arr2);
   
   //深度拷贝：复制过来，后期修改互不干扰
    var arr3 = [1,2,3];
    var arr4 = [];
    arr3.forEach(function(item) {
        arr4.push(item);
    });
    arr4.push(123);
    console.log(arr3);
    console.log(arr4);
   
   //2、借助json的两个方法实现深度拷贝
   JSON.parse(text)：将json字符串转换成对象/数组
   JSON.stringify(value)：将数组/对象转换成标准的json字符串

    var arr5 = [1,2,3];
    
    function cloneDeep(obj) {//深度拷贝
        var str = JSON.stringify(obj);
        var newobj = JSON.parse(str);
        return newobj;
    }

    var arr6 = cloneDeep(arr5);
    arr6.push(345);
    console.log(arr5);
    console.log(arr6);

    //对象的拷贝
    var good = {
        title : '华为',
        color : 'red',
        url : {
            url1 : 'img1.jpg',
            url2 : 'img2.jpg'
        }
    }

    var newgood = cloneDeep(good);
    newgood.price = 8999;
    console.log(good);
    console.log(newgood);
   ```
   
  参考文章
[# 轻松拿下 JS 浅拷贝、深拷贝](https://juejin.cn/post/7072528644739956773)

### 15、在Vue中，页面刷新的时候会更新数据，你怎么做？
[异步更新队列：Vue.$nextTick()](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

### 16、vue-router有什么方法
**参考下文档:**

[vue-router api](https://router.vuejs.org/zh/api/#to)

**router-view**

>router-view 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

**props:**
  * to （核心）
  ```
  <router-link to="/home">Home</router-link>
  ```
  * replace 
  * active-class 
  * aria-current-value 
  * custom 
  * exact-active-class

**router-link**

>我们没有使用常规的 a 标签，而是使用一个自定义组件 router-link 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。

**props:**
* name
* route

$route

    $ route是一个跳转的路由对象（路由信息对象），每一个路由都会有一个$route对象，是一个局部的对象。
    
    主要的属性有：
    $route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如/home/ews
    $route.params 对象，包含路由中的动态片段和全匹配片段的键值对，不会拼接到路由的url后面 
    $route.query 对象，包含路由中查询参数的键值对。会拼接到路由url后面
    $route.router 路由规则所属的路由器 
    $route.name 当前路由的名字，如果没有使用具体路径，则名字为空

 $router 
 
    $router是VueRouter的一个实例，他包含了所有的路由，包括路由的跳转方法，钩子函数等，也包含一些子对象（例如history）
常用的跳转连接的方法：

```javascript
    //常规方法
    this.$router.push("/login");
    //使用对象的形式 不带参数
    this.$router.push({ path:"/login" });
    //使用对象的形式，参数为地址栏上的参数
    this.$router.push({ path:"/login",query:{username:"jack"} }); 
    //使用对象的形式 ，参数为params 不会显示在地址栏
    this.$router.push({ name:'user' , params: {id:123} });
```

### 17、axios的封装
[axios中文网](http://www.axios-js.com/zh-cn/docs/)

Axios是什么？
Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

特性
- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

```js
// api -> axios
import axios from 'axios'
import config from '../config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            Headers: {}
        }
    }
    instencepotors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    // 看着像闭包
    request(option){
        const instance = axios.create()
        options = {...this.getInsideConfig(),...option}
        this.instencepotors(instance) // 调用拦截器
        return instance(options)
    }
}
export default new HttpRequest(baseUrl)

// config -> index.js
export default {
    baseUrl:{
        //开发环境
        dev:'/api/',
        //生产环境
        pro:''
    }
}

// api -> data.js 
import axios from "./axios"; // 引入axios.js文件夹下的内容
export const getMenu = (param)=>{
    return axios.request({
        url:'/permission/getMenu',
        methods:'post',
        data:param
    })
}
```


### 18、移动端以及PC端 两端的适配方案
[# PC端、移动端的页面适配及兼容处理](https://blog.csdn.net/xiangyun20021990/article/details/80653910)

### [19、为什么Vue中的data是一个函数](https://juejin.cn/post/6961222829979697165#heading-5)

组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的 data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全都会变的结果

### 20、Vue后台的权限控制的设计
Vue如何实现

* 路由守卫
```
router.beforeEach((to, from, next){
//路由守卫逻辑自行处理，常用  to next
}
```

* 后台返回路由表
```js
{
      path:'/Transp',
      name:'Transp',
      component:Transp,
      meta:{
        roles: 'AH'//这个页面用户AH有权限来看
      },
},
```

* 动态路由渲染
```
menuArray.forEach(item=>{
    router.addRoute('Main',item)
  })
}
```



参考文章 [# VUE后台管理系统权限管理](https://blog.csdn.net/weixin_44184780/article/details/123878134)


### 21、小程序有什么优化的策略
参考[# 强烈推荐的微信小程序开发总结](https://juejin.cn/post/6961317489225498631#heading-1)

emm,写的真不错，直接copy？咱们就这样干吧
### 图片渲染优化

-   利用压缩技术对图片进行压缩，在图片显示质量不受太大影响的情况下，可以对图片进行适度压缩，png 推荐[tinypng.com/](https://link.juejin.cn?target=https%3A%2F%2Ftinypng.com%2F "https://tinypng.com/")
-   小程序Image组件支持通过配置lazy-load参数来实现懒加载[懒加载](https://link.juejin.cn?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fcomponent%2Fimage.html "https://developers.weixin.qq.com/miniprogram/dev/component/image.html")
-   利用cdn服务商（[阿里云OSS](https://link.juejin.cn?target=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F44703.html%3Fspm%3Da2c4g.11186623.6.1097.7f4d720ds2hjep "https://help.aliyun.com/document_detail/44703.html?spm=a2c4g.11186623.6.1097.7f4d720ds2hjep")）提供的能力获取适当的图片,支持格式转换、质量变换、尺寸处理
-   使用webp格式的图片

```

// in app.wxs 利用阿里云oss提供的服务转换图片格式
var wrapUrl = function (url) {
  var fConfig = '?x-oss-process=image/format,webp'
  return url + fConfig
}

// in wxml
<image webp src="{{ tools.wrapUrl(url) }}"  />
复制代码
```

### 减小代码包体积

使用[小程序瘦身工具](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwechat-miniprogram%2Fminiprogram-slim "https://github.com/wechat-miniprogram/miniprogram-slim")，通过剔除无用文件、压缩图片、复用代码等方式减少小程序代码包体积

```
npm install -g miniprogram-slim
复制代码
```

### [分包加载](https://link.juejin.cn?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fframework%2Fsubpackages.html "https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html")

某些情况下，开发者需要将小程序划分成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。 在构建小程序分包项目时，构建会输出一个或多个分包。每个使用分包小程序必定含有一个**主包**。所谓的主包，即放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本；而**分包**则是根据开发者的配置进行划分。 在小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示。 目前小程序分包大小有以下限制：

-   整个小程序所有分包大小不超过 20M
-   单个分包/主包大小不能超过 2M

对小程序进行分包，可以优化小程序首次启动的下载时间，以及在多团队共同开发时可以更好的解耦协作。 


**再附上个实操党福利篇、Tencent 大佬 的优化建议（未看）、Taro实战文章**

[强烈推荐的微信小程序开发总结](https://juejin.cn/post/7089329743031435300?share_token=d9a539a5-16a1-4de7-bfcd-c27455d09a8a#heading-3)

[小程序性能优化实践](https://developers.weixin.qq.com/community/business/course/000606628dc2e86dc0ddcbb115940d)

[使用 Taro + Vue3 开发微信小程序](https://juejin.cn/post/7051828074362437663#heading-0)

### 22、小程序登录的流程 如何 获取openid
参考[小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d026128ffd074506b236115807d6290a~tplv-k3u1fbpfcp-watermark.image?)

openid：使用链接下的服务端接口
https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html

`code2Session` 的返回包:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c74683d083cc4a27b5096fedb96d4ff8~tplv-k3u1fbpfcp-watermark.image?)
### 23、虚拟DOM
根据DOM diff算法,所有的DOM变动，都先在虚拟DOM上发生，然后再将实际发生变动的部分反映在真实DOM上（可以极大的提高网页的性能）

虚拟DOM就是将DOM树转换成一个JS对象树，

![35b3293b645c4f276c450fe9c63c852.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ad8afbe3181474f8796932b0a37432f~tplv-k3u1fbpfcp-watermark.image?)

虚拟DOM就是将上述的标签写成一个js对象树，如下


![147685301d349a107ca9740ea7faa6e.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44c67269d4374e6bbcc57fd59063f28b~tplv-k3u1fbpfcp-watermark.image?)

当DOM改变的时候，他会使用Diff算法将改变以后的js对象树与原先的js对象树进行比较，这个比较是逐层比较的，当发现节点删除就删除，增加就增加，但是由于他是一级一级进行比较的，这样就会有一个致命的缺点：假设在根元素上又嵌套了一个元素，那么Diff算法在比较第一层的时候就认为改变了，就相当于重新创建了一个JS对象树，这样效率还是不高，此外，还有一个致命的缺点就是;如果同一级上有特别多个相同的元素，在增加或者排序的时候，就会在循环比较的时候浪费掉大量的性能

于是，为了解决这两个缺点，虚拟DOM做了两个假设，并且这两个假设也实现了，所以已经解决了这两个缺点

两个假设：

1、两个相同的组件产生类似的DOM结构，不同的DOM节点产生不同的DOM节点

2、对于同一个层次的一组节点，他们可以通过唯一的id进行区分

对于第二种假设，就是解释了我们为什么要在vue的v-for里面必须加一个key 并且这个key要是唯一的

### 24、webpack的loader有啥？
参考webpack官方文档:[## webpack-loader](https://www.webpackjs.com/concepts/loaders/)

#### loader是什么？
loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS文件！
之前配置过的webpack.config.js，use:

**npm安装命令**
```
npm install --save-dev style-loader
npm install --save-dev css-loader
npm install --save-dev sass-loader
```
```js

// node内置模块  专门去处理路径
const path = require('path');

module.exports = {
    // 开发模式，生产模式 production or development
    // 开发环境会自动匹配非压缩的jquery.js
    // 生产环境会匹配压缩版本
    mode: 'development',
    // 入口 入口是可以包含所有的模块(.css .sass.js.html fs http jquery request)
    entry: './src/index.js',
    // 出口 
    output: {
        //   输出的位置
        path: path.resolve(__dirname, 'dist'), //__dirname 总是指向被执行 js 文件的绝对路径
        // 输出的文件名为 bundle打包后的模块文件
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.txt$/,
            use: 'raw-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }]
    }
};
```

### 25、keep-alive
* 使用了LRU 算法
#### 原理
 https://juejin.cn/post/6961222829979697165#heading-34
#### 使用方法
[vue中的keep-alive的用法详细讲解](https://segmentfault.com/a/1190000040006753)


### 26、argument的使用
参考mdn文档：
[argument](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

argument是什么？

**`arguments`** 是一个对应于传递给函数的参数的类数组**对象**。
```js
function func1(a, b, c) {
  console.log(arguments[0]);
  // expected output: 1

  console.log(arguments[1]);
  // expected output: 2

  console.log(arguments[2]);
  // expected output: 3
}

func1(1, 2, 3);
```
遍历求和：
```js
function add() {
    var sum =0,
        len = arguments.length;
    for(var i=0; i<len; i++){
        sum += arguments[i];
    }
    return sum;
}
add()                           // 0
add(1)                          // 1
add(1,2,3,4);                   // 10
```
 **剩余参数**语法允许我们将一个不定数量的参数表示为一个数组。
```js
function sum(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}

console.log(sum(1, 2, 3));
```




### 27、Jquery封装组件的思路，有几种封装的思路，哪种封装的思路比较好？
直接参考我的文章，里面有一个最简单的封装，后面再加

[# Jquery 组件封装](https://juejin.cn/post/7100776383894257678)

### 28、面向对象设计模式的理解
参考文章 [# 前端开发中常用的几种设计模式](https://root181.blog.csdn.net/article/details/119757216)
#### 设计模式是什么？

> 设计模式是对软件设计开发过程中反复出现的某类问题的通用解决方案。设计模式更多的是指导思想和方法论，而不是现成的代码，当然每种设计模式都有每种语言中的具体实现方式。学习设计模式更多的是理解各种模式的内在思想和解决的问题，毕竟这是前人无数经验总结成的最佳实践，而代码实现则是对加深理解的辅助。
##### 设计模式可以分为以下三种模式

-   结构型模式(Structural Patterns): 通过识别系统中组件间的简单关系来简化系统的设计。
    - 1. 工厂模式我们从简单的开始: 简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例。 
    - 2. 单例模式
           - 单：指的是一个
           - 例：指的是创建的实例
           - 单例：指的是创建的总是同一个实例。也就是使用类创建的实例始终是相同的
    - 3.原型模式: 通俗点讲就是创建一个共享的原型，并通过拷贝这些原型创建新的对象。**其实原型模式就是指定新创建对象的模型,更通俗一点来说就是我想要新创建的对象的原型是我指定的对象。  使用api   Object.create()**
     
-   创建型模式(Creational Patterns): 处理对象的创建，根据实际情况使用合适的方式创建对象。常规的对象 创建方式可能会导致设计上的问题，或增加设计的复杂度。创建型模式通过以某种方式控制对象的创建来解决问题。
    - 1.装饰器模式：为对象添加新功能，不改变其原有的结构和功能。适配器模式是原有的不能用了，要重新封装接口。装饰器模式是原有的还能用，但是需要新增一些东西来完善这个功能。比如，手机壳，手机本身的功能不受影响，手机壳就是手机的装饰器模式。
    - 2.适配器模式：旧接口格式和使用者不兼容，中间加一个适配转换接口。
         比如国外的插座跟国内的插座不一样，我们需要买个转换器去兼容。
    
    - 3.代理模式：使用者无权访问目标对象，中间加代理，通过代理做授权和控制。明星经纪人：比如有个演出，要请明星，要先联系经纪人。
    
-   行为型模式(Behavioral Patterns):用于识别对象之间常见的交互模式并加以实现，如此，增加了这些交互的灵活性。
    - 1.策略模式：一种简单却常用的设计模式，它的应用场景非常广泛。我们先了解下策略模式的概念，再通过代码示例来更清晰的认识它。策略模式由两部分构成：一部分是封装不同策略的策略组，另一部分是 Context。通过组合和委托来让 Context 拥有执行策略的能力，从而实现可复用、可扩展和可维护，并且避免大量复制粘贴的工作。

    - 2.观察者模式：观察者模式又叫发布订阅模式（Publish/Subscribe），它定义了一种一或一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。典型代表vue/react等。
    - 3.迭代器模式：ES6中的迭代器 Iterator 相信大家都不陌生，迭代器用于遍历容器（集合）并访问容器中的元素，而且无论容器的数据结构是什么（Array、Set、Map等），迭代器的接口都应该是一样的，都需要遵循 迭代器协议。
    - 4.状态模式：一个对象有状态变化，每次状态变化都会触发一个逻辑，不能总是用if...else来控制。


### 29、对闭包的理解

闭包是指有权访问另一个函数作用域中的变量的函数。或简单理解为**定义在一个函数内部的函数**，该内部函数持有外部函数内变量的引用，即使它在创造它的环境之外执行。

```js
function f1(){
    n = 999;
    function f2(){ //f2是一个闭包
        alert(n);
    }
    return f2;
}
var result = f1();
result(); //999
```
深入原理：当一个函数执行时会创建一个执行环境(含有一个该环境所有变量的变量对象)及相应的作用域链。

作用域链是一个指针列表，前端指向该函数环境的变量对象，第二位是其包含函数环境的变量对象，依次向外直到全局环境 的全局对象。函数在执行中需要访问某个变量时就会顺着作用域链查找。

f2的作用域链包含了 f2,f1及全局的变量， f2因此可以访问到f1中的变量。

一般情况下f1执行完毕环境和变量对象就会销毁，但是由于返回的f2的作用域链仍在引用f1的变量对象，所以f1中变量仍留在内存中。

除非用f2=null解除f2的引用，垃圾回收机制会将其销毁(伴随作用域链)，fl也会安全销毁。

弊端： 
由于闭包会使其所有外部环境的变量对象都被保存在内存中，可能会造成内存泄漏。

应用：可以隐藏变量使其无法直接访问， 需通过函数间接访问。可以让变量长期驻 留在内存中，以供其他地方访问。模块是 闭包最强大的一个应用。

参考文章：[# 闭包知识点
](https://blog.csdn.net/qq_32442973/article/details/119850005)


### 30、对响应式布局的理解
参考文章[# HTML+CSS十分钟实现响应式布局页面，响应式布局实战教程](https://blog.csdn.net/qq_23853743/article/details/112751229)

理解下面两个知识点即可
* **什么是[响应式布局](https://so.csdn.net/so/search?q=%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B8%83%E5%B1%80&spm=1001.2101.3001.7020)？**

 响应式布局指的是同一页面在不同屏幕尺寸下有不同的布局。
* **CSS3 @media 查询定义和使用:**


### 31、对原型链的理解？__proto__理解吗？

具体的案例
document.__proto__,一直往上层找原型方法，如截图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a8823c463f04e77959d8b6c6208880f~tplv-k3u1fbpfcp-watermark.image?)

参考下文章
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a61030caf7b7475390984eac83aa309f~tplv-k3u1fbpfcp-watermark.image?)

已经废除，但是chrome还保留着__proto__

可以参考下[# [JS __proto__存在的意义？](https://segmentfault.com/q/1010000039968681)]

### 32、[函数式编程语言有哪些（程序员常用的编程语言介绍）](https://m.10qianwan.com/articledetail/853048.html)
### 33、文档的加载顺序
#### 总结
域名解析为IP->通过三次握手和四次握手,保证通道的安全可靠,真正的传输报文。服务器根据你的请求发出响应，服务器返回到客户端的数据一般是：html、css、js、外部资源(图片、音频视频),服务器解析过程:
   1. 解析HTML结构。
   2. 加载外部脚本和样式表文件。
   3. 解析并执行部分脚本代码。
   4. DOM树构建完成。//DOMContentLoaded
   5. 加载图片等外部文件。
   6. 页面加载完毕。//window.onload
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 1.解析HTML结构。 -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>文档的加载顺序</title>
    <!-- 2.加载外部脚本和样式表文件。 -->
    <link rel="stylesheet" href="css/css.css">
    <script src="../common.js"></script>
    <script>
        /*
            http事务：浏览器输入网址为什么就能看到网页？

            1.输入网址回车的一瞬间；
            2.域名解析：把域名解析成ip地址，就可以知道服务器地址；
            3.就可以根据ip地址给服务器发送请求(客户端)；
            4.三次握手或四次握手(确保通道安全可靠，真正传输报文)
            5.服务器根据你的请求发出响应(服务器)；
            6.服务器返回到客户端的数据一般是：html、css、js、外部资源(图片、音频视频)
                1.解析HTML结构。
                2.加载外部脚本和样式表文件。
                3.解析并执行部分脚本代码。
                4.DOM树构建完成。//DOMContentLoaded
                5.加载图片等外部文件。
                6.页面加载完毕。//window.onload

   
        
            document事件：
                * DOMContentLoaded：要用事件监听的方式绑定
                * readystatechange
                    * interactive
                    * complete
        */

        // 3.解析并执行部分脚本代码。
    //    console.log(666);

       window.onload = function() {//4
           //等页面都加载完毕才执行这里的代码？
           //如果代码写在上方，不用onload延迟执行时间的话，是找不到节点的
           //如果你的网页出现空白怎么办？
           //html+css+js:1.js应该放在最下面加载，因为用户先看到html和样式，页面马上就响应，速度会比较快，用户体验比较好；2.把脚本的执行时间转移到DOM树构建完成。
            console.log('window onload');
            //代码
       }

       document.addEventListener('DOMContentLoaded',function() {//2
            console.log('DOMContentLoaded');
            //代码
       },false);

       document.onreadystatechange = function() {
           if(document.readyState == 'interactive') {//速度最快：1 jq的入口就有这个效果；$(function() {}) 节点边生成边执行
               console.log('interactive');
               //代码
           }
           if(document.readyState == 'complete') {//3
                console.log('complete');
                //代码
           }
       }

    </script>
</head>
<body>
    <!-- 4.DOM树构建完成。//DOMContentLoaded -->
    <h1>
        <p>
            <a href="###"></a>
        </p>
    </h1>
    <!-- 5.加载图片等外部文件。 -->
    <img src="" alt="">
    <video src=""></video>
    <!-- 6.页面加载完毕。//window.onload -->
</body>
<script>
    // 3.解析并执行部分脚本代码。
    (function () {//开发的时候写在下方最多
        console.log('自调用');
    })();
</script>
</html>
```

### 34、ES6
参考：https://juejin.cn/post/7110809827097444382

### 35、路由守卫的钩子函数和created哪个优先级更高？
具体参考文章[# vue路由守卫、keep-alive后生命周期](https://blog.csdn.net/Darlingmi/article/details/123269870)


Vue路由钩子在生命周期函数的体现

完整的路由导航解析流程（不包括其他生命周期）：

- 触发进入其他路由。
- 调用要离开路由的组件守卫`beforeRouteLeave`
- 调用全局前置守卫∶ `beforeEach`
- 在重用的组件里调用 `beforeRouteUpdate`
- 调用路由独享守卫 `beforeEnter`。
- 解析异步路由组件。
- 在将要进入的路由组件中调用 `beforeRouteEnter`
- 调用全局解析守卫 `beforeResolve`
- 导航被确认。
- 调用全局后置钩子的 `afterEach` 钩子。
- 触发DOM更新（`mounted`）。
- 执行`beforeRouteEnter` 守卫中传给 next 的回调函数。

触发钩子的完整顺序
     
 将路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件：

* `beforeRouteLeave`:路由组件的组件离开路由前钩子，可取消路由离开。
* `beforeEach`: 路由全局前置守卫，可用于登录验证、全局路由loading等。
* `beforeEnter`: 路由独享守卫
* `beforeRouteEnter`: 路由组件的组件进入路由前钩子。
* `beforeResolve`:路由全局解析守卫
* `afterEach`:路由全局后置钩子
* `beforeCreate`:组件生命周期，不能访问this。
* `created`:组件生命周期，可以访问`this`，不能访问`dom`。
* `beforeMount`:组件生命周期
* `deactivated`: 离开缓存组件a，或者触发a的`beforeDestroy和destroyed`组件销毁钩子。
* `mounted`:访问/操作`dom`。
* `activated`:进入缓存组件，进入a的嵌套子组件(如果有的话)。
* 执行`beforeRouteEnter`回调函数`next`。


## 笔试题：

### 1、盒模型包括几部分，分别叫什么？
    content、padding、margin、border

### 2、position包括几种属性？absolute和relative的区别？
    absolute 绝对定位，相对于它爹
    relative 相对定位，相对于原本的位置
    Fixed 绝对定位，相对于视图窗口
    static：默认，无定位
    Inherit：继承父元素的position值
   
    relative特点
    1）不影响元素本身的特性；
    2）不使元素脱离文档流（元素移动之后原始位置会被保留）；
    3）如果没有定位偏移量，对元素本身没有任何影响；
    4）提升层级。
    
    absoulte特点：
    1）使元素完全脱离文档流；
    2）使内嵌支持宽高
    3）块属性标签内容撑开宽度；
    4）如果有定位父级相对于定位父级发生偏移，没有定位父级相对于document发生偏移；
    5）相对定位一般都是配合绝对定位元素使用；
    6）提升层级
    
    区别
    relative设置的div宽度和父类的div宽度相同，所以给子类一定宽度时，父类随之变化。\
    而absolute不会。
    
   [文档流](https://baike.baidu.com/item/%E6%96%87%E6%A1%A3%E6%B5%81/1226695?fr=aladdin)

### 3、vue的常用指令有哪些
v-once指令、v-show指令、v-if指令、v-else指令、v-else-if指令、v-for指令、v-html指令、v-text指令、v-bind指令、v-on指令、v-model指令等等。
参考

[vue常用指令](https://blog.csdn.net/jayLog/article/details/122743727)

### 4、vuex应用程序的状态管理模式有哪些代表的作用是什么？
1.state
存放仓库的状态

2.mutations
 如果要修改state中数据，必须通过mutations进行修改（同步的）
 专门负责直接修改state中的数据，不能进行异步操作

3.actions
**作用：异步处理修改 state中的数据**
组件调用当前actions中的 方法，actions方法调用mutations的方法，修改state数据；

4.getters
类似于计算属性一样的属性；

5.辅助函数
> mapGetters是快速获取getters中的数据，在计算属性中进行操作
>
> mapActions是快速获取actions中的方法，在methods中进行操作

参考文章
[# Vue.2.0中Vuex状态管理模式](https://blog.csdn.net/GotYoung/article/details/124573310)

### 5、Javascript 中的定时器有哪些?他们的区别及用法是什么

setInterval() 和 # setTimeout()

setTimeout()和setInterval()经常被用来处理延时和定时任务。setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式,而setInterval()则可以在每隔指定的毫秒数循环调用函数或表达式，直到clearInterval把它清除。

setTimeout()只执行一次，而setInterval可以多次调用。

重复的定时器带来的问题：
 1. 某些间隔会被跳过
 2.多个定时器的代码执行之间的间隔可能比预期要小
 
#### **尽量不用setInterval()**

##### 原因一、setInterval()无视代码错误
##### 原因二、setInterval无视网络延迟

##### 原因三、setInterval不保证执行

参考下文章：
[# setInterval()和setTimeout()区别](https://blog.csdn.net/mayue24/article/details/80879685)

### 6、JSONP 是什么?它是如何实现跨域的?为什么它可以实现跨域?
JSONP(JSON with Padding)是 json 的一种"**使用模式**"，可以让网页从别的域名（网站）那里获取资料，即**跨域读取数据。**

由于[同源政策](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)的原因，我们从不同的域名（网站）访问数据需要一个特殊的技术———**JSONP**

**为什么?那要参考原理了**

**JSONP的原理**

1、利用`script`标签的`src`属性来实现跨域。

2、通过将前端方法作为[参数传递](https://so.csdn.net/so/search?q=%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92&spm=1001.2101.3001.7020)到服务器端，然后由服务器端注入参数之后再返回，实现服务器端向客户端通信。


具体代码：[# JSONP 教程](https://www.runoob.com/json/json-jsonp.html)

**服务端**
```php
<?php header('Content-type: application/json'); 
//获取回调函数名 
$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']); 
//json数据 
$json_data = '["customername1","customername2"]'; 
//输出jsonp格式的数据
echo $jsoncallback . "(" . $json_data . ")"; 

?>
```

**客户端**
```HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>JSONP 实例</title>
</head>
<body>
<div id="divCustomers"></div>
<script type="text/javascript">
function callbackFunction(result, methodName)
{
    var html = '<ul>';
    for(var i = 0; i < result.length; i++)
    {
        html += '<li>' + result[i] + '</li>';
    }
    html += '</ul>';
    document.getElementById('divCustomers').innerHTML = html;
}
</script>
<script type="text/javascript" src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"></script>
</body>
</html>
```

### 7、Vue的父组件和子组件生命周期钩子函数的执行顺序?

直接上答案

**小结**

-   加载渲染过程

`　　父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted`

-   子组件更新过程

`　　父beforeUpdate->子beforeUpdate->子updated->父updated`

-   父组件更新过程

`　　父beforeUpdate->父updated`

-   销毁过程

`　　父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`

参考帖子
[# Vue父子组件生命周期执行顺序及钩子函数的个人理解](https://blog.csdn.net/weixin_30616969/article/details/94973817)

### 8、Vue组件间通信有哪几种方式


### 9、Vue-router路由模式有几种?分别是什么?
hash模式：
1、url路径会出现 # 字符
2、hash值不包括在 HTTP 请求中，它是交由前端路由处理，所以改变hash值时不会刷新页面，也不会向服务器发送请求
3、hash值的改变会触发hashchange事件

history模式：
1、整个地址重新加载，可以保存历史记录，方便前进后退
2、使用 HTML5 API（旧浏览器不支持）和 HTTP服务端配置，没有后台配置的话，页面刷新时会出现404



**如果vue-router使用history模式，部署时要注意什么？**

HTTP 服务端需要进行配置，将页面请求全部重定向到 index.html。参考官方文档

nginx 配置：

```
location / {
  try_files $uri $uri/ /index.html;
}
```


### 10、ajax请求原理解析
什么是ajax？有什么作用？
Ajax（Asunchronous Javascript and XML）即异步的javascript和XML。
作用：是利用javascript在页面不被刷新、页面链接不被改变的情况下与服务器进行数据交换并进行页面更新渲染，可以使我们做到前后端分离的技术

原理：
发送ajax请求到页面的渲染其实可以简单分为三个部分：
1、发送请求
2、解析数据
3、渲染页面

参考菜鸟教程 [# AJAX](https://www.runoob.com/ajax/ajax-xmlhttprequest-create.html)

用到的api 
* 1、new XMLHttpRequest(); //XMLHttpRequest 用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
* 2、xhr.open //get调用的方法
* 3、xhr.send //post调用的方法
* 4、xhr.onreadystatechange // 发送给后端服务的响应时间
* 5、xhr.readyState //存有 XMLHttpRequest 的状态
* 6、xhr.status // 即chrome 调试器 ->network->xhr -> Headers ->General -> Status Code


```js
//封装的ajax函数
function ajax(opt) {
    //默认参数
    let defaultData = {
        data: '',
        asyn: true,
        failure: null
    }

    Object.assign(defaultData, opt);//用默认参数

    let xhr = new XMLHttpRequest();
    if (defaultData.type.toLowerCase() == 'get') {
        //get方式
        if (defaultData.data) {
            defaultData.data = objToStr(defaultData.data);
            defaultData.url += '?' + defaultData.data;
        }
        xhr.open('get', defaultData.url, defaultData.asyn);
        xhr.send(null);
    } else if (defaultData.type.toLowerCase() == 'post') {
        //post方式
        xhr.open('post', defaultData.url, defaultData.asyn);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        defaultData.data = objToStr(defaultData.data);
        xhr.send(defaultData.data);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                //成功了
                let data = xhr.responseText;
                defaultData.success(data);//实参
            } else {
                //失败
                if (defaultData.failure) {
                    //写了这个回调
                    defaultData.failure(xhr.status);
                }
            }
        }
    }
}
```

### 11、http和https的区别
HTTP 与 HTTPS  的区别

1、HTTPS  协议需要到 CA （Certificate Authority，证书颁发机构）申请证书，一般免费证书较少，因而需要一定费用。(以前的网易官网是http，而网易邮箱是 https 。)

2、HTTP 是超文本传输协议，信息是明文传输，HTTPS 则是具有安全性的 SSL 加密传输协议。

3、HTTP 和 HTTPS 使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

4、HTTP 的连接很简单，是无状态的。HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。(无状态的意思是其数据包的发送、传输和接收都是相互独立的。无连接的意思是指通信双方都不长久的维持对方的任何信息。)

参考帖子：[# HTTP 和 HTTPS 的区别（面试常考题）](https://blog.csdn.net/qq_38289815/article/details/80969419)

### 12、小程序的实现原理是什么
WebView，看官方文档

参考 [## 小程序技术发展史](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%8A%80%E6%9C%AF%E5%8F%91%E5%B1%95%E5%8F%B2)



### 13、小程序生命周期函数
三个概念
* 1、[app的生命周期](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)
属性                                                                                                         | 类型       | 默认值 | 必填 | 说明                   | 最低版本 |
| ---------------------------------------------------------------------------------------------------------- | -------- | --- | -- | -------------------- | ---- |
| [onLaunch](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onLaunch-Object-object) | function |     | 否  | 生命周期回调——监听小程序初始化。    |      |
| [onShow](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onShow-Object-object)     | function |     | 否  | 生命周期回调——监听小程序启动或切前台。 |      |
| [onHide](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onHide)                   | function |     | 否  | 生命周期回调——监听小程序切后台。

* 2、[page的生命周期](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)
  **生命周期回调函数 **

生命周期的触发以及页面的路由方式[详见](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)

 **[](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onLoad-Object-query)onLoad(Object query)**

页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。


 **[](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShow)onShow()**

页面显示/切入前台时触发。

**[](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onReady)onReady()**

页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。

**[](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onHide)onHide()**

页面隐藏/切入后台时触发。 

**[](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onUnload)onUnload()**

页面卸载时触发。

要配合[路由](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)，一起研究下生命周期的触发时机

* 3、[component生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)

 |生命周期     | 参数             | 描述                   | 最低版本                                                                                   |
| -------- | -------------- | -------------------- | -------------------------------------------------------------------------------------- |
| created  | 无              | 在组件实例刚刚被创建时执行        | [1.6.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| attached | 无              | 在组件实例进入页面节点树时执行      | [1.6.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| ready    | 无              | 在组件在视图层布局完成后执行       | [1.6.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| moved    | 无              | 在组件实例被移动到节点树另一个位置时执行 | [1.6.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| detached | 无              | 在组件实例被从页面节点树移除时执行    | [1.6.3](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| error    | `Object Error` | 每当组件方法抛出错误时执行        | [2.4.1](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
