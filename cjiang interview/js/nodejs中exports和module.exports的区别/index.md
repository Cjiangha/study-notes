今天报了个错误 module "utils/util.js" is not defined 一直找不到原因
```js
//写个案例
// until.js
function a(){}
module.exports = {
   a:a
}

// 在其他的js中导入应该为
{a} from 'until.js'
// 就不会报错了

```

# 参考下文章
[终于讲清楚了nodejs中exports和module.exports的区别](https://blog.csdn.net/qq_31967569/article/details/82461499)