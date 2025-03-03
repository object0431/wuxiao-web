<template>
  <div>
    <!--  <div class="v-modal" style="z-index:66" v-if="visible" @click="close"></div> -->
    <div class="training-handle" :class="visible?'on' : 'close'">
      <i class="el-icon-close" style="font-size: 22px;" @click="close"></i>
      <el-form label-position="left" label-width="120px" :model="handleForm" class="handle-form" :rules="rules" 
        ref="handleForm" >
        
        <el-form-item label="是否参加笔试" required prop="examRet">
          <el-col :span="12">
            <el-select v-model="handleForm.examRet">
                <el-option value="1" label="参加"></el-option>
                <el-option value="0" label="不参加"></el-option>
              </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="备注" prop="remark" class="textarea-item" style="margin-top:16px;margin-bottom:10px">
          <el-col :span="18">
            <el-input type="textarea" placeholder="请输入备注" v-model="handleForm.remark" maxlength="1000" show-word-limit
              :autosize="{ minRows: 4, maxRows: 6}">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="" class="add-btn-item">
          <el-button class="minorGrayButton" @click="close" :loading="loading">取消</el-button>
          <el-button class="mainRedButton" @click="onSubmit" :loading="loading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
// import {  } from '@/assets/api/common'
export default {
  name: 'ExamSureHandle',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false
    },
    extId:{
      type: String,
      default: ''
    },
  },
  data() {
    return {
      handleForm: {
        examRet:'',
        remark: '',
      },
      rules: {
        examRet:[ { required: true, message: '请选择是否参与笔试', trigger: "change" }],
      },
    }
  },
  created() {
  },
  methods: {

    //提交
    onSubmit() {
      this.$refs.handleForm.validate(async valid => {
        if (valid) {
          this.$confirm(
            `您确定要提交吗？`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(() => {
            this.$emit("submit", {
              ...this.handleForm,
            });
            
          });
        }
      })
    },
    close() {
      this.handleForm = {
        examRet:'',
        remark: '',
      }
      this.$emit('close')
    },
  }
};
</script>

<style lang="scss" scoped>
.training-handle {
  position: fixed;
  z-index: 99;
  height: 330px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.16);
  padding: 20px 20px 0 20px;
  transition: all .5s ease;
  left: 220px;
  width: calc(100vw - 260px);
  overflow: auto;

  &.on {
    bottom: 0
  }

  &.close {
    bottom: -520px
  }

  p,
  ul,
  // li {
  //   margin: 0;
  //   padding: 0;
  // }

  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 16px;
    cursor: pointer;
  }

  .handle-form {
    margin-top: 10px;

    .handle-icon {
      font-size: 20px;
      color: #28B0E8;
      margin-left: 10px;
      cursor: pointer;
    }

    // .el-select-dropdown.is-multiple .el-select-dropdown__item {
    //   padding-right: 0;
    // }

    .el-select-dropdown__item {
      height: 100%;
    }

    .textarea-item {
      ::v-deep(.el-form-item__content) {
        height: 100%;
      }
    }
  }

  .custom-tree-node {
    .node-check {
      color: #28B0E8;
    }

    .node-check-icon {
      color: #28B0E8;
      margin: 10px;
    }
  }
}

.custom-select {
  .custom-drop {
    display: flex;
    align-items: center;
  }

  .el-select-dropdown__item {
    display: flex;
    align-items: center;

    .el-icon-close {
      font-size: 16px;
      margin-left: auto;
    }
  }
}
</style>
