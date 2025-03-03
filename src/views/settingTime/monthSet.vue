<template>
    <div class="monthSet-page">
      <div class="head-title">省份成果申请截止时间</div>
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
        <el-table-column prop="attrValue" label="月份">
            <template slot-scope="scope">
                <span>{{ scope.row.attrValue}}月</span>
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
      <el-dialog title="新增月份"
                 :visible.sync="addFormVisible"
                 width="430px"
                 @close="closeModel"
                 :close-on-click-modal="false"
                 :destroy-on-close="true">
        <el-form :model="addForm" label-position="left" label-width="80px" ref="addForm"  class="form">
          <el-form-item label="选择月份" :rules="{
                required: true,
                message: '请选择月份',
                trigger: 'blur',
            }">
            <el-select
                v-model="addForm.month"
                placeholder="请选择"
            >
              <el-option
                  v-for="item in monthList"
                  :key="item.code"
                  :label="item.value"
                  :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
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
            <el-form-item label="选择月份" :rules="{
                required: true,
                message: '请选择月份',
                trigger: 'blur',
            }">
            <el-select
                v-model="editForm.month"
                placeholder="请选择"
            >
              <el-option
                  v-for="item in monthList"
                  :key="item.code"
                  :label="item.value"
                  :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="minorGrayButton_copy" @click="closeDialog">取消</el-button>
          <el-button class="mainRedButton_copy" @click="submit('editForm')">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
import {addParam,qryParamList,changeParam,deleteParam} from "@/assets/api/common/index";

  export default {
    data() {
      return {
        //表单查询
        form: {
          paramType: 'DEADLINE',
          attrValue: 'PROVINCE'
        },
        //列表数据
        tableLoading: false,
        tableData: [],
        selectList: [],
        monthList: [],
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
        },
      }
    },
    created() {
      this.queryMark();
      let list=[]
      for(let i=1;i<13;i++){
        list.push({code:i,value:i+"月"})
      }
      this.monthList=[...list]
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
            this.$message.error("月份最多只能设置一条数据！不能再新增了！");
            return;
        }
        this.addFormVisible = true
      },
      async goEdit(data) {
        this.editFromVisible = true
        
        this.editForm.month = parseInt(data.attrValue)
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
        this.addFormVisible = false;
      },
      submit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (formName == "addForm") {
              this.saveMark()
            } else if (formName == "editForm") {
              this.editMark()
            } else {
              return false;
            }
          } else {
            return false;
          }
        })
      },
      //新增提交
      async saveMark() {
        let param={
            "attrType":this.form.paramType,
            "attrValue": this.addForm.month,
            "attrCode":this.form.attrValue,
            "attrDesc": "省成果申请 月份前截止"
        }
        const res = await addParam(param);
        if (res.rspCode == "0000") {
          this.$message.success(res.rspDesc);
          this.queryMark();
          this.addFormVisible = false
          this.addForm.month=''
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
  .monthSet-page {
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
  }
  </style>