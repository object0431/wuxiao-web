<template>
  <div class="achieveCalculate-page">
      <div class="head-title">登录统计查询</div>
      <div class="query">
          <el-form :model="form" label-position="right" label-width="90px">
              <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
              <el-row :gutter="16">
                  <el-col :span="8">
                      <el-form-item label="公司" prop="applyCompany">
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
                      <el-form-item label="部门" prop="applyDepart">
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
                  <el-col :span="8">
                    <el-form-item label="时间" prop="startDate">
                      <el-date-picker v-model="form.startDate" type="month" value-format="yyyyMM" style="width: 100%">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="" label-width="90px">
                          <el-button class="minorRedButton" @click="queryApprovalApply">查询</el-button>
                          <el-button class="minorRedButton" @click="exportFile">导出</el-button>
                      </el-form-item>
                  </el-col>

              </el-row>
          </el-form>
      </div>


      <!-- 表格区域 -->
      <el-table v-loading="tableLoading" :data="tableData"
          style="width: 100%">
          <!-- <el-table-column prop="applierName" show-overflow-tooltip label="申请人"></el-table-column>           -->
          <el-table-column prop="companyName" label="公司"></el-table-column>
          <el-table-column prop="deptName" label="部门"></el-table-column>
          <el-table-column prop="loginNum" label="登录数"></el-table-column>
          <el-table-column prop="initiateNum" label="立项数"></el-table-column>
          <el-table-column prop="achievementNum" label="成果数"></el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
          :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
          :total="pageParam.total" style="text-align: right; margin-top: 10px">
      </el-pagination>
  </div>
</template>

<script>
import {
  exportLoginStatistics, exportProjectClassification,
  loginStatistics,
} from '@/assets/api/countryProject/index'
import {  qryAllOrg } from "@/assets/api/rolemanage/index";
import {exportBlobFile} from "@/utils/common";
export default {
  name:"allDataShow",
  data() {
      return {
          visible: false,
          //表单查询
          form: {
              "companyId": "",
              "deptId": "",
              "startDate": [],
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
          selectList: [],
          programList:[],
          cateList:[],
          allOrgList:[],
          deptList:[],
          currentProjectId:"",
      }
  },
  created() {
      const date = new Date(); // 创建一个表示当前时间的Date对象
      const year = String(date.getFullYear()) // 获取年份并只保留最后两位
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份并补零到两位
      var yyyymmdd = year + "" + month ;  //拼接成yyyymmdd形式字符串
      this.form.startDate = yyyymmdd
      this.queryApprovalApply()
      this.qryAllOrg();
  },
  methods: {
      async exportFile() {
          let reqParam = {
              startDate: this.form.startDate,
              companyId: this.form.companyId,
              deptId: this.form.deptId
          }
          let param = []
          Object.keys(reqParam).forEach(key => {
              if (reqParam[key]) {
                  param.push(`${key}=${reqParam[key]}`)
              }
          })
          const res = await exportLoginStatistics(param.join('&'));
          exportBlobFile(res, '登录统计数据导出.xlsx')
      },
      //查询
      async queryApprovalApply() {
            this.tableLoading = true
            let param={
                "pageNum": this.pageParam.pageNum,
                "pageSize": this.pageParam.pageSize,
                "reqParam": {startDate:this.form.startDate,
                    "companyId": this.form.companyId,
                    "deptId": this.form.deptId}
            }
            const res = await loginStatistics({
                ...param
            })
            if(res){
                this.tableLoading = false
                this.tableData = res.list
                this.pageParam.total = res.total
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
  }
}
</script>

<style lang="scss" scoped>
.achieveCalculate-page {
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
