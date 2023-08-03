import axios from 'axios'
import {useUserStore} from '@/stores'
import {ElMessage} from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 1000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    // 获取响应数据
    if (res.data.code === 0) {
      return res
    }
    console.log(res)
    // 处理业务失败
    // 处理业务失败，给错误提示，抛出错误
    console.log('服务异常')
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 处理 401 错误，
    // 错误的特殊情况 => 401 权限不足 或  token 过期 => 拦截到登录
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 错误的默认情况
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export {baseURL}