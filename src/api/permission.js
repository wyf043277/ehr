import request from '@/utils/request.js'
/**
 * 权限管理 - 获取所有权限点
 * @description: 获取所有权限点
 * @param {*}
 * @return {*}
 */
export function getPermissionAPI() {
  return request({
    url: '/sys/permission',
    method:'GET'
  })
}
/**
 * 权限管理 - 添加权限点
 * @description: 添加权限点
 * @param {*}
 * @return {*}
 */
export function addPermissionAPI(data) {
  return request({
    url: '/sys/permission',
    method:'POST',
    data
  })
}

/**
 * 权限管理 - 删除权限点
 * @description: 删除权限点
 * @param {*} id 权限点id
 * @return {*}
 */
export function deletePermissionAPI(id) {
  return request({
    url: `/sys/permission/${id}`,
    method:'DELETE'
  })
}

/**
 * 权限管理 - 获取某个权限点
 * @description: 获取某个权限点
 * @param {*} id 权限点id
 * @return {*}
 */
export function getPermissionByIdAPI(id) {
  return request({
    url: `/sys/permission/${id}`,
    method:'GET'
  })
}
/**
 * 权限管理 - 更新权限点
 * @description: 更新权限点
 * @param {*} id 权限点id
 * @return {*}
 */
export function updatePermissionByIdAPI(id,data) {
  return request({
    url: `/sys/permission/${id}`,
    method:'PUT',
    data
  })
}
