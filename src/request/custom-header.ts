import { getJWT } from '@/utils/biz'

// 自定义请求头
export default () => {
  let headers = {
    mclient: 'web',
    Lang: 'zh-CN',
  }
  const jwt = getJWT()
  if (jwt) {
    headers['auth'] = jwt
  }

  return headers
}
