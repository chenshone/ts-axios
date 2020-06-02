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

/**
 * 将axios函数和axios类混合, 将axios类上的属性全部拷贝到axios函数原型上
 *
 * @export
 * @template T
 * @template U
 * @param {T} to 拷贝到的axios函数
 * @param {U} from 被拷贝属性的axios类实例
 * @returns {(T & U)}
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

export function deepMerge(...args: any[]): any {
  const result = Object.create(null)

  args.forEach(arg => {
    if (arg) {
      Object.keys(arg).forEach(key => {
        const val = arg[key]
        if (isPlainObject(val)) {
          // 如果这个属性已经存在且是一个对象，就需要合并，否则就添加上就可以
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
