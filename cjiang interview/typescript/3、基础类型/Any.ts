// 二、Any类型
// let x: any = 1;    // 数字类型
// x = 'I am who I am';    // 字符串类型
// x = false;    // 布尔类型
// console.log(x)

// let x :any = 4;
// x.ifItExists();  // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
// x.toFixed();  //正确

let arrayList : any[] = [1,false,'fine']
arrayList[1] = 100;
console.log(arrayList)