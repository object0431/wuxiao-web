import axios from 'axios'
import '../request'

//查询列表
async function projectProcurInfoList(params) {
    const res = await axios.post('/fsip-project/projectProcurementInfo/list', params)
    return res.data
}
// 新增
async function addProcurementInfo(params) {
    const res = await axios.post('/fsip-project/projectProcurementInfo/save', params)
    return res.data
}
// 新增
async function procurementInfoDetail(params) {
    const res = await axios.post('/fsip-project/projectProcurementInfo/detail', params)
    return res.data
}

export {
    projectProcurInfoList,
    procurementInfoDetail,
    addProcurementInfo,
}
