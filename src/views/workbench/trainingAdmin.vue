<template>
  <div class="training-admin">
    <nav-bar :navList=navList @activeChange="activeChange" />
<!--    <div class="num">-->
<!--      <staffLeft :data="ndgrxxsj"></staffLeft>-->
<!--      <staffLeft :data="rzqk"></staffLeft>-->
<!--    </div>-->
    <div class="work-body">
      <div class="title-text"></div>
      <div class="work-content">
        <div class="left-panel">
          <workPanelCopy :workList=taskList :noticeData=noticeData>
            <div class="slot-pane">
              <i class="iconfont icon-yijieshu"></i>
              <span>恭喜您，已完成事项<span style="color:#5991FF;">{{ getNums }}</span>件，继续加油！</span>
            </div>
          </workPanelCopy>
        </div>
        <div class="right-panel">
          <div class="pie-item">
            <span class="charts-title">{{ pieData.annual }}年预算</span>
            <pie-item id='pie-charts' :data="pieData.data" :color="['#55AE00', '#C3BABA']" :height="'100px'" />
          </div>
          <div class="icon-img">
            <span class="icon-img-title">我的提醒</span>
            <div class="icon-img-body">
              <div>
                <span class="icon-img-nums">{{ remindCount }}</span>
                <span class="icon-img-unit">/个</span>
              </div>
            </div>
          </div>
          <div class="bar-item">
            <span class="charts-title">{{ pieData.annual }}年预算</span>
            <bar-item id='bar-charts' :dataSet="barData" :color="'#28B0E8'" :height="'120px'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/workbench/navBar.vue'
import workPanelCopy from '@/components/workbench/workPanelCopy.vue'
import PieItem from './pieItem.vue'
import BarItem from './barItem.vue'
import { getFunctions, getTaskAndChartData } from '@/assets/api/workbench/trainingAdmin.js'
import {queryLearningInfo} from "@/assets/api/workbench/trainingStaff";
import staffLeft from "@/components/workbench/staffLeft";
export default {
  components: {
    NavBar,
    PieItem,
    BarItem,
    workPanelCopy,
    staffLeft
  },
  data() {
    return {
      timer: null,
      activeNav: '',
      navList: [],
      taskList: [
        {
          name: '我的任务',
          icon: 'icon-zhengshu-copy',
          color: '#FFFFFF',
          background: '#303030'
        },
        {
          name: '待办事项',
          color: '#55AE00',
          key: 'waitHandleItem',
          nums: ''
        },
        {
          name: '在办事项',
          color: '#5991FF',
          key: 'handlingItem',
          nums: ''
        },
        {
          name: '办结事项',
          color: '#C3BABA',
          key: 'handledItem',
          nums: ''
        },
      ],
      noticeData: {
        title: '温馨提示',
        list: []
      },
      remindCount: '',
      typeToCn: {
        PLAN: '培训计划',
        PROJECT: '培训立项',
        SETTLE: '培训结算'
      },
      pieData: {
        annual: '',
        data: []
      },
      barData: {
        annual: '',
        x: [],
        y: []
      },
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
    }
  },
  created() {
    this.getFunctions();
    this.queryLearningInfo();

  },
  activated() {
    this.getTaskAndChartData()
    this.timer = setInterval(() => {
      this.getTaskAndChartData()
    }, 10 * 60 * 1000)
  },
  deactivated() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
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
    async getTaskAndChartData() {
      try {
        const res = await getTaskAndChartData({})
        if (res.rspCode == "0000") {
          const { taskInfo, remindCount, budgetChartInfo, trainingFeeChartInfo } = res.rspBody
          // 任务
          let list = []
          this.taskList.forEach(item => {
            if (taskInfo.hasOwnProperty(item.key)) {
              item.nums = taskInfo[item.key].totalCount
              taskInfo[item.key].subItemInfo.map(j => {
                if (j.count != 0 && item.key != 'handledItem') {
                  list.push({
                    text: `您当前有${j.count}个${this.typeToCn[j.type]}${item.name}`,
                    optTitle: '去办理 >',
                    optTitleColor: '#28B0E8',
                    type: j.type
                  })
                }
              })
              this.noticeData.list = list
            }
          })
          // 提醒
          this.remindCount = remindCount || 0
          // pie
          this.pieData = {
            annual: budgetChartInfo.annual || '',
            data: [
              { name: '已使用', value: parseFloat(budgetChartInfo.amountUseScale || ''), amountUse: budgetChartInfo.amountUse || '' },
              { name: '未使用', value: parseFloat(budgetChartInfo.amountNotUseScale || ''), amountNotUse: budgetChartInfo.amountNotUse || '' }
            ]
          }
          // bar
          let x = [], y = []
          trainingFeeChartInfo.monthInfo.map(item => {
            x.push(`${item.month + '月'}`)
            y.push({ value: item.trainingFee })
          })
          this.barData = {
            annual: trainingFeeChartInfo.annual || '',
            x,
            y
          }
        } else {
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.$message.error('网络错误')
      }
    },
    activeChange(item) {
    },
    active(index) {
      this.activeNav = index
    }
  },
  computed: {
    getNums() {
      let nums = ''
      this.taskList.map(item => {
        if (item.key === 'handledCount') {
          nums = item.nums
        }
      })
      return nums
    }
  },
};
</script>

<style lang="scss" scoped>
.training-admin {
  padding: 20px;

  .num{
    display: flex;
    align-items: center;
    width: 100%;
  }

  .work-body {
    margin: 0 auto;

    .title-text {
      font-size: 16px;
      color: #333333;
      font-weight: 800;
      margin: 20px 0;
    }

    .work-content {
      display: flex;

      .left-panel {
        height: 320px;
        background: #F6F5F5;
        border-radius: 6px;
        padding: 0 15px;
        flex: 1 1 auto;

        .work-bar {
          display: flex;
          align-items: center;

          .work-item {
            width: 70px;
            height: 70px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 2px;

            .work-name {
              font-size: 12px;
              margin-top: 5px;
            }
          }
        }

        .notice-pane {
          margin-top: 30px;
          font-size: 12px;

          .notice-title {
            display: inline-block;
            font-size: 14px;
            color: #333333;
            font-weight: 800;
            margin-right: 20px;
            margin-bottom: 10px;
          }

          .notice-opt {
            float: right;
            cursor: pointer;
          }

          li+li {
            margin-top: 10px;
          }
        }

        .slot-pane {
          height: 30px;
          background: #FFFFFF;
          border-radius: 2px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #333333;

          .iconfont {
            font-size: 25px;
            color: #5991FF;
          }
        }
      }

      .right-panel {
        margin-left: 20px;
        display: flex;
        flex-wrap: wrap;
        // min-width: 750px;

        .charts-title {
          position: absolute;
          font-family: PingFang-SC-Heavy;
          font-size: 12px;
          color: #333333;
          font-weight: 800;
        }

        .pie-item {
          position: relative;
          flex: 1 1 auto;
          min-width: 200px;
          height: 100px;
          padding: 10px;
          background: #FFFFFF;
          border: 1px solid rgba(195, 186, 186, 0.29);
          border-radius: 6px;
        }

        .icon-img {
          padding: 10px;
          width: 100px;
          height: 100px;
          background-image: url("@/assets/image/time-img.png");
          border-radius: 6px;
          margin-left: 20px;

          .iconfont {
            color: #5991FF;
            font-size: 20px;
            display: flex;
            align-items: center;
          }

          .icon-img-title {
            font-size: 14px;
            color: #5991FF;
            margin-left: 2px;
          }

          .icon-img-body {
            height: calc(100% - 20px);
            display: flex;
            align-items: center;
            justify-content: unset;

            .icon-img-nums {
              font-size: 50px;
              color: #5991FF;
            }

            .icon-img-unit {
              font-size: 14px;
              color: #5991FF;
            }
          }
        }

        .bar-item {
          position: relative;
          flex: 1 1 100%;
          width: 340px;
          height: 140px;
          background: #FFFFFF;
          margin-top: 20px;
          padding: 10px;
          border: 1px solid rgba(195, 186, 186, 0.29);
          border-radius: 6px;
        }
      }
    }
  }

}
</style>