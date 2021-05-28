import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import qs from 'qs'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
  console.log(error.response)
  console.log(data)
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 300)
        })
      }
    }
  }else if(error && error.data && error.data.code && error.data.code === '02'){
    notification.error({
      message: '发生错误',
      description: error.data.message?error.data.message:''
    })
  }else if (error && error.code && error.message && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    notification.error({
      message: '请求超时！',
      description: '请检查网络！或者重试一下！'
    })
    return new Promise(() => {});
  } else if (error && error.message && error.message === 'Network Error') {
    notification.error({
      message: '网络不给力！',
      description: '请检查网络！或者重试一下！'
    })
    return new Promise(() => {});
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  if (response && response.data && response.data.code && response.data.code === '02'){
    return errorHandler(response)
  }else {
    return response.data
  }
}, errorHandler)

const installer = {
  get (url, params) {
    return request({
      method: 'get',
      url: url,
      params
    })
  },
  getfile (url, params) {
    return request({
      method: 'get',
      url: url,
      responseType:'arraybuffer',
      params
    })
  },
  post (url, data) {
    return request({
      method: 'post',
      url: url,
      data: data
    })
  },
  postqs (url, data) {
    return request({
      method: 'post',
      url: url,
      data: qs.stringify(data)
    })
  },
  put (url, data) {
    return request({
      method: 'put',
      url: url,
      data: data
    })
  },
  putqs (url, data) {
    return request({
      method: 'put',
      url: url,
      data: qs.stringify(data)
    })
  },
  deleteqs (url, data) {
    return request({
      method: 'delete',
      url: url,
      data: qs.stringify(data)
    })
  },
  postparms (url, data) {
    return request({
      method: 'post',
      url: url,
      params: data
    })
  },
  form (url, formdata) {
    return request({
      method: 'post',
      url: url,
      data: formdata
    })
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
