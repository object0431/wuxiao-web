<template>
  <div
    class="settle-detail"
    v-loading="pageLoading"
  >
    <div class="head-title">合伙人申请审核</div>
    <!-- <i
      class="el-icon-close back-close"
      @click="closeApprove"
    ></i> -->
      <div class="main-content">
            <el-form ref="form" :model="form" label-position="right" label-width="110px" class="form" >
                <!-- 基础信息 -->
                <div class="container" style="padding-top: 0px">
                    <el-row>                   
                        <el-col :span="24">
                            <el-form-item label="议题名称" prop="title">
                            <div>{{form.title || ''}}</div>
                            </el-form-item>
                        </el-col>      
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="创新内容" prop="content">
                             <div style="white-space: pre-wrap;">{{form.content || ''}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                          <el-form-item label="申请人" prop="canJoin">
                          <div>{{form.partnerName}}</div>
                          </el-form-item>
                      </el-col>
                        <el-col :span="12">
                          <el-form-item label="申请时间" prop="canJoin">
                          <div>{{form.applyTime}}</div>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                        <el-form-item label="加入原因" prop="content">
                          <div>{{form.joinReason}}</div>
                        </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                 <el-row>
                      <el-col :span="8">
                        <el-form-item label="审核结果"  :rules="{
                              required: true, message: '请选择审核结果', trigger: 'change'
                            }" >
                          <el-select v-model="applyState" >
                            <el-option value="00" label="同意"></el-option>
                            <el-option value="02" label="拒绝"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="18">
                        <el-form-item 
                          label="申请回复"
                            :rules="{
                              required: true, message: '申请回复不能为空', trigger: 'change'
                            }"
                          >
                          <el-input
                            type="textarea"
                            v-model="replyContent"
                            placeholder="请输入申请回复"
                            maxlength="1000"
                            show-word-limit
                            :autosize="{ minRows: 4, maxRows: 6 }"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
            </el-form>
        </div>
        
    <footer>
      <span style="float: left;margin-left: 20px;">当前环节: {{ currentLink }}</span>
      <el-button
        class="mainRedButton_copy"
        style="margin-right:25px"
        @click="examine"
      >
        提交
      </el-button>
      <el-button
        class="minorRedButton_copy"
        @click="clearClose"
      >关闭</el-button>
      <!-- <el-button
        class="mainRedButton_copy"
        style="margin-right:15px"
      >
        通过
      </el-button>
      <el-button
        class="mainRedButton_copy"
        style="background:red;margin:0px 25px 0px 15px"
      >
        拒绝
      </el-button>
      <el-button
        class="minorRedButton_copy"
        @click="clearClose"
      >关闭</el-button> -->
    </footer>
    <!-- <el-divider></el-divider> -->
  </div>
</template>

<script>
import {
  qryFLowLog,
  getCurrentNode,
  approvalTask,
  downloadFile
} from "@/assets/api/common/index";
import {
    partnerApplySel,
    partnerApply,
    detailQuery,
} from '@/assets/api/innovate/index'
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
      currentLink: "合伙人申请审核",
      projectId: "",
      issuesId:"",
      partnerId:"",
      replyContent:"",
      applyState:"",
    };
  },
  created() {
    if(this.$route.query && this.$route.query.issuesId && this.$route.query.partnerId){
      this.issuesId=this.$route.query.issuesId
      this.partnerId=this.$route.query.partnerId
      this.querySearchDetail(this.issuesId,this.partnerId);
      this.queryTitle(this.issuesId)
    }
  
  },
  methods: {
    ...mapMutations(["removeCheckTabs","clearCheckTabs"]),
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
    async querySearchDetail(params1,params2){
      // TODO:partnerId:"zhangzx126"  issuesId："20230822162250301206"
      const res = await partnerApplySel({issuesId:params1,partnerId:params2});
      if (res.rspCode == "0000") {
        this.form={
            applyTime:res.rspBody.applyTime,
            title:res.rspBody.title,
            issuesId:res.rspBody.issuesId,
            joinReason:res.rspBody.joinReason,
            partnerName:res.rspBody.partnerName,
            content:res.rspBody.content,
        }
        
    } else {
      this.$message.error(res.rspDesc);
    }
      
    },
    async queryTitle(params){
      const res = await detailQuery({issuesId:params});
      if (res.rspCode == "0000") {
        if(res.rspBody && res.rspBody.content){
          this.form.content=res.rspBody.content
        }
        if(res.rspBody && res.rspBody.title){
          this.form.title=res.rspBody.title
        }
        
      }else {
        this.$message.error(res.rspDesc);
      }
    },
    closeApprove() {
      const currentTab = JSON.parse(sessionStorage.getItem("currentTab")) || {};
      this.removeCheckTabs(currentTab.name);
    },
    clearClose(){
      const currentTab = JSON.parse(sessionStorage.getItem("currentTab")) || {};
      this.clearCheckTabs(currentTab.name);
    },
    async examine(){
      if(!this.applyState || !this.applyState.length){
        this.$message.error("请选择审核状态");
        return
      }
      if(!this.replyContent || !this.replyContent.length){
        this.$message.error("请输入申请回复");
        return
      }
      let msg=(this.applyState=='00') ? '同意' :(this.applyState=='02' ? '拒绝' : '')
      let params={
        issuesId:this.issuesId,
        applyState:this.applyState,
        partnerId:this.partnerId,
        replyContent:this.replyContent
      }
       this.$confirm(
       `确定要${msg}该合伙人申请吗？`,
        "确认信息",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
         const res = await partnerApply(params);
          if (res.rspCode=='0000' && res.rspBody.respCode=='0000') {
            this.$message.success("审核成功");
            this.closeApprove()
          }else {
              this.$message.error(res.rspDesc);
          }
      })
      
      
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
  // beforeRouteLeave(to, from, next) {
  //   this.isNeedRefresh ? (to.meta.refresh = true) : (to.meta.refresh = false);
  //   if (to.name !== "initiationAdd") {
  //     this.delCachedPages(from);
  //   }
  //   next();
  // },
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
  .container {
    border-bottom: 1px solid rgba(217, 217, 217, 1);
    padding: 20px 0;
    margin-bottom: 20px;

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
