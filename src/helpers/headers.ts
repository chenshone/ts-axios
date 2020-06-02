import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

/**
 *
 * 规范请求头
 * @param {*} headers
 * @param {string} normalizeName 内部规范写法
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 *
 * 只有当data为普通对象时，Content-Type才为application/json
 * @export
 * @param {*} headers
 * @param {*} data config中的data
 * @returns {*}
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

/**
 *
 * 将返回的header字符串转换成一个obj
 * @export
 * @param {string} headers
 * @returns {*}
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)

  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')

    key = key.trim().toLowerCase()
    if (!key) return

    if (val) val = val.trim()

    parsed[key] = val
  })

  return parsed
}

/**
 *将config中的headers字段中的属性，根据不同的method，提取出来
 *
 * @export
 * @param {*} headers
 * @param {Method} method
 * @returns {*}
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  // 在这里 headers最后一个传入，可以确保之前在header上的属性，不会被common和 [method] 中的属性所覆盖
  // 也就是说 headers > [method] > common
  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
