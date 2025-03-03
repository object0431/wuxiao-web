<template>
  <div class="lecturer-workbench-page">
    <!-- <workbenchTitle></workbenchTitle> -->
    <div class="title-img"></div>
    <div class="title-text"></div>
    <div class="main-container">
      <div class="main">
        <div class="num">
          <div class="num-left">
            <div class="top">
                <span class="house"><span class="teacher">{{trainingLevel}}</span></span>
                <div class="test"> 年度授课情况</div>
                <div class="mx" @click="goDetail">明细 ></div>
            </div>
            <div class="bottom">
              <div class="bottom-item bottom-item1 kaohe">
                <span style="font-size: 24px;font-weight: 800;">{{checkCount}}</span>
                <span style="color: #999999;">考核课程数</span>
                <span>
                  <i class="iconfont icon-wj-jh"></i>
                </span>
              </div>
              <div class="bottom-item bottom-item1 qici" >
                <span style="font-size: 24px;font-weight: 800;">{{trainingCount}}</span>
                <span style="color: #999999;">培训期次</span>
                <span>
                  <i class="iconfont icon-kejianguanli"></i>
                </span>
              </div>
              <div class="bottom-item bottom-item1 shichang">
                <span style="font-size: 24px;font-weight: 800;">{{trainingTime}}<span style="font-size: 12px">h</span></span>
                <span style="color: #999999;">培训时长</span>
                <span>
                  <i class="iconfont icon-shijian"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="num-middle">
            <div class="top">
              <div class="top-item my" style="background: #303030; color: #fff">
                <i class="iconfont icon-daiban" style="font-size: 20px"></i>
                <span>我的任务</span>
              </div>
              <div class="top-right">
                <div class="top-item zaiban top-item1">
                  <span style="font-size: 24px">{{ toCount }}</span>
                  <span>待参加培训</span>
                </div>
                <div class="top-item top-item1 yiban">
                  <span style="font-size: 24px">{{ alreadyCount }}</span>
                  <span>已完成培训</span>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="rwtx">任务提醒</div>
              <div class="wwc">
                您当前有<span style="color: #5991FF">{{ toCount }}</span>个任务未完成
              </div>
              <div class="qcl" @click="goCheck">去处理 ></div>
            </div>
          </div>
          <div class="num-right">
            <div class="num-right1 num-right-item">
              <div class="wdkj">
                <i class="iconfont icon-kejianguanli"></i>我的课件
              </div>
              <div class="kjsm">
                <div class="num">{{ courseCount }}</div>
                <div class="text">/个</div>
              </div>
            </div>
<!--            <div class="num-right2 num-right-item">-->
<!--              <div class="left">-->
<!--                <div class="wdtx">我的提醒</div>-->
<!--                <div class="txsm">-->
<!--                  <div class="num">{{ warnCount }}</div>-->
<!--                  <div class="text">/个</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </div>
        <!--学习情况-->
        <div class="num" style="margin-top: 12px">
          <staffLeft :data="ndgrxxsj"></staffLeft>
          <staffLeft :data="rzqk"></staffLeft>
        </div>
        <!--认证情况-->
        <!-- 表格区域 -->
        <el-table v-loading="tableLoading" :data="tableData" style="width: 100%; margin-top: 20px">
          <el-table-column prop="courseName" label="课程名称">
          </el-table-column>
          <el-table-column prop="applierName" label="培训地点"></el-table-column>
          <el-table-column prop="state" label="培训时间" width="200">
            <template slot-scope="scope">
              <span>{{
              scope.row.trainingStartTime + " — " + scope.row.trainingEndTime
              }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
          :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
          :total="pageParam.total" :page-sizes="[5, 10, 20]" style="text-align: right; margin-top: 10px">
        </el-pagination>
      </div>
<!--      <div class="rank">-->
<!--        <div class="rank-title">-->
<!--          <i class="iconfont icon-paihangbang" style="-->
<!--              font-size: 32px;-->
<!--              color: #5991FF;-->
<!--              font-weight: 400;-->
<!--              margin-right: 5px;-->
<!--            "></i>-->
<!--          <div>排行榜</div>-->
<!--        </div>-->
<!--        <ul class="nav-bar">-->
<!--          <li v-for="(item, index) in navList" :key="index" :class="['nav-item', { active: activeNav == index }]"-->
<!--            @click="active(index)">-->
<!--            <span class="nav-name">{{ item.name }}</span>-->
<!--          </li>-->
<!--        </ul>-->
<!--        <div class="rank-detail" v-if="activeNav==0">-->
<!--          <div class="rank-detail-item" v-for="(item, index) in rankList" :key="index">-->
<!--            <div class="top">-->
<!--              <i>{{ index + 1 }}</i>-->
<!--              <img :src=item.img />-->
<!--              <div class="name">{{ item.name }}</div>-->
<!--              <div class="switch">></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="rank-detail" v-if="activeNav==1">-->
<!--          <div class="rank-detail-item" v-for="(item, index) in stuList" :key="index">-->
<!--            <div class="top">-->
<!--              <i>{{ index + 1 }}</i>-->
<!--              <img :src="item.img" />-->
<!--              <div class="name">{{ item.name }}</div>-->
<!--              <div class="switch">></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
// import workbenchTitle from "@/components/workbench/title.vue";
import {
  queryLecturerWBNumber,
  queryLecturerWBList, queryLecturerLevel,
} from "@/assets/api/workbench/lecturer";
import staffLeft from '@/components/workbench/staffLeft.vue'
import {queryLearningInfo} from "@/assets/api/workbench/trainingStaff";
export default {
  components: { staffLeft },
  data() {
    return {
      //数字
      toCount: 0, //待完成
      alreadyCount: 0, // 已完成
      warnCount: 0, //我的提醒
      courseCount: 66, //我的课件
      checkCount:6, //考核课程数
      trainingCount: 6,//培训期次
      trainingTime: 7.8,//培训时长
      trainingLevel:"特聘中级",//讲师级别
      //列表
      tableLoading: false,
      tableData: [],
      //分页
      pageParam: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      activeNav: "",
      navList: [
        {
          name: "我的排名",
        },
        {
          name: "我的学生",
        },
      ],
      rankList: [
        {
          name: "吴钘沨",
          img: "asdsadasa.png",
        },
        {
          name: "李易峰",
          img: "asdsadasa.png",
        },
        {
          name: "李云迪",
          img: "asdsadasa.png",
        },
        {
          name: "吴亦凡",
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0802%2F629a668dj00qx75990010c000o700dmm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665823002&t=0a4dcbb5596472ebb811edbc5c063d37.png",
        },
      ],
      stuList:[
        {
          name: "吴亦凡",
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi3%2F2891639143%2FTB2UJsvausAV1JjSZFsXXadZXXa_%21%212891639143.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669359528&t=152739e23e6c23fa8ba9282d3c412d06",
        },
        {
          name: "罗志祥",
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0802%2F629a668dj00qx75990010c000o700dmm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665823002&t=0a4dcbb5596472ebb811edbc5c063d37.png",
        },
        {
          name: "王力宏",
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0802%2F629a668dj00qx75990010c000o700dmm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665823002&t=0a4dcbb5596472ebb811edbc5c063d37.png",
        },
      ],
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
    };
  },
  created() {
    this.queryLecturerWBNumber();
    this.queryLecturerWBList();
    this.queryLecturerLevel();
    this.queryLearningInfo();
  },
  methods: {
    //查询学习情况和认证情况
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
    //查询讲师工作台数据
    async queryLecturerWBNumber() {
      const res = await queryLecturerWBNumber({
        name: "张三",
        source: "1",
      });
      if (res.rspCode == "0000") {
        this.toCount = res.rspBody.toCount;
        this.alreadyCount = res.rspBody.alreadyCount;
        this.warnCount = res.rspBody.warnCount;
      } else {
        this.$message.error(res.rspDesc);
      }
    },
    //查询讲师待办事项列表
    async queryLecturerWBList() {
      this.tableLoading = true;
      const res = await queryLecturerWBList({
        reqParam: {
          lecturerName: "张三",
          lecturerSource: "1",
        },
        ...this.pageParam,
      });
      if (res.rspCode == "0000") {
        this.tableLoading = false;
        this.tableData = res.rspBody.list;
        this.pageParam.total = res.rspBody.total;
      } else {
        this.tableLoading = false;
        this.$message.error(res.rspDesc);
      }
    },
    async queryLecturerLevel(){
      let userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      const res=await queryLecturerLevel({
        lectureId:userInfo.mainUserId
      })
      if (res.rspCode == "0000") {
        this. trainingLevel=res.rspBody.preriodClass
        this. trainingTime=res.rspBody.trainingDuration
        this.trainingCount=res.rspBody.projectNum
        this.checkCount=res.rspBody.trainingDetail.length
      } else {
        this.$message.error(res.rspDesc);
      }
    },
    //去处理
    goCheck() { },
    //明细
    goDetail() { },
    //切换选项
    active(index) {
      this.activeNav = index;
    },
    //分页
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.queryLecturerWBList();
    },
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.queryLecturerWBList();
    },
  },
};
</script>

<style lang="scss" scoped>
.lecturer-workbench-page {
  box-sizing: border-box;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;

  .title-text {
    font-family: PingFang-SC-Heavy;
    font-size: 16px;
    color: #333333;
    font-weight: 800;
    margin-bottom: 20px;
  }

  .main-container {
    display: flex;

    .main {
      background: #fff;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
      border-radius: 8px;
      padding: 20px;
      width: calc(100% / 3 * 3);
      margin-right: 20px;

      .num {
        display: flex;
        align-items: center;

        .num-left {
          background: #f9f9f9;
          border-radius: 6px;
          width: calc(35% - 10px);
          height: 120px;
          box-sizing: border-box;
          padding: 0 0 20px 20px;
          margin-right: 20px;

          .top{
            display: flex;
            align-items: center;
              .house{
                display: inline-block;
                height: 43px;
                width: 40px;
                background: #F8E8E8;
                clip-path: polygon(0 0, 100% 0,100% 75%,50% 100%,0 75%, 0 0);
                .teacher{
                  display: inline-block;
                  margin-left: 3px;
                  font-size: 13px;
                  font-weight: 800;
                  height: 32px;
                  width: 34px;
                  text-align: center;
                  color: #5991FF;
                }
              }
            .test{
              font-family: PingFang-SC-Heavy;
              font-size: 12px;
              color: #333333;
              font-weight: 800;
              margin-left: 20px;
            }
            .mx {
              font-size: 12px;
              color: #28b0e8;
              font-weight: 400;
              margin-left: 70px;

              &:hover {
                cursor: pointer;
              }
            }

          }

          .bottom{
            display: flex;
            align-items: center;

            .bottom-item{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-size: 12px;
            }

            .bottom-item1{
              width: calc(100%/3);
            }

            .kaohe{
              color: #5991FF;
              height: 80px;
              border-right: 1px solid rgba(236, 232, 232, 1);
            }

            .qici{
              color: #2A6AFE;
              height: 80px;
              border-right: 1px solid rgba(236, 232, 232, 1);
            }

            .shichang{
              color: #55ae00;
              height: 80px;
            }

          }

        }

        .num-middle {
          background: #f9f9f9;
          border-radius: 6px;
          width: calc(45% - 10px);
          height: 120px;
          box-sizing: border-box;
          padding: 0 0 20px 20px;

          .top {
            display: flex;

            .top-right {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: calc(100% - 70px);
            }

            .top-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-size: 12px;
            }

            .top-item1 {
              width: 50%;
            }

            .my {
              width: 70px;
              height: 70px;
            }

            .daiban {
              color: #55ae00;
              height: 45px;
              border-right: 1px solid rgba(236, 232, 232, 1);
            }

            .zaiban {
              color: #5991FF;
              height: 45px;
              border-right: 1px solid rgba(236, 232, 232, 1);
            }

            .yiban {
              color: #c3baba;
              height: 45px;
            }
          }

          .bottom {
            display: flex;
            align-items: center;
            margin-top: 20px;

            .rwtx {
              font-family: PingFang-SC-Heavy;
              font-size: 14px;
              color: #333333;
              font-weight: 800;
              margin-right: 20px;
            }

            .wwc {
              font-size: 12px;
              color: #333333;
              margin-right: 20px;
            }

            .qcl {
              font-size: 12px;
              color: #28b0e8;
              font-weight: 400;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        .num-right {
          width: calc(20% - 10px);
          height: 120px;
          display: flex;
          margin-left: 20px;

          .num-right-item {
            width: calc(100%  - 5px);
          }

          .num-right1 {
            box-sizing: border-box;
            background: rgba(85, 174, 0, 0.11);
            border-radius: 6px;
            margin-right: 10px;

            .wdkj {
              margin: 10px 0 0 10px;
              font-size: 12px;
              color: #55ae00;
              display: flex;
              align-items: center;
            }

            .kjsm {
              display: flex;
              align-items: center;
              justify-content: center;

              .num {
                font-size: 72px;
                color: #55ae00;
              }

              .text {
                font-size: 14px;
                color: #55ae00;
                padding-top: 42px;
              }
            }
          }

          .num-right2 {
            display: flex;

            .left {
              border-radius: 6px;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              background-image: url("../../assets/image/my-tip1.png");
              background-repeat: no-repeat;
              background-position: 100% 100%;
              background-size: auto 100%;

              .wdtx {
                font-size: 12px;
                color: #5991FF;
                margin: 10px 0 0 10px;
              }

              .txsm {
                display: flex;

                .num {
                  font-size: 72px;
                  color: #5991FF;
                  overflow: visible;
                }

                .text {
                  font-size: 14px;
                  color: #5991FF;
                  padding-top: 60px;
                }
              }
            }
          }
        }
      }
    }

    .rank {
      width: calc(100% / 3 - 20px);
      background: #f6f5f5;
      border-radius: 8px;

      .rank-title {
        display: flex;
        font-size: 14px;
        align-items: center;
        margin: 10px 0 10px 10px;
        color: #333333;
        font-weight: 800;
      }

      .nav-bar {
        display: flex;
        margin-bottom: 20px;
        align-items: center;

        .nav-item {
          display: flex;
          cursor: pointer;

          .nav-name {
            font-size: 12px;
            color: #c3baba;
            padding: 0 20px;
          }

          &.active {
            .nav-name {
              color: #5991FF;
            }
          }

          &:first-child {
            border-right: 1px solid rgba(236, 232, 232, 1);
          }
        }
      }

      .rank-detail-item {
        .top {
          display: flex;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #333333;
          font-weight: 400;
          box-sizing: border-box;
          padding: 0 20px 0 10px;
          position: relative;
          margin-bottom: 20px;

          img {
            height: 24px;
            width: 24px;
            margin: 0 10px;
          }

          .switch {
            position: absolute;
            right: 20px;
          }
        }
      }
    }
  }
}
</style>

