import { Http } from './http'
import { handleJsonApiError } from '@/decorstors/query-error'
@handleJsonApiError
export class UserServices {
  static async signup(username: string, password: string) {
    const result = await Http.post<{}>('/api/signup', {
      payload: { username, password },
    })
    return true
  }
  static async signin(username: string, password: string) {
    const result = await Http.post<{
      info: any
      id: number
      username: string
      token: string
    }>('/api/signin', { payload: { username, password } })

    Http.apiToken = result.data.token
    localStorage.setItem('token', result.data.token)

    return result.data
  }

  static async getUserInfo(id: number) {
    const result = await Http.get<{ info: any }>(`/api/user/${id}/info`)
    return result
  }
  static async updateUserInfo(id: number, info: any) {
    const result = await Http.request({
      methodType: 'put',
      url: `/api/user/${id}/info`,
      payload: {
        info,
      },
    })
    return true
  }
  static async refreshToken() {
    const auth = JSON.parse(localStorage.getItem('auth')!)
    Http.apiToken = auth.token
    const result = await Http.post<{ token: string }>('/api/refresh')
    const newAuth = { ...auth, token: result.data.token }
    localStorage.setItem('token', result.data.token)
    localStorage.setItem('auth', JSON.stringify(newAuth))
    return true;
  }
}
