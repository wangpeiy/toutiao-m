import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

// 请求拦截器：请求做些事情
// config 是每一次请求的配置对象

request.interceptors.request.use(
  function (config) {
    // 每次发起请求都会执行
    // 在发送请求之前做什么
    // 登陆了，所有的请求都加 Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store

    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }

    return config // 必须返回 config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
