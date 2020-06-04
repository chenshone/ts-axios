import { isData, isPlainObject } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  // 键值对数组，存放params，用于最后的url拼接
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]

    // 如果值为空或者undefined 直接忽略
    if (val === null || typeof val === 'undefined') {
      return
    }

    // 给的值可能是数组类型，所以把不是数组是也变成数组，统一
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]' // 表示值为数组
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isData(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 需要忽略哈希标识后面的内容
    const markIndex = url.indexOf('#')

    if (markIndex !== -1) {
      url = url.substring(0, markIndex)
    }
    // 判断提供的url是否已经有参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

/**
 *判断是否是同源请求
 *
 * @export
 * @param {string} requestURL
 * @returns {boolean}
 */
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)

  const { protocol, host } = urlParsingNode

  return { protocol, host }
}
