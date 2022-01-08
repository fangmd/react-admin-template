import routeList from '@/router'
import { action, makeObservable, observable } from 'mobx'

/**
 * 管理后台必备 Store
 * 1. 菜单
 */
class AdminStore {
  menu: any[] = []

  constructor() {
    makeObservable(this, {
      menu: observable,
      setMenu: action,
      init: action,
    })
  }

  init() {
    //init menu
    this.setMenu(routeList)
  }

  setMenu(_menu: any) {
    this.menu = _menu
  }
}

function createAdminStore() {
  return new AdminStore()
}

export { createAdminStore }
