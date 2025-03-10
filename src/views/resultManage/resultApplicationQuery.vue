<template>
  <div class="approval-applyQuery-page">
    <div class="head-title">成果查询</div>
    <div class="query">
      <el-form
        :model="form"
        label-position="right"
        label-width="110px"
      >
        <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item
              label="状态"
              prop="state"
              :rules="{
                                required: true,
                                message: '请选择状态',
                                trigger: 'blur',
                            }"
            >
              <el-select
                v-model="form.state"
                placeholder="请选择"
                :disabled="type == 'view'"
                filterable
                clearable
                @change="statusChange"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.attrCode"
                  :label="item.attrValue"
                  :value="item.attrCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="所属项目"
              prop="projectType"
              :rules="{
                                required: true,
                                message: '请选择所属项目',
                                trigger: 'blur',
                            }"
            >
              <el-select
                v-model="form.projectType"
                placeholder="请选择"
                :disabled="type == 'view'"
                filterable
                clearable
                @change="proNameChange"
              >
                <el-option
                  v-for="item in programList"
                  :key="item.attrCode"
                  :label="item.attrValue"
                  :value="item.attrCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="所属类别"
              prop="innovationType"
              :rules="{
                                required: true,
                                message: '请选择所属类别',
                                trigger: 'blur',
                            }"
            >
              <el-select
                v-model="form.innovationType"
                placeholder="请选择"
                :disabled="type == 'view'"
                filterable
                clearable
                @change="cateNameChange"
              >
                <el-option
                  v-for="item in cateList"
                  :key="item.attrCode"
                  :label="item.attrValue"
                  :value="item.attrCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <!-- <el-form-item label="申请人公司" prop="orgName">
              <el-input v-model="form.applyCompany" placeholder="请输入" clearable></el-input>
          </el-form-item> -->
          <el-form-item label="公司" prop="applierCompanyId">
              <el-select v-model="form.applierCompanyId" @change="changeOrg" filterable clearable>
              <el-option
                  v-for="item in allOrgList"
                  :value="item.code"
                  :label="item.name"
                  :key="item.code"
              ></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <!-- <el-form-item label="申请人部门" prop="orgName">
                <el-input v-model="form.applyDepart" placeholder="请输入" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="部门" prop="applierDeptId">
                <el-select v-model="form.applierDeptId" filterable clearable>
                <el-option
                    v-for="item in deptList"
                    :value="item.code"
                    :label="item.name"
                    :key="item.code"
                ></el-option>
                </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- <el-form-item label="申请人部门" prop="orgName">
                <el-input v-model="form.applyDepart" placeholder="请输入" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="form.projectName" placeholder="请输入" clearable></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经济效益(万元)" prop="projectName">
              <div class="moneyFit">
                <el-input  @input="limitInput($event, 'startMoney')"  v-model="startMoney" placeholder="最小值" clearable></el-input>
                <span class="fitLine">—</span>
                <el-input @input="limitInput($event, 'endMoney')"  v-model="endMoney" placeholder="最大值" clearable></el-input>
              </div>
             
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="成果等级"
              prop="achievementType"
            >
              <el-select
                v-model="form.achievementType"
                placeholder="请选择"
                filterable
                clearable
              >
                <el-option
                  v-for="item in achieveList"
                  :key="item.attrCode"
                  :label="item.attrValue"
                  :value="item.attrCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="获奖等级"
              prop="awardLevel"
            >
              <el-select
                v-model="form.awardLevel"
                placeholder="请选择"
                filterable
                clearable
              >
                <el-option
                  v-for="item in awardList"
                  :key="item.attrCode"
                  :label="item.attrValue"
                  :value="item.attrCode"
                ></el-option>
              </el-select>
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
              <el-button class="minorRedButton" @click="exportFile">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- <div class="operation">
            <el-button
                class="mainRedButton"
                @click="goAdd"
            >新增申请</el-button>
            <el-button
                class="minorRedButton"
                @click="goConsult"
            >建议评分</el-button>
        </div> -->

    <!-- 表格区域 -->
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <!-- <el-table-column
                type="selection"
                width="55"
                fixed="left"
            ></el-table-column> -->
      <!-- <el-table-column
        prop="projectName"
        show-overflow-tooltip
        label="项目名称"
      ></el-table-column> -->
      <el-table-column label="项目名称" width="250">
          <template slot-scope="scope">
            <a class="projectName"  @click="goView(scope.row.projectId)">{{ scope.row.projectName }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="innovationType"
        label="所属类别"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="projectType"
        label="所属项目"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="applierCompanyId"
        label="公司"
        width="170"
      ></el-table-column>
      <el-table-column
        prop="applierDeptId"
        label="部门"
      ></el-table-column>
      <el-table-column
        label="市评分"
        width="110"
      > 
        <template slot-scope="scope">
            <!-- <a >{{ (scope.row.avgScore!=0 && scope.row.avgScore!='0.0') ?  scope.row.avgScore : '暂无'  }}</a> -->
            <a>{{scope.row.cityScore}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="省评分"
        width="110"
      > 
        <template slot-scope="scope">
            <!-- <a >{{ (scope.row.avgScore!=0 && scope.row.avgScore!='0.0') ?  scope.row.avgScore : '暂无'  }}</a> -->
            <a>{{scope.row.provScore}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="成果等级"
        width="110"
      > 
        <template slot-scope="scope">
            <!-- <a >{{ (scope.row.avgScore!=0 && scope.row.avgScore!='0.0') ?  scope.row.avgScore : '暂无'  }}</a> -->
            <a>{{scope.row.achievementTypeName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="获奖等级"
        width="110"
      > 
        <template slot-scope="scope">
            <!-- <a >{{ (scope.row.avgScore!=0 && scope.row.avgScore!='0.0') ?  scope.row.avgScore : '暂无'  }}</a> -->
            <a>{{scope.row.awardLevelName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="benefit"
        label="经济效益(万元)"
        width="110"
      > </el-table-column>
      <el-table-column
        prop="applierName"
        label="申请人"
        width="120"
      > </el-table-column>
      <el-table-column
        prop="statusName"
        label="状态"
        width="140"
      > </el-table-column>
      <el-table-column
        prop="applyDate"
        label="创建时间"
        width="150"
      ></el-table-column>
      <el-table-column
        label="详情"
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
              @click="goView(scope.row.projectId)"
            ></i>
          </el-tooltip>
          <el-tooltip
                        class="item"
                        content="编辑"
                        placement="top"
                        popper-class="testtooltip"
                    >
                        <i
                            class="table-btn icon-bianji iconfont"
                            @click="goEdit(scope.row.projectId)"
                        ></i>
                    </el-tooltip>
          <!--
                    <el-tooltip
                        class="item"
                        content="删除"
                        placement="top"
                        popper-class="testtooltip"
                        v-if="scope.row.status=='ZC' || scope.row.status=='CH' || scope.row.status=='TH'"
                    >
                        <el-popconfirm
                            title="确定删除该数据吗？"
                            @confirm="deletePersonalTrainingApply1(scope.row.projectId)"
                        >
                            <i
                                slot="reference"
                                style="font-size: 18px"
                                class="el-icon-delete table-btn"
                            ></i>
                        </el-popconfirm>
                    </el-tooltip>
                    <el-tooltip
                        class="item"
                        content="撤回"
                        placement="top"
                        popper-class="testtooltip"
                        v-if="scope.row.status=='ZC' || scope.row.status=='CH' || scope.row.status=='TH'"
                    >
                        <el-popconfirm
                            title="确定撤回该数据吗？"
                            @confirm="withdraw(scope.row.projectId)"
                        >
                            <i
                                slot="reference"
                                style="font-size: 18px"
                                class="el-icon-delete table-btn"
                            ></i>
                        </el-popconfirm>
                    </el-tooltip>  -->
                    <el-tooltip class="item" content="审核" placement="top" popper-class="testtooltip">
                        <i class="table-btn el-icon-place" @click="goExamine(scope.row.projectId)"></i>
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

    <!-- <footer>
            <div class="operation-footer">
                <div class="operation-text">当前环节: {{ currentLink }}</div>
                <div class="operation-btn">
                    <el-button class="minorGrayButton" @click="goBack">返回</el-button>
                    <el-button class="minorRedButton"  @click="saveInitiation('form')">暂存</el-button>
                    <el-button class="mainRedButton" style="width: 100px" @click="submitApply('form')">办理
                    </el-button>
                </div>
            </div>
        </footer> -->
  </div>
</template>

<script>
import {
  resultSearch,
  deleteResult,
  resultRecallProject,
  exportProjectResults,
} from "@/assets/api/resultManage";
import addTalent from "@/components/approval/addTalent.vue";
import { queryPublicParams } from "@/assets/api/common";
import {  qryAllOrg } from "@/assets/api/rolemanage/index";
import {exportBlobFile} from "@/utils/common";
export default {
  name: "applyQuery",
  components: { addTalent },
  data() {
    return {
      type: "add",
      visible: false,
      //表单查询
      form: {},
      startMoney:'',
      endMoney:'',
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
      statusList:[],
      cateList: [],
      // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
      programList: [],
      allOrgList:[],
      deptList:[],
      achieveList:[
        {attrCode:'PROV',attrValue:'省级成果'},
        {attrCode:'CITY',attrValue:'市级成果'},
        {attrCode:'DEPT',attrValue:'部门级成果'}
      ], 
      awardList:[
        {attrCode:'PROV_1',attrValue:'省级一等奖'},
        {attrCode:'PROV_2',attrValue:'省级二等奖'},
        {attrCode:'PROV_3',attrValue:'省级三等奖'},
        {attrCode:'PROV_4',attrValue:'入围省级创新项目'},
        {attrCode:'CITY_1',attrValue:'市级一等奖'},
        {attrCode:'CITY_2',attrValue:'市级二等奖'},
        {attrCode:'CITY_3',attrValue:'市级三等奖'},
        {attrCode:'CITY_4',attrValue:'入围市级创新项目'},
      ]
    };
  },
  created() {
    this.queryPublicParams("STATE");
    this.queryPublicParams("XMLX");
    this.queryPublicParams("CXLX");
    this.queryApprovalApply();
    this.qryAllOrg();
  },
  methods: {
    async exportFile() {  
      let benefit=""
      let startMoney=parseFloat(this.startMoney)
      let endMoney=parseFloat(this.endMoney)
      if((startMoney && endMoney)  &&  (startMoney > endMoney)){
        return this.$message.error("经济效益范围最小值不能大于最大值");
      }
      if(startMoney || endMoney){
       benefit = startMoney + ' - ' + endMoney
      }
      const loading = this.$loading({
          lock: true,
          text: '数据正在导出，请稍侯',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let reqParam= {
          ...this.form,
          benefit:benefit,
        }
        const res = await exportProjectResults(reqParam);
        if(res){
          loading.close();
        }else{
          loading.close();
        }
        exportBlobFile(res, '成果数据导出.xlsx')
    },
    // 查询静态参数
    async queryPublicParams(attrType) {
      const res = await queryPublicParams({
        attrType,
      });
      
      if (res.rspCode == "0000") {
        if (attrType == "XMLX") {
          this.programList = res.rspBody || [];
          //   this.$forceUpdate();
        } else if (attrType == "CXLX") {
          this.cateList = res.rspBody || [];
        } else if(attrType == "STATE"){
          this.statusList = res.rspBody || [];
        }
      }
    },
    //查询公司
    async qryAllOrg() {
        const req={
            queryType:'company'
        }
        const res = await qryAllOrg(req);
        if (res.rspCode == "0000") {
            this.allOrgList = res.rspBody;
        }
    },
    //选中公司
    changeOrg(val) {
        this.queryDept(val);
    },
    //查询部门
    async queryDept(code) {
        const res = await qryAllOrg({
            queryType:"dept",
            queryKeywords: code,
        });
        if (res.rspCode == "0000") {
            this.deptList = res.rspBody;
        }
    },
    //查询
    async queryApprovalApply() {
      let benefit=""
      let startMoney=parseFloat(this.startMoney)
      let endMoney=parseFloat(this.endMoney)
      if((startMoney && endMoney)  &&  (startMoney > endMoney)){
        return this.$message.error("经济效益范围最小值不能大于最大值");
      }
      if(startMoney || endMoney){
       benefit = startMoney + ' - ' + endMoney
      }
      this.tableLoading = true;
      const res = await resultSearch({
        reqParam: {
          ...this.form,
          benefit:benefit,
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
    //撤回
    async withdraw(id) {
      const res = await resultSearchDetail({ projectId: id });
      if (res.rspCode == "0000") {
        this.$message.success("项目成果已撤回成功");
        this.goBack();
      } else {
        this.$message.error(res.rspDesc);
      }
    },
    //单独删除申请
    async deletePersonalTrainingApply1(id) {
      const res = await deleteResult([id]);
      if (res.rspCode == "0000") {
        this.$message.success("删除成功");
        this.queryApprovalApply();
      } else {
        this.$message.error(res.rspDesc);
      }
    },
    //批量删除申请
    async deletePersonalTrainingApply() {
      if (this.selectList.length == 0) {
        return this.$message.error("请选择至少一条数据");
      }
      let result = this.selectList.every((item) => {
        return item.ownerApplyFlag == "0";
      });
      if (result) {
        this.$confirm(`确定删除吗`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let arr = this.selectList.map((item) => {
            return item.applyId;
          });
          const res = await deleteResult(arr);
          if (res.rspCode == "0000") {
            this.$message.success("删除成功");
            this.queryApprovalApply();
          } else {
            this.$message.error(res.rspDesc);
          }
        });
      } else {
        this.$message.info("不能删除自己的申请单");
      }
    },
    statusChange(val) {
      this.form.ca = "";
    },
    cateNameChange(val) {
      this.form.ca = "";
    },
    proNameChange(val) {
      this.form.ca = "";
    },
    // 经济效益数字
    limitInput(value, name) {
      let dat =
        ("" + value) // 第一步：转成字符串
          .replace(/[^\d^\.]+/g, "") // 第二步：把不是数字，不是小数点的过滤掉
          .replace(/^0+(\d)/, "$1") // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
          .replace(/^\./, "0.") // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
          .match(/^\d*(\.?\d{0,2})/g)[0] || ""; // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
      if(name=='startMoney'){
        this.startMoney=dat
      }
      if(name=='endMoney'){
        this.endMoney=dat
      }
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
    //审核
    goExamine(id) {
      this.$router.push({
        name: "resultApprove",
        params: {
          applyId: id,
          type: "examine",
        },
      });
    },
    //编辑
    goEdit(id) {
      this.$router.push({
        name: "myResultDetail",
        params: {
          applyId: id,
          type: "edit",
        },
      });
    },
    //新增
    goAdd() {
      this.$router.push({ name: "resultApplication" });
    },
    //建议评分
    goConsult() {
      // this.visible = true;
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
  },
};
</script>

<style lang="scss" scoped>
.approval-applyQuery-page {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  // height: 100%;

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
  .moneyFit{
    display: flex;
  }
  .fitLine{
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
