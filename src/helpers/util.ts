// 类型判断会经常用到toString，可以提前缓存
const toString = Object.prototype.toString

// 使用定义的类型保护，来达到使用时，获取正确类型的目的
export function isData(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 判断是否为一个普通的对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
