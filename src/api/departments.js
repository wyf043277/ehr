import request from '@/utils/request.js'
/**
 * 组织架构 - 获取组织架构列表
 * @description: 获取组织架构列表
 * @param {*}
 * @return {*}
 */
export function getDepartmentsListAPI() {
  return request({
    url: '/company/department',
  })
}
/**
 * 组织架构 - 增加部门
 * @description: 增加部门
 * @param {*}
 * @return {*}
 */
export function addDepartmentAPI() {
  return request({
    url: '/company/department',
  })
}

/** 
 * 组织架构 - 获取员工简单列表
 */
export function getEmpolyeesSimpleListAPI(){
  return request({
    url: '/sys/user/simple',
  })
}
