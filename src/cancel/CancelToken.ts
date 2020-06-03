import {
  CancelExecutor,
  CancelTokenSource,
  Canceler,
  CancelTokenStatic,
  CancelToken
} from '../types'

import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

// 类的interface只检查实例，所以需要额外
const CancelToken: CancelTokenStatic = class CancelToken implements CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return { cancel, token }
  }

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    // 到时候 里面的(message) => {} 这个函数，会被暴露到外面
    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}

export default CancelToken
