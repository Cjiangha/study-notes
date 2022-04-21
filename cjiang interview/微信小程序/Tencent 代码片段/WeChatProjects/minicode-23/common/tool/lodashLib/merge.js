function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}

export default function merge(source, other) {
  if (!isObject(source) || !isObject(other)) {
    return other === undefined ? source : other;
  } // 合并两个对象的key，另外要区分数组的初始值为[]

  return Object.keys({ ...source, ...other }).reduce(
    (acc, key) => {
      // 递归合并value
      acc[key] = merge(source[key], other[key]);
      return acc;
    },
    Array.isArray(source) ? [] : {}
  );
}
