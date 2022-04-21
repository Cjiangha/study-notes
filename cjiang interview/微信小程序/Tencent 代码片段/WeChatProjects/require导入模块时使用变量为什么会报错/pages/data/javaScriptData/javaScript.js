module.exports = [
    {
        "title": "js题：如何判断对象上的一个属性是不是原型上的",
        "answer": ["hasOwnProperty"]
    },
    {
        "title": "js题：uri转码方法 把字符转成uri码",
        "answer": ["encodeURIComponent", "encodeuricomponent", "en"]
    },
    {
        "title": "js题：uri译码方法 把uri码转成字符",
        "answer": ["decodeURIComponent", "decodeuricomponent", "de"]
    },
    {
        "title": "js题：判断A是不是B构造函数构造出来的（看A对象的原型链上有没有B的原型）",
        "answer": ["instanceof", "A instanceof B"]
    },
    {
        "title": "js题：不改变原数组\n把arr数组按参数拆分成字符串",
        "answer": ["join", "arr.join"]
    },
    {
        "title": "js题：改变原数组\n在数组的最后添加一个数据，返回数组长度",
        "answer": ["push"]
    },
    {
        "title": "js题：改变原数组\n把数组的最后一位剪切出来",
        "answer": ["pop"]
    },
    {
        "title": "js题：改变原数组\n把数组最前一位剪切",
        "answer": ["shift"]
    },
    {
        "title": "js题：改变原数组\n在数组最前添加数据",
        "answer": ["unshift"]
    },
    {
        "title": "js题：改变原数组\n把原数组倒叙返回",
        "answer": ["reverse"]
    },
    {
        "title": "js题：改变原数组\n数组排序方法。如果传函数，被传进去的必须有两个形参返回值为负数时，那么前面的数放在前面为正数时，后面的数放在前面为0时，不动",
        "answer": ["sort"]
    },
    {
        "title": "js题：不改变原数组\n把后面的数组拼到前面数组上并返回一个新数组",
        "answer": ["concat"]
    },
    {
        "title": "js题：不改变原数组\n把字符串按参数拆分成数组",
        "answer": ["split"]
    },
    {
        "title": "js题：不改变原数组\n把数组变成字符串展现出来",
        "answer": ["toString", "tostring"]
    },
    {
        "title": "js题：取随机数",
        "answer": ["Math.random", "math.random"]
    },
    {
        "title": "js题：向上取整",
        "answer": ["Math.ceil", "math.ceil"]
    },
    {
        "title": "js题：向下取整",
        "answer": ["Math.floor", "math.floor"]
    },
    {
        "title": "js题：遍历节点树:\n父节点（最顶端的为#document）",
        "answer": ["parentNode", "parentnode"]
    },
    {
        "title": "js题：遍历节点树:\n子节点们 [返回类数组]",
        "answer": ["childNodes", "childnodes"]
    },
    {
        "title": "js题：遍历节点树:\n第一个子节点",
        "answer": ["firstChild", "firstchild"]
    },
    {
        "title": "js题：遍历节点树:\n最后一个子节点",
        "answer": ["lastChild", "lastchild"]
    },
    {
        "title": "js题：遍历节点树:\n下一个兄弟节点",
        "answer": ["nextSibling", "nextsibling"]
    },
    {
        "title": "js题：遍历节点树:\n前一个兄的节点",
        "answer": ["previousSibling", "previoussibling"]
    },
    {
        "title": "js题：基于元素节点树的遍历:\n返回当前元素的父元素节点（IE不兼容）",
        "answer": ["parentElement", "parentelement"]
    },
    {
        "title": "js题：返回元素的标签名，大写形式表示，只读",
        "answer": ["nodebranch", "nodebranch"]
    },
    {
        "title": "js题：返回text节点或Comment节点的文本内容，可读写",
        "answer": ["nodeValue", "nodevalue"]
    },
    {
        "title": "js题：返回该节点的类型，只读",
        "answer": ["nodeType", "nodetype"]
    },
    {
        "title": "js题：改变标签里面的内容",
        "answer": ["innerHTML", "innerhtml"]
    },
    {
        "title": "js题：改变元素的文本内容",
        "answer": ["innerText", "innertext"]
    },
    {
        "title": "js题：给元素添加属性",
        "answer": ["setAttribute", "setattribute"]
    },
    {
        "title": "js题：读取元素属性值",
        "answer": ["getAttribute", "getattribute"]
    },
    {
        "title": "js题：日期对象var date = new Date()\n返回1970年1月1日至今的毫秒数(计算机的纪元时间)",
        "answer": ["getTime", "gettime", "date.getTime", "date.gettime"]
    },
    {
        "title": "js题：定时器：\n每隔指定时间执行一次",
        "answer": ["setInterval", "setinterval"]
    },
    {
        "title": "js题：定时器：\n等待指定时间执行，只执行一次",
        "answer": ["setTimeout", "settimeout"]
    },
    {
        "title": "js题：定时器：\n清除每隔指定时间执行一次的定时器",
        "answer": ["clearInterval", "clearinterval"]
    },
    {
        "title": "js题：定时器：\n清除等待指定时间执行，只执行一次的定时器",
        "answer": ["clearTimeout", "cleartimeout"]
    },
    {
        "title": "js题：剪切子节点(删除子元素)",
        "answer": ["dom.removeChild", "removechild", "removeChild"],
    },
    {
        "title": "js题：元素删除自身",
        "answer": ["dom.remove", "remove"]
    },
    {
        "title": "js题：创建新标签",
        "answer": ["document.createElement", "document.createelement", "createElement", "createelement"]
    },
    {
        "title": "js题：把新创建的标签插入到页面里面",
        "answer": ["document.body.appendChild", "document.body.appendchild", "appendChild", "appendchild"]
    },
    {
        "title": "js题：创建文本节点",
        "answer": ["document.createTextNode", "document.createtextnode", "createTextnode", "createtextnode"]
    },
    {
        "title": "js题：阻止默认事件：w3c标准方法",
        "answer": ["e.preventDefault", "preventdefault"]
    },
    {
        "title": "js题：点击事件",
        "answer": ["onclick", "click"]
    },
    {
        "title": "js题：事件绑定函数add 不兼容ie",
        "answer": ["addEventListener", "addeventlistener"]
    },
    {
        "title": "js题：事件绑定函数addEventListener怎么清除",
        "answer": ["removeEventListener", "removeeventlistener"]
    },
    {
        "title": "js题：鼠标移动事件",
        "answer": ["onmousemove", "mousemove"]
    },
    {
        "title": "js题：鼠标移入事件",
        "answer": ["onmouseenter", "mouseenter"]
    },
    {
        "title": "js题：鼠标移出事件",
        "answer": ["onmouseleave", "mouseleave"]
    },
    {
        "title": "js题：鼠标被抬起事件",
        "answer": ["onmouseup", "mouseup"]
    },
    {
        "title": "js题：鼠标被按下事件",
        "answer": ["onmousedown", "mousedown"]
    },
    {
        "title": "js题：键盘被抬起事件",
        "answer": ["keyup", "onkeyup"]
    },
    {
        "title": "js题：键盘被按下事件",
        "answer": ["keydown", "onkeydown"]
    },
    {
        "title": "js题：键盘被按下事件，只可以响应字符类键盘按键，返回ASCII码，可以转换成相应字符",
        "answer": ["keypress", "onkeypress"]
    },
    {
        "title": "js题：文本操作事件\n输入字符触发",
        "answer": ["oninput", "input"]
    },
    {
        "title": "js题：文本操作事件\n鼠标聚焦",
        "answer": ["onfocus", "focus"]
    },
    {
        "title": "js题：文本操作事件\n鼠标失去焦点",
        "answer": ["onblur", "blur"]
    },
    {
        "title": "js题：文本操作事件\n输入框文本被选中事件（虽然没什么用）",
        "answer": ["onselect", "select"]
    },
    {
        "title": "js题：文本操作事件\n字符状态发生变化时触发",
        "answer": ["onchange", "change"]
    },
    {
        "title": "js题：窗体操作类(window上的事件)\n监听滚动条事件",
        "answer": ["window.onscroll", "onscroll", "scroll"]
    },
    {
        "title": "js题：窗体操作类(window上的事件)\n当文档加载完毕时,当所有async的脚本加载完成并执行后、img等加载完成后触发",
        "answer": ["window.onload", "onload", "load"]
    },
    {
        "title": "js题：右键出菜单事件",
        "answer": ["document.oncontextmenu", "oncontextmenu", "contextmenu"]
    },
    {
        "title": "js题：DOM3标准规定:click事件只能监听左键,只能通过mousedown和mouseup来判断鼠标键,用事件源对象上的那个属性来区分鼠标的左右按键。0左键/1滚轮/2右键",
        "answer": ["e.button", "button"]
    },
    {
        "title": "js题：input框属性：限制最长字符不能超过多少个",
        "answer": ["maxlength"]
    },
    {
        "title": "js题：w3c标准 如何取消事件冒泡  但不支持ie9以下版本",
        "answer": ["event.stopPropagation", "stopPropagation"]
    },
    {
        "title": "js题：判断字符串中是否包含某个字符，如果包含返回该字符的索引，否则返回-1",
        "answer": ["indexOf", "indexof"]
    },
    {
        "title": "js题：查看横向滚动条距离 （ie8及ie8以下不兼容）",
        "answer": ["window.pageXOffset", "window.pagexoffset", "pagexoffset", "pageXOffset"]
    },
    {
        "title": "js题：查看纵向滚动条距离 （ie8及ie8以下不兼容）",
        "answer": ["window.pageYOffset", "window.pageyoffset", "pageYOffset", "pageYOffset"]
    },
    {
        "title": "js题：查看视口宽度 （ie9以上可以用 ie9以下不兼容）",
        "answer": ["window.innerWidth", "window.innerwidth", "innerwidth", "innerWidth"]
    },
    {
        "title": "js题：查看视口高度 （ie9以上可以用 ie9以下不兼容）",
        "answer": ["window.innerHeight", "window.innerheight", "innerheight", "innerHeight"]
    },
    {
        "title": "js题：如何查看浏览器是标准模式还是怪异模式",
        "answer": ["document.compatMode", "document.compatmode", "compatmode", "compatMode"]
    },
    {
        "title": "js题：计算css样式。只读，返回的计算样式值是绝对值，没有相对单位",
        "answer": ["window.getComputedStyle", "window.getcomputedstyle", "getcomputedstyle"]
    },
    {
        "title": "js题： 滚轮事件",
        "answer": ["wheel"]
    },
    {
        "title": "js题：String上哪个函数可以把uincode转换成字符",
        "answer": ["fromCharCode", "fromcharcode"]
    },
    {
        "title": "js题：文档解析完成后document对象触发什么事件,这也标志着程序执行从同步脚本执行阶段，转化为事件驱动阶段。\
        这个事件用句柄式绑定无效，只能用addEventListener绑定",
        "answer": ["DOMContentLoaded", "domcontentloaded"]
    },
    {
        "title": "js题：监听document.readyState状态变化",
        "answer": ["onreadystatechange", "readystatechange"]
    },
    {
        "title": "js题：当所有async的脚本加载完成并执行后、img等加载完成后，document.readyState = '?'，window对象触发load事件",
        "answer": ["complete"]
    },
    {
        "title": "js题：当文档解析完成，document.readyState =",
        "answer": ["interactive"]
    },
    {
        "title": "js题：查看元素的位置\n对于无定位父级的元素，返回相对文档的坐标。对于有定位父级的元素，\
        返回相对于最近的有定位的父级的坐标。(无论是 left 还是margin-left等都是距离。 ) ",
        "answer": ["dom.offsetLeft, dom.offsetTop", "offsetLeft", "offsetTop", "offsetleft", "offsettop"]
    },
    {
        "title": "js题：查看元素的尺寸",
        "answer": ["dom.offsetWidth, dom.offsetHeight", "offsetWidth", "offseHeight", "offsetwidth", "offsetheight"]
    },
    {
        "title": "js题：返回最近的有定位的父级，如无，返回body, body. 返回null",
        "answer": ["offsetParent", "offsetparent"]
    },
    {
        "title": "js题：让滚动条滚动\n在之前滚动的数据基础之上做累加。利用它可以做快速阅读的功能",
        "answer": ["scrollBy", "scrollby"]
    },
    {
        "title": "js题：正则表达式：\n用字符串匹配正则表达式的方法",
        "answer": ["reg.test(str)\nstr.match(reg)\nreg.exec(str);保留上一次匹配的位置",
            "test", "match", "exec", "reg.test", "str.match", "reg.exec"]
    }
]
