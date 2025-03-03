<template>
    <div class="getScore-dialog">
      <el-dialog
        :visible="visible"
        title="评分"
        width="800px"
        destroy-on-close
        :close-on-click-modal="false"
        @open="openModal"
        @close="closeModel"
      >
       
              <!-- <el-form-item label="咨询问题" prop="score"> -->
        <div style="display: flex;justify-content: center;padding: 50px 0;">
            <i class="el-icon-star-on" style="font-size: 32px;color: #fbe623" v-if="form.score && parseInt(form.score)>=1" @click="setScore('1')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #eee" v-else @click="setScore('1')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #fbe623" v-if="form.score && parseInt(form.score)>=2" @click="setScore('2')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #eee" v-else @click="setScore('2')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #fbe623" v-if="form.score && parseInt(form.score)>=3" @click="setScore('3')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #eee" v-else @click="setScore('3')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #fbe623" v-if="form.score && parseInt(form.score)>=4" @click="setScore('4')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #eee" v-else @click="setScore('4')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #fbe623" v-if="form.score && parseInt(form.score)>=5" @click="setScore('5')"></i>
            <i class="el-icon-star-on" style="font-size: 32px;color: #eee" v-else @click="setScore('5')"></i>
        </div>
        <span slot="footer">
          <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
          <el-button class="mainRedButton_copy" @click="submit">确定</el-button>
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
    },
    data() {
      return {
        //表单查询
        form: {
          score: "",
        },
        
      };
    },
    created() {},
    methods: {
      //关闭弹窗
      closeModel() {
        this.$emit("closeModel");
      },
       //打开弹窗
       openModal() {
        // this.qryAllOrg()
      },
      submit(){
        this.$emit("submit",this.form.score);
      },
      setScore(score){
        this.form.score=parseInt(score)
      }
    },
  };
  </script>
    
  <style lang="scss" scoped>
  </style>
    
    