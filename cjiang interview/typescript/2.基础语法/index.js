var hello = "Hello World!";
console.log(hello);
// 每行指令都是一段语句，你可以使用分号或不使用， 分号在 TypeScript 中是可选的，建议使用。
console.log("Runoob");
console.log("Google");
//如果语句写在同一行则一定需要使用分号来分隔，否则会报错，如：
// 会出现以下的报错 error TS1005: ';' expected.
// 10 console.log("Runoob")console.log("Google");
console.log("Runoob");
console.log("Google");
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log('Runob');
    };
    return Site;
}());
var obj = new Site();
obj.name();
