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
export function addDepartmentAPI(data) {
  return request({
    url: '/company/department',
    method:'POST',
    data
  })
}

/**
 * 组织架构 - 编辑部门
 * @description: 编辑部门
 * @param {*}
 * @return {*}
 */
export function editDepartmentAPI(data) {
  return request({
    url: `/company/department/${data.id}`,
    method:'put',
    data
  })
}

/**
 * 组织架构 - 查询部门详情
 * @description: 查询部门详情
 * @param {*}
 * @return {*}
 */
export function getDepartmentAPI(id) {
  return request({
    url: `/company/department/${id}`
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

/**
 * 组织架构 - 删除部门
 * @description: 删除部门 - 注意: 有子部门不能删除
 * @param {*} id 当前点击的操作按钮 所在的项的id(部门id)
 * @return {*}
 */
export function delDepartmentAPI(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}