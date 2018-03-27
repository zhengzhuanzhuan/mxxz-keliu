/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 12:05:37
 * @modify date 2017-09-27 02:54:11
 * @desc [axios改造]
*/

import axios from 'axios'
// import router from '@/router'
import appConfig from '@/appConfig'

// 创建axios实例
const service = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 100 * 1000,
  withCredentials: false, // 需要登录权限的要带cookie
})
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// request拦截器
service.interceptors.request.use(config => {
  // 是否在ajaxing中的判断，同请求只允许存在一个
  if (config.oneAjax) {
    config.cancelToken = source.token
    if (!window.oneAjax) window.oneAjax = {}
    if (window.oneAjax[config.url]) { // 已经有一个再执行，下一个直接cancel
      source.cancel()
    }
    window.oneAjax[config.url] = true
  }
  // 添加统一信息
  config.data = JSON.stringify(config.data) || JSON.stringify({})
  // 修正method
  if (config.requestMethod) {
    config.requestMethod = config.requestMethod.toLocaleLowerCase()
  }
  if (config.requestMethod === 'get') {
    config.params = config.data
    config.data = {}
  }
  config.method = config.requestMethod || 'post'
  return config
}, error => {
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    // console.log(res)
    // // 兼容auth老系统代码
    // if (res.code !== undefined) { // 这是auth系统的老代码
    //   res = {
    //     success: res.code === '000',
    //     code: res.code,
    //     message: res.message,
    //     data: res.data,
    //   }
    // } else {
    //   // 兼容value=""的情况
    //   if (!res.data) {
    //     res.data = {}
    //   }
    // }
    // 是否在ajaxing中的判断，同请求只允许存在一个
    if (response.config.oneAjax) {
      if (!window.oneAjax) window.oneAjax = {}
      window.oneAjax[response.config.url] = false
    }
    // 打印结果
    // success表示业务成功，直接resolve
    if (res.code === '000') {
      return Promise.resolve(res.data)
    }
    // 没有权限
    if (res.code === '500') {
      // router.push({ path: '/login' })
    }
    return Promise.reject(res)
  },
  error => {
    // 已经被cancel的请求会到error中
    if (axios.isCancel(error)) {
      return Promise.reject({
        success: false,
        code: -1,
        message: '请求中',
        data: {},
      })
    } else if (error.config.oneAjax) {
      if (!window.oneAjax) window.oneAjax = {}
      window.oneAjax[error.config.url] = false
    }
    // 打印结果
    return Promise.reject({ message: '系统异常' })
  }
)

export default service
