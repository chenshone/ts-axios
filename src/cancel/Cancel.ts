import { CancelStatic } from '../types'

// const Cancel: CancelStatic = class {
//   message?: string

//   constructor(message?: string) {
//     this.message = message
//   }
// }

// export default Cancel

// 这样 Cancel类 导出后， 既可以当做类，也可以当做类型
export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
