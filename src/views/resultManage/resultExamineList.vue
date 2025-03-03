<template>
  <div class="talentReview-page">
    <div class="head-title">年审评审查询</div>
    <div class="query">
      <el-form :model="form" label-position="right" label-width="90px">
        <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="公司" prop="companyId">
                <el-select v-model="form.companyId" placeholder="请选择" filterable clearable @change="getDeptData ">
                  <el-option v-for="item in companyData" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门" prop="deptId">
                <el-select v-model="form.deptId" placeholder="请选择" filterable clearable @change="handleChange">
                  <el-option v-for="item in deptData" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="人才级别" prop="talentLevel" class="is-required">
                <el-select v-model="form.talentLevel" @change="changeOrg">
                  <el-option v-for="item in talentLevelList" :value="item.attrCode"
                             :label="item.attrValue" :key="item.attrCode"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" prop="staffName">
               <el-input v-model="form.staffName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="专业线" prop="majorLine" class="is-required">
                <el-select v-model="form.majorLine">
                  <el-option v-for="item in majorLineList" :key="item.attrCode" :label="item.attrValue" :value="item.attrCode"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="">
              <el-button class="minorRedButton" @click="queryData">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operation">
      <el-button class="mainRedButton" @click="goReview">评审</el-button>
      <!-- <el-button class="mainRedButton" @click="goReviewDeatil" style="margin-left: 30px">查看</el-button> -->
    </div>
    <el-table v-loading="tableLoading"
              @selection-change="handleSelectionChange"
              :data="tableData" style="width: 100%">
<!--      <el-table-column type="selection" width="55" fixed="left"></el-table-column>-->
      <el-table-column prop="companyName" label="单位" ></el-table-column>
      <el-table-column prop="staffName" label="姓名" ></el-table-column>
      <el-table-column prop="talentLevel" label="人才级别" ></el-table-column>
      <el-table-column prop="majorLineName" label="专业线" ></el-table-column>
      <el-table-column prop="year" label="年审年号" ></el-table-column>
      <el-table-column prop="statusName" label="审批状态" ></el-table-column>
      <el-table-column prop="applyDate" label="申请日期" ></el-table-column>
    </el-table>

    <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
                   :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next, sizes, total"
                   :total="pageParam.total" style="text-align: right; margin-top: 10px">
    </el-pagination>
  </div>
</template>

<script>
import {queryCompanyAndDept} from "@/assets/api/trainingBudget";
import {queryPendingReviewList} from "@/assets/api/talenAudit";
import {queryPublicParams} from "@/assets/api/common";
import { mapGetters, mapMutations } from 'vuex'

export default {
  data(){
    return{
      form:{},
      taskList:[],
      pageParam:{
        pageNum:1,
        pageSize:10,
        total:0,
      },
      talentLevelList:[],
      statusList:[],
      companyData:[],
      deptData:[],
      tableData:[],
      tableLoading:true,
      majorLineList:'',
    }
  },
  created() {
  },
  computed:{

  },
  mounted(){
    this.queryPublicParams('RCNSZT');
    this.getCompanyAndDept({ queryType: "company" });
    let pageActive = JSON.parse(sessionStorage.getItem('talentAuditExamineList')) || {}
    this.form = {...pageActive}
    this.initQuery()
    setTimeout(() => {
      sessionStorage.removeItem('talentAuditExamineList')
    }, 500)
  },
  methods:{
    handleSelectionChange(val) {
      this.taskList = val
    },
    async initQuery(){
      await this.queryPublicParams('RCJB')
      await this.queryPublicParams('MAJOR_LINE')
      this.queryData()
    },
    changeOrg(e){
      
      sessionStorage.setItem("attrValue",e)
      this.$forceUpdate()
    },
    async  queryPublicParams(type){
      if (type=='RCJB'){
        const res=await queryPublicParams({
          paramType:'RCJB'
        })
        if (res.rspCode=="0000"){
          this.talentLevelList=res.rspBody.data
        }
      }
      if(type=='MAJOR_LINE'){
        const res=await queryPublicParams({
          paramType:'MAJOR_LINE'
        })
        if (res.rspCode=="0000"){
          this.majorLineList=res.rspBody.data

        }
      }
      if(type=='RCNSZT') {
        const res=await queryPublicParams({
          paramType:'RCNSZT'
        })
        if (res.rspCode=="0000"){
          this.statusList=res.rspBody.data

        }
      }

    },
    async getCompanyAndDept(params) {
      try {
        const res = await queryCompanyAndDept(params);
        params.queryType === "company"
            ? (this.companyData = res.rspBody || [])
            : (this.deptData = res.rspBody || []);
      } catch (error) {
        this.$message.error("网络错误");
      }
    },
    getDeptData(){
      this.deptData = [];
      this.form.deptId = '';
      if (this.form.companyId){
        this.getCompanyAndDept({
          queryType: "dept",
          queryKeywords: this.form.companyId,
        });
      }
    },
    handleChange(){
      this.$forceUpdate()
    },
    async queryData(){
      const res=await queryPendingReviewList({
        reqParam:{
          ...this.form
        },
        ...this.pageParam,
      })
      if (res.rspCode=="0000"){
        this.tableData=res.rspBody.list;
        this.pageParam.total=res.rspBody.total
         this.tableLoading=false;
      }
    },
    goReview(){
      if(!this.form.talentLevel || !this.form.majorLine){
        this.$message.info("必须选择人才级别和专业线进行评审")
        return
      }
      let talentLevel=this.form.talentLevel
      let majorLine=this.form.majorLine
      sessionStorage.setItem('talentAuditExamineList', JSON.stringify({
        companyId: this.form.companyId,
        deptId: this.form.deptId,
        talentLevel: this.form.talentLevel,
        staffName: this.form.staffName,
        majorLine: this.form.majorLine
      }))
      this.$router.push({name:'talentGoReviewe',query:{talentLevel,majorLine}})
    },
    goReviewDeatil(){
      if(!this.form.talentLevel || !this.form.majorLine){
        this.$message.info("必须选择人才级别和专业线进行评审查看")
        return
      }
      let talentLevel=this.form.talentLevel
      let majorLine=this.form.majorLine
      sessionStorage.setItem('talentAuditExamineList', JSON.stringify({
        companyId: this.form.companyId,
        deptId: this.form.deptId,
        talentLevel: this.form.talentLevel,
        staffName: this.form.staffName,
        majorLine: this.form.majorLine
      }))
      this.$router.push({name:'talentGoRevieweDetail',query:{talentLevel,majorLine}})
    },
    //分页
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.queryData();
    },
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.queryData();
    },
  }
}
</script>

<style lang="scss" scoped>
.talentReview-page{
  box-sizing: border-box;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  .query {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(217, 217, 217, 1);
  }



  .operation {
    text-align: right;
    margin: 10px 0;
  }
}

</style>
