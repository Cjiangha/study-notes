/*
    生产随机变色
*/
function colorChange(n) {
    if (n == 16) {
        var yanse = '123456789abcdef';
        var pin2 = '#';
        for (var i = 0; i < 6; i++) {
            var suiji = parseInt(Math.random() * yanse.length);
            pin2 += yanse[suiji];
        }
        //console.log(pin2);
        return pin2;
    }
    if (n == 'rgb') {
        var r = parseInt(Math.random() * 256);
        var g = parseInt(Math.random() * 256);
        var b = parseInt(Math.random() * 256);
        var rgb = (r + ',' + g + ',' + b);
        //console.log(rgb);
        return rgb;
    }
}

/*随机验证码 */

function ranCod(a) {
    var html = '0123456789zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP';
    var res = ''
    for (var i = 0; i < a; i++) {
        var suiji = parseInt(Math.random() * (html.length));
        res += html[suiji];
    }
    return res;
}

//获取任意范围内的随机数,a,b为这两个数的范围
function ranNum(a, b) {
    if (a < b) {
        var res = parseInt(Math.random() * (b - a + 1)) + a;
    }
    else if (a > b) {
        var res = parseInt(Math.random() * (a - b + 1)) + b;
    }
    return res;
}

function ranCom() {
    var res = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] >= res) {
            res = arguments[i];
        }
    } return res;
}

//可以取得相应的id
function getId(id) {
    return document.getElementById(id);
}

//去掉数组的重复项，并返回一个新的数组
function norepeat(arr) {
    var newarray = [];
    arr.forEach(function (item) {
        if (newarray.indexOf(item) == -1) {//没有这个值,往新数组push
            newarray.push(item);
        }
    });
    return newarray;
}


/*绑定一个过滤的事件*/
function filterStr(filter) {
    var arr = ['操', 'fuck', '垃圾', '妈的', '你妈', '小学生'];
    for (var i = 0; i < arr.length; i++) {
        var word = arr[i];//循环遍历出所有要过滤的词
        var reg = new RegExp(word, 'ig');//把它创建成正则表达式
        filter = filter.replace(reg, '*');//找出正则表达式里面的过滤词，用*进行代替
    }
    return filter;
}

/*写一个字符串转化成对象 */
function strToobj(str) {//name=laoxie&age=18&sex=male
    var obj = {};//创建一个对象
    var res = str.split('&');//截取后['name=laoxie','age=18','sex=male']
    res.forEach(function (item) {
        // console.log(item);
        var arr = item.split('=');//是一个数组
        obj[arr[0]] = arr[1];
    })
    return obj;
}

/*对象转换为字符串 */
function objToStr(obj) {
    var str = '';
    for (key in obj) {
        str += key + "=" + obj[key] + '&';
    }
    str = str.slice(0, -1);
    return str;
}



/* 补零函数*/
function toDb(num) {
    if (num >= 10) {
        return num;
    } else {
        return '0' + num;
    }
}

/*封装一个函数能返回年月日的*/ //time为var time =  new Date()
function changeTime(time) {
    var year = time.getFullYear();
    var month = toDb(time.getMonth() + 1);
    var date = toDb(time.getDate());
    var hours = toDb(time.getHours());
    var minute = toDb(time.getMinutes());
    var second = toDb(time.getSeconds());
    return year + '年' + month + '月' + date + '日' + hours + ':' + minute + ':' + second
}

/**
    * 将秒数换成时分秒格式
*/
function formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";

    if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
}


//转换为天时分秒的对象
function time(sec) {
    var secs = sec % 60;//秒
    var min = parseInt(sec / 60) % 60;//分
    var hour = parseInt(sec / 60 / 60) % 24;//小时
    var day = parseInt(sec / 60 / 60 / 24);//天数

    // console.log(day, hour, min, secs);
    return {
        days: day,
        hours: hour,
        mins: min,
        secs: secs
    };
}

/* 
    封装设置和获取样式，两个参数的时候是给它
*/
function css() {
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            //高级浏览器
            return getComputedStyle(arguments[0], false)[arguments[1]];
            //getComputedStyle(h1, false)['top'];
        } else {
            //IE8-
            return arguments[0].currentStyle[arguments[1]];
        }
    } else if (arguments.length == 3) {
        //设置样式  ele.style.width = '200px'
        arguments[0].style[arguments[1]] = arguments[2];
    }
}

/*
 * 封装正则验证
 */

var checkReg = {
    // 验证邮箱
    email: function (str) {
        var reg = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/;
        return reg.test(str);//返回true或者false
    },
    // 验证电话
    tel: function (str) {
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    // 验证两边是否有空格
    trim: function (str) {
        var reg = /^\s+|\s+$/;
        return str.replace(reg, '');
    },
    // 身份证
    indetify: function (str) {
        var reg = /^(\d{17}|\d{14})[\dx]$/;
        return str.test(str);
    },

    birthday: function (str) {
        var reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return str.test(str);
    },

    zhanghao: function (str) {
        /*
        验证账号
            * 不能为空，
            * 不能使用特殊字符（数字、字母、下划线、横杠）开头，
            * 必须以字母开头，
            * 长度6-20
        */
        var reg = /^[a-z][\w\-]{5,19}$/;
        return str.test(str);
    },
    nickname: function (str) {
        //昵称只能输入中文     
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    password: function (str) {
        //密码长度  6 - 20    不能包含空格
        var reg = /^\S{6,20}$/;
        return reg.test(str);
    },
    // 用户名可以是2-50位字符之间！ 不能是空格
    username: function (str) {
        var reg = /^.{2,50}$/;
        return reg.test(str);
    }
}

/*
    封装表单验证
 */

function checkInput(ele, reg, inf, meg) {
    /*
      参数一：ele 要正则验证的表单
      参数二：reg 正则不同
      参数三：inf 提示信息节点不同
      参数四：meg 提示信息不同,对象
            比如： 
        checkInput(ainputs[1], 'tel', infs[1], {
                success: '身份证输入正确',
                failure: '身份证输入错误',
                null: '身份证不能为空'
        });
    */

    ele.onblur = function () {
        var val = ele.value.trim();
        var index = this.dataset.index;//用自定义属性的值作为开关对象的属性名
        //1.非空验证
        if (val) {
            //2.正则验证
            var res = checkReg[reg](val);//方法二：利用对象属
            if (res) {
                //符合规则
                inf.innerHTML = meg.success;//提示信息渲染到提示信息节点的节点上，
                inf.style.color = '#58bc58';//符合时提示颜色
                inf.parentNode.style = 'display:none';
                ele.istrue = true;//正确
            } else {
                //不符合规则
                inf.parentNode.style = 'display:block';
                inf.innerHTML = meg.failure;//提示信息渲染到提示信息节点的节点上
                inf.style.color = 'red';//不符合时提示颜色
                ele.istrue = false;//错误
            }
        } else {
            inf.parentNode.style = 'display:block';
            inf.innerHTML = meg.null;//提示信息渲染到提示信息节点的节点上
            inf.style.color = 'red';//不符合时的提示颜色
            ele.istrue = false;//错误
        }
    }

}


function checkInput2(ele, reg, inf, meg) {
    /*
      参数一：ele 要正则验证的表单
      参数二：reg 正则不同
      参数三：inf 提示信息节点不同
      参数四：meg 提示信息不同,对象
            比如： 
        checkInput(ainputs[1], 'tel', infs[1], {
                success: '身份证输入正确',
                failure: '身份证输入错误',
                null: '身份证不能为空'
        });
    */

    ele.onblur = function () {
        var val = ele.value.trim();
        var index = this.dataset.index;//用自定义属性的值作为开关对象的属性名
        //1.非空验证
        if (val) {
            //2.正则验证
            var res = checkReg[reg](val);//方法二：利用对象属
            if (res) {
                //符合规则
                inf.innerHTML = meg.success;//提示信息渲染到提示信息节点的节点上，
                inf.style.color = '#58bc58';//符合时提示颜色
                inf.style = 'display:none';
                ele.istrue = true;//正确
            } else {
                //不符合规则
                inf.style = 'display:block';
                inf.innerHTML = meg.failure;//提示信息渲染到提示信息节点的节点上
                inf.style.color = 'red';//不符合时提示颜色
                ele.istrue = false;//错误
            }
        } else {
            inf.parentNode.style = 'display:block';
            inf.innerHTML = meg.null;//提示信息渲染到提示信息节点的节点上
            inf.style.color = 'red';//不符合时的提示颜色
            ele.istrue = false;//错误
        }
    }

}



/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {
    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {
        var istrue = true;
        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }
    }, 30); //obj.timer 每个对象都有自己定时器
}


//ajax封装
function ajax(opt) {//opt为新的对象
    //默认参数
    let defaultData = {
        data: '',
        asyn: true,
        failure: null
    }
    Object.assign(defaultData, opt);
    //1、创造对象
    let xhr = new XMLHttpRequest();//new一个HttpRequest对象
    //
    if (defaultData.type.toLowerCase() == 'get') {
        //get方式
        if (defaultData.data) {
            defaultData.data = objToStr(defaultData.data);//对象转换为字符串
            defaultData.url += '?' + defaultData.data;
        }
        xhr.open('get', defaultData.url, defaultData.asyn);
        xhr.send(null);
    }
    else if (defaultData.type.toLowerCase() == 'post') {
        //post方式
        xhr.open('post', defaultData.url, defaultData.asyn);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');//给post创建请求数据格式
        defaultData.data = objToStr(defaultData.data);//对象转换为字符串
        xhr.send(defaultData.data);//post的话需要传入数据
    }

    //4、返回的参数值
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                //成功了
                let data = xhr.responseText;//响应的Text值
                defaultData.success(data);
            }
            else {
                //失败
                if (defaultData.failure) {
                    defaultData.failure(xhr.status);
                }
            }
        }
    }
}





//设置cookie
// setCookie('username',后台成功返回的值,10)
function setCookie(key, val, iDay) {
    //key键名,val键值,iDay失效时间
    var str = key + '=' + val + ';path=/';
    if (iDay) {
        var date = new Date();
        date.setDate(date.getDate() + iDay);//当前时间+10天
        str += ';expires=' + date;//如果有这个参数就设置失效时间
    }
    document.cookie = str;
}

//获取cookie:document.cookie = name=value[;expires=date][;path=路径][;domain=域名]   
function getCookie(key) {
    //传健名，返回对应键，name = 小鱿鱼；age = 20
    var str = document.cookie;
    var arr = str.split('; ');//['name=小鱿鱼','age=20']
    for (var ele of arr) {
        var arr2 = ele.split('=');
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

//删除cookie
function removeCookie(key) {
    setCookie(key, '', -1);
}