import request from '@/utils/request.js'
/**
 * 员工管理 - 获取员工列表
 * @description: 获取员工列表
 * @param {*}params {page,size}
 * @return {*}
 */
export function getEmployeesAPI(params) {
  return request({
    url: '/sys/user',
    method:'GET',
    params
  })
}
