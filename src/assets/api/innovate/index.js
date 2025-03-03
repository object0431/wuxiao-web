import axios from 'axios'
import '../request'

// 新增
async function innovationIssuesPublish(params) {
    const res = await axios.post('/fsip-project/innovationIssues/publish', params)
    return res.data
}
//查询列表
async function issuesList(params) {
    const res = await axios.post('/fsip-project/innovationIssues/issuesList', params)
    return res.data
}
//查询明细
async function detailQuery(params) {
    const res = await axios.post('/fsip-project/innovationIssues/detailQuery', params)
    return res.data
}
//申请加入合伙人
async function joinPartner(params) {
    const res = await axios.post('/fsip-project/innovationIssues/joinPartner', params)
    return res.data
}
//议题修改
async function updateIssues(params) {
    const res = await axios.post('/fsip-project/innovationIssues/updateIssues', params)
    return res.data
}
//议题删除
async function delIssues(params) {
    const res = await axios.post('/fsip-project/innovationIssues/delIssues', params)
    return res.data
}
// 合伙人加入审核
async function partnerApply(params) {
    const res = await axios.post('/fsip-project/innovationIssues/partnerApply', params)
    return res.data
}
// 合伙人管理审核 查询
async function partnerApplySel(params) {
    const res = await axios.post('/fsip-project/innovationIssues/partnerApplySel', params)
    return res.data
}
//议题评论
async function issuesComment(params) {
    const res = await axios.post('/fsip-project/innovationIssues/issuesComment', params)
    return res.data
}
export {
    innovationIssuesPublish,issuesList,detailQuery,joinPartner,updateIssues,delIssues,partnerApply,partnerApplySel,issuesComment
}
