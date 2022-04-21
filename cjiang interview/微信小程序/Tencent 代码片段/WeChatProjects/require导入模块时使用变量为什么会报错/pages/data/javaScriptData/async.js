module.exports = [
  {
    "title":"异步编程：jQuery方法 $.Callbacks() 回调机制 （笔记）",
    "answer":[`参数：$.callbacks('once')只执行一次
    $.callbacks('memory')函数记忆
    $.callbacks('uniqe')去重
    $.callbacks('stopOnFalse')当碰到返回值时false的函数后面的就不执行了
    var cd = $.Callbacks()//返回一个回调对象
    function a(){console.log("a")}
    function b(){console.log("b")}
    cd.add(a,b)//把函数添加到回调对象中
    cd.fire()//执行函数，可以传参数把参数放到要执行的函数里面
    function a(x){console.log(x)}
    function b(y){console.log(y)}
    cd.fire("a","b")`]
  },
  {
    "title":"异步编程：jQuery方法 $.Deferred有状态的回调 （笔记）",
    "answer":[`var df = $.Deferred();df.done(()=>{
      //注册成功的回函数
    })
    df.fail(()=>
    //注册失败的回调函数
  })
  df.progress(()=>{
    //注册进行时的回调函数
  })
    df.resolve()触发成功的回函数
    df.reject()触发失败的回调函数
    df.notify()触发进行时的回调函数
    df.Promise()返回Promise对象,只有注册功能没有触发功能
    then:简化注册步骤
    df.then(注册成功的回函数,注册失败的回调函数，注册进行时的回调函数)
    then可以连式调用第一种用法：df.then(a,b,c).then(a,b,c)前面注册函数的返回值会当作链式后面函数的参数传进去
    第二种用法：df.then(function (){
      var df = $.Deferred();
      setTimeout(()=>{
        df.resolve();
      },1000)
      return df.promise;
    }).then(success)
    如果前面返回一个新的Deferred对象，链式后面的成功注册函数就是给新的Deferred对象进行注册可以用于解决回调地狱
    抹平回调三角区$.ajax()会返回一个Deferred对象`]
  },
  {
    "title":"异步编程：$.Deferred注册成功的回函数",
    "answer":["var df = $.Deferred();\ndf.done(()=>{注册成功的回函数})","done"]
  },
  {
    "title":"异步编程：$.Deferred注册失败的回函数",
    "answer":["var df = $.Deferred();\ndf.fail(()=>{注册失败的回函数})","fail"]
  },
  {
    "title":"异步编程：$.Deferred注册进行时的回函数",
    "answer":["var df = $.Deferred();\ndf.progress(()=>{注册进行时的回函数})","progress"]
  },
  {
    "title":"异步编程：$.Deferred触发成功的回函数",
    "answer":["var df = $.Deferred();\ndf.resolve()触发成功的回函数","resolve"]
  },
  {
    "title":"异步编程：$.Deferred触发失败的回函数",
    "answer":["var df = $.Deferred();\ndf.reject()触发失败的回调函数","reject"]
  },
  {
    "title":"异步编程：$.Deferred触发进行时的回函数",
    "answer":["var df = $.Deferred();\ndf.notify()触发进行时的回调函数","notify"]
  },
  {
    "title":"异步编程：$.Deferred返回只有注册功能没有触发功能的对象",
    "answer":["df.Promise()返回Promise对象,只有注册功能没有触发功能\npromise承诺的意思","Promise","promise"]
  },
  {
    "title":"异步编程：$.Deferred简化注册步骤",
    "answer":["df.then(注册成功的回函数,注册失败的回调函数，注册进行时的回调函数)\n可以链式调用，可用于解决回调地狱（详见笔记）","then"]
  },
  {
    "title":"异步编程：$.Callbacks() 注册回调函数",
    "answer":["var cb = $.Callbacks();cb.add(fun)","add"]
  },
  {
    "title":"异步编程：$.Callbacks() 触发回调函数",
    "answer":["var cb = $.Callbacks();cd.fire()","fire"]
  },
  {
    "title":"异步编程：es6中的Promise\n创建一个Promise对象",
    "answer":["const pro = new Promise((resolve,reject)=>{})","new Promise","new Promise()","new Promise((resolve,reject)=>{}"]
  },
  {
    "title":"异步编程：es6中的Promise\n注册成功的回调函数",
    "answer":[`const pro = new Promise((resolve,reject)=>{})\npro.then();
    then链式操作如果上一个不抛出一个错误的话，那么不管上一个是触发的成功的回调还是失败的回调下一个then只执行成功的回调
上一个then注册的函数如果抛出错误，下一个then的失败的回调就会执行 并且错误信息将作为参数传入
上一个then注册成功或失败回调函数的返回值将作为下一个回调的参数传入
如果上一个then注册成功或失败回调函数的返回值是Promise对象的话，那么Promise里面触发哪个回调下一个then里面就执行哪个回调（成功或失败的回调）`,"then"]
  },
  {
    "title":"异步编程：es6中的Promise\n注册失败的回调函数",
    "answer":["const pro = new Promise((resolve,reject)=>{})\npro.catch()","catch"]
  },
  {
    "title":"异步编程：es6中的Promise\n触发成功的回调（推向成功的状态）",
    "answer":[`const pro = new Promise((resolve,reject)=>{
      resolve()//异步执行 微任务
    })`,"resolve"]
  },
  {
    "title":"异步编程：es6中的Promise\n触发失败的回调（推向失败的状态）",
    "answer":[`const pro = new Promise((resolve,reject)=>{
      reject()//或抛出一个错误，throw new Error();异步执行 微任务
    })`,"reject","throw new Error()"]
  },
  {
    "title":"异步编程：es6中的Promise\n 构造函数成员（静态方法）：(笔记)",
    "answer":[`all(iterable):返回一个新的Promise对象，传递的参数是一个数组，数组里是Promise对象的集合。
    当集合中的所有Promise对象都为resolved状态时，触发新的Promise对象的成功回调。
    并把所有的Promise返回值的数组最为成功回调的返回值
当集合中的Promise对象有一个为rejected状态时，立即触发新的Promise对象的失败回调。
并把第一个触发失败的Promise对象的错误信息
作为他的失败错误信息。语法：Promise.all([new Promise()])
    race(iterable)：返回一个新的Promise对象，传递的参数是一个数组，数组里是Promise对象的集合。
    当集合里的任意一个Promise成功或失败后，新的Promise对象会立即执行，并把集合里触发成功或失败的Promise返回值作为参数。
    语法：Promise.race([new Promise()])
    resolve(数据)：返回一个resolved状态的Promise,传递的参数作为状态数据。如果传递的是Promise，则直接返回传递的Promise对象。
    语法：Promise.resolve(data)
    reject(数据)：返回一个rejected状态的Promise,传递的参数作为状态数据。语法：Promise.reject(err)`]
  },
  {
    "title":"异步编程：async和await (笔记)",
    "answer":[`目的是简化在函数的返回值中对Promise的创建，简化Promise的使用，并非是替代Promise
    async : 用于修饰函数（无论是函数字面量还是函数表达式），放置在函数最开始的位置，被修饰函数的返回结果一定是Promise对象
    await : 必须出现在async函数中,await用在某个表达式之前，如果表达式是一个Promise，则得到的是thenable中的状态
    如果await的表达式不是Promise，则会将其使用Promise.resolve()包装后按规则运行
    async function test() {
      // throw new Error(1);
      return 2;
  }
  等同于：
  function test() {
      return new Promise((resolve, reject) => {
          // reject(1)
          resolve(2)
      })
  }
  await:
  async function test() {
      // throw new Error(1);
      return 2;
  }
  (async () => {
      const data = await test();
      console.log(data)
      return 3;
  })()
  等同于：
  function test() {
      return new Promise((resolve, reject) => {
          // reject(1)
          resolve(2)
      })
  }
  (()=>{
      return new Promise((resolve,reject)=>{
          test().then(data=>{
              console.log(data)
              resolve(3)
          })
      })
  })`]
  }
]