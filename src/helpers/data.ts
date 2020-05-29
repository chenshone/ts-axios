import { isPlainObject } from './util'

/**
 *
 * xhr 的 send数据 不支持obj 可以将其json序列化
 * 详情参见：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

/**
 *
 * 将返回的data尝试转成obj
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    // 将可以转成obj的转
    try {
      data = JSON.parse(data)
    } catch (error) {
      // 不用做什么
    }
  }
  return data
}
