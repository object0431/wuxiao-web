<template>
  <div class="staff-page">
<!--    <nav-bar :navList=navList @activeChange="activeChange" />-->
    <div class="work-body">
      <div class="title-text"></div>
      <div style="display: flex">
        <div style="display: flex;flex-direction: column;justify-content: space-between;">
          <staffLeft :data="ndgrxxsj"></staffLeft>
          <staffLeft :data="rzqk"></staffLeft>
        </div>
        <div :class="`work-item item-border actvie-border`" @click="changeTable(0)">
          <WorkPanel :workList="learnData" :noticeData="learnNoticeData">
            <div class="slot-panel">
              <el-button @click.stop="goFinish">去完成</el-button>
            </div>
          </WorkPanel>
        </div>
        <div :class="`work-item item-border actvie-border`" @click="changeTable(1)">
          <WorkPanel :workList="examData" :noticeData="examnoticeData">
            <div class="slot-panel">
              <el-button @click.stop="goFinish">去完成</el-button>
            </div>
          </WorkPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/workbench/navBar.vue'
import WorkPanel from '@/components/workbench/workPanel.vue'
import staffLeft from '@/components/workbench/staffLeft.vue'
import { getFunctions } from '@/assets/api/workbench/trainingAdmin.js'
import { getTraineesWorkbenchData, queryLearningInfo } from '@/assets/api/workbench/trainingStaff.js'
import {  mapMutations } from "vuex";
import {queryPublicParams} from "@/assets/api/common";

export default {
  components: {
    NavBar,
    WorkPanel,
    staffLeft
  },
  data() {
    return {
      coloums: {
        0: [
          {
            label: '课程名称',
            prop: 'courseName'
          },
          {
            label: '培训地点',
            prop: 'trainingLocation'
          },
          {
            label: '培训时间',
            prop: 'trainingDate'
          },
        ],
        1: [
          {
            label: '考试名称',
            prop: 'courseName'
          },
          {
            label: '考试时间',
            prop: 'applierName'
          },
        ]
      },
      navList: [],
      activeIndex: 0,
      //课程板块数据
      learnData: {
        name: '我的课程',
        icon: 'icon-peixunjihua',
        doneCount: 0,
        undoneCount: {
          total: 0,
          bixiu: 0,
          xuanxiu: 0
        }
      },
      stateData: {
        '00': '审批完成',
        'ZC': '暂存',
        '01': '审批中',
        '02': '审批中',
        'CX': '作废',
        '05': '待结算',
        'JS': '结算中',
        'JG': '竣工',
        'TH': '退回修改',
      },
      learnNoticeData: {
        title: '学习提醒',
        list: []
      },
      //考试板块数据
      examData: {
        name: '我的考试',
        icon: 'icon-icon-kaoshijilu',
        doneCount: 0,
        undoneCount: {
          total: 0,
          bixiu: 0,
          xuanxiu: 0
        }
      },
      examnoticeData: {
        title: '考试提醒',
        list: []
      },
      //个人年度学习数据
      ndgrxxsj: {
        title: "个人年度学习数据",
        list: [
          {
            number: 0,
            label: '总学时',
            icon: 'icon-shijian',
            primaryColor: '#5991FF',
            secondColor: 'rgba(174,0,3,0.15)',
          },
          {
            number: 0,
            label: '年完成度',
            icon: 'icon-baobiao',
            primaryColor: '#2A6AFE',
            secondColor: 'rgba(42,106,254,0.15)',
          }, {
            number: 0,
            label: '参训数',
            icon: 'icon-pingfen',
            primaryColor: '#55AE00',
            secondColor: 'rgba(85,174,0,0.15)',
          }
        ]
      },
      //认证情况
      rzqk: {
        title: '认证情况',
        list: [
          {
            number: 0,
            label: '应参加',
            icon: 'icon-xueshengguanli-01',
            primaryColor: '#5991FF',
            secondColor: 'rgba(174,0,3,0.15)',
          },
          {
            number: 0,
            label: '外部认证',
            icon: 'icon-zhengshu1',
            primaryColor: '#2A6AFE',
            secondColor: 'rgba(42,106,254,0.15)',
          }, {
            number: 0,
            label: '已完成',
            icon: 'icon-paihangbang',
            primaryColor: '#55AE00',
            secondColor: 'rgba(85,174,0,0.15)',
          }
        ]
      },
      tableLoading: false,
      tableData: [],
      tableList: [],
      current: 1,
      size: 10,
      total: 0,
      grpx:[],
      pxTotal:0,
      pxPageNum:1,
      pxPageSize:5,
      grrz:[],
      rzTotal:0,
      rzPageNum:1,
      rzPageSize:5,
      pxxm:[],
      xmTotal:0,
      xmPageNum:1,
      xmPageSize:5,
      pxLoading:false,
      rzLoading:false,
      xmLoading:false,
      taskPageNum:1,
      taskPageSize: 5,
      taskTotal:0,
      taskLoading: false,
      taskList:[],
      taskTypeList: {},
    }
  },
  created() {
    this.getFunctions()
    this.getTraineesWorkbenchData()
    this.queryLearningInfo()
    this.queryPublicParams('RSRWLX')
  },
  methods: {
      ...mapMutations(['setcurrentAndSiderMenu']),
  //查询快捷方式
    async getFunctions() {
      try {
        const res = await getFunctions({})
        if (res.rspCode == "0000") {
          this.navList = res.rspBody
        } else {
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.$message.error('网络错误')
      }
    },
    //查询表格和数据
    async getTraineesWorkbenchData() {
      try {
        const res = await getTraineesWorkbenchData({})
        if (res.rspCode == "0000") {
          const { studyInfo, examInfo, courseInfoList } = res.rspBody
          this.tableData = courseInfoList
          // 学习
          this.learnData.doneCount = studyInfo.doneCount
          this.learnData.undoneCount.total = studyInfo.undoneCount
          this.learnNoticeData.list = studyInfo.studyWarnList
          // 考试
          this.examData.doneCount = examInfo.doneCount
          this.examData.undoneCount.total = examInfo.undoneCount
          this.examnoticeData.list = examInfo.examWarnList
        } else {
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.$message.error('网络错误')
      }
    },
    //查询年度个人数据
    async queryLearningInfo() {
      try {
        const res = await queryLearningInfo({})
        if (res.rspCode == "0000") {
          this.ndgrxxsj.list[0].number = res.rspBody.totalDuration
          this.ndgrxxsj.list[1].number = res.rspBody.annualCompletion
          this.ndgrxxsj.list[2].number = res.rspBody.trainingNum
          this.rzqk.list[0].number = res.rspBody.attendNum
          this.rzqk.list[1].number = res.rspBody.outsideNum
          this.rzqk.list[2].number = res.rspBody.alreadyAttendNum
        } else {
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.$message.error('网络错误')
      }
    },
    async queryPublicParams(paramType, extCode, cb) {
      const res = await queryPublicParams({
        paramType,
        extCode,
      });
      if (res.rspCode == "0000") {
        if (paramType == "RSRWLX"){
          let taskTypeList = {}
          res.rspBody.data.forEach(item=>{
            taskTypeList[item.attrCode] = item.attrValue
          })
          this.taskTypeList = taskTypeList
          this.$forceUpdate()
        }
        cb && cb()
      }
    },
    // 加载更多
    gomore(type){
      if(type=='1'){
        this.setcurrentAndSiderMenu({siderMenuName:"个人培训管理",currentTabName:"个人培训结算"})
        this.$router.push({name:'settlementQuery'})
      }
      if(type=='2'){
        this.setcurrentAndSiderMenu({siderMenuName:"个人培训管理",currentTabName:"个人认证结算"})
        this.$router.push({name:'excitateQuery'})
      }
      if(type=='3'){
        this.setcurrentAndSiderMenu({siderMenuName:"培训项目管理",currentTabName:"培训项目结算",childrencurrentTabName:"培训结算"})
        this.$router.push({name:'excitateQuery'})
      }
      if(type=='4'){
        this.setcurrentAndSiderMenu({siderMenuName:"人才培养",currentTabName:"人才应用管理",childrencurrentTabName:"任务执行"})
        this.$router.push({name:'talentMangerOwnTaskList'})
      }
    },
    // 详情
    goDetail(type,id){
      if(type=='2'){
        this.$router.push({ name: 'excitateAccCheck', query: { type:"view",certfId:id } })
      }
      if(type=='1'){
         this.$router.push(
          {
            name: 'settlementAdd',
            params: { applyId: id, type: 'view'}
          })
      }
    },
    goDetailpage(list) {
       this.$router.push({
        name: "initiationAdd",
        params: {
          projectId: list[0],
          type: "view",
          formPage: 'JSSQ',
        },
      })
    },
    goTaskDetailpage(row){
      this.$router.push({
        name: "talentMangerTaskItemDetail",
        query: {
          taskId: row.taskId,
          taskItemId: row.taskItemId,
        },
      })
    },
    changeTable(index) {
      return
      if (index === this.activeIndex) return
      this.activeIndex = index
      // this.tableData = []
    },
    goFinish() {

    },
    activeChange() {

    },
    onSearch() {

    },
  },
};
</script>

<style lang="scss" scoped>
.staff-page {
  padding: 20px;
  .tableTitle{
    font-size: 12px;
    font-weight: 550;
    color: #333;
    margin:15px 0px 7px 2px;
  }
  .tableFath{
    position: relative;
  }
  .tableTitleAnther{
    font-size: 12px;
    font-weight: 550;
    color: #333;
    margin:2px 0px 9px 2px
  }
  .tableChild{
    position: absolute;
    right: 10px;
    z-index: 10;
    top: 12.38px;
    font-size: 11px;
    color: #0000EE;
    display: flex;
    align-items: center;
  }
  .tableChild :hover{
    cursor: pointer;
    }
  .tableChild img{
    width: 14px;
    height: 14px;
    margin-left: 1px;
  }
  .work-body {
    margin: 0 auto;

    .title-text {
      font-size: 16px;
      color: #333333;
      font-weight: 800;
      margin: 20px 0;
    }

    .slot-panel>.el-button {
      width: 80px;
      height: 26px;
      padding-top: 0;
      padding-bottom: 0;
      background: rgba(174, 0, 3, 0.10);
      border: 1px solid rgba(174, 0, 3, 1);
      border-radius: 2px;
      color: #5991FF;
      float: right;
    }

    .tips-panel {
      margin-left: 20px;

      .icon-img {
        padding: 10px;
        width: 100px;
        height: 100px;
        background: rgba(85, 174, 0, 0.11);
        border-radius: 6px;

        .iconfont {
          color: #55AE00;
          font-size: 20px;
          display: flex;
          align-items: center;
        }

        .icon-img-title {
          font-size: 14px;
          color: #55ae00;
          margin-left: 2px;
        }

        .icon-img-body {
          height: calc(100% - 20px);
          display: flex;
          align-items: center;
          justify-content: center;

          .icon-img-nums {
            font-size: 50px;
            color: #55ae00;
          }

          .icon-img-unit {
            font-size: 14px;
            color: #55ae00;
          }
        }

        //&.icon-img-red {
        //  background-image: url("@/assets/image/collect-img.png");
        //
        //  .icon-img-body {
        //    justify-content: unset;
        //  }
        //
        //  .icon-img-title,
        //  .icon-img-nums,
        //  .icon-img-unit {
        //    color: #5991FF;
        //  }
        //}

        +.icon-img {
          margin-top: 30px;
        }
      }
    }

    .work-item {
      width: calc((100% - 300px) / 2);
      flex: 1 1 auto;
      cursor: pointer;

      &.item-border {
        padding: 7px;
        border-radius: 8px;

        &.actvie-border {
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
        }
      }

      +.work-item {
        margin-left: 10px;
      }
    }


  }


}
</style>
