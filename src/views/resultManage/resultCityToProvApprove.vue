<template>
  <div class="approval-applyQuery-page">
    <div class="head-title">市级转省级成果<span style="color: red;">{{'（项目数量：'+allListNum+'个）'}}</span></div>
    <!-- <div class="query">
      <el-form
        :model="form"
        label-position="right"
        label-width="90px"
      >
        <el-row :gutter="10">

          <el-col :span="8">
            <el-form-item
              label="查询日期"
              prop="value">
              <ChartDatePicker
                v-model="value"
                :type.sync="groupType"
                @handleChangeTime="handleChangeTime(type=0,$event)"
              ></ChartDatePicker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label=""
              label-width="90px"
            >
              <el-button
                class="minorRedButton"
                @click="queryApprovalApply"
              >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div> -->


    <!-- 表格区域 -->
    <el-table
      ref="itemTable"
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
      <el-table-column
        show-overflow-tooltip
        label="项目名称"
        width="240"
      > <template slot-scope="scope">
            <a class="projectName"  @click="goView(scope.row.achievementId)">{{ scope.row.projectName }}</a>
        </template></el-table-column>
      <el-table-column
        prop="innovationType"
        label="所属类别"
      ></el-table-column>
      <el-table-column
        prop="projectType"
        label="所属项目"
      ></el-table-column>
      <el-table-column
        prop="applierDeptId"
        label="部门"
      ></el-table-column>
      <el-table-column
        prop="applierName"
        label="申请人"
      > </el-table-column>
      <el-table-column
        prop="avgScore"
        label="评分"
      > </el-table-column>
      <el-table-column
        prop="applyDate"
        label="创建时间"
        width="150"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="100"
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
    <!-- <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pageParam.pageNum"
      :page-size="pageParam.pageSize"
      layout="prev, pager, next,sizes, total"
      :total="pageParam.total"
      style="text-align: right; margin-top: 10px;padding-bottom: 80px;"
    >
    </el-pagination> -->
    <addTalent
      :visible="visible"
      @closeModel="closeModel"
      @addTalent='addTalent'
    ></addTalent>

    <footer>
            <div class="operation-footer">
                <div class="operation-text">当前环节:</div>
                <div class="operation-btn">
                    <!-- <el-button class="minorGrayButton" @click="goBack">返回</el-button> -->
                    <el-button class="mainRedButton" style="width: 100px" @click="() => handleVisable = true ">审核
                    </el-button>
                </div>
            </div>
        </footer>

    <training-handle-review :visible="handleVisable" @close="handleVisable = false" @submit="onSubmit"
    :showBackBtn="false" :loading="submitLoading" :specailCate="'special'">
    </training-handle-review>
    <!-- <el-divider></el-divider>
    <flow-tips :flowList="flowList"></flow-tips> -->
  </div>
</template>

<script>
import {
  queryResultCityToProv,selCityToProvAuditAchievement
} from "@/assets/api/resultManage";
import {
  approvalTask
} from "@/assets/api/common";
import addTalent from "@/components/approval/addTalent.vue";
import ChartDatePicker from "@/components/workbench/charlDataPicker.vue";
import { dateFormat } from "@/filters/index";
import TrainingHandleReview from '@/components/trainingHandleModal/trainingHandleReview.vue'
import TrainingHandle from '@/components/trainingHandleModal/trainingHandle.vue'
import { mapMutations } from "vuex";

export default {
  name: "applyQuery",
  components: { addTalent,ChartDatePicker,
    TrainingHandleReview,
    TrainingHandle, },
  data() {
    return {
      value: new Date(),
      choiceDate:`${dateFormat(new Date(), "yyyy")}`,
      groupType: "year",
      type: "add",
      visible: false,
      //表单查询
      form: {},
      //分页
      pageParam: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      //列表数据
      tableLoading: false,
      submitLoading:false,
      tableData: [],
      selectList: [],
      cateList: [],
      // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
      programList: [],
      pendingCode:'',
      handleVisable:false,
      allListNum:0,
    };
  },
  created() {
    // 1691824588807
    this.pendingCode = this.$route.query.pendingCode || '';
    
    this.queryApprovalApply();
  },
  methods: {
    ...mapMutations(["removeCheckTabs"]),
    //查询
    async queryApprovalApply() {
      if(!this.pendingCode) this.$message.error('未获取到审核编码，请返回重试')
      this.tableLoading = true;
      const res = await selCityToProvAuditAchievement({
        pendingCode:this.pendingCode,
      });
      console.log(res);
      if (res.rspCode == "0000") {
        
        this.tableLoading = false;
        this.tableData = res.rspBody;
        this.allListNum = res?.rspBody?.length || 0
        // this.pageParam.total = res.rspBody.total;
        // 设置表格所有行全部选中
        this.$refs.itemTable.toggleAllSelection()
      } else {
        this.tableLoading = false;
        this.$message.error(res.rspDesc);
      }
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
    closeApprove() {
      const currentTab = JSON.parse(sessionStorage.getItem("currentTab")) || {};
      this.removeCheckTabs(currentTab.name);
    },
    addTalent(data) {
      this.visible = false;
      data.map((item) => {
        if (item.name) {
          
        }
      });
    },
    // 提交审核
    async onSubmit(data) {
      if(!this.selectList || this.selectList.length <= 0){
        return this.$message.info('请最少选择一个项目成果');
      }
      let list = this.selectList.map(item =>{
        return item.achievementId;
      })
      const params = {
        remark: data.textarea,
        retType: data.checkCode,
        targetId: this.pendingCode,
        targetType: 'SJCGZSJ',
        ext:{
          // "projectId":list.join(',')
        }
      }
      if(data.opinion == '000001'){//不同意
        params.ext.projectId = list.join(',')
      }
      if(data.opinion == '000002'){//不同意
        params.ext.projectRefuseId = list.join(',')
      }
      try {
        this.submitLoading = true
        const res = await approvalTask(params)
        if (res.rspCode == "0000") {

          // this.$message.success("审核成功")
          this.$confirm(`审核成功`, "提示", {
            confirmButtonText: "确定",
            type: "warning",
          }).then(() => {
            // this.closeApprove()
            this.handleVisable = false
            this.queryApprovalApply();
          });
        } else {
          this.$message.error(res.rspDesc)
        }
        this.submitLoading = false
      } catch (error) {
        
        this.submitLoading = false
        this.$message.error('请求出错')
      }
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
</style>
