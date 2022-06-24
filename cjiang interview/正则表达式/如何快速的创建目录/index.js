var str2 = `- [Record the interview's questions:](#record-the-interviews-questions)
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
`;

// reg1 /\(.*?\)/g  摸鱼

var reg = /\(#.*?\)/g; //匹配正则 全局
var arr = str2.match(reg);

// var reg2 = /- .*?\]/g;; //匹配正则 全局
// var arr2 = str2.match(reg2);

// console.log(arr)
// console.log(arr2)

// let sum = ``;
// let zong = ``;
// arr.forEach((item1,index1) => {
//     arr2.forEach((item2,index2) => {
//         if(index1 === index2){
//             sum = item2 + item1
//             zong = zong + sum;
//             // console.log(zong)
//             // console.log(sum)
//         }
//     })
// })
// console.log(zong)


let bar = ``;
let sub = 0;
// arr.forEach((item, index) => {
//     // bar = str2.replace(sum, `(#heading-)${$1$2}`)
//     bar = str2.replace(reg, `(#heading-${sub++})`);
// })
// console.log(bar)


// let sub = 1;
const newStr = str2.replace(/\(\#.*\)/g, () => `(#heading-${sub++})`);
console.log( newStr)


//操作流程
//  1、有vscode编辑器，安装插件 Markdown All in One，根据插件
// ctrl + HOME 配合Markdown All in One +Ctrl / Cmd + Shift + p  输入 Create Table of Contents 回车，目录生成，看目录