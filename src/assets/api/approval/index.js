import axios from 'axios'
import '../request'

// 列表
async function queryProject(params) {
    const res = await axios.post('/fsip-project/initiation/queryProject', params)
    return res.data
}
// 列表导出
async function queryProjectExport(params) {
    const res = await axios.post('/fsip-project/initiation/queryProjectExport', params,{ responseType: 'blob' })
    return res.data
}
// 列表
async function saveProject(params) {
    const res = await axios.post('/fsip-project/initiation/saveProject', params)
    return res.data
}
// 明细
async function detailProject(params) {
    const res = await axios.post('/fsip-project/initiation/detailProject', params)
    return res.data
}
// 查询流转详情
async function qryFLowLog(params) {
    const res = await axios.post('/fsip-project/approval/getFlowLog', params)
    return res.data
}
// 项目审核
async function approvalProject(params) {
    const res = await axios.post('/fsip-project/initiation/approvalProject', params)
    return res.data
}
// 项目转发
async function transferProject(params) {
    const res = await axios.post('/fsip-project/initiation/transferProject', params)
    return res.data
}
// 删除项目
async function deleteProject(params){
    const res = await axios.post('/fsip-project/initiation/del',params)
    return res.data
}
//撤回项目
async function relocateProject(params){
    const res = await axios.post('/fsip-project/initiation/relocateProject',params)
}

export {
    queryProject,saveProject,detailProject,approvalProject,transferProject,deleteProject,relocateProject,qryFLowLog,queryProjectExport
}