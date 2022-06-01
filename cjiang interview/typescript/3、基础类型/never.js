// 四、never类型
var x;
var y;
// 编译错误，数字类型不能转为never类型
// x =123;
// 运行正确，never 类型可以赋值给 never类型
x = (function () { throw new Error('exception'); })();
