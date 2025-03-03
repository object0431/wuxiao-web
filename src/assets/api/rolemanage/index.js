import axios from 'axios'
import '../request'

// 列表
async function queryStaffRoleList(params) {
    const res = await axios.post('/fsip-project/role/queryStaffRoleList', params)
    return res.data
}
// 列表导出
async function queryStaffRoleListExport(params) {
    const res = await axios.post('/fsip-project/role/queryStaffRoleListExport', params,{ responseType: 'blob' })
    return res.data
}
//人员查询
async function queryStaffByPage(params) {
    const res = await axios.post('/fsip-project/common/queryStaffByPage', params)
    return res.data
}
//添加人员
async function saveStaffRole(params) {
    const res = await axios.post('/fsip-project/role/saveStaffRole', params)
    return res.data
}
//查询公司列表
async function qryAllOrg(params) {
    const res = await axios.post('/fsip-project/common/queryOrgInfo', params)
    return res.data
}
//删除人员角色
async function deletePermissionList(params1,params2) {
    const res = await axios.post(`/fsip-project/role/deleteStaffRole?roleId=${params1}`, params2)
    return res.data
}

export {
    queryStaffRoleList,queryStaffByPage,saveStaffRole,qryAllOrg,deletePermissionList,queryStaffRoleListExport
}
