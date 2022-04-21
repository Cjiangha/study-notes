module.exports = [
    {
        "title": "模块化：AMD暴露接口方式",
        "answer": ["AMD的核心思想就是通过define来定义一个模块，然后使用require来加载一个模块。AMD规范的使用依赖于require.js",
            "define(\"id\",[\"mode\"],function)", "define"]
    },
    {
        "title": "模块化：CMD暴露接口方式",
        "answer": ["define(function (require,exports,module){\nmodule.exports = value或\nexports.value = value})三个形参必须按顺序写，否则会报错",
            "define(function(require,exports,module))", "define"]
    },
    {
        "title": "模块化：CommonJS暴露接口方式",
        "answer": ["CommonJS的核心思想就是通过 require 方法来同步加载所要依赖的其他模块，然后通过 exports 或者 module.exports 来导出需要暴露的接口\nmodule.exports = value\nexports.XXX = value；",
            "module.exports", "module.exports={}"]
    },
    {
        "title": "模块化：commonJs暴露的模块是什么(exports的本质是什么)？",
        "answer": ["exports本质是一个空对象", "空对象", "module.exports={}", "{}", "null"]
    },
    {
        "title": "模块化：commonJs加载模块",
        "answer": ["var value = require(\"url\")", "require", "require()"]
    },
    {
        "title": "模块化：AMD加载模块",
        "answer": ["require([\"mode\"],function (mode){})", "require", "require()"]
    },
    {
        "title": "模块化：CMD异步加载模块",
        "answer": ["require.async(\"./mode3\",function (m3){\nm3.fn.foo()})", "require.async", "require.async()"]
    },
    {
        "title": "模块化：CMD同步加载模块",
        "answer": ["require(\"./mode3\")", "require"]
    },
    {
        "title": "模块化：AMD加载模块的路径",
        "answer": ["require.config({\npaths = {\nmode: 'url'}})\nrequire.config()里面传一个对象，对象里 paths属性定义所有模块的路径",
            "require.config", "require.config()", "require.config({paths})", "require.config({paths={}})"]
    },
    {
        "title": "模块化：CMD加载模块的路径",
        "answer": ["require.config({\npaths = {\nmode: 'url'}})\nrequire.config()里面传一个对象，对象里 paths属性定义所有模块的路径",
            "require.config", "require.config()", "require.config({paths})", "require.config({paths={}})"]
    },
    {
        "title": "模块化：AMD规范和CMD规范的区别\n了解一下，不需要回答，可以输入too命令跳过",
        "answer": ["AMD规范则是异步加载模块，允许指定回调函数。等模块异步加载完成后即可调用回调函数。\
        AMD的核心思想就是通过define来定义一个模块，然后使用require来加载一个模块。\
        AMD规范的使用依赖于require.js 。AMD得意的产出就是require.js\
        \nCMD异步加载，跟AMD的主要区别在于，AMD依赖前置，提前加载依赖。而CMD就近加载，\
        按需加载。产物sea.Js，跟require.Js使用有些相似\nAMD<script src=\"./require.js\" data-main=\"main.js\"></script>\
        \nCMD<script src=\"./sea.js\"></script>\n<script>\nseajs.use(\"./main.js\")//引入主函数\n</script>"]
    }
]