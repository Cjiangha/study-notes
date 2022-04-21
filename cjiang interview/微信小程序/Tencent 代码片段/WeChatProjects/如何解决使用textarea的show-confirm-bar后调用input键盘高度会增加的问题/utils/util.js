const ksort = require('ksort.js');
const md5 = require('md5.js');


// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

//减法
function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function date_to_unixtime(date) {
  var _date = '';

  date = date.replace(/-/g, '/');
  _date = new Date(date).getTime() / 1000;

  return _date;
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
 */
function unixtime_to_date(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}


//当前时间 2019-03-04 10:44:58
function getNowFormatDate(is_all) {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }

  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  if (is_all == undefined) {
    currentdate += " " + hours + seperator2 + minutes + seperator2 + seconds;
  }
  return currentdate;
}

function otherSign(post_data, url, separator) {
  let sign = separator;
  let url_param = convertUrlQuery(url);
  post_data['s'] = url_param['s'];
  post_data = ksort.ksort(post_data);
  for (let key in post_data) {
    sign += key + post_data[key];
  }  
  sign += getNowFormatDate(false);
  let md5_sign = md5.hexMD5(sign);
  // console.info(md5_sign.toUpperCase(), sign);

  return md5_sign.toUpperCase();
}

function sign(post_data, secret, url) {
  let sign = '';
  let url_param = convertUrlQuery(url);
  post_data['s'] = url_param['s'];
  post_data = ksort.ksort(post_data);
  for (let key in post_data) {
    sign += key + post_data[key];
  }

  sign += secret;
  let md5_sign = md5.hexMD5(sign);
  // console.info(md5_sign.toUpperCase(), sign);

  return md5_sign.toUpperCase();
}

function convertUrlQuery(str) {
  let url_params = str.split("?");
  let vars = url_params[1].split("&");

  let params = [];

  for (let i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = pair[1];
  }
 

  return params;
}

function toFix(value) {
  return value.toFixed(2) // 此处2为保留两位小数，保留几位小数，这里写几
}

function getFileNameByUrl(o) {
  var pos = o.lastIndexOf("/");
  return o.substring(pos + 1);
}

function computeChooseNum(context) {
  let _choose_num = 0;
  let _choose_money = 0;
  let _order_list = context.data.order_list;
  let _normal_name = context.data.normal_name;

  let _normal = context.data.normal_name;

  var _all_checked = 'checked';
  var _custom_checked = 'checked';
  var _normal_checked = 'checked';

  if ((_order_list['custom'] == undefined || (_order_list['custom'] != undefined && _order_list['custom'].length <= 0)) && Object.keys(_order_list['normal']).length == 0) {

    _all_checked = '';
    _custom_checked = '';
    _normal_checked = '';
  }

  for (var i in _order_list['custom']) {
    
    if (_order_list['custom'][i]['checked'] == 'checked') {
      _choose_num++;
    } else {

      _all_checked = '';
      _custom_checked = '';
    }
  }
  for (let key in _order_list['normal']){

    if(_normal_name[key].check =='checked'){

      _normal_name[key].check = 'checked';
      for (let ol_key in _order_list['normal'][key]){

        if (_order_list['normal'][key][ol_key]['checked'] == 'checked') {
          _choose_num++;
          _choose_money = accAdd(_choose_money, accMul(parseFloat(_order_list['normal'][key][ol_key]['num']), _order_list['normal'][key][ol_key]['money']));
        } else {

          _all_checked = '';
          _normal_checked = '';
          _normal_name[key].check = '';
        }

      }
    }else{

      for (let ol_key in _order_list['normal'][key]) {
        if (_order_list['normal'][key][ol_key]['checked'] == 'checked') {
          _choose_num++;
          _choose_money = accAdd(_choose_money, accMul(parseFloat(_order_list['normal'][key][ol_key]['num']), _order_list['normal'][key][ol_key]['money']));
        } else {
          _all_checked = '';
          _normal_checked = '';
          _normal_name[key].check = '';
        }
      }
     
    }

  }

  _choose_money = toFix(_choose_money/100);


  context.setData({
    chooseCheckBoxNum: _choose_num,
    custom_checked: _custom_checked,
    normal_checked : _normal_checked,
    all_checked: _all_checked,
    normal_name : _normal_name,
    choose_money :_choose_money,
  });
}

//反序列化
function unserialize(ss) {
  var p = 0,
    ht = [],
    hv = 1,
    r = null;

  function unser_null() {
    p++;
    return null;
  }

  function unser_boolean() {
    p++;
    var b = (ss.charAt(p++) == '1');
    p++;
    return b;
  }

  function unser_integer() {
    p++;
    var i = parseInt(ss.substring(p, p = ss.indexOf(';', p)));
    p++;
    return i;
  }

  function unser_double() {
    p++;
    var d = ss.substring(p, p = ss.indexOf(';', p));
    switch (d) {
      case 'INF':
        d = Number.POSITIVE_INFINITY;
        break;
      case '-INF':
        d = Number.NEGATIVE_INFINITY;
        break;
      default:
        d = parseFloat(d);
    }
    p++;
    return d;
  }

  function unser_string() {
    p++;
    var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
    p += 2;
    //var s = utf8to16(ss.substring(p, p += l));
    //var s = ss.substring(p, p += l);
    var s = subChnStr(ss, l, p);
    p += s.length;
    p += 2;
    return s;
  }

  function unser_array() {
    p++;
    var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
    p += 2;
    var a = [];
    ht[hv++] = a;
    for (var i = 0; i < n; i++) {
      var k;
      switch (ss.charAt(p++)) {
        case 'i':
          k = unser_integer();
          break;
        case 's':
          k = unser_string();
          break;
        case 'U':
          k = unser_unicode_string();
          break;
        default:
          return false;
      }
      a[k] = __unserialize();
    }
    p++;
    return a;
  }

  function unser_object() {
    p++;
    var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
    p += 2;
    var cn = utf8to16(ss.substring(p, p += l));
    p += 2;
    var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
    p += 2;
    if (eval(['typeof(', cn, ') == "undefined"'].join(''))) {
      eval(['function ', cn, '(){}'].join(''));
    }
    var o = eval(['new ', cn, '()'].join(''));
    ht[hv++] = o;
    for (var i = 0; i < n; i++) {
      var k;
      switch (ss.charAt(p++)) {
        case 's':
          k = unser_string();
          break;
        case 'U':
          k = unser_unicode_string();
          break;
        default:
          return false;
      }
      if (k.charAt(0) == '\0') {
        k = k.substring(k.indexOf('\0', 1) + 1, k.length);
      }
      o[k] = __unserialize();
    }
    p++;
    if (typeof(o.__wakeup) == 'function') o.__wakeup();
    return o;
  }

  function unser_custom_object() {
    p++;
    var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
    p += 2;
    var cn = utf8to16(ss.substring(p, p += l));
    p += 2;
    var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
    p += 2;
    if (eval(['typeof(', cn, ') == "undefined"'].join(''))) {
      eval(['function ', cn, '(){}'].join(''));
    }
    var o = eval(['new ', cn, '()'].join(''));
    ht[hv++] = o;
    if (typeof(o.unserialize) != 'function') p += n;
    else o.unserialize(ss.substring(p, p += n));
    p++;
    return o;
  }

  function unser_unicode_string() {
    p++;
    var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
    p += 2;
    var sb = [];
    for (i = 0; i < l; i++) {
      if ((sb[i] = ss.charAt(p++)) == '\\') {
        sb[i] = String.fromCharCode(parseInt(ss.substring(p, p += 4), 16));
      }
    }
    p += 2;
    return sb.join('');
  }

  function unser_ref() {
    p++;
    var r = parseInt(ss.substring(p, p = ss.indexOf(';', p)));
    p++;
    return ht;
  }

  function __unserialize() {
    switch (ss.charAt(p++)) {
      case 'N':
        return ht[hv++] = unser_null();
      case 'b':
        return ht[hv++] = unser_boolean();
      case 'i':
        return ht[hv++] = unser_integer();
      case 'd':
        return ht[hv++] = unser_double();
      case 's':
        return ht[hv++] = unser_string();
      case 'U':
        return ht[hv++] = unser_unicode_string();
      case 'r':
        return ht[hv++] = unser_ref();
      case 'a':
        return unser_array();
      case 'O':
        return unser_object();
      case 'C':
        return unser_custom_object();
      case 'R':
        return unser_ref();
      default:
        return false;
    }
  }
  return __unserialize();
}
//gbk encoding中文字符截取（中文占两个字符）
//utf8 encoding中文字符截取（中文占三个字符）
//做的改动：增加截取字符串的开始位置
function subChnStr(str, len, start, hasDot) {
  var newLength = 0;
  var newStr = "";
  var chineseRegex = /[^\x00-\xff]/g;
  var singleChar = "";
  var strLength = str.replace(chineseRegex, "**").length;

  for (var i = start; i < strLength; i++) {
    singleChar = str.charAt(i).toString();
    if (singleChar.match(chineseRegex) != null) {
      newLength += 3;
    } else {
      //console.info(singleChar.match(chineseRegex), newLength);
      newLength++;
    }
    if (newLength > len) {
      break;
    }
    newStr += singleChar;
  }

  if (hasDot && strLength > len) {
    newStr += "...";
  }

  switch (newStr.charAt(newStr.length - 1)) {
    case ";":
      newStr = newStr.substr(0, newStr.length - 2);
      break;
    case '"':
      newStr = newStr.substr(0, newStr.length - 1);
      break;

  }
  return newStr;
}

//计算货品税额
function computeTaxMoney(total_money, tax) {
  let money = total_money - Math.round(total_money / (100 + tax) * 100);
  return money;
}

// 每次选择最左边的数作为基数快速排序
function quickSort(arr) {
  if (arr.length < 2) { return arr; }
  // 定义左指针
  var left = 0;
  // 定义右指针
  var right = arr.length - 1;
  //开启每一轮的排序
  while (left < right) {
    // 寻找右边比arr[0]小的数的下标
    while (arr[right]['cid_create_time'] >= arr[0]['cid_create_time'] && left < right) {
      right = right - 1;
    }
    // 寻找左边比arr[0]大的数的下标
    while (arr[left]['cid_create_time'] <= arr[0]['cid_create_time'] && left < right) {
      left++;
    }
    //当左边指针与右边指针相遇后，交换arr[0]与当前两个指针所在的元素
    if (right == left) {
      var mid = arr[right];
      arr[right] = arr[0];
      arr[0] = mid;
      break;
    }
    // 当左指针小于右指针的位置，交换两个指针当前位置的元素
    var tem = arr[right];
    arr[right] = arr[left];
    arr[left] = tem;
  }

  //递归实现
  return quickSort(arr.slice(0, left)).concat(arr.slice(left, right + 1)).concat(quickSort(arr.slice(right + 1)));
}
//验证是否是一个小数点后2位的小数
function PointNum(obj) {
  obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  obj = obj.replace(/^\./g, ""); //验证第一个字符是数字
  obj = obj.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
  obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
  if (obj.indexOf(".") < 0 && obj != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj = parseFloat(obj);
  }
  return obj;
}
//验证是否是一个小数点后3位的小数
function PointTNum (obj) {
  obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  obj = obj.replace(/^\./g, ""); //验证第一个字符是数字
  obj = obj.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
  obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入三个小数
  if (obj.indexOf(".") < 0 && obj != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj = parseFloat(obj);
  }
  return obj;
}
//验证是否是一个整数
function IsNum(obj) {
  obj = obj.replace(/[^\d]/g, ""); //清除"数字"和"."以外的字符
  obj = obj.replace(/^\./g, ""); //验证第一个字符是数字
  if (obj.indexOf(".") < 0 && obj != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj = parseFloat(obj);
  }
  return obj;
}

module.exports = {
  accAdd: accAdd,
  accSub: accSub,
  accMul: accMul,
  date_to_unixtime: date_to_unixtime,
  unixtime_to_date: unixtime_to_date,
  otherSign: otherSign,
  sign: sign,
  getNowFormatDate: getNowFormatDate,
  toFix: toFix,
  getFileNameByUrl: getFileNameByUrl,
  computeChooseNum: computeChooseNum,
  unserialize: unserialize,
  computeTaxMoney: computeTaxMoney,
  quickSort: quickSort,
  PointNum: PointNum, 
  PointTNum: PointTNum,
  IsNum: IsNum,
}