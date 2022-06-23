import { USER_INFO } from '@/constants/CookiesC'
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
  otherPermissions: string[] = []

  constructor() {
    makeObservable(this, {
      menu: observable,
      otherPermissions: observable,
      setMenu: action,
      init: action,
    })
  }

  init() {
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

      // init menu
      UserService.permissions().then((res) => {
        const { otherPermissions, menus } = this.permissionFilter(res.data)
        this.setMenu(menus)
        this.otherPermissions = otherPermissions.map((i) => {
          return i['urlPath']
        })
      })
    }
  }

  permissionFilter(allPermissions: any[]) {
    const ret = { otherPermissions: [], menus: [] }
    const innerFunc = (allP, ret) => {
      allP = allP.filter((i) => {
        if (i.children) {
          i.children = innerFunc(i.children, ret)
        }
        if (i.roleType === 2) {
          ret.otherPermissions.push(i)
        }
        return i.roleType === 1
      })
      return allP
    }

    ret.menus = innerFunc(allPermissions, ret)

    return ret
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
