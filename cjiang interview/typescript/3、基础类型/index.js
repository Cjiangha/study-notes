//  Number
var binaryLiteral = 10; // 二进制
var octalLiteral = 484; // 八进制
var decLiteral = 6; // 十进制
var hexLiteral = 0xf00d; // 十六进制
// string
var myname = "Runoob";
var years = 5;
var words = "\u60A8\u597D\uFF0C\u4ECA\u5E74\u662F ".concat(myname, " \u53D1\u5E03 ").concat(years + 1, " \u5468\u5E74");
console.log(words);
// boolean
var flag = true;
console.log(flag);
/*  数组类型 */
// 在元素类型后面加上[]
var arr1 = [1, 2];
// 或者使用数组泛型
var arr2 = [1, 2];
console.log('arr1', arr1, typeof arr1);
console.log('arr2', arr2, typeof arr2);
//元组
var x;
x = ['Runoob', 2]; // 运行正常
// x = [1, 'Runoob'];    // 报错
console.log(x[0]); // 输出 Runoob
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Blue;
console.log(c); // 输出 2
//void
function hello() {
    console.log("Hello Runoob");
}
hello();
