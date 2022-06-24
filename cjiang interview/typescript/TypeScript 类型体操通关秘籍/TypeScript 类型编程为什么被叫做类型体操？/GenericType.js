function getPropValue(obj, key) {
    return obj[key];
}
// function getPropValue<T extends object,Key extends keyof T>(obj: T,key : Key):T[Key]{
//     return obj[key];
// }
function getProp(obj, key) {
    return obj[key];
}
getPropValue({ 'a': 1, 'b': 2, 'c': 3 }['a']);
console.log(getPropValue({ 'a': 1, 'b': 2, 'c': 3 }['a']));
