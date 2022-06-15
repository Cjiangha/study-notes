/*
Map 相关的函数与属性：

map.clear() – 移除 Map 对象的所有键/值对 。
map.set() – 设置键值对，返回该 Map 对象。
map.get() – 返回键对应的值，如果不存在，则返回 undefined。
map.has() – 返回一个布尔值，用于判断 Map 中是否包含键对应的值。
map.delete() – 删除 Map 中的元素，删除成功返回 true，失败返回 false。
map.size – 返回 Map 对象键/值对的数量。
map.keys() - 返回一个 Iterator 对象， 包含了 Map 对象中每个元素的键 。
map.values() – 返回一个新的Iterator对象，包含了Map对象中每个元素的值 。
*/

let nameSiteMapping = new Map();


//设置 Map对象
nameSiteMapping.set('Google',1);
nameSiteMapping.set('Runoob',2);
nameSiteMapping.set('Taobao',3);

//获取键对应的值
console.log(nameSiteMapping.get('Runoob'))

//判断 Map 中是否包含键对应的值
console.log(nameSiteMapping.has('Taobao'))// true
console.log(nameSiteMapping.has('zhihu'));//fasle

//返回 Map对象键 / 值对的数量
console.log(nameSiteMapping.size) //3

//删除 Runoob 
console.log(nameSiteMapping.delete('Runoob')); // true
console.log(nameSiteMapping)

//移除Map对象的所有键/值对
nameSiteMapping.clear();
console.log(nameSiteMapping)



http://m.imeitou.com/uploads/allimg/2020050712/31bq0psif45.jpeg
http://m.imeitou.com/uploads/allimg/2020050712/sns4qxovsts.png
http://m.imeitou.com/uploads/allimg/2020050712/5mfcygjb425.jpeg
http://m.imeitou.com/uploads/allimg/2020050712/d3mmvbidaoq.jpeg
http://m.imeitou.com/uploads/allimg/2020050712/du3zbgnkzgk.jpeg
http://m.imeitou.com/uploads/allimg/2020050712/0yebtflztab.jpeg