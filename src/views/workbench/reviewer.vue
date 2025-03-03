<template>
  <div class="reviewer-workbench-page">
    <div class="title-img"></div>
    <div class="title-text">工作台</div>
    <div class="main">
      <div class="num">
        <div class="num-left">
          <div class="top">
            <div class="top-item my" style="background: #303030; color: #fff">
              <i class="iconfont icon-daiban" style="font-size: 20px"></i>
              <span>我的任务</span>
            </div>
            <div class="top-right">
              <div class="top-item daiban top-item1">
                <span style="font-size: 24px">3</span>
                <span>待办事项</span>
              </div>
              <div class="top-item zaiban top-item1">
                <span style="font-size: 24px">3</span> <span>在办事项</span>
              </div>
              <div class="top-item top-item1 yiban">
                <span style="font-size: 24px">3</span> <span>办结事项</span>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="rwtx">任务提醒</div>
            <div class="wwc">您当前有12个任务未完成</div>
            <div class="qcl">去处理 ></div>
          </div>
        </div>
        <div class="num-right">
          <div class="left">
            <span class="wdtx">我的提醒</span>
            <div class="txsm">
              <div class="num">3</div>
              <div class="text">/个</div>
            </div>
          </div>
          <div class="right"></div>
        </div>
      </div>
      <!-- tab区域 -->
      <ul class="nav-bar">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="['nav-item', { active: activeNav == index }]"
          @click="active(index)"
        >
          <span class="nav-name">{{ item.name }}</span>
        </li>
      </ul>
      <!-- 表格区域 -->
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="projectName" label="标题"> </el-table-column>
        <el-table-column prop="applierName" label="事项类型"> </el-table-column>
        <el-table-column prop="state" label="起始部门"> </el-table-column>
        <el-table-column prop="applyDate" label="接收时间"></el-table-column>
        <el-table-column prop="applyDate" label="当前环节"></el-table-column>
        <el-table-column prop="applyDate" label="发送人"></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <span
              type="text"
              class="main-text-blue"
              @click="goView(scope.row.projectId)"
              >审批</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="pageParam.current"
        :page-size="pageParam.size"
        layout="prev, pager, next,sizes, total"
        :total="pageParam.total"
        style="text-align: right; margin-top: 10px"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      tableData: [],
      //分页
      pageParam: {
        current: 1,
        size: 10,
        total: 0,
      },
      activeNav: "",
      navList: [
        {
          name: "在办事项",
        },
        {
          name: "待办事项",
        },
        {
          name: "办结事项",
        },
      ],
    };
  },
  methods: {
    active(index) {
      this.activeNav = index;
    },
    //分页
    handleCurrentChange(val) {
      this.pageParam.current = val;
      this.queryInitiation();
    },
    handleSizeChange(val) {
      this.pageParam.size = val;
      this.queryInitiation();
    },
  },
};
</script>

<style lang="scss" scoped>
.reviewer-workbench-page {
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
  .main {
    background: #fff;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    padding: 20px;
    .num {
      display: flex;
      align-items: center;
      .num-left {
        background: #f9f9f9;
        border-radius: 6px;
        width: calc(50% - 10px);
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
            width: calc(100% / 3);
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
          }
        }
      }
      .num-right {
        border-radius: 6px;
        width: calc(50% - 10px);
        height: 120px;
        display: flex;
        margin-left: 20px;
        .left {
          width: calc(100% - 120px);
          height: 100%;
          background-color: rgb(248, 232, 232);
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          display: flex;
          align-items: center;
          .wdtx {
            font-size: 18px;
            color: #5991FF;
            margin: 0 20px;
          }
          .txsm {
            display: flex;
            .num {
              font-size: 72px;
              color: #5991FF;
            }
            .text {
              font-size: 14px;
              color: #5991FF;
              padding-top: 60px;
            }
          }
        }
        .right {
          width: 120px;
          height: 100%;
          background-image: url("../../assets/image/my-tip.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .nav-bar {
      display: flex;
      margin-bottom: 20px;
      margin-top: 20px;
      align-items: center;
      .nav-item {
        cursor: pointer;

        border-right: 1px solid rgba(236, 232, 232, 1);
        .nav-name {
          font-size: 14px;
          color: #333333;
          padding: 3px 20px;
        }
        &.active {
          .nav-name {
            color: #5991FF;
            font-weight: 800;
            border-bottom: 2px solid #5991FF;
          }
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>

