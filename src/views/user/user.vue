<template>
  <div class="achieveCalculate-page">
    <div class="head-title">用户查询</div>
    <div class="query">
      <el-form :model="form" label-position="right" label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户ID" prop="mainUserId">
              <el-input
                v-model="queryParams.reqParam.mainUserId"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户姓名" prop="empName">
              <el-input
                v-model="queryParams.reqParam.empName"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="90px">
              <el-button class="minorRedButton" @click="getList"
                >查询</el-button
              >
              <el-button class="minorRedButton" @click="exportFile"
                >导出</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <el-table v-loading="tableLoading" :data="tableData" style="width: 100%">
      <el-table-column prop="mainUserId" label="用户ID"></el-table-column>
      <el-table-column prop="empName" label="用户姓名"></el-table-column>
      <el-table-column prop="companyName" label="公司"></el-table-column>
      <el-table-column prop="deptName" label="部门"></el-table-column>
      <el-table-column prop="mainPosition" label="职位"></el-table-column>
      <el-table-column prop="mobileTel" label="联系电话"></el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="queryParams.pageNum"
      :page-size="queryParams.pageSize"
      layout="prev, pager, next,sizes, total"
      :total="total"
      style="text-align: right; margin-top: 10px"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserList } from "@/assets/api/system/user";
export default {
  name: "userInfo",
  data() {
    return {
      //表单查询
      form: {
        mainUserId: undefined,
        empName: undefined,
        companyName: undefined,
        deptName: undefined,
        mainPosition: undefined,
        mobileTel: undefined,
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        reqParam: {
          mainUserId: undefined,
          empName: undefined,
        },
      },
      // 总条数
      total: 0,
      //列表数据
      tableLoading: false,
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.tableLoading = true;
      getUserList(this.queryParams).then((response) => {
        this.tableLoading = false;
        this.tableData = response.rspBody.list;
        this.total = response.rspBody.total;
      });
    },
    //分页
    handleCurrentChange(val) {
      this.queryParams.pageNum = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getList();
    },
    exportFile() {},
  },
};
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
