//以下实例计算 5 的阶乘， for 循环生成从 5 到 1 的数字，并计算每次循环数字的乘积。
var num = 5;
var i;
var factorial = 1; //sum
for (i = num; i >= 1; i--) {
    factorial *= i;
}
console.log(factorial);
