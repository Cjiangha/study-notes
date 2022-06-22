- [基于`导航栏`的组件封装](#基于导航栏的组件封装)
  - [封装所带的参数](#封装所带的参数)
  - [代码](#代码)
# 基于`导航栏`的组件封装

第一种方式，核心的函数 
[Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

**`Object.assign()`**  方法将所有[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)（`Object.propertyIsEnumerable()` 返回 true）和[自有](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)（`Object.hasOwnProperty()` 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。

## 封装所带的参数

```
 toggle
    入参：
{
    el:'#m6',//必填
    childerEl:'.sub',//必填
    time:500 //默认时间为300
}
time根据项目需要修改time的时间
```

## 代码

HTML

```html
    <body>
    <div class="navsum content clearfix">
        <div class="navBar">
            <ul>
                <li id="m1">
                    <h3><a href="./index.html">首页</a></h3>
                </li>
                <li id="m2">
                    <h3><a href="javascript:void(0);">学校概况</a></h3>
                    <ul class="sub">
                        <li><a href="javascript:void(0);">学校简介</a></li>
                        <li><a href="javascript:void(0);">学校领导</a></li>
                        <li><a href="javascript:void(0);">学校标识</a></li>
                        <li><a href="javascript:void(0);">校园风光</a></li>
                        <li><a href="javascript:void(0);">校园视频</a></li>
                    </ul>
                </li>
                <li id="m3">
                    <h3><a href="javascript:void(0);">机构设置</a></h3>
                </li>
                <li id="m4">
                    <h3><a href="javascript:void(0);">人才培养</a></h3>
                </li>
                <li id="m5">
                    <h3><a href="javascript:void(0);">科学研究</a></h3>
                </li>
                <li id="m6">
                    <h3><a href="javascript:void(0);">招生就业</a></h3>
                    <ul class="sub">
                        <li><a href="javascript:void(0);">招生网</a></li>
                        <li><a href="javascript:void(0);">就业网</a></li>
                    </ul>
                </li>
                <li id="m7">
                    <h3><a href="javascript:void(0);">党建工作</a></h3>
                </li>
                <li id="m8">
                    <h3><a href="javascript:void(0);">国际教育</a></h3>
                    <ul class="sub">
                        <li><a href="javascript:void(0);">国际交流处</a></li>
                        <li><a href="javascript:void(0);">国际教育学院</a></li>
                    </ul>
                </li>
                <li id="m9">
                    <h3><a href="javascript:void(0);">学生生活</a></h3>
                    <ul class="sub">
                        <li><a href="javascript:void(0);">学生处</a></li>
                        <li><a href="javascript:void(0);">校团委</a></li>
                    </ul>
                </li>
                <li id="m10">
                    <h3><a href="javascript:void(0);">创新创业</a></h3>
                    <ul class="sub">
                        <li><a href="javascript:void(0);">创新创业学院</a></li>
                        <li><a href="javascript:void(0);">国际商学院</a></li>
                    </ul>
                </li>
                <li id="m11">
                    <h3><a href="javascript:void(0);">校友之家</a></h3>
                </li>
            </ul>
        </div>
    </div>
</body>
```

```css
// 公共的css
// 涉及到 浮动的关系要加入 clearfix
.clearfix:before, .clearfix:after { content:""; display:table;}
.clearfix:after{ clear:both;}
.clearfix{ *zoom:1;/*ie6,7*/}


// 导航css
.navsum .navBar {
    position: relative;
    z-index: 1;
    height: 60px;
    float: left;
    width: 1140px
}

.navsum .navBar>ul>li {
    position: relative;
    float: left;
    width: 9%;
    display: inline;
    text-align: center
}

.navsum .navBar>ul>li>h3 a {
    zoom: 1;
    height: 20px;
    padding: 20px 0;
    display: block;
    color: #333333;
    font-size: 18px;
    transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s
}

.navsum .navBar>ul>li>h3 a:hover {
    color: #ffffff;
    font-weight: bold;
    background: #871f27
}

.navsum .navBar>ul>li .sub {
    display: none;
    width: 100%;
    position: absolute;
    left: 0;
    top: 60px;
    background: url(../img/sub_bg.png) center center repeat;
    float: left
}

.navsum .navBar>ul>li .sub a:hover {
    color: #ee9123 !important;
    transition: .5s
}

.navsum .navBar>ul>li .sub li {
    text-align: center;
    line-height: 24px
}

.navsum .navBar>ul>li .sub li a {
    color: #ffffff;
    display: block;
    zoom: 1;
    padding: 10px 0
}

```

```js
//需要引入 jquery进行操作 不然无法使用$ 进行dom的链式操作
//index.js
function toggle(opt) {
    let defaultopt = {
      time: 300, //默认时间为300
    };
    Object.assign(defaultopt, opt);
  
    //鼠标移入
    $(defaultopt.el).mouseover(function () {
      $(this).children(defaultopt.childerEl).slideDown(defaultopt.time);
    });
  
    // 鼠标移出
    $(defaultopt.el).mouseleave(function () {
      //鼠标移入
      // $(this).children('.sub').css('display','block')
      $(this).children(".sub").slideUp(defaultopt.time);
    });
  }
  
  //主页面中HTML里的js的调用
  function togglesum() {
    var elarr = ['#m2', '#m6', '#m8', '#m9', '#m10']
    elarr.forEach((item, index) => {
        if (item == '#m2') { // 判断修改的 arrayitem
            //第一个延迟1000ms
            toggle({
                el: elarr[0], //必填
                childerEl: '.sub',//必填
                time: 1000 //默认时间为300
            })
        } else {
            // 正常使用，不传值 默认300
            toggle({
                el: item,
                childerEl: '.sub',
                // time: 400 //默认时间为300
            })
        }
    });
}

```