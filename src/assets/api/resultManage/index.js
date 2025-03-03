import axios from 'axios'
import '../request'

// 成果查询  fsip-project/achievement/getProject
async function resultSearch(params, params2) {
    const res = await axios.post('/fsip-project/achievement/search', params)
    return res.data
}
// 成果查询详情  
async function resultSearchDetail(params, params2) {
    const res = await axios.post('/fsip-project/achievement/getProject', params)
    return res.data
}
// 成果暂存
async function resultSaveProject(params, params2) {
    const res = await axios.post('/fsip-project/achievement/saveProject', params)
    return res.data
}
// 成果提交
async function resultHandleProject(params, params2) {
    const res = await axios.post('/fsip-project/achievement/handleProject', params)
    return res.data
}
// 成果撤回
async function resultRecallProject(params, params2) {
    const res = await axios.post('/fsip-project/achievement/recallProject', params)
    return res.data
}
// 成果删除
async function deleteResult(params, params2) {
    const res = await axios.post('/fsip-project/achievement/del', params)
    return res.data
}
// /approval/getApprovalInfo
async function getApprovalInfo(params, params2) {
    const res = await axios.post('/fsip-project/approval/getApprovalInfo', params)
    return res.data
}
// 专干人员成功查询  /fsip-project/achievement/zgSearch
async function resultZgSearch(params, params2) {
    const res = await axios.post('/fsip-project/achievement/zgSearch', params)
    return res.data
}
// 专干人员成功查询  /fsip-project/achievement/zgSearchExport
async function zgSearchExport(params, params2) {
    const res = await axios.post('/fsip-project/achievement/zgSearchExport', params,{ responseType: 'blob' })
    return res.data
}
// 专干人员推送委员会 /fsip-project/achievement/zgPush
async function resultZgPush(params, params2) {
    const res = await axios.post('/fsip-project/achievement/zgPush', params)
    return res.data
}
// 评分催办
async function urgingReview(params) {
    const res = await axios.post('/fsip-project/achievement/urgingReview', params)
    return res.data
}
// 委员会评分 
async function resultAchievementReview(params, params2) {
    const res = await axios.post('/fsip-project/achievement/achievementReview', params)
    return res.data
}
//查询未完成评分的评审人员列表
async function queryReviewJudgeList(params) {
    const res = await axios.post('/fsip-project/achievement/queryReviewJudgeList?queryType='+params)
    return res.data
}
// 成果评级列表 /fsip-project/projectAchievement/selPendingRatingList
async function selPendingRatingList(params, params2) {
    const res = await axios.post('/fsip-project/projectAchievement/selPendingRatingList', params)
    return res.data
}
//市级成果评级导出
async function selPendingRatingListExport(params) {
    const res = await axios.post('/fsip-project/projectAchievement/selPendingRatingListExport', params,{ responseType: 'blob' })
    return res.data
}
// 成果评级 
async function selPendingRating(params, params2) {
    const res = await axios.post('/fsip-project/projectAchievement/rating', params)
    return res.data
}
// 地市成果转省级成果查询  old:selRatingList
async function queryResultCityToProv(params, params2) {
    const res = await axios.post('/fsip-project/projectAchievement/selRatingList', params)
    return res.data
}
// 地市成果转省级成果查询  old:selRatingListExport
async function selRatingListExport(params) {
    const res = await axios.post('/fsip-project/projectAchievement/selRatingListExport', params,{ responseType: 'blob' })
    return res.data
}
// 地市成果转省级成果  achievement/city2ProvApply
async function toResultCityToProv(params, params2) {
    const res = await axios.post('/fsip-project/achievement/city2ProvApply', params)
    return res.data
}
// 地市成果转省级成果审核人员查询
async function selCityToProvAuditAchievement(params, params2) {
    const res = await axios.post('/fsip-project/projectAchievement/selCity2ProvAuditAchievement', params)
    return res.data
}
// 评委会人员查询fsip-project/role/queryCommitteeList
async function queryCommitteeList(params, params2) {
    const res = await axios.post('/fsip-project/role/queryCommitteeList', params)
    return res.data
}


// 新增新闻接口
async function activityInfoSaveNews(params) {
    const res = await axios.post('/fsip-project/activityInfo/saveNews', params)
    return res.data
}
// 新增活动接口
async function activityInfoSaveActivity(params) {
    const res = await axios.post('/fsip-project/activityInfo/saveActivity', params)
    return res.data
}
// 新闻查询接口
async function activityInfoQueryNews(params) {
    const res = await axios.post('/fsip-project/activityInfo/queryNews', params)
    return res.data
}
// 活动查询接口 
async function activityInfoQueryActivity(params) {
    const res = await axios.post('/fsip-project/activityInfo/queryActivity', params)
    return res.data
} 
// 删除新闻接口
async function activityInfoDeleteNews(params) {
    const res = await axios.post('/fsip-project/activityInfo/deleteNews', params)
    return res.data
}
// 删除活动接口
async function activityInfoDeleteActivity(params) {
    const res = await axios.post('/fsip-project/activityInfo/deleteActivity', params)
    return res.data
}
// 活动 安排、新闻 详情接口
async function activityInfoqueryDetail(params) {
    const res = await axios.post('/fsip-project/activityInfo/queryDetail', params)
    return res.data
}

// 战队数据维护  模板文件下载 接口
async function teamDownTemplate(fileName,this_,downloadName) {
    axios({
        url: `/fsip-project/file/downTemplate?fileName=${fileName}`,
        method: 'get',
        data: {},
        responseType: 'blob'
    }).then((res) => {
        if (res.data.size != 0) {
            const filename = downloadName;
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
                this_.$message.success('模板下载成功！');
            }
        } else {
            this_.$message.error('暂无下载内容！');
        }
    });
}
// 战队数据维护  战队信息导入 接口
async function teamExcelImport(params) {
    const res = await axios.post('/fsip-project/team/teamExcelImport', params)
    return res.data
}
// 战队数据维护  战队信息查询 接口
async function teamInfoSel(params) {
    const res = await axios.post('/fsip-project/team/teamInfoSel', params)
    return res.data
}
// 导出成果
async function exportProjectResults(params) {
    const res = await axios.post(`/fsip-project/achievement/exportProjectResults`, params,{ responseType: 'blob', })
    return res.data
}
// 市级成果评分 成果归档
async function achievementArchive(params) {
    const res = await axios.post('/fsip-project/achievement/achievementArchive', params)
    return res.data
}


export {
    selCityToProvAuditAchievement,
    resultAchievementReview,
    resultZgSearch,
    resultZgPush,
    deleteResult,
    getApprovalInfo,
    resultRecallProject,
    resultSearchDetail,
    resultSearch,
    resultSaveProject,
    resultHandleProject,
    selPendingRatingList,
    selPendingRating,
    queryResultCityToProv,
    toResultCityToProv,
    queryCommitteeList,
    activityInfoSaveNews, 
    activityInfoSaveActivity, 
    activityInfoQueryNews, 
    activityInfoQueryActivity, 
    activityInfoDeleteNews, 
    activityInfoDeleteActivity,
    activityInfoqueryDetail,
    teamDownTemplate, 
    teamExcelImport, 
    teamInfoSel,
    exportProjectResults,
    urgingReview,
    queryReviewJudgeList,
    achievementArchive,
    zgSearchExport,
    selPendingRatingListExport,
    selRatingListExport
}
