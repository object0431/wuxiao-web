<template>
  <div class="treeSelectMore">
    <el-dialog
      :title="title"
      width="800px"
      :visible="visible"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeModel"
      @open="openModel"
      ref="treeSelectMore"
      append-to-body
      class="treeSelectMore-dialog"
    >
      <el-container style="height: 470px">
        <div class="side">
          <el-form
            :model="form"
            label-position="right"
            label-width="60px"
            ref="form"
          >
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="公司" prop="orgCode">
                  <el-select v-model="form.orgCode" @change="changeOrg" filterable clearable>
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
                <el-form-item label="部门" prop="deptCode">
                  <el-select v-model="form.deptCode" filterable clearable>
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
                <el-form-item label="姓名" prop="staffName">
                  <el-input
                    v-model="form.staffName"
                    clearable
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话" prop="serialNumber">
                  <el-input
                    v-model="form.serialNumber"
                    clearable
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="" label-width="0">
                  <el-button class="minorRedButton" @click="qryAllStaff"
                    >查询</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- 多选表格区域 -->
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            @selection-change="handleSelectionChange"
            v-if="multiple"
            :row-key="getRowKeys"
            ref="multipleTable"
          >
            <el-table-column
              type="selection"
              width="55"
              fixed="left"
              :reserve-selection="true"
            >
            </el-table-column>
            <el-table-column prop="deptName" label="部门" width="225">
            </el-table-column>
            <el-table-column prop="displayName" label="姓名"> </el-table-column>
            <el-table-column prop="mobileTel" label="电话"> </el-table-column>
          </el-table>

          <!-- 单选表格区域 -->
          <el-table v-loading="tableLoading" :data="tableData" v-else>
            <el-table-column label="单选" width="55" fixed="left">
              <template slot-scope="scope">
                <el-radio v-model="singleSelect" :label="scope.row">{{
                  ""
                }}</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="deptName" label="部门" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="displayName" label="姓名"> </el-table-column>
            <el-table-column prop="mobileTel" label="电话"> </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="pageParam.pageNum"
            :page-size="pageParam.pageSize"
            :page-sizes="[5]"
            layout="prev, pager, next, sizes, total"
            :total="pageParam.total"
            style="text-align: right; margin-top: 10px"
          >
          </el-pagination>
        </div>
        <div class="main" v-if="multiple">
          <div
            class="main-item"
            v-for="(item) in selectList"
            :key="item.code"
          >
            <span>{{ item.name }}</span>
            <!-- <i class="el-icon-close" @click="cancelPerson(i,item)"></i> -->
          </div>
        </div>
        <div class="main" v-if="!multiple ">
          <div class="main-item">
            <span>{{ singleSelect.name || '请选择人员' }}</span>
            <!-- <i class="el-icon-close" @click="cancelPerson(i)"></i> -->
          </div>
        </div>
      </el-container>
      <span slot="footer">
        <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
        <el-button
          class="mainRedButton_copy"
          @click="submitPerson"
          :loading="loading"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { qryAllOrg, qryAllStaff } from "@/assets/api/common/index";
export default {
  name: "treeSelectMore",
  props: {
    title: { type: String },
    visible: { type: Boolean },
    state: { type: String },
    multiple: { type: Boolean, default: true },
  },
  data() {
    return {
      form: {},
      tableData: [],
      /*rule: {
        orgCode: [{ required: true, message: "请选择公司" }],
      },*/
      tableLoading: false,
      //分页
      pageParam: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      selectList: [], // 多选选中
      singleSelect: [], //单选选中
      loading: false,
      allOrgList: [],
      deptList: [],
    };
  },
  watch: {
    state(v) {
      if (v == "success") {
        this.loading = false;
        this.closeModel();
      }
    },
  },
  methods: {
    getRowKeys(row) {
      return row.mainUserId;
    },
    //查询公司
    async qryAllOrg() {
      const req={
        queryType:'company'
      }
      if(this.title=='培训立项选择讲师'){
        req.userGroupFlag='1'
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
    //查询人员
    qryAllStaff() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.tableLoading = true;
          const res = await qryAllStaff({
            pageNum: this.pageParam.pageNum,
            pageSize: this.pageParam.pageSize,
            reqParam:this.form,
          });
          if (res.rspCode == "0000") {
            this.tableLoading = false;
            this.tableData = res.rspBody.list;
            this.pageParam.total = res.rspBody.total;
          }
        } else {
          return false;
        }
      });
    },
    openModel() {
      this.qryAllOrg();
    },
    //多选
    handleSelectionChange(list) {
      /* list.map(item=>{
        if(this.selectList.some(item1=>item1.code==item.code)){
          return this.$message.warning('请勿重新添加人员')
        }else{
          this.selectList.push(item)
        }
      }) */
      this.selectList = list;
    },
    //删除人员
    cancelPerson(i,item) {
      // this.selectList.splice(i, 1);
      // 
      // this.$forceUpdate()
      this.selectList.forEach((item1,index)=>{
        if(item1.code === item.code){
          this.selectList.splice(index,1)
          this.$nextTick(()=>{
            this.$refs.multipleTable.toggleRowSelection(item1);
          })
        }
      })

    },
    //提交
    submitPerson() {
      if (this.multiple) {
        this.loading = true;
        this.$emit("selectSubmit", this.selectList);
      } else {
        this.$emit("selectSubmit", [this.singleSelect]);
      }
    },
    //分页
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.qryAllStaff();
    },
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.qryAllStaff();
    },
    //关闭弹窗
    closeModel() {
      this.selectList = [];
      this.singleSelect = "";
      this.loading = false;
      this.$emit("closeModel");
    },
  },
};
</script>

<style lang="scss">
.treeSelectMore-dialog {
  .side {
    padding: 10px;
    box-sizing: border-box;
    width: 700px;
    max-height: 470px;
    overflow: auto;
    overflow-x: hidden;
    border-right: 1px solid rgba(233, 233, 233, 1);
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: center;
    justify-content: center;
    width: calc(100% - 650px);
    box-sizing: border-box;
    overflow: auto;
    .main-item {
      box-sizing: border-box;
      width: 80px;
      height: 20px;
      background: #f2f2f2;
      border-radius: 2px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      line-height: 20px;
      margin: 5px 0;
      overflow: hidden;
    }
  }
}
</style>