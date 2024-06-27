import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAdminStore } from '@/stores/admin'

// import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// import {useUserStore} from '@/stores/user'
// import router from '@/router'
const baseURL = 'http://localhost:8000'
// 创建axios实例
const request = axios.create({
  baseURL,
  timeout: 35000
})
// axios请求拦截器
request.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  
  if (userStore.userInfo) {
    const userId = userStore.userInfo.user_id;
    config.headers['user-id'] = userId;
  }
  // // 1. 从pinia获取token数据
  const adminStore = useAdminStore()
  // 2. 按照后端的要求拼接token数据
  
  if (adminStore.adminInfo) {
    const adminId = adminStore.adminInfo.admin_id;
    config.headers['admin-id'] = adminId;
  }
  return config
}, e => Promise.reject(e))

// // axios响应式拦截器
// request.interceptors.response.use(res => res.data, e => {
//   const userStore=useUserStore()
//   //统一错误提示
//   ElMessage({
//     type:'warning',
//     message:e.response.data.message
//   })
//   //401token失效处理
//   //清楚本地数据
//   //跳转登陆页
//   if(e.response.status===401){
//     userStore.clearUserInfo()
//     router.push('/login')
//   }
//   return Promise.reject(e)
// })


export default request
export { baseURL }