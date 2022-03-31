#### vue的两个核心

组件系统、数据驱动

#### 什么是双向数据绑定？

v-model,数据发生变化，同步视图，视图发生变化，同步数据

#### 什么是单向数据流？

在父向子传值的时候，如果改变父组件的值，子组件会跟着同步更新，反之不允许

#### MVVM的设计思想的优势?

- 双向绑定技术，当Model变化时，View也会自动变化，view发生更新，model也跟着同步
- 我们减少了dom的操作，因为我们只需要关注数据就可以
- mvvm的设计思想大大提高了代码的耦合性

#### 事件传参

- 没有传递参数，事件函数的默认第一个参数是事件对象
- 如果传递了参数，事件函数就没有了默认参数，全部变为对应位置的实参的形参，就没有了事件对象
- 既有自己传的的参数，也有事件对象，通过$event传递事件对象，在事件函数内部通过通过对应位置的形参来接收事件对象，传递刀了event没有强制性的位置，但是建议放在最后

#### 自定义指令：directive

[文档](https://cn.vuejs.org/v2/api/#Vue-directive)

为什么自定义指令？

vue提供的系统指令满足不了我们的需求，那么我们就需要自定义指令

通过Vue.directive进行自定义指令的定义

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

#### 计算属性：computed

定义的时候是一个方法，使用的时候当作属性使用

只要return后面的数据发生变化，该计算属性就会重新计算

计算属性具有缓存功能

#### 监听器：watch

watch侦听器如果监听的是一个对象，需要开启深度监听

```js
watch:{
  num:{
    // 监听数据发生变化的处理函数
    handler(newNum) {
      console.log(newNum)
    },
    // 是否开启深度监听
    deep: true
  }
}
```

#### 过滤器

```html
<div id="app">
    <div>
        {{ date | formatDate('-')}}
    </div>
    <div>
        {{ date | formatDate('/')}}
    </div>
  </div>
  <script src="vue.js"></script>
  <script>

    Vue.filter('formatDate',(data,line)=>{
      console.log(data,line)
      const y = data.getFullYear()
      const m = (data.getMonth()+1).toString().padStart(2,0)
      const d = data.getDate().toString().padStart(2,0)
      return y+line+m+line+d
    })
   
    new Vue({
      el: '#app',
      data:{
        date: new Date
      }
    })
  </script>
```

#### 生命周期函数

生命周期：是指一个对象从创建到运行到销毁的整个过程，被称为生命周期

生命周函数：在不同的生命周期阶段会自动执行对应的函数，而这些函数则被成为生命周期函数

```js
// 创建阶段
      beforeCreate() {
        // 这个生命周函数，代表开始创建实例了
        console.log('beforeCreate',this.num)
      },
      created () {
        // 代表数据和方法已经初始化成功了,此处dom还没有挂载到页面上
        console.log('created',this.num,this.$el)
      },
      beforeMount () {
        // 挂在之前
        console.log('beforeMount',this.$el)
      },
      mounted () {
        // dom已经挂载了
        console.log('mounted',this.$el)
      },
      // 运行更新阶段
      beforeUpdate () {
        // 数据更新，页面还没有同步
        console.log('beforeUpdated',this.num,document.getElementById('app').innerHTML)
      },
      updated () {
        // 数据更新，页面已经同步
        console.log('updated',this.num,document.getElementById('app').innerHTML)
      },
      // 销毁阶段
      beforeDestroy () {
        // 销毁之前
        console.log('beforeDestroy')
      },
      destroyed () {
        // 已经销毁了
        console.log('destroy')
      }
```

#### 在vue中通过索引直接在修改数组中的某一项数据，页面是否更新?

在vue中对 对象新添加属性，页面是否更新?

不更新，如果想解决这个问题，vm.$set(vm.list, 1, 'or')或者Vue.set

但是vm.list[3].a = 456，通过索引修改某一项的对象内部的属性是没问题的

#### vue组件中的data为什么是一个函数，返回一个对象？

如果不是一个函数返回一个新的对象，组件如果多次使用，实际公用的是同一个数据

但是如果是通过函数 返回一个新的对象，这样的话，每个组件的使用数据是独立的

#### 组件

##### 如何创建一个全局组件

通过Vue.component来创建一个全局组件，第一个参数是组件名字，第二个参数是组件的配置对象，可以通过template配置组件的结构，data定义数据等等

##### 如何创建一个局部组件

在组件内部通过components来创建一个局部组件

全局组件和局部组件的区别

局部组件：只能在当前的父组件中使用

全局组件： 在任意地方使用

##### 如何定义局部自定义指令

在组件内部通过directives来创建一个局部指令

全局指令和局部指令的区别

局部指令：只能在当前的组件中使用

全局指令： 在任意地方使用

##### 如何定义局部过滤器

在组件内部通过filters来创建一个局部过滤器

全局过滤器和局部过滤器的区别

局部过滤器：只能在当前的组件中使用

全局过滤器： 在任意地方使用

#### 组件传值

##### 父向子传值

- 父亲怎么传：通过属性绑定形式传
- 儿子怎么接收：通过props来接收

##### 子向父传值

- 子怎么传：通过this.$emit触发一个自定义事件，并且发送一个值
- 父怎么接收：通过定义自定义事件的事件函数的形参来接收

##### 兄弟组件传值

定义一个事件中心，或者是第三方

接收值的组件：通过该事件中心的$on来定义自定义事件的事件函数来接收值

```js
eventBus.$on('getTab1',(data)=>{
  console.log('接收tab1传递的值',data)
})
```

另一个兄弟组件怎么传：通过事件中心的$emit触发对应的 刀了 on的事件，并且把值传递过去

```js
eventBus.$emit('getTab1',this.num)
```

##### 跨组件传值

```js
Vue.component('my-sub1',{
      template:'#my-sub1',
      data() {
        return {
          money: 10000000
        }
      },
      provide:{
        money:1000
      },
      components:{
        'sub-a':{
          template:'<div>子组件<sub-b></sub-b></div>',
          components:{
            'sub-b':{
              template:'<div>子组件{{money}}</div>',
              inject:['money']
            }
          }
        }
      }
    })
    new Vue({
      el: '#app'
    })
```

#### 组件插槽

- 默认插槽：

  - 在组件标签中间可以传递一些子节点
  - 组件内部利用slot标签进行接收

- 具名插槽

  - 在组件标签中间通过定义slot的名字传递子节点

    ```html
    <my-banner>
      <div slot="header">
        头部
      </div>
      <div slot="footer">
        底部
      </div>
    </my-banner>
    ```

  - 组件内部利用slot的name进行对应接收

    ```html
    <template id="banner">
      <div>
        <slot name="header"></slot>
        <slot name="footer"></slot>
      </div>
    </template>
    ```

- 作用域插槽

  - 在组件内部定义数据，将数据传递给插槽的结构

  - 通过给slot动态绑定属性

    ```js
    <template id="my-li">
        <ul>
          <li v-for="item in arr">
            <slot :row="item"></slot>
          </li>
        </ul>
      </template>
    ```

  - 插槽内部：通过slot-scope=“scope”来接收

    ```html
    <my-li>
      <template slot-scope="scope">
        <p>{{scope.row}}</p>
      </template>
    </my-li>
    <my-li>
      <template slot-scope="scope">
        <a href="04-侦听器.html">{{scope.row}}</a>        
      </template>
    </my-li>
    ```

    

#### Promise的使用

利用Promise处理异步解决回调地狱的问题

Promise的all的方法

Promise的race的方法

面试题：

现在有三个接口地址，需要三个接口地址请求完事之后进行下一步的逻辑处理(不一定按顺序请求完成)

```js
// .then回调
axios.get('http://xxx').then(res=>{
  console.log(res)
  axios.get('http://xxx').then(res=>{
    console.log(res)
    axios.get('http://xxx').then(res=>{
      console.log(res)
    })
  })
})

// .then返回新的Promise继续调用.then
axios.get('http://xxx').then(res=>{
  return axios.get('http://xxx')
}).then(res=>{
  return axios.get('http://xxx')
}).then(res=>{
  console.log('三个请求完事')
})

// async await
const asyncHandle = async function(){
  const res1 = await axios.get('http://xxx1')
  const res2 = await axios.get('http://xxx')
  const res3 = await axios.get('http://xxx')
  console.log(res1,res2,res3)
}

asyncHandle()
// Promise all方法
const getComments = new Promise(()=>{
  axios.get('http://xxx')
})

Promise.all([
  axios.get('http://xxx'),
  axios.get('http://xxx'),
  axios.get('http://xxx')
]).then(res=>{
  console.log(res)
})
```

#### axios拦截器

请求拦截

axios.interceptors.request.use

响应拦截

axios.interceptors.response.use

#### 路由

什么是路由？

路由就是对应关系，组件和url地址，根据不同的地址显示不同的组件，路由也是实现spa（单页面应用程序）的主要核心，因为单页面应用程序，就是只有一个html，在这个html里面切换组件，根据url，例如地址为/home,在这个页面中就显示home组件

前端路由：url和组件

后端路由：根据不同的地址请求不同的接口

[路由](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

##### 在vue中路由传参

- params传参

  - 在跳转的时候可以通过/home/10

  - 路由规则：

    ```js
    new VueRouter({
        routes: [
            {
              path: '/home/:id',
              component: Home
            }
        ]
    })
    ```

  - 组件内部怎么来接收参数

    ```js
    this.$route.params.id
    ```

- query传参

  - 在跳转的时候可以通过/home?id=10

  - 组件内部怎么来接收参数

    ```js
    this.$route.query.id
    ```

路由history模式注意的问题

##### 嵌套路由

##### 编程式导航

##### 路由钩子

全局钩子：都会对所有的路由进行拦截

beforeEach：进入之前

afterEach：已经进入了 

路由独享钩子：可以针对某一个路由进行拦截，这个需要写在路由规则里

```js
 {
    path: '/',
    name: 'home',
    beforeEnter: (to,from,next)=>{
      console.log('即将进入home')
    },
    component: Home
  }
```

组件内的守卫：

针对组件进行拦截

```js
beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('即将离开about')
    if(confirm('当前表单没有提交？确定要离开首页？')){
      next()
    }
    
  }
```

#### webpack中babel.loader.plugin有什么区别?

babel: 将高级语法转换成浏览器可以识别的语法

loader: 加载器, 结合webpack来处理非js资源文件 .css .less .sass .png

plugin: webpack的各种各样的插件,能够增强webpack的功能

#### vue脚手架的安装和使用

##### 命令行方式

[配置文档](https://blog.csdn.net/weixin_41819098/article/details/88900820)

利用vue.config.js关闭esLint

##### ui界面方式

[文档](https://blog.csdn.net/weixin_41819098/article/details/91901115)

##### 安装element-ui

- 安装vue-cli-plugin-element插件

##### 使用element中select组件

- 注册组件

  ```js
  import Vue from 'vue'
  import { Button, Select } from 'element-ui'

  Vue.use(Button)
  Vue.use(Select)
  ```

- 使用组件

  ```html
  <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  ```

- 复制数据

  ```js
   options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: ''
  ```

##### 安装axios

- 安装依赖》运行依赖》axios
- 使用axios发送请求
- 利用Vue.prorotype挂载到原型上

#### vue动画

[文档](https://cn.vuejs.org/v2/guide/transitions.html)

##### 利用类名添加动画

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

- 首先给需要添加动画的元素用transition包裹起来

- 利用类名实现动画

  ```css
  .v-enter,.v-leave-to{
    transform: translate(200px,0)
  }
  .v-enter-active,.v-leave-active{
    transition: transform 1s;
  }
  .v-enter-to,.v-leave{
    transform: translate(0,0)
  }
  ```

- 自定义动画类名

  ```html
  <transition name="box2">
    <div class="box" v-show="flag">

    </div>
  </transition>
  ```

  ```css
  .box2-enter,.box2-leave-to{
    opacity: 0;
  }
  .box2-enter-active,.box2-leave-active{
    transition: opacity 1s;
  }
  .box2-enter-to,.box2-leave{
    opacity: 1;
  }
  ```

##### 结合css动画库设置动画

- 引入css动画库


- 通过enter-active-class、leave-active-class设置动画

  ```html
  <transition
              enter-active-class="animated bounceIn"
              leave-active-class="animated bounceOut"
              >
    <div class="box" v-show="flag">

    </div>
  </transition>
  ```

#### vuex的缺陷

vuex的数据属于应用级别的数据,应用刷新,数据会重置 (具有响应式, 不能持久存储)

结合本地存储来使用

单纯的使用本地: 本地的数据(持久存储,不具有响应式)

#### vue单页面应用的优缺点

缺点:

+ 不利于seo
+ 兼容到ie9
+ 初次加载耗时相对增多

优点

+ 用户体验好,不用重新刷新整个页面
+ 前后端分离
+ mvvm设计模式
+ 减轻服务期压力,只需要服务器提供数据
### 加深面试题

#### 关于项目打包你都做了什么? 你的项目优化具体做了哪些? 你的项目如何打包的?

+ 移除console,借助babel插件babel-plugin-transform-remove-console

+ 判断环境,只在发布阶段使用上面的插件, 通过process.env.NODE_ENV 'production' || "development"

+  因为开发阶段和发布阶段入口代码有区别,通过chainWebpack配置自定义的打包入口,

  ```js
  // 配置自定义入口文件
    chainWebpack: config => {
      // when: 相当于if 第一个参数:(条件) 第二个参数(满足条件执行的回调函数) if(条件) { 满足条件执行的逻辑 }
      // 开发期间 --- main-dev.js
      config.when(process.env.NODE_ENV === 'development', config => {
        config.entry('app').clear().add('./src/main-dev.js')
      })
  
      // 发布阶段 --- main-prod.js
      config.when(process.env.NODE_ENV === 'production', config => {
        config.entry('app').clear().add('./src/main-prod.js')
      })
    }
  ```

+ 发布阶段为了减小打包体积, 忽略js打包,配置externals,关于css样式,在发布的入口文件中注释掉即可, 加载cdn资源文件,加载cdn资源文件的优势,减小自己服务器的压力,同时cdn资源会就近原则访问

+ 只在发布阶段使用cdn资源,通过给htmlwebpackPlugin添加标识,标识为不同的值,此时就可以在html中判断htmlwebpackPlugin标识为开发阶段还是发布阶段从而按需加载cdn资源

+ 路由懒加载,路由按需加载, 匹配到哪个路由规则,加载对应的资源文件

#### 虚拟dom

本质上就是一个JS对象，用来描述你希望在屏幕上看到的内容

![](images/虚拟DOM.png)

#### Diff算法

虚拟dom高效更新执行过程

- 初次渲染时，会根据model数据创建一个虚拟DOM对象（树）
- 根据虚拟DOM生成真正的DOM，渲染到页面
- 当数据变化后，会重新根据新的数据，创建新的虚拟DOM对象（树）
- 与上一次得到的虚拟DOM对象，使用Diff算法比对（找不同），得到需要更新的内容
- 最终，React只将变化的内容更新（patch）到DOM中，重新渲染到页面
- 什么是虚拟dom：用js对象来表示页面上dom元素的的样式体现
- 虚拟dom的作用：高效更新页面，还有就是让react脱离了浏览器的概念
- 怎么来高效更新页面的：就是在第一次渲染页面的时候生成一份初始的虚拟dom树，然后当数据改变之后，再生成一份虚拟dom树，然后根据新旧dom树进行对比，对比完成之后，把有区别的进行更新
- diff算法的作用就是：新旧虚拟dom树在对比的时候就是通过diff算法来对比的
- diff算法又是怎么去对比的：tree diff、component diff、element diff

![](images/diff算法.png)

面试语术：

你知道虚拟dom吗？简单又谈一下？

本质上就是一个JS对象，用来描述你希望在屏幕上看到的内容，虚拟dom可以实现高效更新，（后面如果自己能说一气说出来）

如何实现高效更新的？

利用新旧虚拟dom树进行对比，从而进行局部进行更新

如何进行新旧dom树进行对比？

利用diff算法，主要是tree diff树对比，component diff 组件对比，element diff 元素对比

加上一些其他话术

所以虚拟dom在前端中不管是vue、react等等都采用

#### axios配置代理服务器

什么是跨域？

在浏览器里面域名、端口、ip地址、协议，有任何一项不同，则跨域

A网站：http://localhost:8080/#/

B网站：http://localhost:3000/#/

处理跨域的方式？

JsonP（只能处理get请求）、cors（后端开启）、代理服务器

```js
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',// 要跨域的域名
        changeOrigin: true, // 是否开启跨域
      },
      '/get': {
        target: 'http://localhost:3000',// 要跨域的域名
        changeOrigin: true, // 是否开启跨域
      }
    }
  }
}
```

#### 小程序分包加载

某些情况下，开发者需要将小程序划分成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。

在构建小程序分包项目时，构建会输出一个或多个分包。每个使用分包小程序必定含有一个**主包**。所谓的主包，即放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本；而**分包**则是根据开发者的配置进行划分。

在小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示。

目前小程序分包大小有以下限制：

- 整个小程序所有分包大小不超过 12M
- 单个分包/主包大小不能超过 2M

对小程序进行分包，可以优化小程序首次启动的下载时间，以及在多团队共同开发时可以更好的解耦协作。

代码演示,分包加载之前

```json
pages: [
  'pages/tabs/home',
  'pages/tabs/cates',
  'pages/tabs/search',
  'pages/tabs/cart',
  'pages/tabs/my',
  'pages/goods_list',
  'pages/goods_detail/main',
  'pages/order',
  'pages/orderList'
]
```

抽离之后

```js
pages: [
      'pages/tabs/home',
      'pages/tabs/cates',
      'pages/tabs/search',
      'pages/tabs/cart',
      'pages/tabs/my',
      'pages/order',
      'pages/orderList'
    ],
    subpackages: [
      {
        name: 'goods',
        root: 'goods',
        pages: [
          'goods_list',
          'goods_detail/main'
        ]
      }
    ]
```

图片或者图标等资源文件使用线上资源

#### v-if和v-for避免结合使用

因为v-for的优先级大于v-if,所以会先根据所有数据生成结构，然后在根据，v-if进行按需渲染

```html
<div id="app">
    <ul>
      <li v-for="item in arr" v-if="item%2===0">{{ item }}</li>
    </ul>
  </div>
  <script src="./vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        arr: [
          1,2,3,4
        ]
      }
    })
  </script>
```

我们可以采用计算属性来避免此问题，这样的话，先通过计算属性，计算出要渲染的数据，然后直接循环计算属性即可

```html
<div id="app">
    <ul>
      <li v-for="item in newArr">{{ item }}</li>
    </ul>
  </div>
  <script src="./vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        arr: [
          1,2,3,4
        ]
      },
      computed: {
        newArr() {
          return this.arr.filter(item=>{
            return item%2===0
          })
        }
      }
    })
  </script>
```

#### vue中route和router的区别

+ route是当前路由信息，可以获取到当前路由地址参数等等
+ router是全局路由（VueRouter）实例对象，可以通过router进行路由的跳转后退等等

#### 如何封装一个插件

+ 定义一个button组件，在index.js中引入并注册

+ 在components中创建一个index.js

  ```
  import sgButton from './button.vue'
  function install (Vue) {
    Vue.component(sgButton.name, sgButton)
  }

  export default {
    install
  }
  ```

+ 在main.js中导入该js文件，当调用Vue.use方法，会默认调用内部的install方法


面试题

你有封装过插件吗？  Vue.use的原理是什么？

当调用Vue.use方法，会默认调用内部的install方法,install这个方法默认的第一个形参就是Vue,这样的话我们就可以通过Vue注册一些全局组件，给Vue扩展一下方法。

#### vueI18n的使用

vue中实现语言切换的方式如何实现的

1.NPM 项目安装

 ```
 cnpm i vue-i18n
 ```

2.使用方法

```
/* 国际化使用规则 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
<!-- 需要国际化的数据定义在此处 -->
const messages = {
  en: {
    message: {
      hello: 'world hello'
    }
  },
  zh: {
    message: {
      hello: '世界'
    }
  }
}
<!-- 使用i18n -->
const i18n = new VueI18n({
  locale: 'zh',
  messages
})

export default {
  data () {
    return {
      hello: this.$t('message.hello')
    }
  },
  i18n
}
```
3.页面数据使用

```
<div id="#app">
  <p>{{ $t("message.hello") }}</p>
</div>
```

4.案例练习

###### 定义基本结构

```html
<div id="app">
  <button>切换语言</button>
  <ul>
    <li>首页</li>
    <li>新闻</li>
    <li>关于</li>
    <li>概况</li>
  </ul>
</div>
```

```样式
ul{
  list-style: none;
  li{
    width: 20%;
    height: 70px;
    line-height: 70px;
    background: green;
    color: #fff;
    float: left;
    margin-left: 2%;
    text-align: center;
    line-height: 70px;
  }
}
```

###### 定义语言包

zh.js

```js
export default {
  nav: ['首页', '新闻', '概况', '关于']
}
```

en.js

```js
export default {
  nav: ['home', 'news', 'gk', 'about']
}
```

###### 在main.js中引入语言包

```js
import zh from './i18n/zh.js'
import en from './i18n/en.js'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    zh,
    en
  }
})
```

###### 数据渲染和切换

```html
<template>
  <div id="app">
    <button @click="changeLang">切换语言</button>
    <ul>
      <li v-for="(item, index) in $t('nav')" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    changeLang () {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh' : 'en'
    }
  }
}
</script>
```

#### keep-alive

### vue-router中hash和history的区别

+ history没有#/，会比hash好看
+ history模式是采用的h5`history.pushState` API 来完成 URL 跳转而无须重新加载页面
+ hash是利用location.hash进行跳转的 
+ hash是不需要后台配置支持的
+ history不过这种模式要玩好，还需要后台配置支持

### this.$nextTick()的作用

这个函数是可以等dom重新更新完成会调用

数据渲染完成，页面完成更新即调用this.$nextTik

当修改了数据，dom是异步同步的，所以，如果更改了数据，在修改数据下面重新操作dom会出问题，需要保证dom也更新完成才能操作。