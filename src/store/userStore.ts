import { observable } from "mobx"

const store = observable({})

export function createUserStore() {
  return {
    user: store,
    get userInfo() {
      return this.user
    },
    setUserName(name: string) {
      (this.user as any).name = name
    },
  }
}
