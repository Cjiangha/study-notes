function basePath(path) {
  if (Array.isArray(path)) return path;
  return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
}

export default function set(obj, path, defaultValue = undefined) {
  if (typeof obj !== "object") return obj;
  basePath(path).reduce((o, k, i, _) => {
    if (i === _.length - 1) {
      // 若遍历结束直接赋值
      o[k] = defaultValue;
      return null;
    } else if (k in o) {
      // 若存在对应路径，则返回找到的对象，进行下一次遍历
      return o[k];
    } else {
      // 若不存在对应路径，则创建对应对象，若下一路径是数字，新对象赋值为空数组，否则赋值为空对象
      o[k] = /^[0-9]{1,}$/.test(_[i + 1]) ? [] : {};
      return o[k];
    }
  }, obj); // 返回object

  return obj;
}
