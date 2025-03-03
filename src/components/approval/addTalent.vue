<template>
  <div class="addTalent-dialog">
    <el-dialog
      :visible="visible"
      title="发起咨询"
      width="800px"
      destroy-on-close
      :close-on-click-modal="false"
      @open="openModal"
      @close="closeModel"
    >
      <el-form
        :model="form"
        label-position="right"
        label-width="70px"
        ref="form"
        class="form"
        v-if="step==1"
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
        :model="formQuestion"
        label-position="right"
        label-width="70px"
        ref="formQuestion"
        class="formQuestion"
        v-if="step==2"
      >
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="咨询问题描述" prop="staffName" label-width="120px">
              <el-input
                v-model="formQuestion.question"
                type="textarea"
                placeholder="请输入"
                rows="5"
                style="margin-top: 5px;"
                ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格区域 -->
       <el-table v-loading="tableLoading" :data="tableData" @selection-change="handleSelectionChange" v-show="step==1"  ref="multipleTable"
            style="width: 100%">
            <el-table-column type="selection" width="55" fixed="left" v-model="selectList" ></el-table-column>
            <el-table-column prop="staffName" show-overflow-tooltip label="姓名"></el-table-column>
            <el-table-column prop="deptName" show-overflow-tooltip label="所属部门"></el-table-column>
        </el-table>
      <el-pagination v-if="step==1"
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
        <el-button class="minorGrayButton_copy" @click="changeStep('1')" v-if="step==2">上一步</el-button>
        <el-button class="mainRedButton_copy" @click="changeStep('2')" v-if="step==1">下一步</el-button>
        <el-button class="mainRedButton_copy" @click="addTalent" v-if="step==2">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import {
    queryStaffRoleList
} from '@/assets/api/common/index'
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
        major: "",
      },
      formQuestion:{
        question:""
      },
      majorList: [], //专业分类
      //分页
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      tableLoading: false,
      selectList: [],
      step:1,
    };
  },
  created() {},
  methods: {
    //确认添加
    addTalent() {
      if(!this.formQuestion.question){
        this.$message.error("请输入咨询问题");
        return;
      }
      this.$emit('addTalent',this.selectList,this.formQuestion.question)
    },
    //选择专业方向
    changeZYFX(val) {
      this.form.majorType = "";
      if (val == "") return;
      // this.qryLinkType(val, "3");
    },
    //打开弹窗
    openModal() {
      this.step=1
      this.queryExpert()
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
              
              this.tableData = res.rspBody.list
              this.pageParam.total=res.rspBody.total 
          } else {
              this.$message.error(res.rspDesc);
          }
    },
    qryAll(){
      this.queryExpert()
    },
    changeStep(name){
      if(name=='2' && this.selectList.length==0){
        this.$message.error("请至少选择一位专家");
        return;
      }
      this.step=name
    },
    //关闭弹窗
    closeModel() {
      this.$emit("closeModel");
    },
    //多选
    handleSelectionChange(val) {
      this.selectList = val;
    },
    //分页
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.qryAll()
    },
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.qryAll()
    },
  },
};
</script>
  
<style lang="scss" scoped>

</style>
  
  