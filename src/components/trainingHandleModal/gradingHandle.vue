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
        :model="handleForm"
        ref="handleForm"
      >
        <el-form-item
          label="评奖项目："
          required
        >
          <el-col>
            <div style="display:flex;flex-direction: column;">
              <div
                class="approval-display"
                v-for="(item, index) in projectList"
                :key="item.achievementId"
              >
                <span class="approvaSpan">{{`${index+1}. ${item.projectName}-${item.applierName}`}}</span>
              </div>
            </div>
          </el-col>
        </el-form-item>

        <el-form-item
          label="奖项选择"
          required
        >
          <el-col :span="5">
            <el-form-item
              prop="checkLevel"
              :rules="{
              required: true, message: '请选择一个奖项', trigger: 'change'
            }"
            >
              <el-select
                v-model="handleForm.checkLevel"
                placeholder="请选择"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item1 in levels"
                  :key="item1.key"
                  :label="item1.value"
                  :value="item1.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="附件上传">
          <el-upload
            class="upload-demo"
            action="/fsip-project/file/uploadFile"
            :on-preview="handlePreview"
            :on-remove="(file, fileList)=>{return handleRemove(file, fileList, true)}"
            :before-upload="(file)=>{return beforeUpload(file,true)}"
            multiple
            :limit="5"
            :on-exceed="(files, fileList)=>{return handleExceed(files, fileList,true)}"
            :on-success="(res, file, fileList)=>{return handleSuccess(res, file, fileList, true)}"
            :file-list="appendixList"
          >
          <el-button
              type="text"
              icon="iconfont icon-daochu"
              class="main-text-blue"
          >上传附件</el-button>
          <!-- <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
              </div> -->
          <span class="tip">只能上pdf文件，且不超过50M</span>
          </el-upload>

        </el-form-item>
        <el-form-item
          label=""
          class="add-btn-item"
        >
          <el-button
            class="mainRedButton"
            @click="onSubmit()"
            :loading="loading"
          >评奖</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <addLeader :visible="visibleStaff" @closeModel="closeModel" @addLeader='addLeader'></addLeader> -->
  </div>

</template>
  
  <script>
import addLeader from "@/components/approval/addLeader.vue";
import { selPendingRating } from "@/assets/api/resultManage/index";

export default {
  name: "gradingHandle",
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
    projectList: {
      type: Array,
      default: "",
    },
    majorLine: {
      type: String,
      default: "",
    },
    type:{
      type: String,
      default: "",
    }
  },
  data() {
    return {
      levels: [
        { key: "CITY_1", value: "一等奖" },
        { key: "CITY_2", value: "二等奖" },
        { key: "CITY_3", value: "三等奖" },
        { key: "CITY_4", value: "入围创新项目" },
      ],
      checkLevel: "",
      visibleStaff: false,
      pageParam: {
        pageNum: 1,
        pageSize: 50,
        total: 0,
      },
      handleForm:{
        checkLevel:'',
        projects:''
      },
      appendixList:[]
    };
  },
  created() {
    
  },
  methods: {
    addLeader(list) {
      
    },
    //提交
    onSubmit() {
      
          

      this.$confirm(`您确定给当前项目的评奖吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let list=[]
          
          if (this.appendixList && this.appendixList.length > 5) {
            this.$message({
              type: "info",
              message: "最多上传5个附件",
            });
            return;
          }
          if (this.appendixList && this.appendixList.length > 0) {
            this.appendixList.map(item=>{
              list.push({name:item.fileName})
            })
          }
          let params = this.projectList.map((item) => {
            return {
              achievementId: item.achievementId,
              level: this.handleForm.checkLevel,
            };
          });
          try {
            const res = await selPendingRating({
              reqParam: params,
              attachmentList:list,
              type:this.type,
            });
           
            if (res.rspCode === "0000") {
              if(res.rspBody && res.rspBody.respCode && res.rspBody.respCode === "0000"){
              this.$confirm(
                  `项目成果评奖完成,点击确认刷新页面`,
                  "提示",
                  {
                    confirmButtonText: "确定",
                    type: "warning",
                  }
                ).then(() => {
                  window.location.reload();
                });
              } else {
                this.$message.error(res.rspBody.reqData[0].errorMsg);
              }

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
    /** 文件上传 */
    handlePreview(file) {
        
        const link = document.createElement("a");
        // download属性
        link.setAttribute("download", file.name);
        // href链接
        link.setAttribute("href", file.url);
        link.setAttribute("target", "_blank");
        // 自执行点击事件
        link.click();
    },
    //上传附件
    handleSuccess(res, file, fileList,) {
      
      
      this.appendixList.push({ fileName: res.rspBody.fileName, filePath: res.rspBody.url,ossFileCode:res.rspBody.fileName,name:res.rspBody.originalFilename });
    },
    handleRemove(file, fileList) {
      this.appendixList.map((item, index) => {
          if (item.name === file.name) {
          this.appendixList.splice(index, 1);
          }
      });
    },
    handleExceed(files, fileList) {
      this.$message.error(
          `当前限制选择 5 个文件，本次选择了 ${
              files.length
          } 个文件，共选择了 ${files.length} 个文件`
      );
    },
    beforeUpload(file){
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["png", "jpg", "jpeg"];
      if (fileSuffix.indexOf('pdf') === -1) {
          this.$message.info("上传文件只能是pdf文件 ");
          return false;
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.approval-handle {
  position: fixed;
  z-index: 99;
  min-height: 300px;
  max-height: 440px;
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
  // flex-direction: column;
  &.isvisible {
    display: none;
  }
  .approvaSpan {
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    color: #666;
    margin-bottom: 10px;
    margin-top: 4px;
    border-radius: 4px;
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
  