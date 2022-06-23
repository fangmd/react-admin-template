import axios from '@/request'

export class UserService {
  /**
   * 登录
   */
  static login(name: string, password: string) {
    return axios.post('/api/admin-user/login', {
      name,
      password,
    })
  }

  /**
   * 列表
   */
  static list({ size = 30, page, ...params }): Promise<any> {
    return axios.get('/api/admin-user/list', {
      params: {
        size,
        page,
        ...params,
      },
    })
  }

  /**
   * 创建
   */
  static add(data): Promise<any> {
    return axios.post('/api/admin-user', data)
  }

  /**
   * 修改
   */
  static edit(data): Promise<any> {
    return axios.put('/api/admin-user', data)
  }

  /**
   * 获取所有权限
   */
  static permissions(): Promise<any> {
    return axios.get('/api/admin-user/permission')
  }
}
