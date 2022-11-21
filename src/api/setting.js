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
