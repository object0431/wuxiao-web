import axios from 'axios'
import '../request'

//工作台数据查询
async function queryLecturerWBNumber(params) {
    const res = await axios.get(`/fsip-project/lecturer/qryWorkBenchCount?name=${params.name}&source=${params.source}`)
    return res.data
}
//
async function queryLecturerWBList(params) {
    const res = await axios.post(`/fsip-project/lecturer/qryWorkBenchList`, params)
    return res.data
}
//查询授课信息
async function queryLecturerLevel(params){
    const res = await axios.post('/fsip-project/public/showWorkingTable', params)
    return res.data
}

export {
    queryLecturerWBNumber,
    queryLecturerWBList,
    queryLecturerLevel
}