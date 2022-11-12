import request from '@/utils/request.js'
/**
 * 登录接口
 * @param {*} mobile 手机号
 * @param {*} password 密码
 */
export function loginApi(mobile,password){
  return request({
    method:'POST',
    url:'sys/login',
    data:{
      mobile,
      password
    }
  })
}
/**
 * 用户 - 获取用户资料
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserProfileAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
