<template>
  <div class="achieveCalculate-page">
      <div class="head-title">成果统计查询</div>
      <div class="query">
          <el-form :model="form" label-position="right" label-width="90px">
              <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
              <el-row :gutter="16">
                  <el-col :span="8">
                      <el-form-item label="申请人公司" prop="applyCompany">
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
                      <el-form-item label="部门" prop="applyDepart">
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
                    <el-form-item label="统计类型" prop="type">
                      <el-select v-model="form.type" placeholder="请选择">
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
                    <el-form-item label="时间" prop="yxq">
                      <el-date-picker v-model="form.startDate" type="daterange" value-format="yyyyMMdd" start-placeholder="开始日期"
                        end-placeholder="结束日期" style="width: 100%">
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
          <el-table-column prop="statType" :label="tableLabel"></el-table-column>
          <el-table-column prop="initNum" label="立项数"></el-table-column>
          <el-table-column prop="acheTotal" label="成果数"></el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
          :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
          :total="pageParam.total" style="text-align: right; margin-top: 10px">
      </el-pagination>
  </div>
</template>

<script>
import {
  exportProjectClassification,
  projectClassification,
} from '@/assets/api/countryProject/index'
import {  qryAllOrg } from "@/assets/api/rolemanage/index";
import {exportBlobFile} from "@/utils/common";
export default {
  name:"projectClassification",
  data() {
      return {
          visible: false,
          //表单查询
          form: {
              "startDate": [],
              "applierCompanyId": "",
              "applierDeptId": "",
              "applierId": "",
              "type":'CXLX'
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
          tableLabel:'创新类型',
          options:[{label:'创新类型',value:"CXLX"},{label:'项目类型',value:"XMLX"}]
      }
  },
  created() {
      const date = new Date(); // 创建一个表示当前时间的Date对象
      const year = String(date.getFullYear()) // 获取年份并只保留最后两位
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份并补零到两位
      const day = date.getDate().toString().padStart(2, '0'); // 获取天数并补零到两位
      var month2 = parseInt(month)-1;
      var year2 = year;
      if(month2==0) {
          year2 = parseInt(year2)-1;
          month2 = 12;
      }
      var day2 = day;
      var days2 = new Date(year2,month2,0);
      days2 = days2.getDate();
      if(day2>days2) {
          day2 = days2;
      }
      if(month2<10) {
          month2 = '0'+month2;
      }
      var yyyymmdd = year + "" + month + "" + day;  //拼接成yyyymmdd形式字符串
      var yyyymmdd2 = year2 + "" + month2 + "" + day2;  //拼接成yyyymmdd形式字符串
      console.log(yyyymmdd,yyyymmdd2)
      let arr = []
      arr.push(yyyymmdd2)
      arr.push(yyyymmdd)
      this.form.startDate = arr
      this.queryApprovalApply()
      this.qryAllOrg();
  },
  methods: {
      async exportFile() {
          let reqParam = {
              startDate: this.form.startDate[0],
              endDate: this.form.startDate[1],
              type: this.form.type,
              companyId: this.form.applierCompanyId,
              deptId: this.form.applierDeptId
        }
        let param = []
        Object.keys(reqParam).forEach(key=>{
            if(reqParam[key]){
              param.push(`${key}=${reqParam[key]}`)
            }
        })
        const res = await exportProjectClassification(param.join('&'));
        exportBlobFile(res, '成果统计数据导出.xlsx')
      },
      //查询
      async queryApprovalApply() {
          this.tableLoading = true
          this.tableLabel = '创新类型'
          if (this.form.type === 'XMLX') {
            this.tableLabel = '项目类型'
          }
          let param={
              "pageNum": this.pageParam.pageNum,
              "pageSize": this.pageParam.pageSize,
              "reqParam": {startDate:this.form.startDate[0],endDate:this.form.startDate[1],type:this.form.type,companyId:this.form.applierCompanyId,deptId:this.form.applierDeptId}
          }
          const res = await projectClassification({
              ...param
          })
          // if (res.rspCode=='0000') {
              if(res){
                  this.tableLoading = false
                  this.tableData = res.list
                  this.pageParam.total = res.total
              }
          // } else {
          //     this.tableLoading = false
          //     this.tableData = []
          // }
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
