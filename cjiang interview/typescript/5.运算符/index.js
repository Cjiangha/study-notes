// 1、算术运算符
// var num1:number = 10
// var num2:number = 2
// var res:number = 0
// res = num1 + num2
// console.log("加:        "+res);
// res = num1 - num2;
// console.log("减: "+res)
// res = num1*num2
// console.log("乘:    "+res)
// res = num1/num2
// console.log("除:   "+res)
// res = num1%num2
// console.log("余数:   "+res)
// num1++
// console.log("num1 自增运算: "+num1)
// num2--
// console.log("num2 自减运算: "+num2)
// 2、关系运算符
var num1 = 5;
var num2 = 9;
console.log("num1 的值为: " + num1);
console.log("num2 的值为:" + num2);
var res = num1 > num2;
console.log("num1 大于n num2: " + res);
res = num1 < num2;
console.log("num1 小于 num2: " + res);
res = num1 >= num2;
console.log("num1 大于或等于  num2: " + res);
res = num1 <= num2;
console.log("num1 小于或等于 num2: " + res);
res = num1 == num2;
console.log("num1 等于 num2: " + res);
res = num1 != num2;
console.log("num1 不等于 num2: " + res);
// 3、逻辑运算符
var avg = 20;
var percentage = 90;
console.log("avg 值为: " + avg + " ,percentage 值为: " + percentage);
var res = ((avg > 50) && (percentage > 80));
console.log("(avg>50)&&(percentage>80): ", res);
var res = ((avg > 50) || (percentage > 80));
console.log("(avg>50)||(percentage>80): ", res);
var res = !((avg > 50) && (percentage > 80));
console.log("!((avg>50)&&(percentage>80)): ", res);
// 4、位运算符
var a = 2; // 二进制 10 
var b = 3; // 二进制 11
var result;
result = (a & b);
console.log("(a & b) => ", result);
result = (a | b);
console.log("(a | b) => ", result);
result = (a ^ b);
console.log("(a ^ b) => ", result);
result = (~b);
console.log("(~b) => ", result);
result = (a << b);
console.log("(a << b) => ", result);
result = (a >> b);
console.log("(a >> b) => ", result);
result = (a >>> 1);
console.log("(a >>> 1) => ", result);
