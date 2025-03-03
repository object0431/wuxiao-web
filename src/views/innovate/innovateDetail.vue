<template>
    <div class="innovate-detail-page">
        <div class="head-title">创新议题详情</div>
        <el-descriptions class="margin-top" :column="2" border>
            <el-descriptions-item label="标题" span="2" labelStyle="width:150px" >{{ form.title }}</el-descriptions-item>
            <el-descriptions-item label="发布时间" span="2" labelStyle="width:150px" >{{ form.applyDate }}</el-descriptions-item>
            <el-descriptions-item label="创新内容" span="2" labelStyle="width:150px">{{ form.content }}</el-descriptions-item>
            <el-descriptions-item label="是否召集合伙人" labelStyle="width:150px">{{form.canJoin=='1'?'是':'否'}}</el-descriptions-item>
            <el-descriptions-item label="限制最大合伙人数" labelStyle="width:150px">{{ form.partnerNum }}</el-descriptions-item>
            <el-descriptions-item label="已加入合伙人" span="2" labelStyle="width:150px">{{ form.parterNames ||'暂无'}}</el-descriptions-item>
            <el-descriptions-item label="发布范围" span="2" labelStyle="width:150px">{{ form.scope && form.scope.type=='01'?'部门':'人员' }}</el-descriptions-item>
            <el-descriptions-item label="可见范围" span="2" labelStyle="width:150px">{{ form.valNames }}</el-descriptions-item>
        </el-descriptions>
         <!-- 表格区域 -->
        <div v-if="applyLogList&& applyLogList.length" class="applyLogListTitle">合伙人申请记录</div>
       <el-table  :data="applyLogList"  v-if="applyLogList&& applyLogList.length" class="el_table">
            <el-table-column prop="partnerName" show-overflow-tooltip label="申请人"></el-table-column>
            <el-table-column prop="applyDate" show-overflow-tooltip label="申请时间"></el-table-column>
            <el-table-column prop="applyReason" show-overflow-tooltip label="申请原因"></el-table-column>
            <el-table-column prop="applyState" show-overflow-tooltip label="申请状态">
              <template slot-scope="scope">
                <span v-if="scope.row.applyState == '00'">同意</span>
                <span v-if="scope.row.applyState == '01'">待处理</span>
                <span v-if="scope.row.applyState == '02'">拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="replyContent" show-overflow-tooltip label="审批意见"></el-table-column>
            <!-- applyReason -->
        </el-table>

        <div class="detailBox">
            <el-tooltip class="item" content="关注" placement="top" popper-class="testtooltip">
                <div class="follow">
                    <div :class="form.followFlag=='1'?'isFollow':'noFollow'" @click="gotoFollow"></div>
                    <!-- <div>关注</div> -->
                </div>
            </el-tooltip>
            <el-tooltip class="item" content="点赞" placement="top" popper-class="testtooltip">
                <div class="follow">     
                    <div :class="form.evaluateFlag =='1' && form.evaluateType=='LIKE' ? 'isLike':'noLike'" @click="gotoLike"></div>
                    <div>{{ form.likeNum || 0 }}</div>
                </div>
            </el-tooltip>
            <el-tooltip class="item" content="踩" placement="top" popper-class="testtooltip">
                <div class="follow">    
                    <div :class="form.evaluateFlag =='1' && form.evaluateType=='DISLIKE' ? 'isStep':'noStep'" @click="gotoStep"></div>
                    <div>{{ form.dislikeNum || 0 }}</div>
                </div>
            </el-tooltip>
        </div>
        <div class="commentBox">
            <div class="commentTitle">发表评论</div>
            <div class="ament">
                <div class="avatar"></div>
                <div class="mentTextArea">
                    <el-input
                        v-model="content"
                        type="textarea"
                        placeholder="请输入"
                        rows="2"
                    ></el-input>
                </div>
                <div class="mentBtn" @click="goissueComment">发表</div>
            </div>
        </div>
        <div class="commentBox" v-if="form.commentList && form.commentList.length>0">
            <div class="commentTitle">评论列表</div>
            <div v-for="item,key in form.commentList" :key="key" class="listBoxComment">
                <div class="commentItem">
                    <div class="avatar_comment">
                      <img src="../../assets/image/avater.png" alt="">
                    </div>
                    <div class="comment">
                        <div class="com_name">{{ item.staffName }}</div>
                        <div class="com_content">
                          {{ item.content }}
                          <span 
                            class="deleteComm" 
                            v-if="item.staffId==userInfo.mainUserId" 
                            @click="deleteComment(item)"
                          >删除</span>
                        </div>
                         <!-- <div class="com_content">中国联合网络通信有限公中国联合网络通信有限公司陕西省分公司评论中国联合网络通信有限公司陕西省分公司评论中国联合网络通信有限公司陕西省分公司评论司陕西省分公司评论</div> -->
                        <div class="com_time">{{ item.commentDate }}</div>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <div class="operation">
                <div class="operation-text"></div>
                <div class="operation-btn">
                    <el-button class="minorGrayButton" @click="goBack">返回</el-button>
                </div>
            </div>
        </footer>

    </div>
</template>
  
<script>
import {
    detailQuery,issuesComment
} from '@/assets/api/innovate/index'
export default {
    name: "approvalApplication",
    data() {
        return {
            currentProjectId: "",
            form: {},
            tableLoading: false,
            isShow:false,
            scoreShow:false,
            roleList:[],
            content:"",
            userInfo:"",
            applyLogList:[],
        };
    },
    created() {
        let {issuesId} = this.$route.query;
        if(issuesId){
            this.currentProjectId = issuesId;
            this.detailQuery(issuesId);
        }
        if(sessionStorage.getItem("userInfo")){
          this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"))
          
        }
      
    },
    methods: {
         //详情
         async detailQuery(id) {
            const res = await detailQuery({issuesId:id});
            
            if (res.rspCode == "0000") {
                
                this.form=res.rspBody
                if(res.rspBody && res.rspBody.applyLogList && res.rspBody.applyLogList){
                  this.applyLogList=res.rspBody.applyLogList
                }
                let paList=[]
                let vaList=[]
                if(res.rspBody && res.rspBody.partnerList &&  res.rspBody.partnerList.length>0){
                    res.rspBody.partnerList.map((item)=>{
                        paList.push(item.partnerName)
                    })
                    this.form.parterNames=paList.join('，')
                }
                if(res.rspBody && res.rspBody.scope && res.rspBody.scope.values &&  res.rspBody.scope.values.length>0){
                    res.rspBody.scope.values.map((item)=>{
                        vaList.push(item.name)
                    })
                    this.form.valNames=vaList.join('，')
                }

            } else {
                this.$message.error(res.rspDesc);
            }
        },
        //关注
        gotoFollow(){
            let param={
                "issuesId": this.currentProjectId,
            }
            if(this.form.followFlag=='1'){
                param.cancelFollow='1'
            }else{
                param.follow='1'
            }
            this.goToComment(param,(res)=>{
                
                if(res.rspCode=='0000'){
                    this.detailQuery(this.currentProjectId)
                }else{
                    this.$message.error(res.rspDesc);
                }
            })
        },
        gotoLike(){
            let param={
                "issuesId": this.currentProjectId,
            }
            if(this.form.evaluateFlag =='1' && this.form.evaluateType=='LIKE'){
                param.cancelLike='1'
            }else if(this.form.evaluateFlag =='1' && this.form.evaluateType=='DISLIKE'){
                this.$notify({
                title:'警告',
                message:'已经踩了此创新议题，不能再点赞了！',
                type:'warning'
              })
              return
            }else{
                param.like='1'
            }
            this.goToComment(param,(res)=>{
                
                if(res.rspCode=='0000'){
                    this.detailQuery(this.currentProjectId)
                }else{
                    this.$message.error(res.rspDesc);
                }
            })
        },
        gotoStep(){
            let param={
                "issuesId": this.currentProjectId,
            }
            if(this.form.evaluateFlag =='1' && this.form.evaluateType=='LIKE'){
                this.$notify({
                title:'警告',
                message:'已经赞了此创新议题，不能再踩了！',
                type:'warning'
              })
              return;
            }else if(this.form.evaluateFlag =='1' && this.form.evaluateType=='DISLIKE'){
                param.cancelDisLike='1'
            }else{
                param.disLike='1'
            }
            this.goToComment(param,(res)=>{
                
                if(res.rspCode=='0000'){
                    this.detailQuery(this.currentProjectId)
                }else{
                    this.$message.error(res.rspDesc);
                }
            })
        },
        //评论
        goissueComment(){
            if(!this.content){
                this.$notify({
                title:'警告',
                message:'请输入评论内容',
                type:'warning'
              })
            }
            let param={
                "issuesId": this.currentProjectId,
                "comment": this.content,
            }
            this.goToComment(param,(res)=>{
                
                if(res.rspCode=='0000'){
                    this.content=''
                    this.detailQuery(this.currentProjectId)
                }else{
                    this.$message.error(res.rspDesc);
                }
            })
        },
        // 删除评论
        deleteComment(item){
          let that=this
          
          let param={
            issuesId:this.currentProjectId,
            delCommentId:item.commentId,
          }
          this.$confirm(
            `您确定删除当前评论吗？`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(() => {
            that.goToComment(param,(res)=>{
              
              if(res.rspCode=='0000'){
                  this.$message.success("删除成功");
                  this.detailQuery(this.currentProjectId)
              }else{
                  this.$message.error(res.rspDesc);
              }
            })
          });
            
        },
        async goToComment(param,cb){
          
          const res = await issuesComment(param);
          cb(res)
        },
        //返回
        goBack() {
            this.$router.go(-1);
        },
        

    },
};
</script>
  
<style lang="scss" scoped>
.innovate-detail-page {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 80px;

    // height: 100%;
    ::v-deep(.el-form-item__content .el-input-group) {
        vertical-align: baseline;
    }

    .nameBox{
        position: relative;
        margin-bottom: 10px;
    }
    .name{
        border: 1px solid #5991FF;
        margin-right: 20px;
        color: #5991FF;
        border-radius: 5px;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        padding: 0 7px;
    }
    .container {
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        padding: 20px 0;

        .text {
            font-family: PingFang-SC-Heavy;
            font-size: 14px;
            color: #040404;
            letter-spacing: 0;
            text-align: justify;
            font-weight: 800;
            padding-bottom: 10px;
        }

        .trainingCourse-container-item {
            background-color: #fafafa;
            padding: 10px 0;
            margin-bottom: 10px;
            position: relative;

            .form-btn {
                position: absolute;
                right: 5px;
                bottom: 5px;
            }
        }

        .trainingCourse-container-add {
            margin-top: 10px;
            background: #ffffff;
            border: 1px dashed rgba(174, 0, 3, 1);
            border-radius: 2px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #5991FF;
            letter-spacing: 0;
            font-weight: 400;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .linkPoint {
        margin-top: 20px;
    }

    footer {
        .operation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding-right: 20px;
            height: 100%;
            .operation-text {
                color: #333;
                font-size: 14px;
                margin-left: 20px;
                font-weight: 800;
            }
        }

        background: #ffffff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
        height: 80px;
        line-height: 80px;
        position: fixed;
        bottom: 0;
    left: 300px;
    width: calc(100vw - 300px);
    }
    .imgShow{
        height: 200px;
        width: 300px; 
        background-size: 100%;
        background-position: center;
        display: flex;
        // width: 100%;
        margin: 0 auto;
    }
    .listBoxComment{
        width: 66.6666666667%;
    }
    .commentBox{
        display: flex;
        flex-direction: column;
        .commentTitle{
            font-size: 16px;
            font-weight: 700;
            padding: 8px;
        }
        .ament{
            width: 66.6666666667%;
            display: flex;
            padding: 0 12px;
            margin-top: 10px;
            .avatar{
                width: 28px;
                height: 28px;
                background-image: url("../../assets/image/avater.png");
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: auto 100%;
                box-sizing: border-box;
            }
            .mentTextArea{
                flex: 1;
                margin: 0 10px;
            }
            .mentBtn{
                background: #5991FF;
                color: #fff;
                height: 34px;
                line-height: 34px;
                padding: 0 12px;
                border-radius: 6px;
                font-size: 14px;
                cursor: pointer;
            }
        }
        .commentItem{
            display: flex;
            padding: 0 40px;
            margin-top: 10px;
            .avatar_comment{
                width: 28px;
                height: 28px;
                box-sizing: border-box;
                margin-right: 10px;
            }
            .avatar_comment img{
              width: 28px;
            }
            .comment{
                font-size: 14px;
                .com_name{
                   font-weight: 700;
                   margin-bottom: 8px;
                }
                .com_content{
                    margin-bottom: 8px;
                }
                .deleteComm{
                  font-size: 10px;
                  color: rgb(240, 70, 70);
                  margin-left: 6px;
                  cursor: pointer;
                }
                .com_time{
                    margin-bottom: 8px;
                    color: #999;
                }
            }
        }
    }
    .detailBox{
        align-items: center;
        padding: 10px 28px;
        color: #999;
        font-size: 14px;
        margin-top: 12px;
        display: flex;
        align-items: center;
        // justify-content: end;
        width: 66.6666666667%;
        .follow{
            display: flex;
            align-items: center;
            margin-right: 30px;
            cursor: pointer;
            .isLike{
                width: 18px;
                height: 18px;
                background-image: url("../../assets/image/isLike.png");
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: auto 100%;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin-right: 2px;
            }
            .noLike{
                width: 18px;
                height: 18px;
                background-image: url("../../assets/image/noLike.png");
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: auto 100%;
                box-sizing: border-box;
                margin-right: 2px;
            }
            .isFollow{
                width: 18px;
                height: 18px;
                background-image: url("../../assets/image/isFollow.png");
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: auto 100%;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin-right: 2px;
            }
            .noFollow{
                width: 18px;
                height: 18px;
                background-image: url("../../assets/image/noFollow.png");
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: auto 100%;
                box-sizing: border-box;
                margin-right: 2px;
            }
            .isStep{
                width: 18px;
                height: 18px;
                background-image: url("../../assets/image/isStep.png");
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: auto 100%;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin-right: 2px;
            }
            .noStep{
                width: 18px;
                height: 18px;
                background-image: url("../../assets/image/noStep.png");
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: auto 100%;
                box-sizing: border-box;
                margin-right: 2px;
            }
        }
    }
}
::v-deep .el-descriptions :not(.is-bordered) .el-descriptions-item__cell{
    white-space: pre-wrap;
}
::v-deep .el-form-item {
    margin-bottom: 10px;
}

::v-deep .el-range-editor.el-input__inner {
    margin-top: 5px;
}

::v-deep.el-date-editor .el-range__icon {
    margin-bottom: 8px;
}

::v-deep.el-date-editor .el-range-separator {
    margin-bottom: 10px;
    color: #606266;
}
::v-deep .el-table__header-wrapper th{
  background: #fafafa !important;
}
::v-deep .el-table th.el-table__cell.is-leaf, .el-table td.el-table__cell {
    font-size: 14px !important;
}
.el_table{
  margin-top: 10px;
  border: 1px solid #EBEEF5;
}
.applyLogListTitle{
  font-size: 16px;
  font-weight: 700;
  margin-top: 9px;
}
// ::v-deep .el-select-dropdown .el-select-dropdown__item {
//   padding-right: 0;
//   padding-left: 0;
// }
// .el-select-dropdown__item {
//   height: 100%;
// }
</style>
