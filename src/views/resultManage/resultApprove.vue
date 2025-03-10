<template>
  <div
    class="settle-detail"
    v-loading="pageLoading"
  >
    <div class="head-title">项目成果信息</div>
    <i
      class="el-icon-close back-close"
      @click="closeApprove"
    ></i>
    <el-descriptions
      class="margin-top"
      :title="`项目名称: ${form.projectName}`"
      :column="2"
      border
    >
      <el-descriptions-item
        label="项目起止时间"
        span="2"
      >{{form.startDate}}至{{form.endDate}}</el-descriptions-item>
      <el-descriptions-item label="申请人">{{ form.applierName }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ form.applierCompanyId }}</el-descriptions-item>
      <el-descriptions-item label="部门">{{ form.applierDeptId }}</el-descriptions-item>
      <el-descriptions-item label="所属类别">{{ form.innovationType }}</el-descriptions-item>
      <el-descriptions-item label="所属项目">{{ form.projectType }}</el-descriptions-item>
      <el-descriptions-item label="创造经济效益/社会效益(万元)">{{ form.benefit }}</el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
    <div class="head-title">成果介绍</div>
    <i
      class="el-icon-close back-close"
      @click="closeApprove"
    ></i>
    <el-descriptions
      class="margin-top"
      :column="1"
    >
      <el-descriptions-item
        v-for="subItem in form.itemList"
        :key="subItem.itemCode"
        :label="subItem.itemName"
        contentStyle="margin: 12px 0;white-space: pre-wrap;"
        labelStyle="font-weight: 600;
                    font-size: 14px;
                    margin: 15px 20px;
                    color: #000;
                    white-space: pre-wrap;"
      >{{subItem.itemValue}}</el-descriptions-item>
    </el-descriptions>

    <!-- 表格分页 -->
    <!-- <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
                   :current-page="current" :page-size="size" layout="prev, pager, next, sizes, total" :total="total"
                   style="text-align: right; margin-top: 10px;">
    </el-pagination> -->
    <footer>
      <span style="float: left;margin-left: 20px;">当前环节: {{ currentLink }}</span>
      <!-- <el-button
        class="minorRedButton_copy"
        @click="closeApprove"
      >返回</el-button> -->
      <el-button
        class="mainRedButton_copy"
        @click="() => handleVisable = true "
        v-if="$route.params.queryType !== 'detail'"
      >
        审核
      </el-button>
    </footer>
    <training-handle-review
      :visible="handleVisable"
      @close="handleVisable = false"
      @submit="onSubmit"
      :loading="submitLoading"
    >
    </training-handle-review>
    <el-divider></el-divider>
    <flow-tips :flowList="flowList"></flow-tips>


    <div class="container" v-if="form.appendixList && form.appendixList.length > 0">
          <div class="text">附件下载</div>
          <div class="downloadBox">
          <div class="downloadItem" v-for="(item,index) in form.appendixList" :key="index">
            <a class="el-upload-list__item-name"><i class="el-icon-document">{{item.originalFilename || item}}</i></a>
            <div class="downBtn" @click="downFile(item)">下载附件</div>
          </div>
          </div>
    </div>
  </div>
</template>

<script>
import { resultSearchDetail } from "@/assets/api/resultManage";
import {
  qryFLowLog,
  getCurrentNode,
  approvalTask,
  downloadFile
} from "@/assets/api/common/index";
import TrainingHandleReview from "@/components/trainingHandleModal/trainingHandleReview.vue";
import TrainingHandle from "@/components/trainingHandleModal/trainingHandle.vue";
import TreeSelect from "@/components/treeSelect/treeSelectCoustom.vue";
import flowTips from "@/components/flowTips/flowTips.vue";
import { mapMutations } from "vuex";

export default {
  name: "planReport",
  components: {
    TrainingHandleReview,
    TreeSelect,
    flowTips,
    TrainingHandle,
  },
  data() {
    return {
      pageLoading: false,
      submitLoading: false,
      form: {},
      tableData: [],
      tableList: [],
      current: 1,
      size: 10,
      total: 0,
      unitTreeData: [],
      handleVisable: false,
      isNeedRefresh: false,
      flowList: [],
      currentLink: "",
      projectId: "",
    };
  },
  created() {
    this.projectId = this.$route.params.applyId;
    console.log(this.$route.params)
    console.log(this.projectId)
    this.querySearchDetail();
    // this.$route.query.applyId
    this.getCurrentNode(this.$route.params.applyId);
  },
  methods: {
    ...mapMutations(["removeCheckTabs"]),
    //查询当前环节
    async getCurrentNode(id) {
      const res = await getCurrentNode({
        flowType: "CGSQ",
        extId: id,
      });
      if (res.rspCode == "0000") {
        this.currentLink = res.rspBody.nodeName;
      }
    },
    //详情
    async querySearchDetail() {
      const res = await resultSearchDetail({ projectId: this.projectId });
      if (res.rspCode == "0000") {
        this.form = res.rspBody;
        // this.flowList = res.rspBody.approvalInfoList || [];
        this.qryFLowLog({
          flowType: "CGSQ",
          extId: this.projectId,
        });
      } else {
        this.$message.error(res.rspDesc);
      }
    },
    async downFile(fileName){
      if(fileName && Object.keys(fileName).length > 0){
        fileName = fileName.fileName;
      }
      this.$message.info('正在下载，请稍后')
      // let reviewId=this.reviewId
      // let fileName=this.form.reviewTitle
      // 
      // let url=window.location.host
      // let file='http://'+url+`/tmc-talent/file/downloadFile?fileName=${fileName}`
      // let link = document.createElement('a'); // 创建a标签
      // link.setAttribute("download", fileName);
      // // href链接
      // link.setAttribute("href", file);
      // link.setAttribute("target", "_blank");
      // // 自执行点击事件
      // link.click();
        await downloadFile(fileName)
    },
    closeApprove() {
      const currentTab = JSON.parse(sessionStorage.getItem("currentTab")) || {};
      this.removeCheckTabs(currentTab.name);
    },
    // // 分页
    // getList() {
    //   this.tableList = this.tableData.filter(
    //       (item, index) =>
    //           index < this.current * this.size &&
    //           index >= this.size * (this.current - 1)
    //   )
    //   this.total = this.tableData.length
    // },
    async onSubmit(data) {
      const params = {
        remark: data.textarea,
        retType: data.checkCode,
        targetId: this.projectId,
        targetType: "CGSQ",
      };
      
      try {
        this.submitLoading = true;
        const res = await approvalTask(params);
        if (res.rspCode == "0000") {
          this.$message.success("审核成功");
          // this.$confirm(`审核成功，点击确认关闭当前页`, "提示", {
          //   confirmButtonText: "确定",
          //   type: "warning",
          // }).then(() => {
            this.closeApprove();
          // });
        } else {
          this.$message.error(res.rspDesc);
        }
        this.submitLoading = false;
      } catch (error) {
        
        this.submitLoading = false;
        this.$message.error("请求出错");
      }
    },
    async qryFLowLog(params) {
      try {
        const res = await qryFLowLog(params);
        if (res.rspCode == "0000") {
          this.flowList = res.rspBody;
        } else {
          this.$message.error(res.rspDesc);
        }
      } catch (error) {
        this.$message.error("请求出错");
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.isNeedRefresh ? (to.meta.refresh = true) : (to.meta.refresh = false);
    if (to.name !== "initiationAdd") {
      this.delCachedPages(from);
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.settle-detail {
  position: relative;
  padding: 20px;
  background: #fff;
  box-sizing: border-box;

  ::v-deep(.el-input) {
    .el-input__inner {
      max-width: 100%;
    }
  }

  .back-close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 22px;
  }

  .table-pane {
    text-align: right;
    margin-bottom: 10px;

    ::v-deep(.el-button) {
      width: 104px;
      height: 26px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  footer {
    box-sizing: border-box;
    height: 60px;
    text-align: right;
    background: #fff;
    -webkit-box-shadow: 8px 0 8px 0 rgb(0 0 0 / 15%);
    box-shadow: 8px 0 8px 0 rgb(0 0 0 / 15%);
    padding: 15px 50px 0 0;
    position: fixed;
    bottom: 0;
    right: 10px;
    width: calc(100vw - 230px);
    z-index: 99;

    .el-button {
      width: 100px;
      height: 30px;
      border-radius: 4px;
    }
  }
}

.textarea-item {
  ::v-deep(.el-form-item__content) {
    height: 100%;
  }
}
::v-deep .el-descriptions :not(.is-bordered) .el-descriptions-item__cell{
    white-space: pre-line;
}
  .container {
    border-bottom: 1px solid rgba(217, 217, 217, 1);
    padding: 20px 0;
    margin-bottom: 40px;

    .text {
      font-family: PingFang-SC-Heavy;
      font-size: 14px;
      color: #040404;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 800;
      padding-bottom: 10px;
    }
    .downloadBox{
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .downloadItem{
        display: flex;
        margin: 10px;
        .downTitle{
          color: #909399;
          text-indent: 20px;
        }
        .downBtn{
          color: #5991ff;
          margin: 0 20px;
        }
      }
    }
  }
</style>