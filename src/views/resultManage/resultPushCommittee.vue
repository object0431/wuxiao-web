<template>
    <div class="approval-applyQuery-page">
        <div class="head-title">{{topTitle}}</div>
        <div class="query">
            <el-form
                :model="form"
                label-position="right"
                label-width="90px"
            >
                <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <!-- <el-form-item label="申请人部门" prop="orgName">
                            <el-input v-model="form.applyDepart" placeholder="请输入" clearable></el-input>
                        </el-form-item> -->
                        <el-form-item label="查询类型" prop="queryType">
                            <el-select v-model="form.queryType" filterable>
                            <el-option
                                v-for="item in statuList"
                                :value="item.value"
                                :label="item.name"
                                :key="item.value"
                            ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目名称" prop="projectName">
                            <el-input v-model="form.projectName" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </el-col>
                      <el-col :span="8">
                        <!-- <el-form-item label="申请人公司" prop="orgName">
                            <el-input v-model="form.applyCompany" placeholder="请输入" clearable></el-input>
                        </el-form-item> -->
                        <el-form-item label="公司" prop="companyId">
                            <el-select v-model="form.companyId" @change="changeOrg" filterable clearable>
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
                        <el-form-item label="部门" prop="deptId">
                            <el-select v-model="form.deptId" filterable clearable>
                            <el-option
                                v-for="item in deptList"
                                :value="item.code"
                                :label="item.name"
                                :key="item.code"
                            ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>              
                    <el-col :span="8" v-if="resultType == 'CITY'">
                      <el-form-item label="时间" prop="yxq">
                        <el-date-picker v-model="form.startDate" type="daterange" value-format="yyyyMMdd" start-placeholder="开始日期"
                          end-placeholder="结束日期" style="width: 100%">
                        </el-date-picker>
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
                v-if="!pendingCode"
                class="mainRedButton"
                @click="pushCommittee"
            >推送委员会</el-button>
            <el-button
                v-else
                class="mainRedButton"
                @click="goConsult"
            >项目成果评分</el-button>
        </div> -->


        <!-- 表格区域 -->
        <el-table
            v-loading="tableLoading"
            :data="tableData"
            @selection-change="handleSelectionChange"
            style="width: 100%"
            :row-key="getRowKey"
        >
            <el-table-column
                type="selection"
                width="55"
                fixed="left"
                :selectable="selectable"
                :reserve-selection="true"
            ></el-table-column>
            <!-- <el-table-column
                prop="projectName"
                show-overflow-tooltip
                label="项目名称"
            ></el-table-column> -->
            <el-table-column label="项目名称" width="240" >
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
                prop="statusName"
                label="状态"
            > </el-table-column>
            <el-table-column
                prop="score"
                label="评分"
                width="150"
                sortable
                :sort-method="(a,b)=>{return a.score - b.score}"
            > </el-table-column>
            <el-table-column
                prop="applyDate"
                label="创建时间"
                width="150"
            ></el-table-column>
            <el-table-column
                label="详情"
                width="150"
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
        
        <footer style="z-index: 10;">
            <div class="operation-footer">
                <div class="operation-text">当前环节</div>
                <div class="operation-btn">
                    <!-- <el-button class="minorGrayButton" @click="goBack">返回</el-button> -->
                    <el-button  v-if="!pendingCode && isShowPush" class="mainRedButton"  @click="pushCommittee">推送评审委员会</el-button>
                    <el-button  v-if="topTitle == '市级成果评分'" class="mainRedButton"  @click="gotoDepart('CITY2DEPT')">部门级成果归档</el-button>
                    <el-button  v-if="topTitle == '省级成果评分'" class="mainRedButton"  @click="gotoDepart('PROV2CITY')">市级成果归档</el-button>
                    <el-button  v-if="!pendingCode && !isShowPush" class="mainRedButton"  @click="urgeCommittee">催办</el-button>
                    <el-button v-if="pendingCode" class="mainRedButton" @click="goConsult">成果评分
                    </el-button>
                </div>
            </div>
        </footer>

            <!--CGSQ 办理浮层 SJCGZSJ-->
    <committeeHandle
      :visible="handleVisable"
      :type="resultType"
      @close="handleVisable = false"
      @submit="onSubmit"
      :pendingCode="pendingCode"
      :achievementIdList="selectList"
    ></committeeHandle>

    <pushReview :showScore='showScore' @closePushReview='closePushReview' :type="resultType"  :achievementIdList="selectList"></pushReview>

    <urgeCommittee
        :visible="urgeVisible"
        :queryType="resultType == 'PROV'? '1' : '0' "
        @closeModel="closeModel"
        @pushUrgeEvent='pushUrgeEvent'
    ></urgeCommittee>
    </div>
    
</template>

<script>
import { resultZgSearch,resultZgPush, urgingReview,achievementArchive,zgSearchExport } from "@/assets/api/resultManage";
import addTalent from "@/components/approval/addTalent.vue";
import urgeCommittee from "@/components/approval/urgeCommittee.vue";
import committeeHandle from "@/components/trainingHandleModal/trainingHandle.vue";
import pushReview from "@/components/trainingHandleModal/pushReview.vue";
import { queryPublicParams } from "@/assets/api/common";
import {  qryAllOrg } from "@/assets/api/rolemanage/index";
import {exportBlobFile} from "@/utils/common";
export default {
  name: "applyQuery",
  components: { addTalent,committeeHandle,urgeCommittee,pushReview },
  data() {
    return {
      type: "add",
      visible: false,
      //表单查询
      form: {
        companyId:"",
        deptId:"",
        queryType:"0",
        startDate:[]
      },
      //分页
      pageParam: {
        pageNum: 1,
        pageSize: 30,
        total: 0,
      },
      resultType:"",
      //列表数据
      tableLoading: false,
      tableData: [],
      selectList: [],
      cateList: [],
      // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
      programList: [],
      pendingCode:'',
      //办理浮层
      handleVisable: false,
      topTitle:'',
      achievementIdList:[],
      allOrgList:[],
      deptList:[],
      statuList:[{name:"待推送",value:'0'},{name:"已推送",value:'1'}],
      isShowPush:true,
      urgeVisible:false,
      showScore:false,
      allReviewList:[
        {name:'专业线1',list:['张三','李四','王五']},
        {name:'专业线2',list:['小草','小米','小明']}
      ]
    };
  },
  created() {
    this.pendingCode = this.$route.query.pendingCode || '';
    this.resultType = this.$route.query.type || '';
    if(this.resultType == "CITY"){
      this.topTitle = "市级成果评分";
    } else if(this.resultType == "PROV"){
      this.topTitle = "省级成果评分";
    }
    this.qryAllOrg()
    // this.queryPublicParams("STATE");
    // this.queryPublicParams("XMLX");
    this.queryApprovalApply();
  },
  methods: {
    // 查询静态参数
    async queryPublicParams(attrType) {
      const res = await queryPublicParams({
        attrType,
      });
      
      if (res.rspCode == "0000") {
        if (attrType == "XMLX") {
          this.programList = res.rspBody || [];
          //   this.$forceUpdate();
        } else if (attrType == "STATE") {
          this.cateList = res.rspBody || [];
        }
      }
    },
    getRowKey(row){
      return row.projectId;
    },
    selectable(row){
      return true
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
      console.log(this.form.startDate)
      this.tableLoading = true;
      let param;
      if(this.resultType == "PROV"){
        param = {pageNum:this.pageParam.pageNum,pageSize:this.pageParam.pageSize,reqParam:{achievementType:this.resultType||'',companyId:this.form.companyId,deptId:this.form.deptId,queryType:this.form.queryType,projectName:this.form.projectName}};
      }else{
        param = {pageNum:this.pageParam.pageNum,pageSize:this.pageParam.pageSize,reqParam:{achievementType:this.resultType||'',companyId:this.form.companyId,deptId:this.form.deptId,queryType:this.form.queryType,projectName:this.form.projectName}};
      }
      if(this.form.startDate && this.form.startDate.length>0){
        param.reqParam.startDate = this.form.startDate[0]
        param.reqParam.endDate = this.form.startDate[1]
      }
      if(this.pendingCode && this.pendingCode.length > 1){
        param.reqParam.pendingCode = this.pendingCode
      }
      const res = await resultZgSearch(param);
      if (res.rspCode == "0000") {
        
        this.tableLoading = false;
        this.tableData = res.rspBody.modelPageInfo.list;
        this.pageParam.total = res.rspBody.modelPageInfo.total;
        if(this.form.queryType=='1'){
          this.isShowPush = false
        }else{
          this.isShowPush = true
        }
      } else {
        this.tableLoading = false;
        this.$message.error(res.rspDesc);
      }
    },
    // 部门级成果归档
    gotoDepart(archiveType){
      let projectIds=[],msg="市级成果"
      let that=this
      if(!this.selectList || this.selectList.length <= 0){
        return this.$message.info('请先选择至少一项项目进行部门归档!');
      }
      if(archiveType=='CITY2DEPT'){
        msg="部门级成果"
      }
      projectIds=this.selectList.map((item,index)=>{
        return item.projectId
      })
      console.log("selectList------------------",this.selectList,"projectIds-------",projectIds);
      this.$confirm(
          `您确定要归档为${msg}吗？`,
          "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
        // 归档类型 PROV2CITY:省级到市级, CITY2DEPT:市级到部门级
        const res = await achievementArchive({
            archiveType,
            projectIds,
        });
        if (res.rspCode == "0000") {
          that.$message.success("归档成功");
          that.queryApprovalApply();
          window.location.reload();
        }else{
          that.$message.error("归档失败");
        }
      });
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
      console.log(this.selectList,'===')
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
    //推送委员会
    pushCommittee() {
      if(!this.selectList || this.selectList.length <= 0){
        return this.$message.info('请先选择至少一项项目成果数据!');
      }
      // if(!this.tableData || this.tableData.length <= 0){
      //   return this.$message.info('未获取到项目成果数据,暂无法推送');
      // }
      this.showScore = true;
    },
    urgeCommittee(){
      this.urgeVisible = true;
    },
    closeModel(){
      this.urgeVisible = false;
    },
    //关闭弹窗
    async pushUrgeEvent(roleList,question) {
      console.log(roleList,question)
      let list =[]
      roleList.map((item)=>{
        list.push(item.mainUserId)
      })
      // 选择的数据
      const res = await urgingReview({
        "content": question,
        "staffIdList": list
      });
      if (res.rspCode == "0000") {
        this.urgeVisible = false
        this.$message.success("催办发起成功");
      }
    },
    //确认办理
    async onSubmit(data) {},
    // 去评分
    goConsult(){
      this.$router.push({
        name: "resultCommitteeReview",
        params: {
          pendingCode: this.pendingCode,
        },
      });
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
    queryKeyWord(){
      this.pageParam.pageNum = 1;
      this.queryApprovalApply();
    },
    closePushReview(){
      this.showScore = false
    },
    async exportFile() {
      const loading = this.$loading({
          lock: true,
          text: '数据正在导出，请稍侯',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      let param={};
      if(this.resultType == "PROV"){
        param = {pageNum:1,reqParam:{achievementType:this.resultType||'',companyId:this.form.companyId,deptId:this.form.deptId,queryType:this.form.queryType,projectName:this.form.projectName}};
      }else{
        param = {pageNum:1,reqParam:{achievementType:this.resultType||'',companyId:this.form.companyId,deptId:this.form.deptId,queryType:this.form.queryType,projectName:this.form.projectName}};
      }
      if(this.form.startDate && this.form.startDate.length>0){
        param.reqParam.startDate = this.form.startDate[0]
        param.reqParam.endDate = this.form.startDate[1]
      }
      if(this.pendingCode && this.pendingCode.length > 1){
        param.reqParam.pendingCode = this.pendingCode
      }
      const res = await zgSearchExport(param)
      if(res){
          loading.close();
      }else{
          loading.close();
      }
      // const res = await exportLoginEmpInfo(param.join('&'));
      let str = this.resultType == "PROV"?'省级成果评分列表导出.xlsx':'市级成果评分列表导出.xlsx'
      exportBlobFile(res, str)
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
  ::v-deep .el-date-editor .el-range__icon{
    display: flex;
    align-items: center;
  }
  ::v-deep .el-date-editor .el-range-separator{
    display: flex;
    align-items: center;
  }
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
