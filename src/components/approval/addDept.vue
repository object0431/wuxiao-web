<template>
    <div class="addUserGroup-page">
      <el-dialog title="添加部门" width="800px" :visible="visible" destroy-on-close :close-on-click-modal="false"
        @open="openModal" @close="closeModel" ref="addUserGroup-page">
        <el-form
          :model="form"
          label-position="right"
          label-width="70px"
          ref="form"
          class="form"
        >
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="部门名称" prop="deptName">
                <el-input placeholder="请输入" v-model="form.deptName" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="" label-width="0">
                <el-button class="minorRedButton"  @click="queryDept"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-container>
          <div class="side">
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
              <el-table-column prop="name" label="部门名称"></el-table-column>
  
            </el-table>
  
          </div>
          <div class="main" v-if="selectList.length!==0 ">
            <div
                class="main-item"
                v-for="(item) in selectList"
                :key="item.code"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="main" v-if="selectList.length===0 ">
            <div class="main-item">
              <span>请选择部门</span>
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
  
  import { qryAllOrg } from "@/assets/api/rolemanage/index";
  
  export default {
    props: {
      orgCode: {
        type: String,
        default: "",
      },
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
        pageParam:{
          pageNum:1,
          pageSize:20,
          total:0,
        },
        form:{
          deptName:""
        },
        tableLoading:true,
        deptList:[],
        tableData:[],
        selectList:[]
      };
    },
    created() {
    },
    methods: {
      //查询部门
      async queryDept() {
        const res = await qryAllOrg({
          queryType:"dept",
          queryKeywords: this.$props.orgCode,
          deptName:this.form.deptName
        });
        if (res.rspCode === "0000") {
          this.tableData = res.rspBody;
          //this.queryform.deptCode=this.deptCode
          this.tableLoading = false;
        }
      },
      //打开弹窗
      async openModal() {
        this.form.deptName=''
        this.queryDept()
      },
      //校验
      submitForm() {
        this.$emit("closeAddModelDept",this.selectList)
        this.tableData=[]
        this.pageParam.total=0
        this.selectList=[]
      },
      //关闭主弹窗
      closeModel() {
        this.tableData=[]
        this.selectList=[]
        this.pageParam.total=0
        this.$emit("close")
      },
      //多选
      handleSelectionChange(val){
        this.selectList = val;
      },
      getRowKeys(row){
        return row.code;
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