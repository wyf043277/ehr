import request from '@/utils/request.js'
/**
 * 登录接口
 * @param {*} mobile 手机号
 * @param {*} password 密码
 */
export function loginApi(mobile,password){
  console.log(123456)
  return request({
    method:'POST',
    url:'sys/login',
    data:{
      mobile,
      password
    }
  })
}
