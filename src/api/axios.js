// 接口统一拦截处理
import axios from 'axios'
import Vue from 'vue'
// import router from '../router'
import qs from 'qs'
import { redirectUrl } from "../utils/index";

const vm = new Vue()
axios.defaults.baseURL = process.env.VUE_APP_URL
const api = axios.create({
  responseType: 'json',
  timeout: 30000, // 超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: status => {
    return status >= 200 && status < 300
  }
  // 数据转换 后端所需要参数的格式（a=1&b=2）
  // transformRequest: [
  //   data => {
  //     return qs.stringify(data)
  //   }
  // ]
})

// 请求拦截
api.interceptors.request.use(
  config => {
    // token统一加在头部 在登陆的时候，存入token
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers.access_token = accessToken;
    }
    if (config.method === 'post' || config.method === 'put') {
      // post请求时 后端所需要参数的格式（{a:1,b:2}）
      config.headers['Content-Type'] = 'application/json'
      config.data = JSON.stringify(config.data)
    } else if (config.method === 'get') {
      // get请求时 后端所需要参数的格式（a=1&b=2）
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => Promise.reject(error)
)
// 错误信息
export const errorFn = error => {
  switch (error.response.status) {
    case 400:
      vm.$message.error('请求错误(400)', '提示')
      break
    case 403:
      vm.$message.error('拒绝访问(403)', '提示')
      break
    case 404:
      vm.$message.error('请求出错(404)', '提示')
      break
    case 405:
      vm.$message.error('请求方法不支持(405)', '提示')
      break
    case 408:
      vm.$message.error('请求超时(408)', '提示')
      break
    case 500:
      vm.$message.error('系统网络有点小延迟，请稍等~', '提示')
      break
    case 501:
      vm.$message.error('服务未实现(501)', '提示')
      break
    case 502:
      vm.$message.error('网络错误(502)', '提示')
      break
    case 503:
      vm.$message.error('服务不可用(503)', '提示')
      break
    case 504:
      vm.$message.error('网络超时(504)', '提示')
      break
    case 505:
      vm.$message.error('HTTP版本不受支持(505)', '提示')
      break
    default:
      vm.$message.error('连接出错', '提示')
      break
  }
}
// 响应拦截
api.interceptors.response.use(
  (res = {}) => {
    const data = res.data
    if (data['success']) {
      return Promise.resolve(data.data)
    } else {
      if (data.msg) {
        vm.$toast.fail(data.msg);
      }
      // 授权失效,重定向地址获取微信授权code
      if (res.data.code === 401) {
        redirectUrl()
      }
      return Promise.reject(data)
    }
  },
  e => {
    window.console.log(e)
    if (e.response) {
      errorFn(e)
      return Promise.reject(e)
    } else {
      vm.$toast.fail('系统错误')
    }
  }
)

export default api
