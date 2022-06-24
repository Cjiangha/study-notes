var uname:string = "Runoob";
var score1:number = 50;
var score2:number = 42.50
var sum = score1 + score2
console.log("名字: "+uname)
console.log("第一个科目成绩: "+score1)
console.log("第二个科目成绩: "+score2)
console.log("总成绩: "+sum)



// 类型断言（Type Assertion） <类型>值
// var str1 = '1'
// var str2:number = <number> <any> str1//str、str2 是 string 类型
// console.log('str1',str1,'str2',str2)


// 断言
var str = '1';
var str2 = str;  //str、str2 是 string 类型
console.log(str2);

// 类型推断
var num = 2;    // 类型推断为 number
console.log("num 变量的值为 "+num); 
// num = "12";    // 编译错误
console.log(num);

// 变量作用域  全局变量 类作用域 局部作用域
var global_num = 12          // 全局变量
class Numbers { 
   num_val = 13;             // 实例变量
   static sval = 10;         // 静态变量
   storeNum():void { 
      var local_num = 14;    // 局部变量
   } 
} 
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers(); 
console.log("实例变量: "+obj.num_val)