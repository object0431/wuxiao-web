<template>
    <div class="myInnovate-page">
      <div class="head-title">创新议题查询</div>
      <div class="query">
        <el-form :model="form" label-position="right" label-width="90px">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="标题" prop="issuesTitle">
                <el-input v-model="form.issuesTitle" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="" label-width="90px">
                <el-button class="minorRedButton" @click="queryApply">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格区域 -->
      <el-table v-loading="tableLoading" :data="tableData" @selection-change="handleSelectionChange"
                style="width: 100%">
        <!-- <el-table-column prop="issuesTitle" show-overflow-tooltip label="议题标题"></el-table-column> -->
        <el-table-column show-overflow-tooltip label="议题标题" width="200" >
          <template slot-scope="scope">
            <a class="projectName"  @click="goView(scope.row.issuesId)">{{ scope.row.issuesTitle }}</a>
          </template>
      </el-table-column> 
        <el-table-column prop="applierName" label="发布人"></el-table-column>
        <el-table-column prop="applyDate" label="发布时间"></el-table-column>
        <el-table-column prop="canJoin" label="是否召集合伙人"></el-table-column>
        <el-table-column prop="partnerNum" label="限制最大合伙人数">
          <template slot-scope="scope">
          <span v-if="scope.row.canJoin == '否'"></span>
          <span v-else>{{ scope.row.partnerNum }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="followCount" label="关注人数"></el-table-column>
        
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-tooltip class="item" content="详情" placement="top" popper-class="testtooltip">
              <i class="table-btn icon-xiangqing iconfont" @click="goView(scope.row.issuesId)"></i>
            </el-tooltip>
            <el-tooltip class="item" content="申请成为合伙人" placement="top" popper-class="testtooltip" v-if="scope.row.canJoin=='是'">
                <i class="table-btn el-icon-place" @click="goApplyShowDialog(scope.row)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
            :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
            :total="pageParam.total" style="text-align: right; margin-top: 10px">
      </el-pagination>
      <innovateApply :visible="visible" @closeModel="closeModel" @goApply='goApply' :showItem="currentPro"></innovateApply>
    </div>
  </template>
  
<script>
import {
  issuesList,joinPartner
} from '@/assets/api/innovate/index'
import innovateApply from "@/components/innovate/innovateApplyDialog.vue";
  export default {
    name: "myInnovate",
    components:{innovateApply},
    data(){
      return {
        visible: false,
        //表单查询
        form: {
          issuesTitle:"",
        },
        //分页
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        //列表数据
        tableLoading: false,
        tableData: [],
        currentPro:{}
      }
    },
    created() {
      this.queryApprovalApply()
    },
    methods: {
      //查询
      async queryApprovalApply() {
        this.tableLoading = true
        let param={
          "pageNum": this.pageParam.pageNum,
          "pageSize": this.pageParam.pageSize,
          "reqParam": {
            "selType": "02",
            "issuesTitle": this.form.issuesTitle
          }
        }
        const res = await issuesList({
          ...param
        })
        
        if (res.rspCode='0000') {
          if(res.rspBody.list && res.rspBody.list.length>0){
            this.tableLoading = false
            this.tableData = res.rspBody.list
            this.pageParam.total = res.rspBody.total
          }else {
            this.tableData = []
            this.tableLoading = false
            this.pageParam.total=0
          }
        }else{
          this.tableLoading = false
          this.$message.error(res.rspDesc)
        }
      },
      //多选
      handleSelectionChange(val) {
        this.selectList = val
      },
      //查询还原页数
      queryApply(){
        this.pageParam.pageNum=1;
        this.queryApprovalApply()
      },
      
      //查看
      goView(id) {
        this.$router.push(`/innovate/detail?issuesId=${id}`)
        // this.$router.push('/approval/application')
      },
      goApplyShowDialog(item){
        this.currentPro=item
        this.visible=true
      },
      async goApply(content){
        
        let param={
          "issuesId": this.currentPro.issuesId,
          "joinReason": content
        }
        const res = await joinPartner({
          ...param
        })
        if(res.rspCode=='0000'){
          this.$message.success("提交申请成功");
          this.visible=false
        }else{
          this.$message.error(res.rspDesc)
        }
      },
      //分页
      handleCurrentChange(val) {
        this.pageParam.pageNum = val
        this.queryApprovalApply()
      },
      handleSizeChange(val) {
        this.pageParam.pageSize = val
        this.queryApprovalApply()
      },
      closeModel(){
        this.visible=false
      },
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .myInnovate-page {
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
    .projectName{
      color: #3377FF;
      cursor: pointer;
    }
  }
  </style>
