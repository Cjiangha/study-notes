//  Number
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744;    // 八进制
let decLiteral: number = 6;    // 十进制
let hexLiteral: number = 0xf00d;    // 十六进制


// string
let  myname:string = "Runoob";
let years:number = 5;
let words:string = `您好，今年是 ${ myname } 发布 ${ years + 1} 周年`;
console.log(words)

// boolean
let flag:boolean = true;
console.log(flag)

/*  数组类型 */ 
// 在元素类型后面加上[]
let arr1:number[] = [1,2];
// 或者使用数组泛型
let arr2:Array<Number> = [1,2]

console.log('arr1',arr1,typeof arr1)
console.log('arr2',arr2,typeof arr2)

//元组
let x : [string,number];
x = ['Runoob',2];// 运行正常
// x = [1, 'Runoob'];    // 报错
console.log(x[0]);    // 输出 Runoob


// 枚举
enum Color {Red,Green,Blue};
let c:Color  = Color.Blue;
console.log(c) // 输出 2

//void
function hello():void{
    console.log("Hello Runoob");
}
hello();