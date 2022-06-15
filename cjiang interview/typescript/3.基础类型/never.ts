// 四、never类型
let x: never;

let y:number;

// 编译错误，数字类型不能转为never类型
// x =123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();


// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}