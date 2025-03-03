import axios from 'axios'
import '../request'


//静态参数查询
async function queryPublicParams(params) {
    const res = await axios.post('/fsip-project/common/qryParamList', params)
    return res.data
}
//通用审批 
async function approvalTask(params) {
    const res = await axios.post('/fsip-project/approval/approvalTask', params)
    return res.data
}
// 获取常用意见
async function getOpinions() {
    const res = await axios.get('/fsip-project/approval/getOpinions', {})
    return res.data
}
// 获取常用意见
async function addOpinion(params) {
    const res = await axios.post(`/fsip-project/approval/addOpinion?remark=${params}`)
    return res.data
}
// 供应商查询 
async function QuerySuplier(params) {
    const res = await axios.post(`/fsip-project/suplier/querySuplierByType?suplierType=${params}`)
    return res.data
}
// 组织人员查询
async function qryOrganizer(params) {
    const res = await axios.post('/fsip-project/public/qryOrganizer', params)
    return res.data
}
// 审批人信息查询
async function getApprovalInfo(params) {
    const res = await axios.post('/fsip-project/approval/getApprovalInfo', params)
    return res.data
}
// 用户信息查询 
async function getStaffInfo() {
    const res = await axios.get('/fsip-project/userCenter/getStaffInfo')
    return res.data
}
//单点登录校验
async function SSOCheck() {
    const res = await axios.get('/fsip-project/userCenter/ssoLoginStatusCheck')
    return res.data
}
//全部组织结构
async function qryDept(params) {
    const res = await axios.post('/fsip-project/public/qryDept', params)
    return res.data
}
//组织结构对应人员
async function qryStaff(params) {
    const res = await axios.post('/fsip-project/public/qryStaff', params)
    return res.data
}
//流转意见查询 
async function qryFLowLog(params) {
    const res = await axios.post('/fsip-project/approval/getFlowLog', params)
    return res.data
}
//查询所有公司 
async function qryAllOrg(params) {
    const res = await axios.post('/fsip-project/param/queryOrgInfo',params)
    return res.data
}
//根据公司查询部门
async function queryDept(params) {
    const res = await axios.post('/fsip-project/public/qryDept',params)
    return res.data
}
//查询所有公司
async function qryAllStaff(params) {
    const res = await axios.post('/fsip-project/public/queryStaffByPage',params)
    return res.data
}
//按分页查询所有员工
async function qryMismatchTrainee(params) {
    const res = await axios.post('/fsip-project/trainee/queryMismatchTrainee',params)
    return res.data
}
//查询所有员工
async function qryAllStaff2(params) {
    const res = await axios.post('/fsip-project/public/qryAllStaff',params)
    return res.data
}
//获取二维码 
async function showQrCode(params) {
    const res = await axios.get('/fsip-project/project/showQrCode',params)
    return res.data
}
//查询当前环节
async function getCurrentNode(params) {
    const res = await axios.post('/fsip-project/approval/getCurrentNode',params)
    return res.data
}
//查询审核的下一环节
async function getNextNode(params) {
    const res = await axios.post('/fsip-project/project/next-approval-info',params)
    return res.data
}
//查询菜单
async function getMenuInfo() {
    const res = await axios.get('/fsip-project/common/queryMenuList')
    return res.data
}
//岗位序列查询
async function qryPostSeq(params) {
    const res = await axios.post('/fsip-project/public/qryPostSequence', params)
    return res.data
}
//子序列查询
async function qrySubSeq(params) {
    const res = await axios.post(`/fsip-project/public/qrySubSequence?postSequence=${params}`, )
    return res.data
}
//是否需要导出按钮
async function checkIsProvAdmin(params) {
    const res = await axios.post('/fsip-project/common/checkIsProvAdmin',params)
    return res.data
}
//判断是否为省管理员
async function checkIsDeptAdmin(){
    const res = await axios.post('/fsip-project/common/checkIsDeptAdmin')
    return res.data
}
//获取员工列表
async function getStaffList(){
    const res = await axios.get('/fsip-project/common/getStaffList')
    return res.data
}
//切换身份
async function switchIdentity(params){
    const res = await axios.get(`/fsip-project/common/switchIdentity?id=${params}`)
    return res.data
}
//删除删除的附件
async function deleteUploadFile(params) {
    const res = await axios.get(`/fsip-project/file/deleteFile?fileName=${params}`)
    return res.data
}
//判断是否展示代理录入
async function checkIsAdmin(){
    const res = await axios.post(`/fsip-project/common/checkIsAdmin`)
    return res.data
}

//静态参数查询
async function qryParamList(params) {
    const res = await axios.post('/fsip-project/common/qryParamList', params)
    return res.data
}
//查询部门领导
async function queryStaffRoleList(params) {
    const res = await axios.post('/fsip-project/role/queryStaffRoleList', params)
    return res.data
}
//查询审批人信息
async function getApprovalInfoAll(params) {
    const res = await axios.post('/fsip-project/approval/getApprovalInfo', params)
    return res.data
}
//添加常用意见
async function addOpinionsAll(params) {
    const res = await axios.post(`/fsip-project/approval/addOpinion?remark=${params}`)
    return res.data
}
//添加常用意见
async function getOpinionsAll() {
    const res = await axios.get('/fsip-project/approval/getOpinions', {})
    return res.data
}
//删除常用意见
async function delOpinionOne(params) {
    const res = await axios.get(`/fsip-project/approval/delOpinion?id=${params}`)
    return res.data
}
//新增成果申请限制月份
async function addParam(params) {
    const res = await axios.post(`/fsip-project/common/addParam`,params)
    return res.data
}
//新增成果申请限制月份
async function changeParam(params) {
    const res = await axios.post(`/fsip-project/common/changeParam`,params)
    return res.data
}
//新增成果申请限制月份
async function deleteParam(params1,params2) {
    const res = await axios.post(`/fsip-project/common/deleteParam?attrType=${params1}`,params2)
    return res.data
}
//发起咨询
async function consultationInitiate(params) {
    const res = await axios.post(`/fsip-project/consultation/initiate`,params)
    return res.data
}
//咨询列表查询
async function queryListConsult(params) {
    const res = await axios.get(`/fsip-project/consultation/queryList?targetId=${params}`)
    return res.data
}
//咨询信息查询
async function queryDetailConsult(params) {
    const res = await axios.get(`/fsip-project/consultation/queryOrderList?orderId=${params}`)
    return res.data
}
//咨询评分
async function gradeConsult(orderId,score) {
    const res = await axios.get(`/fsip-project/consultation/grade?orderId=${orderId}&score=${score}`)
    return res.data
}
//咨询回复
async function replyConsult(params) {
    const res = await axios.post(`/fsip-project/consultation/reply`,params)
    return res.data
}
//咨询回复
async function downloadBase64(params) {
    const res = await axios.get(`/fsip-project/file/downloadBase64?fileName=${params}`)
    return res.data
}

//咨询回复
function otherDownloadBase64(params) {
    return axios.get(`/fsip-project/file/downloadBase64?fileName=${params}`)
}
//下载
async function downloadFile(fileName) {
    axios({
        url: `/fsip-project/file/downloadFile?fileName=${fileName}`,
        method: 'get',
        data: {},
        responseType: 'blob'
    }).then((res) => {
        if (res.data.size != 0) {
            const filename = fileName;
            let blob;
            blob = new Blob([res.data], { type: 'application/zip' });
            if (window.navigator && window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(blob, filename);
            } else {
                //其他浏览器
                let link = document.createElement('a'); // 创建a标签
                link.style.display = 'none';
                let objectUrl = URL.createObjectURL(blob);
                link.href = objectUrl;
                link.setAttribute('download', filename);
                link.click();
                URL.revokeObjectURL(objectUrl);
            }
        } else {
            res.data.message.error('暂无下载内容');
        }
    });
}
//pdf
async function downloadFileView(params) {
    const res = axios({
        url: `/fsip-project/file/downloadFile?fileName=${params}`,
        method: 'get',
        data: {},
        responseType: 'blob'
    })
    return res.data
}

export {
    downloadFile,approvalTask,qryPostSeq,qrySubSeq,getMenuInfo,getNextNode,getCurrentNode,showQrCode,qryAllOrg, queryDept,qryAllStaff,qryFLowLog
    , queryPublicParams, getOpinions, addOpinion, QuerySuplier, qryOrganizer, getApprovalInfo, getStaffInfo
    , SSOCheck, qryDept, qryStaff,qryAllStaff2,qryMismatchTrainee,checkIsProvAdmin,checkIsDeptAdmin,getStaffList,switchIdentity
    , deleteUploadFile, checkIsAdmin,qryParamList,queryStaffRoleList,getApprovalInfoAll,addOpinionsAll,getOpinionsAll,delOpinionOne
    , addParam,changeParam,deleteParam,consultationInitiate,queryListConsult,queryDetailConsult,gradeConsult,replyConsult,downloadBase64,otherDownloadBase64,downloadFileView
}