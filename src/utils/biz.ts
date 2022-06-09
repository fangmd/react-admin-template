import { USER_DETAIL } from '@/constants/CookiesC'
import { getCookie, removeCookie, setCookie } from './cookies'

const TOKEN_KEY = 'auth2'

/**
 * 退出登录
 */
export function userLoginOut() {
  removeJWT()
  removeCookie(USER_DETAIL)
  if (window.location.pathname === '/login') return
  window.location.href = '/login'
}

/**
 * 获取 jwt
 */
export function getJWT() {
  return getCookie(TOKEN_KEY)
}

/**
 * 设置 jwt
 */
export function setJWT(value: string) {
  return setCookie(TOKEN_KEY, value)
}

/**
 * remove jwt
 */
export function removeJWT() {
  return removeCookie(TOKEN_KEY)
}

/**
 * 用户是否已经登录
 */
export function isUserLogin(): boolean {
  return !!getJWT()
}

/**
 * 菜单数据转化成树形结构需要的数据
 */
export const menus2TreeData = (menus: Array<any>) => {
  return menus?.map((i) => {
    const newI: any = {
      title: i.name,
      key: i.id,
    }
    if (i.children && i.children.length > 0) {
      newI.children = menus2TreeData(i.children)
    }
    return newI
  })
}
