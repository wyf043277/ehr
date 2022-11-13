import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    if(store.getters.token){
      config.headers['Authorization']=`Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const {success,message}=response.data
    if(success){
      return response.data
    }else {
      console.log(response)
      Message.error(message)
      return Promise.reject(message)
    }
  },
  async error => {
    console.log((error.response&&error.response.data&&error.response.data.code)||error.message)
    console.log(router.currentRoute.fullPath)
    if(error?.response?.data?.code===10002){
      await store.dispatch('user/resetToken')
      router.replace(`/login?redirect=${router.currentRoute.fullPath}`)
    }
    return Promise.reject(error)
  }
)

export default service
