import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

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
      Message.error(message)
      return Promise.reject(message)
    }
  },
  error => {
    console.log((error.response&&error.response.data&&error.response.data.message)||error.message)
    Massage.error((error.response&&error.response.data&&error.response.data.message)||error.message)
    return Promise.reject(error)
  }
)

export default service
