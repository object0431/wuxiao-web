<template>
    <div class="dateSet-page">
      <div class="head-title">市级成果申请截止时间</div>
      <div class="operation">
        <el-button class="mainRedButton" @click="goAdd">新增</el-button>
        <el-button class="minorRedButton" @click="delMark">删除</el-button>
      </div>
  
      <!-- 表格区域 -->
      <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed="left">
        </el-table-column>
        <el-table-column prop="attrValue" label="日期">
            <template slot-scope="scope">
                <span>{{ scope.row.attrValue}}日</span>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="updateTime" label="更新时间"></el-table-column> -->
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
                class="item"
                content="修改"
                placement="top"
                popper-class="testtooltip"
            >
              <i
                  class="table-btn icon-bianji iconfont"
                  @click="goEdit(scope.row)"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
  
      <!--新增标识维护-->
      <el-dialog title="新增日期"
                 :visible.sync="addFormVisible"
                 width="600px"
                 @close="closeModel"
                 :close-on-click-modal="false"
                 :destroy-on-close="true">
        <el-form :model="addForm" label-position="left" label-width="80px" ref="addForm"  class="form">
          <el-form-item label="选择日期">
          </el-form-item>
          <div class="dataModel">
            <div v-for="(item,index) in dateList" :key="index" :class="[item.code==temp ? 'isActive' : '','dateItem']" @click="tempDate(item.code)">{{ item.code }}</div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
          <el-button class="mainRedButton_copy" @click="submit('addForm')">提交</el-button>
        </div>
      </el-dialog>
  
      <!--修改标识维护对话框-->
      <el-dialog title="修改名称"
                 :visible.sync="editFromVisible"
                 width="430px"
                 :close-on-click-modal="false"
                 :destroy-on-close="true">
        <el-form :model="editForm" label-position="left" label-width="80px" ref="editForm" :rules="rule" class="form">
          <el-form-item label="选择日期">
          </el-form-item>
          <div class="dataModel">
            <div v-for="(item,index) in dateList" :key="index" :class="[item.code==temp ? 'isActive' : '','dateItem']" @click="tempDate(item.code)">{{ item.code }}</div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="minorGrayButton_copy" @click="closeDialog">取消</el-button>
          <el-button class="mainRedButton_copy" @click="submit('editForm')">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
//   import {querySign, saveSign, delSign, editSign, queryExtCode, editSort} from "@/assets/api/dataMaintenance/mark";
import {addParam,qryParamList,changeParam,deleteParam} from "@/assets/api/common/index";

  export default {
    data() {
      return {
        //表单查询
        form: {
          paramType: 'DEADLINE',
          attrValue: 'CITY'
        },
        //列表数据
        tableLoading: false,
        tableData: [],
        selectList: [],
        temp:"",
        dateList: [],
        //新增对话框
        addFormVisible: false,
        addForm: {
          month: '',
        },
        rule: {
          attrValue: [{
            required: true, message: "请输入名称"
          }],
          period: [{required: true, message: "请输入学时"}]
        },
        //修改对话框
        editFromVisible: false,
        editForm: {
            month: '',
            attrCode:"",
            attrType:"",
        }
      }
    },
    created() {
      this.queryMark();
      let list=[]
      for(let i=1;i<32;i++){
        list.push({code:i,value:i+"日"})
      }
      this.dateList=[...list]
    },
    methods: {     
      async queryMark() {
        const res = await qryParamList({
            "attrType": this.form.paramType,
            "attrCode":this.form.attrValue,
        });
        if (res.rspCode == "0000") {
            
          this.tableLoading = false;
          this.tableData = res.rspBody;
        } else {
          this.tableLoading = false;
          this.$message.error(res.rspDesc);
        }
      },
      async goAdd() {
        if(this.tableData.length>0){
            this.$message.error("只能新增一条数据！");
            return;
        }
        this.addFormVisible = true
      },
      async goEdit(data) {
        this.editFromVisible = true
        
        this.temp = data.attrValue
        this.editForm.attrCode=data.attrCode
        this.editForm.attrType=data.attrType
      },
      async delMark() {
        if (this.selectList.length == 0) {
          return this.$message.error("请选择至少一条数据");
        }
        this.$confirm(
            `确定删除吗？`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
        ).then(async () => {
          let arr = []
          this.selectList.map((item) => {
            arr.push(item.attrCode);
          });
          
          const res = await deleteParam(this.form.paramType,arr);
          if (res.rspCode == "0000") {
            this.$message.success(res.rspDesc);
            this.queryMark();
          } else {
            this.$message.error(res.rspDesc);
          }
        }).catch(()=>{

        })
  
      },
      closeModel() {
        this.$refs['addForm'].resetFields()
        this.$refs['editForm'].resetFields()
        this.addFormVisible = false;
        this.temp=""
      },
      submit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (formName == "addForm") {
              if(!this.temp){
                this.$message.error('请选择日期');
                return
              }
              this.addForm.month=this.temp
              this.saveMark()
            } else if (formName == "editForm") {
              if(!this.temp){
                this.$message.error('请选择日期');
                return
              }
              this.editForm.month=this.temp
              this.editMark()
            } else {
              return false;
            }
          } else {
            return false;
          }
        })
      },
      tempDate(data){
        this.temp=data
      },
      //新增提交
      async saveMark() {
        let param={
            "attrType":this.form.paramType,
            "attrCode":this.form.attrValue,
            "attrValue": this.addForm.month,
            "attrDesc": "地市成果申请每月截止日期"
        }
        const res = await addParam(param);
        if (res.rspCode == "0000") {
          this.$message.success(res.rspDesc);
          this.queryMark();
          this.addFormVisible = false
          this.addForm.month=""
        } else {
          this.$message.error(res.rspDesc);
        }
      },
      closeDialog() {
        this.$refs['editForm'].resetFields()
        this.editFromVisible = false
      },
      //修改提交
      async editMark() {
        
        let param={
            "attrCode": this.editForm.attrCode,
            "attrType": this.editForm.attrType,
            "attrValue": this.editForm.month
        }
        const res = await changeParam(param);
        if (res.rspCode == "0000") {
          this.$message.success(res.rspDesc);
          this.queryMark();
          this.editFromVisible = false
        } else {
          this.$message.error(res.rspDesc);
        }
      },
      handleSelectionChange(val) {
        this.selectList = val;
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .dateSet-page {
    background: #fff;
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
    .dataModel{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .dateItem{
      height: 50px;
      border: 1px solid #eee;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
    }
    // .dateItem:hover{
    //   background: rgb(160, 193, 182);
    // }
    .isActive{
      background: #f2f8fe;
      color: #1989fa;
    }
  }
  </style>