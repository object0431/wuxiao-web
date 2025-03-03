<template>
    <div class="tranferPeople-dialog">
      <el-dialog
        :visible="visible"
        title="选择转发人员"
        width="800px"
        destroy-on-close
        :close-on-click-modal="false"
        @open="openModal"
        @close="closeModel"
      >
      <div class="topSelect">
        <div :class="showType=='ZJ'?'isChoose':''" @click="editType('ZJ')">专家人才</div>
        <div :class="showType=='LD'?'isChoose':''" @click="editType('LD')">部门领导</div>
      </div>
        <el-form
          :model="form"
          label-position="right"
          label-width="70px"
          ref="form"
          class="form"
          v-if="showType=='ZJ'"
        >
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="人员名称" prop="staffName">
                <el-input placeholder="请输入" v-model="form.staffName" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="" label-width="0">
                <el-button class="minorRedButton" @click="qryAll"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
            :model="form"
            label-position="right"
            label-width="60px"
            ref="form"
            v-if="showType=='LD'"
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
        <!-- 表格区域 -->
         <el-table v-loading="tableLoading" :data="tableData" @current-change="handleCurrentRadio"  highlight-current-row
              style="width: 100%">
              <!-- <el-table-column type="selection" width="55" fixed="left"></el-table-column> -->
              <el-table-column prop="staffName" show-overflow-tooltip label="姓名"></el-table-column>
              <el-table-column prop="deptName" show-overflow-tooltip label="所属部门"></el-table-column>
          </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pageParam.pageNum"
          :page-size="pageParam.pageSize"
          layout="prev, pager, next,sizes, total"
          :total="pageParam.total"
          style="text-align: right; margin-top: 10px"
        >
        </el-pagination>
        <span slot="footer">
          <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
          <el-button class="mainRedButton_copy" @click="addPeople">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
    
  <script>
import {
    queryStaffRoleList
} from '@/assets/api/common/index'
import {  queryStaffByPage,qryAllOrg } from "@/assets/api/rolemanage/index";
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        //表单查询
        form: {
          staffName: "",
        },
        //分页
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
        tableData: [],
        tableLoading: false,
        selectList: [],
        showType:'ZJ',
        allOrgList:[],
        deptList:[]
      };
    },
    created() {
      
    },
    methods: {
      //确认添加
      addPeople() {
        let list={}
        if(this.showType=='ZJ'){
          list=this.selectList
        }else{
          list={
            roleId:"BMLD",
            staffId:this.selectList.mainUserId,
            staffName:this.selectList.staffName
          }
        }
        this.$emit('addPeople',list)
          
      },
      //选择专业方向
      changeZYFX(val) {
        this.form.majorType = "";
        if (val == "") return;
        // this.qryLinkType(val, "3");
      },
      //打开弹窗
      openModal() {
        this.qryAllOrg()
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
      qryAll(){
        this.pageParam={
          pageNum: 1,
          pageSize: 10,
          total: 0,
        }
        this.queryExpert()
      },
      //关闭弹窗
      closeModel() {
        this.$emit("closeModel");
      },
      //单选
      handleCurrentRadio(val) {
        this.selectList = val;
      },
      //分页
      handleCurrentChange(val) {
        this.pageParam.pageNum = val;
        if(this.showType=='ZJ'){
          this.queryExpert()
        }else{
          this.qryAllStaff()
        }
      },
      handleSizeChange(val) {
        this.pageParam.pageSize = val;
        if(this.showType=='ZJ'){
          this.queryExpert()
        }else{
          this.qryAllStaff()
        }
      },
       //查询人员
       qryAllStaff() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            this.tableLoading = true;
            const res = await queryStaffByPage({
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
      editType(name){
        this.showType=name
        this.tableData=[]
        this.pageParam={
          pageNum: 1,
          pageSize: 10,
          total: 0,
        }
      },
      async queryExpert(){
        const res = await queryStaffRoleList({ pageNum:this.pageParam.pageNum,
            pageSize:this.pageParam.pageSize,
            reqParam: {
              roleId:'ZJRC',
              staffName: this.form.staffName
            }});
            if (res.rspCode == "0000") {
                //赋值
                
                // if(value=="CXLX"){
                //     this.cateList = res.rspBody
                //     this.qryParamList("XMLX")
                // }else{
                    this.tableData = res.rspBody.list
                    this.pageParam.total=res.rspBody.total
                // }
                
            } else {
                this.$message.error(res.rspDesc);
            }
      }
    },
  };
  </script>
    
  <style lang="scss" scoped>
  .topSelect{
    display: flex;
  }
  .topSelect div{
    align-items: center;
    padding: 12px;
    cursor: pointer;
    flex: 1;
    text-align: center;
  }
  .topSelect .isChoose{
    color: #5991FF;
  }
  </style>
    
    