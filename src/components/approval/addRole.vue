<template>
    <div class="addUserGroup-page">
      <el-dialog title="添加人员" width="800px" :visible="visible" destroy-on-close :close-on-click-modal="false"
                 @open="openModal" @close="closeModel" ref="addUserGroup-page">
        <el-container>
          <div class="side">
            <el-form :model="queryform" :rules="rules" label-position="right" label-width="60px" ref="queryform">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="deptCode"  label="部门">
                    <el-select v-model="queryform.deptCode" placeholder="请选择部门" clearable filterable>
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
                  <el-form-item prop="staffName"  label="姓名">
                    <el-input v-model="queryform.staffName" placeholder="输入姓名"></el-input>
                  </el-form-item>
                </el-col>
  
                <el-col :span="8">
                  <el-form-item prop=""  label="">
                    <el-button class="minorRedButton" @click="qryAll">查询</el-button>
                  </el-form-item>
                </el-col>
  
              </el-row>
            </el-form>
            <!-- 多选表格区域 @selection-change="handleSelectionChange"-->
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                @selection-change="handleSelectionChange"
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
              <el-table-column prop="deptName" label="部门名称"></el-table-column>
              <el-table-column prop="staffName" label="姓名"> </el-table-column>
              <el-table-column prop="mobileTel" label="手机号码"> </el-table-column>
  
            </el-table>
  
            <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
                           :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
                           :total="pageParam.total" style="text-align: right; margin-top: 10px">
            </el-pagination>
  
          </div>
          <div class="main" v-if="selectList.length!==0 ">
            <div
                class="main-item"
                v-for="(item) in selectList"
                :key="item.mainUserId"
            >
              <span>{{ item.staffName }}</span>
            </div>
          </div>
          <div class="main" v-if="selectList.length===0 ">
            <div class="main-item">
              <span>请选择人员</span>
              <!-- <i class="el-icon-close" @click="cancelPerson(i)"></i> -->
            </div>
          </div>
        </el-container>
  
  
        <span slot="footer">
                  <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
                  <el-button class="mainRedButton_copy" @click="submitForm">确定</el-button>
              </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  
  import {  queryStaffByPage,qryAllOrg } from "@/assets/api/rolemanage/index";
  
  export default {
    props: {
      orgCode: {
        type: String,
        default: "",
      },
      // deptCode:{
      //   type: String,
      //   default: "",
      // },
      visible: {
        type: Boolean,
        default: false,
      },
      index:{
        type:Number,
        default:-1
      }
    },
    data() {
      return {
        form: {
          groupName: '',
          groupType: '1',
          refType:"YG",
          groupId:''
        },
        queryform:{
          deptCode:"",
          staffName:"",
        },
        pageParam:{
          pageNum:1,
          pageSize:20,
          total:0,
        },
        tableLoading:false,
        rules: {
          groupName: [{ required: true, message: "请输入用户组名称" }],
        },
        deptList:[],
        tableData:[],
        selectList:[]
      };
    },
    created() {
    },
    methods: {
      async qryAll(){
        this.queryStaffByPage()
      },
      //查询部门
      async queryDept() {
        const res = await qryAllOrg({
          queryType:"dept",
          queryKeywords: this.$props.orgCode,
        });
        if (res.rspCode === "0000") {
          this.deptList = res.rspBody;
          //this.queryform.deptCode=this.deptCode
          this.tableLoading = false;
        }
      },
      //查询人员
      queryStaffByPage() {
        this.$refs["queryform"].validate(async (valid) => {
          if (valid) {
            const res = await queryStaffByPage({
              reqParam:{...this.queryform,orgCode:this.$props.orgCode,},
              pageNum: this.pageParam.pageNum,
              pageSize: this.pageParam.pageSize,
            });
            if (res.rspCode === "0000") {
              this.tableLoading = false;
              this.tableData = res.rspBody.list
              this.pageParam.total = res.rspBody.total;
            }
          } else {
            return false;
          }
        });
      },
      //打开弹窗
      async openModal() {
        this.queryDept()
      },
      getRowKeys(row){
        return row.mainUserId;
      },
      //校验
      submitForm() {
        this.$emit("closeAddModel",this.selectList)
      },
      //关闭主弹窗
      closeModel() {
        this.form={
          groupName: '',
          groupType: '1',
          refType:"BM",
          groupId:""
        }
        this.queryform={
          deptCode:"",
          staffName: ""
        }
        this.tableData=[]
        this.selectList=[]
        this.pageParam.total=0
        this.$emit("close")
      },
      //多选
      handleSelectionChange(val){
        this.selectList = val;
      },
      //分页
      handleCurrentChange(val) {
        this.pageParam.pageNum= val;
        this.queryStaffByPage();
      },
      handleSizeChange(val) {
        this.pageParam.pageSize = val;
        this.queryStaffByPage();
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .addUserGroup-page {
    .side {
      padding: 10px;
      box-sizing: border-box;
      width: 600px;
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
      width: calc(100% - 550px);
      box-sizing: border-box;
      height: 470px;
      overflow-y: scroll;
      .main-item {
        box-sizing: border-box;
        width: 130px;
        height: 40px;
        background: #f2f2f2;
        border-radius: 2px;
        /*
              font-family: PingFangSC-Regular;
        */
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