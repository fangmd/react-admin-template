import axios from '@/request'

export class PermissionService {
  /** 列表 */
  static list({ size = 30, page, ...params }): Promise<any> {
    return axios.get('/api/admin-permission/list', {
      params: {
        size,
        page,
        ...params,
      },
    })
  }

  /** 添加 */
  static add(data): Promise<any> {
    return axios.post('/api/admin-permission', data)
  }

  /** 删除 */
  static delete(data): Promise<any> {
    return axios.delete('/api/admin-permission', {
      data: data,
    })
  }

  /** 编辑 */
  static edit(data): Promise<any> {
    return axios.put('/api/admin-permission', data)
  }
}
