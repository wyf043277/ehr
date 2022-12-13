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
 * 员工管理 - 删除员工
 * @description: 删除员工
 * @param {*}id 员工id
 * @return {*}
 */
export function deleteEmployeesAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method:'DELETE'
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

/**
 * 员工管理 - 获取员工个人信息
 * @description: 获取员工个人信息
 * @param {*}id 员工id
 * @return {*}
 */
export function getEmployeesPersonInfoAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method:'GET'
  })
}

/**
 * 员工管理 - 保存基本信息
 * @description: 保存基本信息
 * @param {*}userInfo 员工基本信息对象
 * @return {*}
 */
export function updateEmployeesBasicInfoAPI(id,userInfo) {
  return request({
    url: `/sys/user/${id}`,
    method:'PUT',
    data:userInfo
  })
}

/**
 * 员工管理 - 保存员工个人信息
 * @description: 保存员工个人信息
 * @param {*}id 员工id
 * @return {*}
 */
export function updateEmployeesPersonInfoAPI(id,userInfo) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method:'PUT',
    data:userInfo
  })
}
/**
 * 角色管理 - 给员工分配角色
 * @description: 给员工分配角色
 * @param {*}id 员工id roleIds 角色id列表
 * @return {*}
 */
export function assignRoleAPI(id,roleIds) {
  return request({
    url: '/sys/user/assignRoles',
    method:'PUT',
    data:{
      id,
      roleIds
    }
  })
}
