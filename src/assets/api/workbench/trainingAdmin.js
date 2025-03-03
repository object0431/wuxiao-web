import axios from 'axios'
import '../request'
//常用功能菜单查询
export const getFunctions = async (params) => {
  const res = await axios.post('/fsip-project/workbench/getFunctions', params)
  return res.data
}
//培训管理员工作台数据查询
export const getTaskAndChartData = async (params) => {
  const res = await axios.post('/fsip-project/workbench/getTrainingManagerWorkbenchData', params)
  return res.data
}