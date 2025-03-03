<template>
    <div class="power-page">
      <div class="head-title">{{ topTitle }}</div>
      <header>
        <el-form :model="form" label-position="right" label-width="90px">
          <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="成员名称" prop="orgName">
                  <el-input v-model="form.staffName" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人公司" prop="companyId">
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
                <el-form-item label="部门" prop="deptId">
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
            <el-col :span="8" v-if="topTitle == '省级评审委员会' || topTitle == '市级评审委员会'">
                <el-form-item label="专业线" prop="zyxCode">
                    <el-select v-model="form.zyxCode" filterable clearable>
                    <el-option
                        v-for="item in cateList"
                        :value="item.attrCode"
                        :label="item.attrValue"
                        :key="item.attrCode"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="" label-width="90px">
                <el-button class="minorRedButton" @click="onSearch(1,10)" style="margin-left: 24px;">查询</el-button>
                <el-button class="minorRedButton" @click="exportFile" style="margin-left: 24px;">导出</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="" label-width="90px">
                <el-button class="minorRedButton" @click="goAddPage" style="width: 104px;">+ 新增</el-button>
                <el-button class="minorRedButton" @click="del" :loading="delLoading" style="width: 104px;">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div style="margin-right: 12px;font-size: 12px"> 成员名称:</div> -->
        <!-- <el-input placeholder="请输入关键字后回车查询，支持模糊查询" v-model="staffName" @keyup.enter.native="onSearch(1,10)"> -->
          <!-- <i slot="suffix" class="iconfont icon-sousuo" @click="onSearch(1,10)"></i> -->
        <!-- </el-input> -->
        <!-- <div style="font-size: 12px;margin-left: 12px;cursor: pointer;" @click="onSearch(1,10)">查询</div> -->
       
        <!-- <div class="button-wrap">
          <el-button class="minorRedButton" @click="goAddPage">+ 新增</el-button>
          <el-button class="minorRedButton" @click="del" :loading="delLoading">删除</el-button>
        </div> -->
      </header>
      <el-table :data="tableData" tooltip-effect="dark" v-loading="searchLoading"
        @selection-change="(val) => multipleSelection = val">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="staffName" label="成员名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zyxName" label="专业线" show-overflow-tooltip v-if="topTitle == '省级评审委员会' || topTitle == '市级评审委员会'"></el-table-column>
        <el-table-column prop="companyName" label="所属公司" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptName" label="所属部门" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
        :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, sizes, total" :total="total"
        style="text-align: right; margin-top: 10px">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import { queryStaffRoleList,deletePermissionList,queryStaffRoleListExport } from '@/assets/api/rolemanage/index'
  import {exportBlobFile} from "@/utils/common";
  import {  qryAllOrg } from "@/assets/api/rolemanage/index";
  import {
    qryParamList
} from '@/assets/api/common/index'
  export default {
    name: 'roleManage',
    data() {
      return {
        form:{
          staffName:'',
          companyId:'',
          deptId:'',
          zyxCode:''
        },
        searchLoading: false,
        delLoading: false,
        tableData: [],
        multipleSelection: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        cate:"",
        topTitle:"",
        allOrgList:[],
        deptList:[],
        cateList:[]
      }
    },
    created() {
      if(this.$route.params.type == 'DSGG'){
        this.topTitle = '市级工会专干'
      }else if(this.$route.params.type == 'SJGG'){
        this.topTitle = '省级工会专干'
      }else if(this.$route.params.type == 'ZJRC'){
        this.topTitle = '专家人才'
      }else if(this.$route.params.type == 'SJPWH'){
        this.topTitle = '省级评审委员会'
      }else if(this.$route.params.type == 'DSPWH'){
        this.topTitle = '市级评审委员会'
      }else if(this.$route.params.type == 'GHZX'){
        this.topTitle = '工会副主席/主席'
      }else if(this.$route.params.type == 'GJCGGLY'){
        this.topTitle = '国家成果管理专员'
      }else if(this.$route.params.type == 'BMJL'){
        this.topTitle = '部门领导'
      }else if(this.$route.params.type == 'FGLD'){
        this.topTitle = '分管领导'
      }
      this.qryAllOrg()
      this.onSearch(1, 10)
      if(this.$route.params.type == 'SJPWH' || this.$route.params.type == 'DSPWH'){
        this.qryParamList('ZYX')
      }
    },

    methods: {
      async onSearch(pageNum = this.pageNum, pageSize = this.pageSize) {
        this.searchLoading = true  
        try {
          const res = await queryStaffRoleList({
            pageNum,
            pageSize,
            reqParam: {
              roleId: this.$route.params.type,
              staffName: this.form.staffName,
              companyId:this.form.companyId,
              deptId:this.form.deptId,
              zyxCode:this.form.zyxCode,
            }
          })
          this.tableData = res.rspBody.list
          this.total = res.rspBody.total
          this.searchLoading = false
        } catch (error) {
          this.searchLoading = false
          this.$message.error('网络错误')
        }
      },
      async qryParamList(value){
        const res = await qryParamList({"attrType": value});
        if (res.rspCode == "0000") {
            //赋值
            this.cateList = res.rspBody 
        } else {
            this.$message.error(res.rspDesc);
        }
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.onSearch()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.onSearch()
      },
      goAddPage() {
        this.$router.push({ name: 'roleManagePowerAdd', params: { type: this.$route.params.type } })
      },
      async del() {
        if (this.multipleSelection.length === 0) {
          return this.$message.error('请选择删除数据')
        }
        this.$confirm(
        `确认删除该成员吗？`,
        "确认信息",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
        const ids = this.multipleSelection.map(item => item.staffId)
        try {
          this.delLoading = true
          const res = await deletePermissionList(this.$route.params.type,ids)
          if (res.rspCode === '0000') {
            this.delLoading = false
            this.$message.success('删除成功')
            this.onSearch(1, 10)
          } else {
            this.delLoading = false
            this.$message.error(res.rspDesc)
          }
        } catch (error) {
          this.$message.error('网络错误')
        }
      })  
      },
      async exportFile(){
        const loading = this.$loading({
          lock: true,
          text: '数据正在导出，请稍侯',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });    
        const res = await queryStaffRoleListExport({
          pageNum:1,
          reqParam: {
            roleId: this.$route.params.type,
            staffName: this.form.staffName,
            companyId:this.form.companyId,
            deptId:this.form.deptId
          }
        });
        if(res){
          loading.close();
        }else{
          loading.close();
        }
        let str = `${this.topTitle}.xlsx`
        exportBlobFile(res, str)
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
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .power-page {
    background: #fff;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
  
    header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
  
      // ::v-deep(.el-input) {
      //   width: 470px;
  
      //   .el-input__suffix {
      //     top: 4px;
  
      //     .icon-sousuo {
      //       font-size: 22px;
      //       color: #666666;
      //     }
      //   }
      // }
  
      .button-wrap {
        margin-left: auto;
  
        .el-button {
          width: 104px;
          height: 26px;
          padding-top: 0;
          padding-bottom: 0;
        }
      }
    }
  }
  </style>