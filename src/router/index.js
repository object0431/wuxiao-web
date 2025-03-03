import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from '@/views/transitionPage/home.vue'
import toWorkbench from '@/views/transitionPage/toWorkbench.vue'
import toSuccess from '@/views/transitionPage/success.vue'
import toWorkbenchIndex from '@/views/workbench/index.vue'

Vue.use(VueRouter)
// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/workbench',
    component: homeView,
    children: [
      //工作台
      {
        path: '/workbench',
        name: 'workbench',
        component: toWorkbenchIndex,
        meta: {
          keepAlive: true
        },
      },
      { // 项目立项申请
        path: '/approval/application',
        name: 'approvalApplication',
        component: () => import('../views/approval/application.vue')
      },
      { // 项目立项列表查询
        path: '/approval/applyQuery',
        name: 'approvalApplyQuery',
        component: () => import('../views/approval/applyQuery.vue')
      },
      { // 项目立项详情
        path: '/approval/applyDetail',
        name: 'approvalApplyDetail',
        component: () => import('../views/approval/approvalDetail.vue')
        // meta: {
        //   activeMenu: '/approval/applyQuery'
        // }
      },
      // { // 项目立项审批
      //   path: '/approval/applySP',
      //   name: 'approvalApplySP',
      //   component: () => import('../views/approval/applySP')
      // },
      // 我的项目
      {
        path:'/approval/myProject',
        name:'myProject',
        component:() => import('../views/approval/myProject.vue')
      },
      // 权限维护
      {
        path: '/roleManage/:type',
        name: 'roleManagePower',
        component: () => import('@/views/roleManage/index.vue'),
      },
      // 权限维护新增
      {
        path: '/roleManage/add',
        name: 'roleManagePowerAdd',
        component: () => import('@/views/roleManage/addPower.vue'),
      },
      // 月份设置
      {
        path: '/settingTime/monthSet',
        name: 'settingTimeMonthSet',
        component: () => import('@/views/settingTime/monthSet.vue'),
      },
      // 日期设置
      {
        path: '/settingTime/dateSet',
        name: 'settingTimeDateSet',
        component: () => import('@/views/settingTime/dateSet.vue'),
      },
      // 图表展示
      {
        path: '/settingTime/showBarCharts',
        name: 'showBarCharts',
        component: () => import('@/views/settingTime/showBarChart.vue'),
      },
      // 战队数据维护
      {
        path: '/settingTime/teamDataMaintain',
        name: 'settingTimeTeamDataMaintain',
        component: () => import('@/views/settingTime/teamDataMaintain.vue'),
      },
      // 奖项设置
      {
        path: '/settingTime/awardSettings',
        name: 'settingTimeAwardSettings',
        component: () => import('@/views/settingTime/awardSettings.vue'),
      },
      // 奖项设置 详情
      {
        path: '/settingTime/awardSettingsView',
        name: 'awardSettingsView',
        component: () => import('../views/settingTime/awardSettingsView.vue')
      },
      // 活动安排
      {
        path: '/settingTime/eventArrangements',
        name: 'settingTimeEventArrangements',
        component: () => import('@/views/settingTime/eventArrangements.vue'),
      },
      // 活动 安排和新闻 新增
      {
        path: '/settingTime/eventArrangementsNewsAdd',
        name: 'eventArrangementsNewsAdd',
        component: () => import('../views/settingTime/eventArrangementsNewsAdd.vue')
      },
      // 活动 安排和新闻 详情
      {
        path: '/settingTime/eventArrangementsNewsView',
        name: 'eventArrangementsNewsView',
        component: () => import('../views/settingTime/eventArrangementsNewsView.vue')
      },
      // 活动新闻
      {
        path: '/settingTime/eventNews',
        name: 'settingTimeEventNews',
        component: () => import('@/views/settingTime/eventNews.vue'),
      },
      // 专家回复
      {
        path: '/expertResponse/index',
        name: 'expertResponseIndex',
        component: () => import('@/views/expertResponse/index.vue'),
      },
      // 国家成果列表查询
      {
        path: '/countryManage/countryList',
        name: 'countryListManage',
        component: () => import('@/views/countryManage/countryList'),
      },
      // 国家成果详情查询
      {
        path: '/countryManage/countryDetail',
        name: 'countryDetail',
        component: () => import('@/views/countryManage/countryDetail.vue'),
      },
      // 国家成果新增
      {
        path: '/countryManage/add',
        name: 'addCountry',
        component: () => import('@/views/countryManage/add.vue'),
      },
      // 成果报表统计
      {
        path: '/achieveCalculate/index',
        name: 'achieveCalculateIndex',
        component: () => import('@/views/achieveCalculate/index.vue'),
      },
      // 项目成果申请
      {
        path: '/resultManage/resultApplication',
        name: 'resultApplication',
        component: () => import('../views/resultManage/resultApplication.vue')
      },
      // 项目成果查询
      {
        path: '/resultManage/resultApplicationQuery',
        name: 'resultApplicationQuery',
        component: () => import('../views/resultManage/resultApplicationQuery.vue')
      },
      // 项目成果详情
      {
        path: '/resultManage/resultApplicationDetail',
        name: 'resultApplicationDetail',
        component: () => import('../views/resultManage/resultApplicationDetail.vue')
      },
      // 我的项目成果
      {
        path: '/resultManage/myResults',
        name: 'myResults',
        component: () => import('../views/resultManage/myResults.vue')
      },
      // 我的项目成果详情
      {
        path: '/resultManage/myResultDetail',
        name: 'myResultDetail',
        component: () => import('../views/resultManage/myResultDetail.vue')
      },
      // 项目成果审核
      {
        path: '/resultManage/resultApprove',
        name: 'resultApprove',
        component: () => import('../views/resultManage/resultApprove.vue')
      },
      // 项目成果审核评审
      {
        path: '/resultManage/resultGoReview',
        name: 'resultGoReview',
        component: () => import('../views/resultManage/resultGoReview.vue')
      },
      // 项目成果专干人员推送委员会
      {
        path: '/resultManage/resultPushCommittee',
        name: 'resultPushCommittee',
        component: () => import('../views/resultManage/resultPushCommittee.vue')
      },
      // 项目成果专干人员推送委员会
      {
        path: '/resultManage/resultPushCommitteeCity',
      //改动部分 后加City
        name: 'resultPushCommitteeCity',
        component: () => import('../views/resultManage/resultPushCommittee.vue')
      },
      // 项目成果委员会评分
      {
        path: '/resultManage/resultCommitteeReview',
        name: 'resultCommitteeReview',
        component: () => import('../views/resultManage/resultCommitteeReview.vue')
      },
      // 项目成果地市成果评级查询
      {
        path: '/resultManage/resultCityGradingQuery',
        name: 'resultCityGradingQuery',
        component: () => import('../views/resultManage/resultCityGradingQuery.vue')
      },
      // 项目成果省份成果评级查询
      {
        path: '/resultManage/resultProvGradingQuery',
        name: 'resultProvGradingQuery',
        component: () => import('../views/resultManage/resultProvGradingQuery.vue')
      },
      // 项目成果 市级转省级
      {
        path: '/resultManage/resultCityToProv',
        name: 'resultCityToProv',
        component: () => import('../views/resultManage/resultCityToProv.vue')
      },
      // 项目成果 市级转省级审核
      {
        path: '/resultManage/resultCityToProvApprove',
        name: 'resultCityToProvApprove',
        component: () => import('../views/resultManage/resultCityToProvApprove.vue')
      },
      // 创新议题发布页面
      {
        path: '/innovate/apply',
        name: 'innovateApply',
        component: () => import('../views/innovate/innovateApply.vue')
      },
      // 我的创新议题
      {
        path: '/innovate/myList',
        name: 'innovateMyList',
        component: () => import('../views/innovate/myInnovate.vue')
      },
      // 创新议题列表查询
      {
        path: '/innovate/list',
        name: 'innovateList',
        component: () => import('../views/innovate/innovateList.vue')
      },
      // 创新议题列表查询
      {
        path: '/innovate/detail',
        name: 'innovateDetail',
        component: () => import('../views/innovate/innovateDetail.vue')
      },
      // 合伙人申请管理
      {
        path: '/innovate/partnerExamine',
        name: 'partnerExamine',
        component: () => import('../views/innovate/partnerExamine.vue')
      },
      // 汇总数据
      {
        path: '/achieveCalculate/allDataShow',
        name: 'allDataShow',
        component: () => import('../views/achieveCalculate/allDataShow.vue')
      },
      // 汇总数据
      {
        path: '/achieveCalculate/projectClassification',
        name: 'projectClassification',
        component: () => import('../views/achieveCalculate/projectClassification.vue')
      },
      // 汇总数据
      {
        path: '/achieveCalculate/loginEmpData',
        name: 'loginEmpData',
        component: () => import('../views/achieveCalculate/loginEmpData.vue')
      },
      // 系统管理-用户
      {
        path: '/system/user',
        name: 'userInfo',
        component: () => import('../views/user/user.vue')
      },
    ]
  },
  {
    // 过渡页面
    path: '/toWorkbench',
    component: toWorkbench
  },
  {
    path: '/error',
    component: () => import('@/views/transitionPage/error.vue')
  },
  {
    path: '/success',
    component: toSuccess
  },
   // pdf
  {
    path: '/country/showPdf',
    name: 'countryShowPdf',
    component: () => import('../views/countryManage/showPdf.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: '/tmc-web',
  routes
})

export default router
