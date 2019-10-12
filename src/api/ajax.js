/* 
  能发ajax任意请求的函数模块
  封装axios
  1. 将post请求参数转换为 urlencoded （默认 json格式）， 使用请求拦截器
  2. 请求成功的结果不是 response， 而是response.data
  3. 统一处理请求错误
*/
import axios from 'axios'
import qs from 'qs'
import {
  message
} from 'antd'

// 配置基础的URL地址
// axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?  '/api' : ''


// 配置请求拦截器
axios.interceptors.request.use(config => {
  // 将post请求参数转换为 urlencoded （默认 json格式）
  const data = config.data;
  if (data && data instanceof Object) {
    config.data = qs.stringify(data)
  }

  return config
})

// 配置响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, (err) => {
  message.error('请求出错，' + err.message)
  return new Promise(() => {}, () => {}) // 中断promise链
})

export default axios