import axios from '@/request'
import { AxiosResponse } from 'axios'

export default {
  getUser(): Promise<AxiosResponse> {
    return axios.get('/user')
  },
}
