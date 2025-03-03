<template>
    <div class="approval-detail-page">
        <div class="head-title">项目立项详情</div>
        <el-descriptions class="margin-top" :column="2" border>
            <el-descriptions-item label="项目名称" span="2" labelStyle="width:120px" >{{ form.programName }}</el-descriptions-item>
            <el-descriptions-item label="预计起始日期" labelStyle="width:120px">{{ `${form.approvalTime[0]}至${form.approvalTime[1]}` }}</el-descriptions-item>
            <el-descriptions-item label="预计效益" labelStyle="width:120px">{{ form.proBudget }}万元</el-descriptions-item>
            <el-descriptions-item label="所属类别" labelStyle="width:120px">{{ form.cateName }}</el-descriptions-item>
            <el-descriptions-item label="所属项目" labelStyle="width:120px">{{ form.proName }}</el-descriptions-item>
            <el-descriptions-item label="创新性" span="2" labelStyle="width:120px">{{ form.innovativeness }}</el-descriptions-item>
            <el-descriptions-item label="先进性" span="2" labelStyle="width:120px">{{ form.advancement }}</el-descriptions-item>
            <el-descriptions-item label="团队成员" span="2" labelStyle="width:120px">{{ form.menberNames }}</el-descriptions-item>
            <!-- <el-descriptions-item label="实用性" span="2" labelStyle="width:120px">{{ form.practicability }}</el-descriptions-item>
            <el-descriptions-item label="科技含量" span="2" labelStyle="width:120px">{{ form.technologyContent }}</el-descriptions-item>
            <el-descriptions-item label="推广价值" span="2" labelStyle="width:120px">{{ form.promotionValue }}</el-descriptions-item>
            <el-descriptions-item label="预期效益" span="2" labelStyle="width:120px">{{ form.expectedBenefit }}</el-descriptions-item>
            <el-descriptions-item label="其他" span="2" labelStyle="width:120px">{{ form.others }}</el-descriptions-item> -->
        </el-descriptions>
        <el-divider></el-divider>

        <!-- 流转意见 -->
        <div class="linkPoint" v-if="type !== 'add'">
            <flow-tips :flowList="flowList"></flow-tips>
        </div>

        <!-- 专家咨询 -->
        <div class="linkPoint" v-if="type == 'view'">
            <expert-score :expertList="expertList" @getScoring="getScoring"></expert-score>
        </div>

        <footer>
            <div class="operation">
                <div class="operation-text">当前环节: {{ currentLink }}</div>
                <div class="operation-btn">
                    <el-button class="minorGrayButton" @click="goBack">返回</el-button>
                    <el-button class="minorRedButton" v-if="type=='examine'" @click="showTransfer">转发</el-button>
                    <el-button class="mainRedButton" style="width: 100px" @click="submitApply"
                        v-if="type !== 'view'">审核
                    </el-button>
                </div>
            </div>
        </footer>

        <!-- 办理浮层 -->
        <approvalExamine v-if="type !== 'view'" :visible="handleVisable" @close="handleVisable = false"
            @submit="onSubmit" :projectId="currentProjectId" ></approvalExamine>
        <tranferPeople v-if="type !== 'view'" :visible="isShow" @closeModel="isShow = false"
            :projectId="currentProjectId" @addPeople="addPeople" ></tranferPeople>
        <getScore :visible="scoreShow" @closeModel="scoreShow = false" @submit="submitScore"></getScore>

<!--        <addStaff :visible="addStaffVisible" :orgCode="userInfo.companyId" :deptCode="userInfo.deptId"   @close="addStaffVisible=false" @closeAddModel="closeAddModel"></addStaff>-->
    </div>
</template>
  
<script>
import {
    detailProject,qryFLowLog,approvalProject,transferProject
} from '@/assets/api/approval/index'
import {
    queryListConsult,gradeConsult,getCurrentNode
} from '@/assets/api/common/index'
import expertScore from "@/components/expertScore/expertScore.vue";
import flowTips from "@/components/flowTips/flowTips.vue";
import approvalExamine from "@/components/approval/approvalExamine.vue";
import tranferPeople from "@/components/approval/tranferPeople.vue";
import getScore from "@/components/approval/getScore.vue";
import {mapMutations} from "vuex";
export default {
    name: "approvalApplication",
    components:{approvalExamine,flowTips,tranferPeople,expertScore,getScore},
    data() {
        return {
            type: "",
            currentLink: "申请人",
            currentProjectId: "",
            userInfo: {
                companyName: "",
                deptName: "",
                emailAddress: "",
                mobileTel: "",
                empName: "",
            },
            form: {
                programName:"",//项目名称
                approvalTime:['',''],//预计起始日期
                proBudget:null,//预计效益
                cateName:"",//所属类别
                proName:"",//所属项目
                innovativeness:"",//创新性
                advancement:"",//先进性
                practicability:"",//实用性
                technologyContent:"",//科技含量
                promotionValue:"",//推广价值
                expectedBenefit:"",//预期效益
                others:"",//其他
            },
            cateList:[],
            programList:[],
            //流转详情
            flowList: [],
            //专家咨询
            expertList:[],
            //办理浮层
            handleVisable: false,
            tableLoading: false,
            isShow:false,
            scoreShow:false,
            currentCode:"",//当前评分item的id
        };
    },
    created() {
        // if (this.$route.params.type) {
        //     let { type, projectId } = this.$route.params;
        //     this.type = type;
        //     this.currentProjectId = projectId;
        //     this.queryApprovalDetail();
        //     this.qryFLowLog(projectId);
        // }
        let { type, projectId } = this.$route.query;
        if(type && projectId){
            this.type = type;
            this.currentProjectId = projectId;
            this.queryApprovalDetail();
            this.queryConsultList()
            this.getCurrentNode(projectId)
        }
    },
    methods: {
        ...mapMutations(['removeCheckTabs']),
         //详情
         async queryApprovalDetail() {
            const res = await detailProject({projectId:this.currentProjectId});
            
            if (res.rspCode == "0000") {
                //赋值
                let list= res.rspBody;
                let time=[]
                time.push(list.startTime.slice(0,10))
                time.push(list.endTime.slice(0,10))
                let array=list.projectAttrList;
                this.form={
                    programName:list.projectName,//项目名称
                    approvalTime:time,//预计起始日期
                    proBudget:list.economicBenefit,//预计效益
                    cateName:list.typeAttrName,//所属类别
                    proName:list.projectAttrName,//所属项目
                    innovativeness:array.find(item => item.attrCode === 'CXX') && array.find(item => item.attrCode === 'CXX').attrValue || '',//创新性
                    advancement:array.find(item => item.attrCode === 'XJX') && array.find(item => item.attrCode === 'XJX').attrValue || '',//先进性
                    menberNames:list.menberNames,
                    // practicability:array.find(item => item.attrCode === 'SYX') && array.find(item => item.attrCode === 'SYX').attrValue,//实用性
                    // technologyContent:array.find(item => item.attrCode === 'KJHL') && array.find(item => item.attrCode === 'KJHL').attrValue,//科技含量
                    // promotionValue:array.find(item => item.attrCode === 'TGJZ') && array.find(item => item.attrCode === 'TGJZ').attrValue,//推广价值
                    // expectedBenefit:array.find(item => item.attrCode === 'YJXY') && array.find(item => item.attrCode === 'YJXY').attrValue,//预期效益
                    // others:array.find(item => item.attrCode === 'QT') && array.find(item => item.attrCode === 'QT').attrValue,//其他
                }
                this.flowList = list.approvalFlowList;
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        //查询咨询详情
        async queryConsultList(){
            const res = await queryListConsult(this.currentProjectId);
            if (res.rspCode=='0000') {
                this.expertList=res.rspBody
            } else {
                this.$message.error(res.rspDesc)
            }
        },
        //查询流转详情
        async qryFLowLog(id) {
            const res = await qryFLowLog({
                flowType: "LXSQ",
                extId: id,
            });
            if (res.rspCode == "0000") {
                this.flowList = res.rspBody;
            }
        },
        //返回
        goBack() {
            this.$router.go(-1);
        },
         //选择认证名所属类别
        cateNameChange(val) {
            this.form.ca = "";
        },
        proNameChange(val) {
            this.form.ca = "";
        },
        //点击办理
        submitApply() {
            this.handleVisable = true
        },
        //确认办理
        async onSubmit(data) {
            
            this.tableLoading = true
            let param={
                "projectId": this.currentProjectId,
                "remark": data.textarea,
                "retType": data.checkCode
            }
            const res = await approvalProject(param)
            
            if (res.rspCode=='0000') {
                this.tableLoading = false
                // this.$message.success("审核成功");
                this.closeApprove()
                // this.goBack();
            } else {
                this.tableLoading = false
                this.$message.error(res.rspDesc)
            }
        },
        async getCurrentNode(id) {
            const res = await getCurrentNode({
                flowType: 'LXSQ',
                extId: id
            });
            if (res.rspCode == '0000') {
                this.currentLink = res.rspBody.nodeName
            }
        },
        //返回
        goBack() {
            this.$router.go(-1);
        },
        //转发
        async addPeople(data){  
            
            let param={
                "projectId": this.currentProjectId,
                "transferType": data.roleId,
                "transferStaffId": data.staffId,
                "transferStaffName": data.staffName,
                "remark": ""
            }
            const res = await transferProject(param)
            
            if (res.rspCode=='0000') {
                this.$message.success("转发成功");
                this.isShow=false
            } else {
                this.$message.error(res.rspDesc)
                this.isShow=false
            }
        },
        showTransfer(){
            this.isShow=true
        },
        getScoring(code){
            
            this.currentCode=code
            this.scoreShow=true
        },
        //评分
        async submitScore(score){
            this.tableLoading = true
            this.scoreShow=false
            
            //查询专家评分接口
            const res = await gradeConsult(this.currentCode,score)
            if (res.rspCode=='0000') {
                this.tableLoading = false
                this.$message.success("评分成功");
                // this.goBack();
                this.queryConsultList(this.currentProjectId)
            } else {
                this.tableLoading = false
                this.$message.error(res.rspDesc)
            }
        },
        closeApprove() {
            const currentTab = JSON.parse(sessionStorage.getItem('currentTab')) || {}
            this.removeCheckTabs(currentTab.name)
        }

    },
};
</script>
  
<style lang="scss" scoped>
.approval-detail-page {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 80px;

    // height: 100%;
    ::v-deep(.el-form-item__content .el-input-group) {
        vertical-align: baseline;
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
    
    .leftClass{
        width:120px !important;
        background: #5991FF !important;
    }
}
.el-descriptions-item__label.is-bordered-label{
    width:120px;
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
::v-deep .el-descriptions :not(.is-bordered) .el-descriptions-item__cell{
    white-space: pre-wrap;
}
// ::v-deep .el-select-dropdown .el-select-dropdown__item {
//   padding-right: 0;
//   padding-left: 0;
// }
// .el-select-dropdown__item {
//   height: 100%;
// }
</style>