import axios from 'axios'
import '../request'
//参训人员工作台数据查询
export const getTraineesWorkbenchData = async (params) => {
  const res = await axios.post('/fsip-project/workbench/getTraineesWorkbenchData', params)
  return res.data
}
//参训人员工作台报表数据
export const queryLearningInfo = async () => {
  const res = await axios.get('/fsip-project/personal/queryLearningInfo')
  return res.data
}
// 工作台 个人数据
export const achievementQuery = async (params) => {
  const res = await axios.post('/fsip-project/index/achievementQuery',params)
  return res.data
}

// 工作台 个人数据
export const teamInfoReportInfoSel = async () => {
  const res = await axios.post('/fsip-project/team/teamInfoReportInfoSel')
  return res.data
}

