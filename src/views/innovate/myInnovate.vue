<template>
  <div class="myInnovate-page">
    <div class="head-title">我的创新议题</div>
    <div class="query">
      <el-form :model="form" label-position="right" label-width="90px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="标题" prop="issuesTitle">
              <el-input v-model="form.issuesTitle" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="selfSelType">
              <el-select v-model="form.selfSelType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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

    <div class="operation">
      <el-button class="mainRedButton" @click="goAdd">新增创新议题</el-button>
      <!-- <el-button class="minorRedButton" @click="deletePersonalTrainingApply">删除</el-button> -->
    </div>

    <!-- 表格区域 -->
    <el-table v-loading="tableLoading" :data="tableData" @selection-change="handleSelectionChange"
              style="width: 100%">
      <!-- <el-table-column type="selection" width="55" fixed="left"></el-table-column> -->
      <!-- <el-table-column prop="issuesTitle" show-overflow-tooltip label="议题标题"></el-table-column> -->
      <el-table-column show-overflow-tooltip label="议题标题"  >
        <template slot-scope="scope">
          <a class="projectName"  @click="goView(scope.row.issuesId)">{{ scope.row.issuesTitle }}</a>
        </template>
      </el-table-column>  
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
          <el-tooltip class="item" content="编辑" placement="top" popper-class="testtooltip" v-if="flag">
            <i class="table-btn icon-bianji iconfont" @click="goEdit(scope.row.issuesId)"></i>
          </el-tooltip>
          <el-tooltip class="item" content="删除" placement="top" popper-class="testtooltip" v-if="flag">
            <i style="font-size: 18px" class="el-icon-delete table-btn" @click="deleteProject(scope.row.issuesId)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
                    :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
                    :total="pageParam.total" style="text-align: right; margin-top: 10px">
    </el-pagination>
  </div>
</template>
  
<script>
import {
  issuesList,
  delIssues,
} from '@/assets/api/innovate/index'
export default {
  name: "myInnovate",
  data(){
    return {
      visible: false,
      //表单查询
      form: {
        issuesTitle:"",
        selfSelType:'01'
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
      options:[{
          value: '01',
          label: '我发布的'
        }, {
          value: '02',
          label: '我参与的'
        }, {
          value: '03',
          label: '我关注的'
        } ],
      flag:true,
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
          "selType": "01",
          "issuesTitle": this.form.issuesTitle,
          "selfSelType":this.form.selfSelType
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
          if(this.form.selfSelType!='01'){
            this.flag=false
          }else{
            this.flag=true
          }
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
    //删除
    deleteProject(id){
      
      this.$confirm(
        `确认删除该项目吗？`,
        "确认信息",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
         let res = await delIssues({issuesId:id})
          
          if (res.rspCode=='0000' && res.rspBody.respCode=='0000'){
            this.$message.success("删除成功");
            await this.queryApprovalApply()
          }else{
            this.$message.error("删除失败"+res.rspBody.respMsg,);
          }
      })
    },
    
    //查看
    goView(id) {
      this.$router.push(`/innovate/detail?issuesId=${id}`)
      // this.$router.push('/approval/application')
    },
    //编辑
    goEdit(id) {
      this.$router.push(`/innovate/apply?issuesId=${id}&type=edit`)
    },
    //新增
    goAdd() {
      this.$router.push('/innovate/apply')
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
