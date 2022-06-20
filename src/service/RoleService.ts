import axios from '@/request'

export class RoleService {
  /**
   * 列表
   */
  static list({ size = 30, page, ...params }): Promise<any> {
    return axios.get('/api/admin-role/list', {
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
    return axios.post('/api/admin-role', data)
  }

  /**
   * 修改
   */
  static edit(data): Promise<any> {
    return axios.put('/api/admin-role', data)
  }
}
