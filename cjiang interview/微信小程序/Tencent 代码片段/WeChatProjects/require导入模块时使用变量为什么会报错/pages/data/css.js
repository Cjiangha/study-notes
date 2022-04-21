module.exports = [
    {
        "title": "css题: 盒子阴影",
        "answer": ["box-shadow: 水平偏移量 竖直偏移量 模糊半径 扩展半径 阴影颜色 投影方式 （inset ==> 内阴影）", "box-shadow", "boxshadow", "boxShadow"]
    },
    {
        "title": "css题:  媒体查询",
        "answer": ["@meida", "meida"]
    },
    {
        "title": "css题: css怎么设置不能选中文字",
        "answer": ["user-select:none", "user-select: none", "userSrlect: none"]
    },
    {
        "title": "css题: css怎么设置文本缩进",
        "answer": ["text-indent", "textIndent"]
    },
    {
        "title": "css题: css怎么设置下划线。none无  underline 下划线 overline 上划线 line-through中划线（删除线）",
        "answer": ["text-decoration", "textDecoration"]
    },
    {
        "title": "css题: css怎么设置透明度",
        "answer": ["opacity"]
    },
    {
        "title": "css题: css怎么设置保证两个块级元素在水平方向居中",
        "answer": ["vertical-align:middle", "verticalAlign:middle", "vertical-align", "verticalAlign", "verticalalign"]
    },
    {
        "title": "css题: css（清除浮动流） 必须写在块级元素里面才能生效",
        "answer": ["clear:both", "clear both"]
    },
    {
        "title": "css题: css如何触发一个盒子的bfc,答对一个即可",
        "answer": ["position:absolute;\ndisplay:inline-block;\nfloat:left/right;\noverflow:hidden;",
            "position:absolute", "display:inline-block", "float", "overflow:hidden"]
    },
    {
        "title": "css题: css:\n伪元素:逻辑最前",
        "answer": ["before"]
    },
    {
        "title": "css题: css:\n伪元素:逻辑最后",
        "answer": ["after"]
    },
    {
        "title": "css题: 凡是设置了position:abolute;float:left/right;它会从系统内部把元素换成",
        "answer": ["inline-block", "inlineBlock"]
    },
    {
        "title": "css题: css设置强制不换行。 不换行 文字将展示在一行内 不识别换行符 只保留一个空格",
        "answer": ["white-space:nowrap", "whiteSpace:nowrap"]
    },
    {
        "title": "css题: css设置IE6混杂模式",
        "answer": ["box-sizing:border-box", "box-sizing"]
    },
    {
        "title": "css题: css找唯一的子元素",
        "answer": ["only-of-type", "only-child"]
    },
    {
        "title": "css题: css找子元素中的某一个",
        "answer": ["nth-of-type(n)", "nth-of-type"]
    },
    {
        "title": "css题: css选择空的元素",
        "answer": [":empty", "empty"]
    },
    {
        "title": "css题: 选择不是（存在data属性并且该属性值中存在demo单词的div）",
        "answer": [" div:not([data='demo'])", ":not([data='demo'])", ":not()"]
    },
    {
        "title": "css题: input元素（不是指input输入框）被选中的状态",
        "answer": ["input:checked", ":checked", "checked"]
    },
    {
        "title": "css题: css线性渐变",
        "answer": ["linear-gradient()", "linear-gradient", "lineargradient"]
    },
    {
        "title": "css题: css径向渐变",
        "answer": ["radial-gradient()", "radial-gradient", "radialgradient"]
    },
    {
        "title": "css题: css取消一些组件的默认样式",
        "answer": ["outline:none", "outline"]
    },
    {
        "title": "css题: css设置字体描边效果,只有谷歌浏览器兼容，所以要加-webkit-当然不加也可以用，最好是加上",
        "answer": ["-webkit-text-stroke", "text-stroke"]
    },
    {
        "title": "css题: css引入自定义字体 MIME协议（浏览器会根据协议里面的内容请求操作系统的支持）",
        "answer": ["@font-face", "font-face", "fontface", "fontFace"]
    },
    {
        "title": "css题: css改变元素尺寸大小可以拖动修改元素的宽高,这个属性不能单独使用，需要配合overflow来用，否则没有效果",
        "answer": ["resize:both", "resize"]
    },
    {
        "title": "css题: overflow-x/y: 只要设置一个为scroll 另一个默认值是",
        "answer": ["auto"]
    },
    {
        "title": "css题: display: fiex; 子元素沿主轴对其方式:居中",
        "answer": ["justify-content:flex-start默认值|flex-end与默认值相反的", "justify-content", "justifycontent"]
    },
    {
        "title": "css题: 怎么设置一个盒子为弹性盒子",
        "answer": ["display:flex", "flex", "inline-flex", "display:inline-flex"]
    },
    {
        "title": "css题: 设置文本溢出部分打点显示",
        "answer": ["text-overflow:ellipsis", "text-overflow", "ellipsis"]
    },
    {
        "title": "css题: 设置文本强制不换行，文字将展示在一行内 不识别换行符 只保留一个空格",
        "answer": ["white-space:nowrap", "white-space", "whitespace:nowrap"]
    },
    {
        "title": "css题: white-space保留所有空格 包括换行 值是什么",
        "answer": ["white-space:pre", "whitespace:pre", "pre"]
    },
    {
        "title": "css题: word-break强制换行 不区分单词\nword-wrap强制换行",
        "answer": ["word-wrap:break-word;\nword-break:break-all;", "word-wrap:break-word", "word-break:break-all"]
    },
    {
        "title": "css题: 设置flex主轴方向\n设置在容器上,主轴默认从左到右",
        "answer": ["flex-direction:row默认值自左向右\nflex-direction:rowrow-reverse主轴自右向左\ncolumn主轴自上到下\n column-reverse主轴自下到上\n",
            "flex-direction:row", "flex-direction", "flexDirection", "flexdirection"]
    },
    {
        "title": "css题: animation属性为css3的复合属性，animation-name:run 怎么规定他的执行动画",
        "answer": ["@keyframes run", "@keyframes"]
    },
    {
        "title": "css题: 贝塞尔曲线",
        "answer": ["cubic-bezier", "cubicbezier", "cubic", "bezier"]
    },
    {
        "title": "css题: css 把小写字母变成大写",
        "answer": ["text-transform:uppercase", "text-transform", "uppercase"]
    }
]