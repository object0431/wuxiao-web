<template>
  <div>
    <!-- <div class="v-modal" style="z-index: 66" v-if="visible" @click="close"></div> -->
    <div
      class="TrainingHandleReview"
      :class="visible ? 'on' : 'close'"
      v-loading="loading"
    >
      <i class="el-icon-close" style="font-size: 22px" @click="close"></i>
      <el-form
        label-position="left"
        label-width="80px"
        :model="handleForm"
        class="handle-form"
        :rules="rules"
        ref="handleForm"
      >
        <el-form-item label="办理意见" v-if="specailCate" required>
          <el-col :span="8">
            <el-select
              v-model="handleForm.opinion"
              placeholder="请选择"
              ref="custom-drop"
              @change="
                (e) => {
                  handleForm.textarea = opinionList.find(
                    (item) => item.id === e
                  ).remark;
                }
              "
            >
              <div v-loading="opinionLoading" class="custom-select">
                <div>
                  <el-option
                    v-for="item in opinionList"
                    :key="item.id"
                    :label="item.remark"
                    :value="item.id"
                  >
                    <span>{{ item.remark }}</span>
                  </el-option>
                </div>
              </div>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="办理意见" v-else>
          <el-col :span="8">
            <el-select
              v-model="handleForm.opinion"
              placeholder="请选择"
              ref="custom-drop"
              @change="
                (e) => {
                  handleForm.textarea = opinionList.find(
                    (item) => item.id === e
                  ).remark;
                }
              "
            >
              <div v-loading="opinionLoading" class="custom-select">
                <div class="custom-drop">
                  <el-input v-model="customInput" placeholder="请输入意见内容">
                    <el-button slot="append" @click="addOpinion"
                      >+ 添加</el-button
                    >
                  </el-input>
                </div>
                <el-option
                  :value="''"
                  @click.stop
                  disabled
                  v-if="opinionList.length == 0"
                >
                  <span
                    style="
                      padding: 10px 0;
                      margin: 0 auto;
                      text-align: center;
                      color: #999;
                      font-size: 14px;
                      cursor: default;
                    "
                    >请添加意见内容
                  </span>
                </el-option>
                <div v-else>
                  <el-option
                    v-for="item in opinionList"
                    :key="item.id"
                    :label="item.remark"
                    :value="item.id"
                  >
                    <span>{{ item.remark }}</span>
                    <i
                      class="el-icon-close"
                      @click.stop="delOpinion(item.id)"
                    ></i>
                  </el-option>
                </div>
              </div>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="" prop="textarea" class="textarea-item">
          <el-col :span="18">
            <el-input
              type="textarea"
              placeholder="请输入意见"
              v-model="handleForm.textarea"
              maxlength="1000"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 6 }"
            >
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="add-btn-item">
          <el-button
            class="mainRedButton"
            @click="onSubmit('TG')"
            :loading="TGloading"
            >{{specailCate?'提交':'通过'}}</el-button
          >
          <el-button v-if="showBackBtn" class="mainRedButton" @click="onSubmit('BH')"
            >退回</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getOpinions,
  addOpinion,
  delOpinionOne,
  getNextNode,
} from "@/assets/api/common";
export default {
  name: "TrainingHandleReview",
  props: {
    showBackBtn: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    projectId: {
      type: String,
      default: "",
    },
    specailCate:{
      type: String,
      default: "",
    }
  },
  data() {
    return {
      handleForm: {
        opinion: "",
        textarea: "",
        checked: false,
        checkCode: "",
      },
      opinionList: [{id:'000001',remark:'同意申报'},{id:'000002',remark:'不同意申报'}],
      opinionLoading: false,
      customInput: "",
      rules: {
        textarea: [
          { required: true, message: "请输入意见", trigger: "change" },
        ],
      },
      //下一节点信息
      TGloading: false,
      nextNode: {},
    };
  },
  created() {
    if(!this.specailCate){
      this.getOpinions();
    }
  },
  methods: {
    // 获取常用意见
    async getOpinions() {
      try {
        this.opinionLoading = true;
        const res = await getOpinions();
        if (res.rspCode === "0000") {
          this.opinionList = res.rspBody;
          this.opinionLoading = false;
        } else {
          this.opinionLoading = false;
          this.$message.error(res.rspDesc);
        }
      } catch (error) {
        this.opinionLoading = false;
        this.$message.error("网络错误");
      }
    },
    // 添加意见
    async addOpinion() {
      try {
        this.opinionLoading = true;
        const res = await addOpinion(this.customInput);
        if (res.rspCode === "0000") {
          this.customInput = "";
          this.$message.success("常用意见添加成功");
          this.getOpinions();
        } else {
          this.opinionLoading = false;
          this.$message.error(res.rspDesc);
        }
      } catch (error) {
        this.opinionLoading = false;
        this.$message.error("网络错误");
      }
    },
    // 删除意见
    async delOpinion(id) {
      try {
        this.opinionLoading = true;
        const res = await delOpinionOne(id);
        if (res.rspCode === "0000") {
          this.$message.success("常用意见删除成功");
          this.getOpinions();
        } else {
          this.opinionLoading = false;
          this.$message.error(res.rspDesc);
        }
      } catch (error) {
        this.opinionLoading = false;
        this.$message.error("网络错误");
      }
    },
    close() {
      this.$emit("close");
    },
    onSubmit(data) {
      this.$refs.handleForm.validate(async (valid) => {
        if (valid) {
          if(this.specailCate){
            if(!this.handleForm.opinion){
              this.$message.error('请选择办理意见');
              return
            }
          }
          //同意且是多个步骤
          if (data == "TG" && this.projectId !== "") {
            this.TGloading = true;
            const res = await getNextNode({
              projectId: this.projectId,
            });
            if (res.rspCode === "0000") {
              this.TGloading = false;
              //如果有下一流程
              if (res.rspBody.hasNext) {
                this.$confirm(
                  `确定通过并提交给${res.rspBody.staffName}吗？`,
                  "提示",
                  {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                  }
                ).then(() => {
                  this.handleForm.checkCode = data;
                  this.$emit("submit", this.handleForm);
                });
                //没有下一流程
              } else {
                this.$confirm(`确定通过该申请吗？`, "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                }).then(() => {
                  this.handleForm.checkCode = data;
                  this.$emit("submit", this.handleForm);
                });
              }
            } else {
              this.$message.error(res.rspDesc);
            }
          }else if(data=='TG' && this.projectId == ''){
            //同意，但是只有一步审核
             this.$confirm(`确定${this.specailCate?'提交':'通过'}该申请吗？`, "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                }).then(() => {
                  this.handleForm.checkCode = data;
                  this.$emit("submit", this.handleForm);
                });

          }else if(data == 'BH') {
            //驳回
            this.$confirm(`确定退回给申请人吗？`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.handleForm.checkCode = data;
              this.$emit("submit", this.handleForm);
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.TrainingHandleReview {
  position: fixed;
  z-index: 99;
  background: #ffffff;
  height: 250px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.16);
  padding: 20px;
  transition: all 0.5s ease;
  left: 300px;
  width: calc(100vw - 340px);

  &.on {
    bottom: 0;
  }

  &.close {
    bottom: -520px;
  }

  p,
  ul,
  li {
    margin: 0;
    padding: 0;
  }

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
      color: #28b0e8;
      margin-left: 10px;
      cursor: pointer;
    }

    .el-select-dropdown.is-multiple .el-select-dropdown__item {
      padding-right: 0;
    }

    .el-select-dropdown__item {
      height: 100%;
    }

    .add-btn-item {
      position: absolute;
      bottom: 10px;
    }

    .textarea-item {
      ::v-deep(.el-form-item__content) {
        height: 100%;
      }
    }
  }

  .custom-tree-node {
    .node-check {
      color: #28b0e8;
    }

    .node-check-icon {
      color: #28b0e8;
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
