# 相关概念文章
[前端专业术语： shim 和 Polyfill，了解下](http://t.zoukankan.com/leolovexx-p-9213335.html)
[<Vue 篇> Vue2 对数组与对象的响应式处理](https://www.jianshu.com/p/6fff5000d4ce)
[处理 JS 中 undefined 的 7 个技巧](https://blog.fundebug.com/2019/08/01/7-tips-to-handle-undefined-in-javascript/)

# 杂杂代码

```js
// 杂杂代码
// 1、
tableData = { a: 1, b: 2 };
tableData = tableData[""]; // undefined
// 2、 判断值是否为空的赋值方法
const data = {
    list:{
        obj:{
            a:1
        }
    }
}
const key=‘list.obj.a’

function getData(key = "") {
  var tableData = { a: 1, b: 2 };
  var keyList = "".split(".");
  for (let i = 0; i < keyList.length; i++) {
    console.log(keyList[i]);
    if (tableData != keyList[i]) {
      return;
    }
    tableData = tableData[keyList[i]];
    return tableData;
  }
}
getData();
```

# api 相关的记录

```js
// 1、axios的二次封装
abcd;

// 2、

// 3、
```
