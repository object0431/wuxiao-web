<template>
  <div>
    <!-- <div class="v-modal" style="z-index:66" v-if="visible" @click="close"></div> -->
    <div
      class="approval-handle"
      :class="visible?'on' : 'close'"
    >
      <i
        class="el-icon-close"
        style="font-size: 22px;"
        @click="close"
      ></i>
      <el-form
        label-position="left"
        label-width="120px"
        class="handle-form"
      >
        <el-form-item
          label="评委委员会"
          required
        >
          <el-col>
            <div style="display:flex;">
              <div
                class="approval-display"
                v-for="item2 in approvalInfoList"
                :key="item2.staffId"
              >
                <span class="approvaSpan">{{item2.staffName}}</span>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item
          label=""
          class="add-btn-item"
        >
          <el-button
            class="mainRedButton"
            @click="onSubmit()"
            :loading="loading"
          >推送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <addLeader :visible="visibleStaff" @closeModel="closeModel" @addLeader='addLeader'></addLeader> -->
  </div>

</template>
  
  <script>
import addLeader from "@/components/approval/addLeader.vue";
import {
  queryCommitteeList,
  resultZgPush,
} from "@/assets/api/resultManage/index";

export default {
  name: "committeeHandle",
  components: { addLeader },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    pendingCode: {
      pendingCode: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    extId: {
      type: String,
      default: "",
    },
    majorLine: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    achievementIdList:  { type: Array, }
  },
  data() {
    return {
      handleForm: {
        approvalInfoList: [],
      },
      approvalInfoList: [],
      visibleStaff: false,
      pageParam: {
        pageNum: 1,
        pageSize: 50,
        total: 0,
      },
    };
  },
  created() {
    this.getApprovalInfo();
  },
  methods: {
    addLeader(list) {
      
    },
    // 审批人信息查询
    async getApprovalInfo() {
      try {
          let params = this.approvalInfoList.map((item) => {
            return { staffId: item.staffId, staffName: item.staffName };
          });
        const res = await queryCommitteeList({
          ...this.pageParam,
          reqParam:{achievementType:this.type}
        });
        if (res.rspCode === "0000") {
          // 
          this.approvalInfoList = res.rspBody.list || [];
        } else {
          this.$message.error(res.rspDesc);
        }
      } catch (error) {
        this.$message.error("网络错误");
      }
    },
    //提交
    onSubmit() {
      

      this.$confirm(`您确定要推送评审委员会吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //处理审批人数据
          console.log(this.achievementIdList,'111111111111')
          let list = []
          this.achievementIdList.map((item)=>{
            list.push(item.projectId)
          })
          console.log(this.achievementIdList,'============')
          let params = this.approvalInfoList.map((item) => {
            return { staffId: item.staffId, staffName: item.staffName };
          });
          try {
            const res = await resultZgPush({
              list: params,achievementType:this.type,achievementIdList:list
            });
            if (res.rspCode === "0000") {
              this.$confirm(`项目成果推送成功,点击确认刷新页面`, "提示", {
                confirmButtonText: "确认",
                type: "success",
              }).then(() => {
                window.location.reload();
              });
            } else {
              this.$message.error(res.rspDesc);
            }
          } catch (error) {
            this.$message.error("网络错误");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    close() {
      this.$emit("close");
    },
    showSelectLeader() {
      this.visibleStaff = true;
    },
    //关闭弹窗
    closeModel() {
      this.visibleStaff = false;
      this.$emit("closeModel");
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.approval-handle {
  position: fixed;
  z-index: 99;
  height: 200px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.16);
  padding: 20px 20px 0 20px;
  transition: all 0.5s ease;
  left: 220px;
  width: calc(100vw - 260px);
  overflow: auto;

  &.on {
    bottom: 0;
  }

  &.close {
    bottom: -520px;
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
      color: #28b0e8;
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
      color: #28b0e8;
    }

    .node-check-icon {
      color: #28b0e8;
      margin: 10px;
    }
  }
}

.approval-display {
  display: flex;
  &.isvisible {
    display: none;
  }
  .approvaSpan {
    padding: 0 10px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #28b0e8;
    margin-right: 20px;
    color: #28b0e8;
    &.cancel {
      border: 1px solid #ccc;
      color: #999;
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
  