<template>
    <div class="innovateApply-dialog">
      <el-dialog
        :visible="visible"
        title="申请成为合伙人"
        width="800px"
        destroy-on-close
        :close-on-click-modal="false"
        @open="openModal"
        @close="closeModel"
      >
        <el-form ref="form" :model="form" label-position="right" label-width="120px" class="form">
          <el-row>                   
            <el-col :span="20">
                <el-form-item label="创新议题名称" prop="title">
                <div>{{showItem.issuesTitle || ''}}</div>
                </el-form-item>
            </el-col>      
          </el-row>
          <el-row>                   
            <el-col :span="20">
                <el-form-item label="创新议题内容" prop="title">
                <div class="content">{{showItem.content || ''}}</div>
                </el-form-item>
            </el-col>      
          </el-row>
          <el-row style="margin-top:10px">
              <el-col :span="20" style="margin-bottom: 5px;">
                  <el-form-item label="申请原因" prop="applyContent" :rules="{
                      required: true,
                      message: '请输入申请原因',
                      trigger: 'blur',
                  }">
                      <el-input
                      v-model="form.applyContent"
                      type="textarea"
                      placeholder="请输入"
                      rows="5"
                      ></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
        </el-form>
        <span slot="footer">
          <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
          <el-button class="mainRedButton_copy" @click="goApply">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
    
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      showItem: { type: Object },
    },
    data() {
      return {
        //表单查询
        form: {
          applyContent: "",
        },
       
      };
    },
    created() {
      
    },
    methods: {
      //打开弹窗
      openModal() {
        // this.qryAllOrg()
      },
      //关闭弹窗
      closeModel() {
        this.$emit("closeModel");
      },
      goApply(){
        this.$emit("goApply",this.form.applyContent);
      }
    },
  };
  </script>
    
  <style lang="scss" scoped>
  .innovateApply-dialog{
    .content{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
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
    
    