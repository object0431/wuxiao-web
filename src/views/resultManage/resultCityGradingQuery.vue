<template>
  <div class="approval-applyQuery-page">
    <div class="head-title">市级成果评级</div>
    <div class="query">
      <el-form
        :model="form"
        label-position="right"
        label-width="90px"
      >
        <el-row :gutter="24">

          <!-- <el-col :span="8"> -->
            <!-- <el-form-item
              label="查询日期"
              prop="value"
              :rules="{
                                required: true,
                                message: '请选择查询月份',
                                trigger: 'blur',
                            }"
            > -->
            <!-- <el-form-item
              label="查询日期"
              prop="value"> -->
              <!-- <ChartDatePicker
                v-model="value"
                :type.sync="groupType"
                @handleChangeTime="handleChangeTime(type=0,$event)"
              ></ChartDatePicker> -->
             
              <!-- <el-date-picker
                style="width: 100%"
                value-format="yyyy-MM"
                v-model="form.approvalTime"
                type="date"
                placeholder="选择月份"
              >
              </el-date-picker> -->
            <!-- </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="查询日期" prop="queryDate" >
                <el-date-picker style="width: 100%" value-format="yyyy-MM-dd"
                    :picker-options='pickerOptions'
                    v-model="queryTime" type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="form.projectName" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label=""
              label-width="90px"
            >
              <el-button
                class="minorRedButton"
                @click="queryKeyWord"
              >查询</el-button>
              <el-button class="minorRedButton" @click="exportFile">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- <div class="operation">
      <el-button
        class="minorRedButton"
        @click="goPush"
      >评奖</el-button>
    </div> -->

    <!-- 表格区域 -->
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
        fixed="left"
      ></el-table-column>
      <el-table-column  label="项目名称"   width="220">
          <template slot-scope="scope">
            <a class="projectName"  @click="goView(scope.row.achievementId)">{{ scope.row.projectName }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="innovationType"
        label="所属类别"
        width="110"
      ></el-table-column>
      <el-table-column
        prop="projectType"
        label="所属项目"
        
      ></el-table-column>
      <!-- <el-table-column
        prop="applierDeptId"
        label="部门"
      ></el-table-column> -->
      <el-table-column
        prop="applierName"
        label="申请人"
        width="130"
      > </el-table-column>
       <el-table-column
        prop="applierCompanyId"
        label="公司"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="applierDeptId"
        label="部门"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="applyDate"
        label="创建时间"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="avgScore"
        label="评分"
        sortable
        width="100"
      > </el-table-column>
      <!-- awardLevel -->
      <el-table-column
        prop="awardLevel"
        label="评奖"
        width="150"
      > </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            content="详情"
            placement="top"
            popper-class="testtooltip"
          >
            <i
              class="table-btn icon-xiangqing iconfont"
              @click="goView(scope.row.achievementId)"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pageParam.pageNum"
      :page-size="pageParam.pageSize"
      layout="prev, pager, next,sizes, total"
      :total="pageParam.total"
      style="text-align: right; margin-top: 10px;padding-bottom: 80px;"
    >
    </el-pagination>
    <addTalent
      :visible="visible"
      @closeModel="closeModel"
      @addTalent='addTalent'
    ></addTalent>

    <gradingHandle
      :visible="handleVisable"
      @close="handleVisable = false"
      @submit="goGrading"
      :projectList="selectList"
      type="CITY"
    ></gradingHandle>
    <footer>
            <div class="operation-footer">
                <div class="operation-text">当前环节</div>
                <div class="operation-btn">
                    <!-- <el-button class="minorGrayButton" @click="goBack">返回</el-button> -->
                    <el-button class="mainRedButton" style="width: 100px" @click="goGrading">去评奖
                    </el-button>
                </div>
            </div>
        </footer>
  </div>
</template>

<script>
import gradingHandle from "@/components/trainingHandleModal/gradingHandle.vue";
import {
  selPendingRatingList,selPendingRatingListExport
} from "@/assets/api/resultManage";
import addTalent from "@/components/approval/addTalent.vue";
import ChartDatePicker from "@/components/workbench/charlDataPicker.vue";
import { dateFormat } from "@/filters/index";
import {exportBlobFile} from "@/utils/common";
export default {
  name: "applyQuery",
  components: { addTalent,ChartDatePicker,gradingHandle },
  data() {
    return {
      // value: new Date(),
      // choiceDate:`${dateFormat(new Date(), "yyyyMM")}`,
      value: '',
      choiceDate:'',
      groupType: "month",
      type: "add",
      visible: false,
      //表单查询
      form: {
        projectName:''
      },
      //分页
      pageParam: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      //列表数据
      tableLoading: false,
      tableData: [],
      selectList: [],
      cateList: [],
      // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
      programList: [],
      handleVisable: false,
      queryTime:[],
      pickerOptions:{
        disabledDate(date){
          return date.getTime() > Date.now()
        }
      }
    };
  },
  created() {
    this.queryApprovalApply();
  },
  methods: {
    //查询
    async queryApprovalApply() {
      console.log(this.queryTime)
      let param={
          achievementType:"CITY",
      }
      if(this.queryTime && this.queryTime.length>=0){
        param.startDate=this.queryTime[0]
        param.endDate=this.queryTime[1]
      }
      if(this.form.projectName){
        param.projectName = this.form.projectName
      }
      this.tableLoading = true;
      delete this.pageParam.total
      const res = await selPendingRatingList({
        reqParam: param,
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
    queryKeyWord(){
      this.pageParam.pageNum = 1
      this.queryApprovalApply();
    },
    // 日期
    handleChangeTime(type, timeObj) {
      
      
      // TODO
      if(timeObj && timeObj.startTime){
        this.choiceDate = timeObj.startTime;
      }
    },
    cateNameChange(val) {
      this.form.ca = "";
    },
    proNameChange(val) {
      this.form.ca = "";
    },
    //多选
    handleSelectionChange(val) {
      this.selectList = val;
    },
    //查看
    goView(id) {
      this.$router.push({
        name: "myResultDetail",
        params: {
          applyId: id,
          type: "view",
        },
      });
      // this.$router.push('/approval/application')
    },
  // 去评奖
    goGrading() {
      if (this.selectList.length == 0) {
        return this.$message.error("请选择至少一条数据");
      }
      this.handleVisable = true;
    },
    //分页
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.queryApprovalApply();
    },
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.queryApprovalApply();
    },
    //关闭弹窗
    closeModel() {
      this.visible = false;
    },
    addTalent(data) {
      this.visible = false;
      data.map((item) => {
        if (item.name) {
          
        }
      });
    },
    async exportFile() {
      const loading = this.$loading({
          lock: true,
          text: '数据正在导出，请稍侯',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      let param={
          achievementType:"CITY",
      }
      if(this.queryTime && this.queryTime.length>=0){
        param.startDate=this.queryTime[0]
        param.endDate=this.queryTime[1]
      }
      if(this.form.projectName){
        param.projectName = this.form.projectName
      }
      const res = await selPendingRatingListExport({
        reqParam: param,
        pageNum:1,
      })
      if(res){
          loading.close();
      }else{
          loading.close();
      }
      // const res = await exportLoginEmpInfo(param.join('&'));
      exportBlobFile(res, '市级成果评级列表导出.xlsx')
    },
  },
};
</script>

<style lang="scss" scoped>
.approval-applyQuery-page {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;

  .query {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(217, 217, 217, 1);
  }

  // .operation {
  //     text-align: right;
  //     margin: 10px 0;
  // }

  footer {
    z-index: 9; 
    .operation-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-right: 20px;


      .operation-text {
        color: #333;
        font-size: 14px;
        margin-left: 20px;
        font-weight: 800;
      }
    }

    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
    height: 80px;
    line-height: 80px;
    position: fixed;
    bottom: 0;
    left: 300px;
    width: calc(100vw - 300px);
  }
  .projectName{
    color: #3377FF;
    cursor: pointer;
  }
}
::v-deep .el-date-editor .el-range__icon{
  margin-bottom: 10px;
}
::v-deep .el-date-editor .el-range-separator{
  margin-bottom: 10px;
}
::v-deep .el-date-editor .el-range__close-icon{
  margin-bottom: 10px;
}
</style>
