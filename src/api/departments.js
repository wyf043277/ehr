import request from '@/utils/request.js'
/**
 * 用户 - 获取组织架构列表
 * @description: 获取组织架构列表
 * @param {*}
 * @return {*}
 */
export function getDepartmentsListAPI() {
  return request({
    url: '/company/department',
  })
}
