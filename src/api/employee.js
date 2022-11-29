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

/**
 * 员工管理 - 增加员工
 * @description: 增加员工
 * @param {*}data 员工信息列表
 * @return {*}
 */
export function addEmployeesAPI(data) {
  return request({
    url: '/sys/user',
    method:'POST',
    data
  })
}

/**
 * 员工管理 - 导入员工
 * @description: 导入员工
 * @param {*}data 导入员工数组
 * @return {*}
 */
export function importEmployeesAPI(data) {
  return request({
    url: '/sys/user/batch',
    method:'POST',
    data
  })
}

/**
 * 员工管理 - 获取员工基本信息
 * @description: 获取员工基本信息
 * @param {*}id 员工id
 * @return {*}
 */
export function getEmployeesBasicInfoAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
