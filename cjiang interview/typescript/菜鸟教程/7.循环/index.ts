//1.以下实例计算 5 的阶乘， for 循环生成从 5 到 1 的数字，并计算每次循环数字的乘积。
var num:number = 5;
var i:number;
var factorial  = 1; //sum
for(i=num;i>=1;i--){
    factorial *= i;
}
console.log(factorial)


// 2.
// var j:any; 
// var n:any = "a b c" 
 
// for(j in n) {
//     console.log(n[j])  // a b c
// }

// let someArray = [1, "string", false];
// for (let entry of someArray) {
//     console.log(entry); // 1, "string", false
// }


// 3.
// while
// var num:number = 5; 
// var factorial:number = 1; 
 
// while(num >=1) { 
//     factorial = factorial * num; 
//     num--; 
// } 
// console.log("5 的阶乘为："+factorial);


// do while
var n:number = 10;
do { 
    console.log(n); 
    n--; 
} while(n>=0);