module.exports = [
    {
        "title": "canvas：canvas命中检测（检测是否在区域内）非零绕数准则 要求路径必须是闭合的\n chrome 与其他的区别  如果当前路径不是闭合路径谷歌浏览器会返回false ",
        "answer": ["hb.isPointInPath", "isPointInPath", "ispointinpath"]
    },
    {
        "title": "canvas：canvas命中检测（检测是否在线上）",
        "answer": ["hb.isPointInStroke", "isPointInStroke", "ispointinstroke"]
    },
    {
        "title": "canvas：canvas绘制图片",
        "answer": ["drawImage", "drawimage"]
    },
    {
        "title": "canvas：canvas填充图片",
        "answer": ["createPattern(image,epeat);repeat", "createPattern", "createpattern"]
    },
    {
        "title": "canvas：canvas绘制线段",
        "answer": ["lineTo", "lineto"]
    },
    {
        "title": "canvas：canvas绘制文本",
        "answer": ["fillText(文字,x,y)", "fillText", "filltext"]
    },
    {
        "title": "canvas：canvas绘制圆弧",
        "answer": ["arc(x,y,半径,起始弧度,结束弧度,方向)", "arc"]
    },
    {
        "title": "canvas：canvas绘制圆角",
        "answer": ["arcTo(x,y,x1,y1,半径)", "arcTo", "arcto"]
    },
    {
        "title": "canvas：canvas绘制矩形",
        "answer": ["rect(x,y,width,height)\nfillRect(x,y,width,height)\nstrokeRect(x,y,width,height)",
            "rect", "fillRect", "fillrect", "strokeRect", "strokerect"]
    },
    {
        "title": "canvas：canvas完成一条路径后要重新开始另一条路径时必须使用什么方法",
        "answer": ["beginPath", "beginpath"]
    },
    {
        "title": "canvas：canvas移动到 x，y坐标点,准备画图",
        "answer": ["moveTo", "moveto"]
    },
    {
        "title": "canvas：canvas描边 真正把图画出来",
        "answer": ["fill和stroke方法都是作用在当前的所有子路径", "stroke"]
    },
    {
        "title": "canvas：canvas设置线段宽度",
        "answer": ["lineWidth = n", "lineWidth", "linewidth"]
    },
    {
        "title": "canvas：canvas闭合当前路径",
        "answer": ["closePath", "closepath"]
    },
    {
        "title": "canvas：canvas填充",
        "answer": ["fill和stroke方法都是作用在当前的所有子路径", "fill"]
    },
    {
        "title": "canvas：获得canvas上下文对象,画笔",
        "answer": ["getContext('2d')", "getContext", "getcontext"]
    },
    {
        "title": "canvas：获得canvas上下文对象,画笔",
        "answer": ["getContext('2d')", "getContext", "getcontext"]
    },
    {
        "title": "canvas：canvas橡皮擦",
        "answer": ["clearRect(x,y,width,height)", "clearRect", "clearrect"]
    },
    {
        "title": "canvas：canvas缩放当前绘图",
        "answer": ["scale(x缩放比,y缩放比)", "scale"]
    },
    {
        "title": "canvas：canvas保存当前图像状态的一份拷贝(保存画布状态，压入栈）",
        "answer": ["save"]
    },
    {
        "title": "canvas：canvas从栈中弹出存储的图形状态并恢复",
        "answer": ["restore"]
    },
    {
        "title": "canvas：canvas设置线段样式",
        "answer": ["lineCap = 'butt默认值'", "lineCap", "linecap"]
    },
    {
        "title": "canvas：canvas设置线段夹角样式",
        "answer": ["lineJoin = 'miter默认值'", "lineJoin", "linejoin"]
    },
    {
        "title": "canvas：canvas合成,新像素和原像素的合并方式。11种值  默认 source-over w3c标准，常用 source-over, destination-over, copy",
        "answer": ["globalCompositeOperation = 'source-over'", "globalCompositeOperation", "globalcompositeoperation"]
    },
    {
        "title": "canvas：canvas全局透明度",
        "answer": ["globalAlpha = '0.5'", "globalAlpha", "globalalpha"]
    },
    {
        "title": "canvas：将canvas内容导出,是canvas自身的方法不是(ctx)上下文对象上的\n将canvas的内容抽取成⼀张图片, base64编码格式\nGoole浏览器下受同源策略的限制（需要开启服务器）",
        "answer": ["canvas.toDataURL()", "toDataURL", "todataurl"]
    },
    {
        "title": "canvas：获取canvas像素信息,返回一个ImageData对象，data属性是一个数组，包含图像的像素信息\n一个像素信息包含rgba四个数据",
        "answer": ["getImageData(x, y, width, height)", "globalAlpha", "globalalpha"]
    }
]