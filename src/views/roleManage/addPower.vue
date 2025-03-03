<template>
    <div class="treeSelectMore">
      <div class="head-title">新增</div>
        <el-container>
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
              <el-table-column prop="staffName" label="姓名"> </el-table-column>
              <el-table-column prop="mobileTel" label="电话"> </el-table-column>
              <el-table-column prop="mainPosition" label="成员职位"> </el-table-column>
              <el-table-column prop="mainUserId" label="用户ID"> </el-table-column>
  
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
          <div class="main" v-if="selectList.length!=0">
            <div
                class="main-item"
                v-for="(item) in selectList"
                :key="item.code"
            >
              <span>{{ item.staffName }}</span>
              <!-- <i class="el-icon-close" @click="cancelPerson(i,item)"></i> -->
            </div>
          </div>
          <div class="main" v-if="selectList.length==0">
            <div class="main-item">
              <span>{{ singleSelect.name || '请选择人员' }}</span>
              <!-- <i class="el-icon-close" @click="cancelPerson(i)"></i> -->
            </div>
          </div>
        </el-container>
        <span class="footer">
          <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
          <el-button
              class="mainRedButton_copy"
              @click="submitPerson"
              :loading="loading"
          >确定</el-button
          >
        </span>
        <selectSpeciality :visible="showDialog" @closeModel="closeSpecial" @addSure="addSure" :cateList="cateList"></selectSpeciality>
    </div>
  </template>
  <script>
  import {  queryStaffByPage,saveStaffRole,qryAllOrg } from "@/assets/api/rolemanage/index";
  import selectSpeciality from "@/components/trainingHandleModal/selectSpeciality.vue";
  import {
    qryParamList
} from '@/assets/api/common/index'
  export default {
    name: "AddPower",
    components: { selectSpeciality },
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
        cate:"",
        showDialog:false,
        cateList:[]
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
    created() {
      this.openModel()
      console.log(this.$route.params.type)
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
      openModel() {
        this.qryAllOrg();
      },
      //多选
      handleSelectionChange(list) {
        this.selectList = list;
      },
      //删除人员
      cancelPerson(i,item) {
        this.selectList.forEach((item1,index)=>{
          if(item1.code === item.code){
            this.selectList.splice(index,1)
            this.$nextTick(()=>{
              this.$refs.multipleTable.toggleRowSelection(item1);
            })
          }
        })
  
      },
      async qryParamList(value){
        const res = await qryParamList({"attrType": value});
        if (res.rspCode == "0000") {
            //赋值
            this.cateList = res.rspBody 
            this.showDialog = true
        } else {
            this.$message.error(res.rspDesc);
        }
      },
      //提交
      async submitPerson() {
        // if(this.$route.params.type=="munLabor"){
        //     this.cate="DSGG"
        // }else if(this.$route.params.type=="proLabor"){
        //     this.cate="SJGG"
        // }else if(this.$route.params.type=="expert"){
        //     this.cate="ZJRC"
        // }else if(this.$route.params.type=="committee"){
        //     this.cate="PSWYH"
        // }else if(this.$route.params.type=="chairman"){
        //     this.cate="GHZX"
        // }else if(this.$route.params.type=="nationAchieve"){
        //     this.cate="GJCGGLY"
        // }  
        if(this.$route.params.type == 'SJPWH' || this.$route.params.type == 'DSPWH' ){
          this.qryParamList('ZYX')
          return
        }
        const list = this.selectList.map(item => {
          return {
            staffId:item.mainUserId,
            staffName:item.staffName,
            companyId:item.companyId,
            deptId:item.deptId,
            deptName:item.deptName,
            roleId: this.$route.params.type
          }
        })
        try {
          this.addLoading = true
          const res = await saveStaffRole(list)
          if (res.rspCode === '0000') {
            this.addLoading = false
            this.$router.go(-1)
            this.$message.success('新增成功')
          } else {
            this.addLoading = false
            this.$message.error(res.rspDesc)
          }
        } catch (error) {
          this.$message.error('网络错误')
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
       this.$router.go(-1)
      },
      closeSpecial(){
        this.showDialog = false
      },
      async addSure(val){ 
        console.log(val,this.cateList)
        let temp = this.cateList.filter((item)=>{
          return item.attrCode == val
        })
        const list = this.selectList.map(item => {
          return {
            staffId:item.mainUserId,
            staffName:item.staffName,
            companyId:item.companyId,
            deptId:item.deptId,
            deptName:item.deptName,
            roleId: this.$route.params.type,
            extendInfos:[
              {
                "attrCode": temp[0].attrCode,
                "attrDesc": temp[0].attrDesc,
                "attrType": temp[0].attrType,
                "attrValue": temp[0].attrValue
              }
            ]
          }
        })
        try {
          this.addLoading = true
          const res = await saveStaffRole(list)
          if (res.rspCode === '0000') {
            this.addLoading = false
            this.showDialog = false
            this.$router.go(-1)
            this.$message.success('新增成功')
          } else {
            this.addLoading = false
            this.$message.error(res.rspDesc)
          }
        } catch (error) {
          this.$message.error('网络错误')
        }
      }
    },
  };
  </script>
  
  <style lang="scss">
  .treeSelectMore {
    background: #fff;
    box-sizing: border-box;
    padding: 20px;
    .side {
      padding: 10px;
      box-sizing: border-box;
      width: 99%;
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
      width: calc(100% - 1100px);
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
    .footer{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  </style>