import { USER_INFO } from '@/constants/CookiesC'
import routeList from '@/router'
import { UserService } from '@/service/UserService'
import { isUserLogin, setJWT } from '@/utils/biz'
import { setCookie } from '@/utils/cookies'
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

    if (!isUserLogin()) {
      // 未登录，去登录页面
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    } else {
      // if (getCookie(USER_DETAIL)) {
      //   this.userDetails = JSON.parse(getCookie(USER_DETAIL) ?? '')
      //   // console.log('this.userDetails', this.userDetails)
      // }

      UserService.permissions().then((res) => {
        console.log(res)
      })
    }
  }

  setMenu(_menu: any) {
    this.menu = _menu
  }

  /**
   * 登录
   */
  login(name: string, password: string) {
    UserService.login(name, password).then((res) => {
      console.log(res)
      setCookie(USER_INFO, JSON.stringify(res.data))
      setJWT(res.data.token)

      window.location.href = '/'
    })
  }
}

function createAdminStore() {
  return new AdminStore()
}

export { createAdminStore }
