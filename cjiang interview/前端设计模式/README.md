`参考下以下两篇文章`

[23 种设计模式详解（全23种）](https://blog.csdn.net/A1342772/article/details/91349142)

[前端开发中常用的几种设计模式](https://blog.csdn.net/qq_32442973/article/details/119757216)


# 前言
## 设计模式是什么？

> 设计模式是对软件设计开发过程中反复出现的某类问题的通用解决方案。设计模式更多的是指导思想和方法论，而不是现成的代码，当然每种设计模式都有每种语言中的具体实现方式。学习设计模式更多的是理解各种模式的内在思想和解决的问题，毕竟这是前人无数经验总结成的最佳实践，而代码实现则是对加深理解的辅助。
> 



## 设计模式可以分为以下三种模式

* 结构型模式(Structural Patterns): 通过识别系统中组件间的简单关系来简化系统的设计。

* 创建型模式(Creational Patterns): 处理对象的创建，根据实际情况使用合适的方式创建对象。常规的对象 创建方式可能会导致设计上的问题，或增加设计的复杂度。创建型模式通过以某种方式控制对象的创建来解决问题。

* 行为型模式(Behavioral Patterns):用于识别对象之间常见的交互模式并加以实现，如此，增加了这些交互的灵活性。

  ![23种设计模式概览](https://img-blog.csdnimg.cn/20210803224333621.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyNDQyOTcz,size_16,color_FFFFFF,t_70) 





# 前端需要了解的设计模式(10种)

## 创建型模式

### 1. 工厂模式

我们从简单的开始。 简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例。 

![工厂模式](https://img-blog.csdnimg.cn/20210817154448197.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyNDQyOTcz,size_16,color_FFFFFF,t_70) 

汽车工厂 -> 生产汽车

```javascript

// 汽车构造函数
function SuzukiCar(color) {
  this.color = color;
  this.brand = 'Suzuki';
}
 
// 汽车构造函数
function HondaCar(color) {
  this.color = color;
  this.brand = 'Honda';
}
 
// 汽车构造函数
function BMWCar(color) {
  this.color = color;
  this.brand = 'BMW';
}
 
// 汽车品牌枚举
const BRANDS = {
  suzuki: 1,
  honda: 2,
  bmw: 3
}
 
/**
 * 汽车工厂
 */
function CarFactory() {
  this.create = (brand, color)=> {
    switch (brand) {
      case BRANDS.suzuki:
        return new SuzukiCar(color);
      case BRANDS.honda:
        return new HondaCar(color);
      case BRANDS.bmw:
        return new BMWCar(color);
      default:
        break;
    }
  }
}



```

使用工厂

```javascript

const carFactory = new CarFactory();
const cars = [];
 
cars.push(carFactory.create(BRANDS.suzuki, 'brown'));
cars.push(carFactory.create(BRANDS.honda, 'grey'));
cars.push(carFactory.create(BRANDS.bmw, 'red'));

function sayHello(){
    console.log(`${this.color}`)
    console.log(`${this.brand}`)
}

sayHello.call(cars[0]) // 输出 brown Suzuki

for(const car of cars){
    sayHello.call(car)
}

//输出结果
brown
Suzuki
grey
Honda
red
BMW

```

### 2. 单例模式

首先我们需要理解什么是单例？

`单`：指的是一个。
`例`：指的是创建的实例。
`单例`：指的是创建的总是同一个实例。也就是使用类创建的实例始终是相同的。

先看下面的一段代码： 

```javascript
class Person{
  constructor(){}
}
 
let p1 = new Person();
let p2 = new Person();
 
console.log(p1===p2) //false
```



上面这段代码，定义了一个Person类，通过这个类创建了两个实例，我们可以看到最终这两个实例是不相等的。也就是说，通过同一个类得到的实例不是同一个(这本就是理所应当)，但是如果我们想始终得到的是同一个实例，那么这就是单例模式。那么下面就该介绍如何实现单例模式了：

想要实现单例模式，我们需要注意两点：

1. 需要使用return。使用new的时候如果没有手动设置return,那么会默认返回this。但是，我们这里要使得每次返回的实例相同，也就是需要手动控制创建的对象，因此这里需要使用return。
2. 我们需要每次return的是同一个对象。也就是说实际上在第一次实例的时候，需要把这个实例保存起来。再下一个实例的时候，直接return这个保存的实例。因此，这里需要用到闭包了。

```JavaScript

const Person = (function(){
  let instance = null;
  return class{
      constructor(){
        if(!instance){
         //第一次创建实例，那么需要把实例保存
          instance = this;
        }else{
          return instance;
      }
  }
  }
})()
let p3 = new Person();
let p4 = new Person();
console.log(p3===p4)  //true

```

从上面的代码中，我们可以看到在**闭包**中，使用instance变量来保存创建的实例，每次返回的都是第一次创建的实例。这样的话就实现了无论创建多少次，创建的都是同一个实例，这就是单例模式。 

### 3. 原型模式

通俗点讲就是创建一个共享的原型，并通过拷贝这些原型创建新的对象。

**在我看来，其实原型模式就是指定新创建对象的模型,更通俗一点来说就是我想要新创建的对象的原型是我指定的对象。**

最简单的原型模式的实现就是通过Object.create()。Object.create()，会使用现有的对象来提供新创建的对象的__proto__。例如下方代码： 

```javascript

let person = {
  name:'hello',
  age:24
}
 
let anotherPerson = Object.create(person);
console.log(anotherPerson.__proto__)  //{name: "hello", age: 24}
 
anotherPerson.name = 'world';  //可以修改属性
anotherPerson.job = 'teacher';

```

另外，如果我们想要自己实现原型模式，而不是使用封装好的Object.create()函数，那么可以**使用原型继承来实现**： 

```javascript

function F(){console.log('FFFFF')}
 
F.prototype.g = function(){}
 
//G类继承F类
function G(){
  F.call(this);
}
G() // F里面执行的log会执行


//原型继承，其实用ES6语法就是fn 作为class 继承了 F的方法，即
function Fn(){};
Fn.prototype = F.prototype;
Fn();//Fn里面的log不会执行。
new Fn(); //会继承Fn的方法


G.prototype = new Fn();
 
G.prototype.constructor = G;


```

原型模式就是创建一个指定原型的对象。如果我们需要重复创建某个对象，那么就可以使用原型模式来实现。 





## 结构型模式

### 1. 装饰器模式

装饰器模式：为对象添加新功能，不改变其原有的结构和功能。

适配器模式是原有的不能用了，要重新封装接口。装饰器模式是原有的还能用，但是需要新增一些东西来完善这个功能。

比如手机壳，手机本身的功能不受影响，手机壳就是手机的装饰器模式。

![img](https://img-blog.csdnimg.cn/20210817205138660.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyNDQyOTcz,size_16,color_FFFFFF,t_70) 

```javascript
class Circle {
    draw() {
        console.log('画一个圆形');
    }
}
 
class Decorator {
    constructor(circle) {
        this.circle = circle;
    }
    draw() {
        this.circle.draw();
        this.setRedBorder(circle);
    }
    setRedBorder(circle) {
        console.log('设置红色边框')
    }
}
 
// 测试
let circle = new Circle();
 
let client = new Decorator(circle);
client.draw();

```

​	输出结果：

```
1.画一个圆形
2.设置红色边框
```

### 2. 适配器模式

适配器模式：旧接口格式和使用者不兼容，中间加一个适配转换接口。

比如国外的插座跟国内的插座不一样，我们需要买个转换器去兼容。

 

**上代码：**

```javascript

class Adaptee {
    specificRequest() {
        return '德国标准的插头';
    }
}
 
class Target {
    constructor() {
        this.adaptee = new Adaptee();
    }
    request() {
        let info = this.adaptee.specificRequest();
        return `${info} -> 转换器 -> 中国标准的插头`
    }
}
 
// 测试
let client = new Target();
client.request();
```

结果：

```
德国标准的插头 -> 转换器 -> 中国标准的插头
```

场景上可封装旧接口： 

```javascript

// 自己封装的ajax，使用方式如下：
ajax({
    url: '/getData',
    type: 'Post',
    dataType: 'json',
    data: {
        id: '123'
    }
}).done(function(){
 
})
// 但因为历史原因，代码中全都是：
// $.ajax({...})

```

这个时候需要一个**适配器**： 

```javascript
// 做一层适配器
var $ = {
    ajax: function (options) {
        return ajax(options)
    }
}

```

### 3. 代理模式

代理模式：使用者无权访问目标对象，中间加代理，通过代理做授权和控制。

明星经纪人：比如有个演出，要请明星，要先联系经纪人。

![代理模式](https://img-blog.csdnimg.cn/20210817214325882.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyNDQyOTcz,size_16,color_FFFFFF,t_70) 



```javascript

/**
 * pre:代理模式
 * 小明追求A，B是A的好朋友,小明比不知道A什么时候心情好，不好意思直接将花交给A，
 * 于是小明将花交给B，再由B交给A.
 */
 
// 花的类 
class Flower{
    constructor(name){
        this.name = name 
    }
}
 
// 小明拥有sendFlower的方法
let Xioaming = {
    sendFlower(target){
        var flower = new Flower("玫瑰花")
        target.receive(flower)
    }
}
// B对象中拥有接受花的方法，同时接收到花之后，监听A的心情，并且传入A心情好的时候函数
let B = {
    receive(flower){
        this.flower =flower
        A.listenMood(()=>{
            A.receive(this.flower)
        })
    }
 
}
// A接收到花之后输出花的名字
let A = {
    receive(flower){
        console.log(`A收到了${flower.name} `)
        // A收到了玫瑰花 
    },
    listenMood(func){
        setTimeout(func,1000)
    }
}
Xioaming.sendFlower(B)
```

**虚拟代理用于图片的预加载**

图片很大，页面加载时会空白，体验不好，所以我们需要个占位符，来短暂替代这个图片，等图片加载好了放上去。

```javascript

let myImage = (function(){
    let img = new Image
    document.body.appendChild(img)
    return {
        setSrc:(src)=>{
            img.src = src
        }
    }
})()
let imgProxy =(function(){
    let imgProxy = new Image
    // 这个地方我使用了setTimeout来增强演示效果，否则本地加载太快，根本看不到。
    imgProxy.onload=function(){
        setTimeout(()=>{
            myImage.setSrc(this.src)
        },2000)
    }
    
    return (src)=>{
        myImage.setSrc("../../img/bgimg.jpeg")
        imgProxy.src=src
    }
})()
 
imgProxy("../../img/background-cover.jpg")

```



**ES6 Proxy** 

其实在ES6中，已经有了Proxy，这个内置的函数。我们来用一个例子来演示一下他的用法。这是一个明星代理的问题。

```javascript

let star={
    name : "张XX",
    age:25,
    phone : "1300001111"
}
let agent = new Proxy(star,
    {
        get:function(target,key){
            if(key === "phone"){
                return  "18839552597"
            }else if(key === "name"){
                return "张XX"
            }else if(key === "price"){
                return "12W"
            }else if(key === "customPrice"){
                return target.customPrice
            }
        },
        set:function(target,key,value){
            if(key === "customPrice"){
                if(value < "10"){
                    console.log("太低了！！！")
                    return false
                }else{
                    target[key] = value
                    return true
                }
            }
        }
    }
)
 
console.log(agent.name)
console.log(agent.price)
console.log(agent.phone)
console.log(agent.age)
agent.customPrice = "12"
console.log(agent)
console.log(agent.customPrice)
```

**设计原则验证**

代理类和目标类分离，隔离开目标类和使用者

符合开放封闭原则







## 行为型模式

### 1. 策略模式

策略模式是一种简单却常用的设计模式，它的应用场景非常广泛。我们先了解下策略模式的概念，再通过代码示例来更清晰的认识它。

策略模式由两部分构成：一部分是封装不同策略的策略组，另一部分是 Context。通过组合和委托来让 Context 拥有执行策略的能力，从而实现可复用、可扩展和可维护，并且避免大量复制粘贴的工作。

![策略模式](https://img-blog.csdnimg.cn/20210817215442546.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyNDQyOTcz,size_16,color_FFFFFF,t_70) 



策略模式的典型应用场景是表单校验中，对于校验规则的封装。接下来我们就通过一个简单的例子具体了解一下： 



```javascript

/**
 * 登录控制器
 */
function LoginController() {
  this.strategy = undefined;
  this.setStrategy = function (strategy) {
    this.strategy = strategy;
    this.login = this.strategy.login;
  }
}
 
/**
 * 用户名、密码登录策略
 */
function LocalStragegy() {
  this.login = ({ username, password }) => {
    console.log(username, password);
    // authenticating with username and password... 
  }
}
 
/**
 * 手机号、验证码登录策略
 */
function PhoneStragety() {
  this.login = ({ phone, verifyCode }) => {
    console.log(phone, verifyCode);
    // authenticating with hone and verifyCode... 
  }
}
 
/**
 * 第三方社交登录策略
 */
function SocialStragety() {
  this.login = ({ id, secret }) => {
    console.log(id, secret);
    // authenticating with id and secret... 
  }
}
 
const loginController = new LoginController();
 
// 调用用户名、密码登录接口，使用LocalStrategy
app.use('/login/local', function (req, res) {
  loginController.setStrategy(new LocalStragegy());
  loginController.login(req.body);
});
 
// 调用手机、验证码登录接口，使用PhoneStrategy
app.use('/login/phone', function (req, res) {
  loginController.setStrategy(new PhoneStragety());
  loginController.login(req.body);
});
 
// 调用社交登录接口，使用SocialStrategy
app.use('/login/social', function (req, res) {
  loginController.setStrategy(new SocialStragety());
  loginController.login(req.body);
});

```



从以上示例可以得出使用策略模式有以下优势：

1. 方便在运行时切换算法和策略
2. 代码更简洁，避免使用大量的条件判断
3. 关注分离，每个strategy类控制自己的算法逻辑，strategy和其使用者之间也相互独立 



### 2. 观察者模式

  观察者模式又叫发布订阅模式（Publish/Subscribe），它定义了一种一或一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。典型代表vue/react等。

使用观察者模式的好处：

支持简单的广播通信，自动通知所有已经订阅过的对象。
目标对象与观察者存在的是动态关联，增加了灵活性。
目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用。![观察者模式](https://img-blog.csdnimg.cn/20210817163309141.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyNDQyOTcz,size_16,color_FFFFFF,t_70) 

`addEventListener()`也是一种：

```
target.addEventListener(type, listener [, options]);

```

Target就是被观察对象Subject，listener就是观察者Observer。

观察者模式中Subject对象一般需要实现以下API：

subscribe(): 接收一个观察者observer对象，使其订阅自己
unsubscribe(): 接收一个观察者observer对象，使其取消订阅自己
fire(): 触发事件，通知到所有观察者
用JavaScript手动实现观察者模式：

```javascript

// 被观察者
function Subject() {
  this.observers = [];
}
 
Subject.prototype = {
  // 订阅
  subscribe: function (observer) {
    this.observers.push(observer);
  },
  // 取消订阅
  unsubscribe: function (observerToRemove) {
    this.observers = this.observers.filter(observer => {
      return observer !== observerToRemove;
    })
  },
  // 事件触发
  fire: function () {
    this.observers.forEach(observer => {
      observer.call();
    });
  }
}

```

**验证一下订阅是否成功：**  

```js
const subject = new Subject();
 
function observer1() {
  console.log('Observer 1 Firing!');
}
 
 
function observer2() {
  console.log('Observer 2 Firing!');
}
 
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.fire();
```

输出

```js
Observer 1 Firing! 
Observer 2 Firing!
```

**验证一下取消订阅是否成功：** 

```js
subject.unsubscribe(observer2);
subject.fire();
```

输出：

```
Observer 1 Firing!
```

### 3. 迭代器模式
  ES6中的迭代器 Iterator 相信大家都不陌生，迭代器用于遍历容器（集合）并访问容器中的元素，而且无论容器的数据结构是什么（Array、Set、Map等），迭代器的接口都应该是一样的，都需要遵循 迭代器协议。

迭代器模式解决了以下问题：

提供一致的遍历各种数据结构的方式，而不用了解数据的内部结构
提供遍历容器（集合）的能力而无需改变容器的接口

![迭代器模式](https://img-blog.csdnimg.cn/20210817220744492.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyNDQyOTcz,size_16,color_FFFFFF,t_70) 

一个迭代器通常需要实现以下接口：

- `hasNext()`：判断迭代是否结束，返回Boolean
- `next()`：查找并返回下一个元素



为Javascript的数组实现一个迭代器可以这么写：

```js
const item = [1, 'red', false, 3.14];
 
function Iterator(items) {
  this.items = items;
  this.index = 0;
}
 
Iterator.prototype = {
  hasNext: function () {
    return this.index < this.items.length;
  },
  next: function () {
    return this.items[this.index++];
  }
}
```

 **验证一下迭代器：**

```js
const iterator = new Iterator(item);
 
while(iterator.hasNext()){
  console.log(iterator.next());
}
```

输出：

```js
1, red, false, 3.14
```

ES6提供了更简单的迭代循环语法 for...of，使用该语法的前提是操作对象需要实现 可迭代协议（The iterable protocol），简单说就是该对象有个Key为 Symbol.iterator 的方法，该方法返回一个iterator对象。

比如我们实现一个 Range 类用于在某个数字区间进行迭代：

```js
function Range(start, end) {
  return {
    [Symbol.iterator]: function () {
      return {
        next() {
          if (start < end) {
            return { value: start++, done: false };
          }
          return { done: true, value: end };
        }
      }
    }
  }
}
```

结果：

```
1, 2, 3, 4
```



### 4. 状态模式

状态模式：一个对象有状态变化，每次状态变化都会触发一个逻辑，不能总是用if...else来控制。![状态模式](https://img-blog.csdnimg.cn/20210817221352327.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyNDQyOTcz,size_16,color_FFFFFF,t_70) 

 比如`红绿灯`： 

```js

// 状态（红灯，绿灯 黄灯）
class State {
    constructor(color) {
        this.color = color;
    }
    // 设置状态
    handle(context) {
        console.log(`turn to ${this.color} light`);
        context.setState(this)
    }
}
 
// 主体
class Context {
    constructor() {
        this.state = null;
    }
    // 获取状态
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
}
 
// 测试
let context = new Context();
let green = new State('green');
let yellow = new State('yellow');
let red = new State('red');
 
// 绿灯亮了
green.handle(context);
console.log(context.getState())
 
// 黄灯亮了
yellow.handle(context);
console.log(context.getState())
 
// 红灯亮了
red.handle(context);
console.log(context.getState())

```

**设计原则验证**

将状态对象和主体对象分离，状态的变化逻辑单独处理

符合开放封闭原则