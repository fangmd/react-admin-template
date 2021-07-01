import routeList from '@/router'
import { observable } from 'mobx'

/**
 * 管理后台必备 Store
 * 1. 菜单
 */
const adminStore = observable({
  menu: [],
  init() {
    //init menu
    this.setMenu(routeList)
  },
  setMenu(_menu: any) {
    this.menu = _menu
  },
})

export default adminStore
