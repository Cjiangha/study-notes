module.exports = [
    {
        "title": "es6题：let和var的区别 （笔记）",
        "answer": ["let和var的区别:\nvar: 变量声明提升、可重复定义、全局变量归window所有\nlet: 变量声明不提升、不能重复定义、全局变量不归window所有 加强对作用域的控制"]
    },
    {
        "title": "es6题：箭头函数的特点 （笔记）",
        "answer": ["箭头函数的特点:\n1、不用写function关键字\nlet test = (x)=>{}或let test = x=>{}\n2、只能作为函数使用，不能new，没有原型\n\
        3、参数不能重复命名\n4、返回值可以不写return,但是有时需要配合{}\nlet num = (a,b) => a + b; === return a + b;\n\
        5、内部arguments this由定义时外围最接近一层的非箭头函数的arguments和this决定其值,全局下this指向window\nes6中在对象里定义非箭头函数简化写法\n{ fn: function (){} } === {fn (){} }"]
    },
    {
        "title": "es6题：class:(构造函数 笔记)",
        "answer": ["class:(构造函数:\n1、需要用class关键字定义一个类（构造函数）\n2、必须用new关键字，否则会报错\n3、在constructer函数里定义私有属性\n4、用static定义静态方法，静态方法是函数对像上的，不是原型上的。不支持原始值属性，只能写函数\n\
        5、在原型上添加方法直接写在constructer同级，只能是函数类型，不支持原始值属性。\n6、继承用extends关键字，extends必须配合super()函数，否则会报错。super函数必须写在constructer里的首行。super相当于Test.call(this);\n\
        7、用class定义的构造函数原型不能被枚举。class A{} A.prototype不可以被for in循环\n\nes7中class新增语法 提案属性:\n1、static property = xxx;静态属性\n2、property = xxx;私有属性,和在constructer里this.property = xxx没有区别\n\
        3、@decorator 装饰器用法:\n @xxx property = xxx; 用xxx函数修饰property属性\nfunction xxx(proto,key,descriptor){} 函数名要和@xxx同名\n参数：\nproto:A函数的原型\nkey:被修饰的属性名 property\ndescriptor: 修饰对象，可修饰被修饰属性，和Object.defineProperty修饰一样\n\
        修饰私有属性时descriptor对象上有initializer函数，initializer函数返回值就是被修饰属性property的值\n修饰原型属性时descriptor对象上有value函数，value函数就是被修饰的函数@decorator修饰class时 function decorator(target){}只有target一个参数,target就是class的函数体\n\
        es7中新增语法：class第1、2条新增语法需要下载下面的插件才能被babel解析:\n@babel/plugin-proposal-class-properties\n第3条新增语法需要下载下面的插件才能被babel解析\n@babel/plugin-proposal-decorators"]
    },
    {
        "title": "es6题：Set和Map构造函数：es6提供的一种新的存储数据的结构 （笔记）",
        "answer": ["Set和Map构造函数：es6提供的一种新的存储数据的结构:\nSet:\n特点：只有属性值，成员值唯一 不重复\n用途：可以转成数组，其本身具备去重、交集、并集、差集的作用\nnew Set(传的参数必须有迭代接口Symbol，如：数组[]、字符串\"\"...)\n\
        原型上的方法：\nadd(data)添加数据\ndelete(data)删除数据\nhas(data)判断有没有data数据\nclear()清空数据\nforEach()遍历所有数据\nlet oSet = new Set([1,2,3]);\n\
        oSet.forEach((a,b,c)=>{//a和b都是数据的值，c是oSet本身\n\    console.log(a,b,c)\n})\n\
        Map:本质上是键值对的集合\n特点:key对应value,key和value唯一，任何值都可以当属性\n用途:可以让对象当属性，去重等\n实现原理：链接链表、hash算法、桶\n原型上的方法：\nset(key,value)添加数据\n\
        get(key)获取数据\ndelete(key)删除数据\nclear()清空数据\nhas(key)判断有没有key\nsize属性返回数据个数\nforEach()遍历所有数据\n\
        let oMap = new Map([ [\"key\",\"value\"] ]);\noMap.forEach((value,key,m)=>{//m就是oMap本身\n    console.log(value,key,m)\n})\nes6新增for of循环，必须有迭代接口Symbol的数据才能被for of循环\nfor(let i of oMap){//i = [\"key\",\"value\"]\n    console.log(i)\n}"]
    },
    {
        "title": "es6题：把类数组和具有迭代接口的数据类型转成数组",
        "answer": ["Array.from()可以把类数组和具有迭代接口的数据类型转成数组\n...运算符可以展开具有迭代接口的数据类型\n", "Array.from", "array.from", "from"]
    },
    {
        "title": "es6题：数据劫持 es6+和es6都有哪些方法 写出一个即可",
        "answer": ["Object.defineProperty es5+的方法\n此方法可直接在一个对象上定义一个新的具有详细描述的属性，或者修改一个对象的现有属性，并返回这个对象\nObject.defineProperty(对象,属性,描述符)\n数据描述符：\n\
        value: 'xxx'属性值\nwritable: true 是否可写 默认false\nconfigurable: true 是否可配置 默认false\nenumerable: true 是否可枚举 默认false\n存取描述符:\nset: function (){}属性访问器，进行写操作时调用该方法\n\
        get: funciton (){}属性访问器，进行读操作时调用该方法\nset/get不可以和value/writable一起使用\n如果属性是可配置的，那么属性被delete掉后重新赋值之前设置的描述符会失效\n作用：双向数据绑定的核心方法，主要做数据劫持操作（监控属性变化）\n同时也是es6中很多语法糖底层实现的核心方法\n\
        es6新增 Proxy和Reflect 代理和映射\nProxy是构造函数,要使用 Proxy 包装的目标对象可以是任何类型的对象，包括原生数组，函数，甚至另一个代理植入代理模式的思想，以简洁易懂的方式控制对外部对象的访问\n缺点：兼容性不好\n通过Proxy构造函数新建实例时其实是对目标对象进行了浅拷贝，因此目标对象与代理对象会互相影响\n\
        let oproxyData = new Proxy(obj,{});//必须传两个参数，否则会报错，第一个是要代理的对象，第二个参数传一个对象控制obj的读写操作\n利用内置的set、get方法控制属性的读写功能用处较大，其余has deleteProperty……等方法不常用\n\
        get用来监听堆属性的读取操作 get (target,key,receiver)被代理的源对象，被读取的属性名，new Proxy返回的对像\nset用来监听设置属性值的操作 set (target,key,value,receiver)被代理的源对象，被读取的属性名，要设置的值，new Proxy返回的对像\n\
        has用来监听 in 操作，它的返回值就是in的返回值 两个参数 target,key\ndeleteProperty用来监听删除属性 两个参数 target,key\napply()函数调用的捕获器\nconstruct()new 操作符的捕捉器\n", "Object.defineProperty", "Proxy", "object.defineproperty", "defineProperty", "defineproperty", "new Proxy"]
    },
    {
        "title": "es6题：babel编译工具的下载",
        "answer": ["npm install @babel/core babel核心模块，transform可以把es6语法转成抽象语法树\nnpm install @babel/cli  提供命令行功能\nnpm install @babel/preset-env   插件集合（包含解析es6语法的各种插件）",
            "npm install @babel/core babel @babel/cli @babel/preset-env", "@babel/core babel @babel/cli @babel/preset-env"]
    },
    {
        "title": "es6题：babel编译工具配置文件名：",
        "answer": ["文件名 .babelrc\njson格式\n{\n\"presets\": [//presets = 插件集合/预设\n\"@babel/preset-env\"\n],\n//后续有其他插件用plugins导入\n\"plugins\": []\n}", ".babelrc"]
    },
    {
        "title": "es6题：babel命令：\n把target.js编译成es5语法输出到index.js中",
        "answer": ["npx babel target.js -o index.js --watch监听\n文件名不允许包含特殊字符，如：&...", "npx babel target.js -o index.js", "npx babel target.js -o index.js --watch"]
    },
    {
        "title": "es6题：什么是迭代器（iterator笔记）",
        "answer": [`js规定，如果一个对象具有next方法，并且该方法返回一个对象。该对象格式如下，则认为该对象是一个迭代器
        const obj = {
            next(){
                return {
                    value: xxx,//下一个数据的值
                    done: xx//是否迭代完成
                }
            }
        }
        ES6规定，如果一个对象具有知名符号Symbol.iterator,并且属性值是一个迭代器创建函数，则该对像是可迭代的（iterable）
        for of循环用于遍历可迭代对象
        for(let item of iterable){
            //iterable可迭代对象
            //item每次迭代得到的数据
        }`]
    },
    {
        "title": "es6题：什么是生成器（Generator笔记）",
        "answer": [`生成器是一个通过构造函数Generator创建的对象，生成器即是一个迭代器，同时又是一个可迭代对象
        生成器的创建，必须使用生成器函数（Generator Function）
        //这是一个生成器函数，以下函数一定返回一个生成器
    function *generator(){
        yield 1;
        yield 2;
    }
    const obj = {
    *generator(){}
    }
    const data = generator()
    data.next()`]
    },
    {
        "title": "es6题：生成器内部是如何执行的（笔记）",
        "answer": [`生成器函数内部是为了给生成器的每次迭代提供的数据
        每次调用生成器的next方法，将导致生成器函数运行到下一个yield关键字位置
        yield是一个关键字，该关键字只能在生成器内部使用，表达“产生”一个迭代数据的意思
        需要注意的细节：
        1. 生成器函数可以有返回值，返回值出现在第一次done为true时的value属性中
    2. 调用生成器next方法时，可以传递参数，传递的参数会交给yield关键字的返回值
    3. 第一次调用next方法时，传参没有任何意义
    4. 在生成器函数内部可以调用其他生成器，但是要注意加上 * `]
    }
]