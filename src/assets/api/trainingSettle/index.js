import axios from 'axios'
import '../request'
//结算查询
export const settleQuery = async (params) => {
  const res = await axios.post('/tmc-training/settle/query', params)
  return res.data
}
//培训详情
export const settleDetail = async (params) => {
  const res = await axios.post('/tmc-training/settle/detail', params)
  return res.data
}
//培训结算查询
export const queryProject = async (params) => {
  const res = await axios.post('/tmc-training/settle/queryProject', params)
  return res.data
}
//培训结算审核
export const approvalTask = async (params) => {
  const res = await axios.post('/tmc-training/common/approvalTask', params)
  return res.data
}
//培训结算办理
export const apply = async (params) => {
  const res = await axios.post('/tmc-training/settle/apply', params)
  return res.data
}
//评价统计信息
export const queryAppraiseStat = async (params) => {
  const res = await axios.post(`/tmc-training/settle/queryAppraiseStat?projectId=${params}`)
  return res.data
}
//评价明细信息查询
export const queryAppraiseList = async (params) => {
  const res = await axios.post('/tmc-training/settle/queryAppraiseList', params)
  return res.data
}
//结算删除
export const deleteSettle = async (params) => {
  const res = await axios.post(`/tmc-training/project/del?projectIds=${params}`)
  return res.data
}
//结算撤回
export const withdraw = async (params) => {
  const res = await axios.post(`/tmc-training/settle/withdraw`, params)
  return res.data
}
