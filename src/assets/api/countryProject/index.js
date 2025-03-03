import axios from 'axios'
import '../request'

// 列表
async function selNationalProjectAchievementList(params) {
    const res = await axios.post('/fsip-project/projectAchievement/selNationalProjectAchievementList', params)
    return res.data
}
//导出
async function selNationalProjectAchievementListExport(params) {
    const res = await axios.post('/fsip-project/projectAchievement/selNationalProjectAchievementListExport', params,{ responseType: 'blob' })
    return res.data
}
// 新增
async function nationalProjectAchievementPush(params) {
    const res = await axios.post('/fsip-project/projectAchievement/nationalProjectAchievementPush', params)
    return res.data
}

// 详情
async function selNationalProjectAchievementDetai(params) {
    const res = await axios.post('/fsip-project/projectAchievement/selNationalProjectAchievementDetail', params)
    return res.data
}

// 项目成果统计
async function selProjectAchievementStatistics(params) {
    const res = await axios.post('/fsip-project/projectAchievement/selProjectAchievementStatistics', params)
    return res.data
}

// 删除国家级成果
async function delNationalProjectAchievement(params) {
    const res = await axios.post('/fsip-project/projectAchievement/delNationalProjectAchievement', params)
    return res.data
}

// 立项统计信息列表接口（根据 type 进行区别项目分类和创新分类）
async function projectClassification(params) {
    const res = await axios.post('/fsip-project/projectStatistics/projectClassification', params)
    return res.data
}

async function exportProjectClassification(params) {
    const res = await axios.get(`/fsip-project/projectStatistics/projectClassification?${params}`, { responseType: 'blob', })
    return res.data
}

// 查询统计登录数列表信息
async function loginStatistics(params) {
    const res = await axios.post('/fsip-project/projectStatistics/loginStatistics', params)
    return res.data
}

async function exportLoginStatistics(params) {
    const res = await axios.get(`/fsip-project/projectStatistics/loginStatistics?${params}`, { responseType: 'blob', })
    return res.data
}

// 查询登录日志人员信息
async function loginEmpInfo(params) {
    const res = await axios.post('/fsip-project/projectStatistics/loginEmpInfo', params)
    return res.data
}

// 查询统计登录数列表信息
async function exportLoginEmpInfo(params) {
    const res = await axios.get(`/fsip-project/projectStatistics/loginEmpInfo?${params}`, { responseType: 'blob', })
    return res.data
}

// 项目成果导出
async function selProjectAchievementStatisticsExport(params) {
   const res = await axios.post('/fsip-project/projectAchievement/selProjectAchievementStatisticsExport', params,{ responseType: 'blob' })
    return res.data
}
export {
    selNationalProjectAchievementList,
    nationalProjectAchievementPush,
    selNationalProjectAchievementDetai,
    selProjectAchievementStatistics,
    delNationalProjectAchievement,
    projectClassification,
    loginStatistics,
    exportProjectClassification,
    exportLoginStatistics,
    selProjectAchievementStatisticsExport,
    loginEmpInfo,
    exportLoginEmpInfo,
    selNationalProjectAchievementListExport
}
