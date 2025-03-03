<template>
  <div>
    <!--  <div class="v-modal" style="z-index:66" v-if="visible" @click="close"></div> -->
    <div class="training-handle" :class="visible?'on' : 'close'">
      <i class="el-icon-close" style="font-size: 22px;" @click="close"></i>
      <el-form label-position="left" label-width="80px" :model="handleForm" class="handle-form" :rules="rules"
        ref="handleForm">
        <el-form-item label="办理意见" required>
          <el-col :span="8">
            <el-select v-model="handleForm.opinionSelect" placeholder="请选择" ref="custom-drop" @change="(e) => {
              handleForm.opinion = opinionList.find(item => item.id === e).remark
            }">
              <div v-loading="opinionLoading" class="custom-select">
                <div class="custom-drop">
                  <el-input v-model="customInput" placeholder="请输入意见内容">
                    <el-button slot="append" @click="addOpinion">+ 添加</el-button>
                  </el-input>
                </div>
                <el-option :value="''" @click.stop disabled v-if="opinionList.length == 0">
                  <span
                    style="padding: 10px 0;margin: 0 auto;text-align: center;color: #999;font-size: 14px;cursor: default;">请添加意见内容
                  </span>
                </el-option>
                <div v-else>
                  <el-option v-for="item in opinionList" :key="item.id" :label="item.remark" :value="item.id">
                    <span>{{ item.remark }}</span>
                    <i class="el-icon-close" @click.stop="delOpinion(item.id)"></i>
                  </el-option>
                </div>
              </div>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="" prop="opinion" class="textarea-item">
          <el-col :span="18">
            <el-input type="textarea" placeholder="请输入意见" v-model="handleForm.opinion" maxlength="1000" show-word-limit
              :autosize="{ minRows: 4, maxRows: 6}">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-for="(item, index) in handleForm.approvalInfoList" :label="'办理步骤' + (index + 1)" :key="item.key" required>
          <el-col :span="8">
            <el-form-item>
              <span>{{item.nodeName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :prop="'approvalInfoList.' + index + '.approveName'" :rules="{
              required: true, message: '审核人不能为空', trigger: 'change'
            }">
              <el-select v-model="handleForm.approvalInfoList[index].approveName" placeholder="请选择"
                :popper-append-to-body="false" :ref="'unitTreeSelect' + index">
                <el-option v-for="item1 in item.officerList" :key="item1.staffId" :label="item1.staffName" :value="item1.staffName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="" class="add-btn-item">
          <el-checkbox v-model="handleForm.checked" style="float: left;margin-right: 20px">短信通知</el-checkbox>
          <el-button class="mainRedButton" @click="onSubmit" :loading="loading">立即办理</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import { getOpinions, addOpinion, delOpinionOne, getApprovalInfo } from '@/assets/api/common'
export default {
  name: 'TrainingHandle',
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
    majorLine:{
      type: String,
      default:''
    },
  },
  data() {
    return {
      handleForm: {
        opinionSelect: '',
        opinion: '',
        approvalInfoList: null,
        checked: false
      },
      opinionList: [],
      opinionLoading: false,
      options: [
        {
          label: '部门负责人审批',
          value: '1'
        },
        {
          label: '审批环节名称',
          value: '2'
        },
        {
          label: '3',
          value: '3'
        },
      ],
      customInput: '',
      rules: {
        opinion: [{ required: true, message: '请输入意见', trigger: 'change' }],
      },
    }
  },
  created() {
    this.getOpinions()
    this.getApprovalInfo()
  },
  methods: {
    // 获取常用意见
    async getOpinions() {
      try {
        this.opinionLoading = true
        const res = await getOpinions()
        if (res.rspCode === '0000') {
          this.opinionList = res.rspBody
          this.opinionLoading = false
        } else {
          this.opinionLoading = false
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.opinionLoading = false
        this.$message.error('网络错误')
      }
    },
    // 添加意见
    async addOpinion() {
      try {
        this.opinionLoading = true
        const res = await addOpinion(this.customInput)
        if (res.rspCode === '0000') {
          this.customInput = ''
          this.$message.success('常用意见添加成功')
          this.getOpinions()
        } else {
          this.opinionLoading = false
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.opinionLoading = false
        this.$message.error('网络错误')
      }
    },
    // 删除意见
    async delOpinion(id) {
      try {
        this.opinionLoading = true
        const res = await delOpinionOne(id)
        if (res.rspCode === '0000') {
          this.$message.success('常用意见删除成功')
          this.getOpinions()
        } else {
          this.opinionLoading = false
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.opinionLoading = false
        this.$message.error('网络错误')
      }
    },
    // 审批人信息查询
    async getApprovalInfo() {
      try {
        const res = await getApprovalInfo({approvalType: this.type, extId: this.extId, majorLine: this.majorLine})
        if (res.rspCode === '0000') {
          const list = JSON.parse(JSON.stringify(res.rspBody))
          this.handleForm.approvalInfoList = list
        } else {
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.$message.error('网络错误')
      }
    },
    //提交
    onSubmit() {
      this.$refs.handleForm.validate(async valid => {
        if (valid) {
          this.$confirm(
            `您确定要提交给${this.handleForm.approvalInfoList[0].approveName}吗？`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(() => {
            //处理审批人数据
            this.handleForm.approvalInfoList.map(item=>{
              //查找审批人id
              let obj = item.officerList.find(item1=>item1.staffName==item.approveName)
              item.approveId =obj.staffId
              //删除多余数据
              //delete item.officerList
            })
            this.$emit("submit", {
              ...this.handleForm,
            });
          });
        }
      })
    },
    close() {
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
