<template>
  <div class="urgePush-dialog">
    <el-dialog
      :visible="visible"
      title="催办"
      width="800px"
      destroy-on-close
      :close-on-click-modal="false"
      @open="openModal"
      @close="closeModel"
    >
    <div class="head-title" style="margin-top: 10px;">评委列表</div>
      <el-table v-loading="tableLoading" :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable" height="300"
          style="width: 100%;">
        <el-table-column type="selection" width="55" fixed="left" v-model="selectList" ></el-table-column>
        <el-table-column prop="empName" show-overflow-tooltip label="姓名"></el-table-column>
        <!-- <el-table-column prop="deptName" show-overflow-tooltip label="所属部门"></el-table-column> -->
      </el-table>
      <!-- <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="pageParam.pageNum"
        :page-size="pageParam.pageSize"
        layout="prev, pager, next,sizes, total"
        :total="pageParam.total"
        style="text-align: right; margin-top: 10px"
      >
      </el-pagination> -->
      <div class="head-title" style="margin-top: 10px;">提示内容</div>
      <!-- <div>已选择{{ selectList.length }}人</div> -->
      <el-form
        :model="formQuestion"
        label-position="right"
        label-width="70px"
        ref="formQuestion"
        class="formQuestion"
      >
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="" prop="staffName" label-width="120px">
              <el-input
                v-model="formQuestion.question"
                type="textarea"
                placeholder="请输入"
                rows="2"
                style="margin-top: 5px;"
                ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
        <el-button class="mainRedButton_copy" @click="urgePush">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import {
  queryReviewJudgeList
} from '@/assets/api/resultManage'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    queryType: {
      type: String,
      default: "",
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
    };
  },
  created() {},
  methods: {
    //确认添加
    urgePush() {
      if(this.selectList.length == 0){
        this.$message.error("请选择至少一位评委");
        return;
      }
      if(!this.formQuestion.question){
        this.$message.error("请输入咨询问题");
        return;
      }
      this.$emit('pushUrgeEvent',this.selectList,this.formQuestion.question)
    },
    //选择专业方向
    changeZYFX(val) {
      this.form.majorType = "";
      if (val == "") return;
      // this.qryLinkType(val, "3");
    },
    //打开弹窗
    openModal() {
      this.queryReviewJudgeList()
      this.formQuestion.question = ''
    },
    async queryReviewJudgeList(){
      console.log(this.queryType)
      const res = await queryReviewJudgeList(this.queryType);
      console.log(res)
      if (res.rspCode == "0000") {
          //赋值       
          this.tableData = res.rspBody
          this.$nextTick(() => {
            for (const row of this.tableData) {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            }
          })
      } else {
          this.$message.error(res.rspDesc);
      }
    },
    qryAll(){
      this.queryExpert()
    },
    //关闭弹窗
    closeModel() {
      this.formQuestion.question = ''
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
  
  