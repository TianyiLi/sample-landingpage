/* eslint-disable complexity */
import { stringify } from 'query-string'
import Axios from 'axios'
import { HttpModel } from './Ihttp'

declare type RequestMethods =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

type IRequestArg = {
  methodType: RequestMethods
  url: string
  params?: any
  payload?: any
}
console.log(process.env)
export const API_KEY = localStorage.getItem('token') || ''
export const API_URL = process.env.VUE_APP_BASE_URL
let unAuthHook: Function | undefined
export const Http = {
  apiToken: API_KEY,
  unAuthHook,
  setUnAuthHook(cb: Function) {
    Http.unAuthHook = cb
  },
  request<A>({
    methodType,
    url,
    params = {},
    payload = {},
  }: IRequestArg): Promise<HttpModel.IRequestResponse<A>> {
    const query = Object.keys(params).length
      ? `?${stringify({ ...params })}`
      : ''

    return Axios(`${API_URL}${url}${query}`, {
      method: methodType,
      data: payload,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${Http.apiToken}`,
      },
      timeout: 60000,
    })
      .then(res => {
        return res.status >= 200 && res.status <= 304
          ? res.data
          : Promise.reject({ status: res.status, message: res.statusText })
      })
      .catch(error => {
        if (error?.response?.status === 401 && Http.unAuthHook) {
          Http.unAuthHook()
        }
        throw error
      })
  },
  get<A>(url: string, props: { params: any } = { params: {} }) {
    const { params } = props
    return Http.request<A>({ methodType: 'GET', url, params })
  },
  post<A>(
    url: string,
    props: { params?: any; payload?: any } = { params: {}, payload: {} }
  ) {
    const { params, payload } = props
    return Http.request<A>({ methodType: 'POST', url, params, payload })
  },
}
