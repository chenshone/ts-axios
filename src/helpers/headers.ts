import { isPlainObject } from './util'

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
