import request from '@/utils/request.js'
/**
 * 角色管理 - 获取所有角色信息
 * @description: 获取所有角色信息
 * @param {*}params {page,pagesize}
 * @return {*}
 */
export function getRolesAPI(params) {
  return request({
    url: '/sys/role',
    method:'GET',
    params
  })
}
/**
 * 角色管理 - 增加角色
 * @description: 增加角色
 * @param {*}data {name,description}  角色名   描述
 * @return {*}
 */
export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    method:'POST',
    data
  })
}
/**
 * 角色管理 - 根据id获取角色
 * @description: 根据id获取角色
 * @param {*}id 角色id值
 * @return {*}
 */
export function getRoleByIdAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method:'GET'
  })
}

/**
 * 角色管理 - 更新角色信息
 * @description: 根据id更新角色信息
 * @param {*}id 角色id值
 * @return {*}
 */
export function updateRoleByIdAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method:'put',
    data
  })
}

/**
 * 角色管理 - 删除角色
 * @description: 根据id删除角色
 * @param {*}id 角色id值
 * @return {*}
 */
export function deleteRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method:'delete',
  })
}
