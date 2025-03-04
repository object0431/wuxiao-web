<template>
    <div class="approval-application-page">
        <div class="head-title">项目立项申请</div>
        <div class="main-content">
            <el-form ref="form" :model="form" label-position="right" label-width="90px" class="form">
                <!-- 基础信息 -->
                <div class="container" style="padding-top: 0px">
                    <el-row>                   
                        <el-col :span="8">
                            <el-form-item label="项目名称" prop="programName" :rules="{
                                required: true,
                                message: '请输入项目名称',
                                trigger: 'blur',
                            }">
                                <el-input placeholder="请输入" v-model="form.programName" :disabled="type == 'view'"></el-input>
                            </el-form-item>
                        </el-col>    
                        <el-col :span="8">
                            <el-form-item
                                prop="issuesId"
                                label-width="10px"
                            >
                                <el-select
                                v-model="form.issuesId"
                                placeholder="从已有创新议题中选择项目填入"
                                :disabled="type == 'view'"
                                filterable
                                clearable
                                @change="approvalChange"
                                >
                                <el-option
                                    v-for="item in approvalList"
                                    :key="item.issuesId"
                                    :label="`${item.issuesTitle}-${item.applierName || ''}`"
                                    :value="item.issuesId"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>  
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="预计日期" prop="approvalTime" :rules="{
                                required: true,
                                message: '请选择预计起始日期',
                                trigger: 'blur',
                            }">
                                <el-date-picker style="width: 100%" value-format="yyyy-MM-dd"
                                    v-model="form.approvalTime" type="daterange" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" :disabled="type == 'view'">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="预计效益" prop="proBudget" :rules="{
                                required: true,
                                message: '请输入预计效益',
                                trigger: 'blur',
                            }">
                                <el-input placeholder="请输入" v-model="form.proBudget" @change="changeBenifit"
                                    :disabled="type == 'view' || type == 'review'"><template slot="append">万元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="所属类别" prop="cateName" :rules="{
                                required: true,
                                message: '请选择所属类别',
                                trigger: 'blur',
                            }">
                            <el-select
                                v-model="form.cateName"
                                placeholder="请选择"
                                :disabled="type == 'view'"
                                filterable clearable
                            >
                                <el-option
                                v-for="item in cateList"
                                :key="item.attrCode"
                                :label="item.attrValue"
                                :value="item.attrCode"
                                ></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属项目" prop="proName" :rules="{
                                required: true,
                                message: '请选择所属项目',
                                trigger: 'blur',
                            }">
                            <el-select
                                v-model="form.proName"
                                placeholder="请选择"
                                :disabled="type == 'view'"
                                filterable clearable
                            >
                                <el-option
                                v-for="item in programList"
                                :key="item.attrCode"
                                :label="item.attrValue"
                                :value="item.attrCode"
                                ></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <!-- 项目介绍信息 -->
                <div class="container">
                    <div class="text">项目介绍</div>
                    <el-row>
                        <el-col :span="16" style="margin-bottom: 15px;">
                            <el-form-item label="创新性" prop="innovativeness" :rules="{
                                required: true,
                                message: '请输入创新性内容',
                                trigger: 'blur',
                            }">
                                <el-input
                                v-model="form.innovativeness"
                                type="textarea"
                                placeholder="请输入(最多输入4000字)"
                                :disabled="type == 'view'"
                                rows="4"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16" style="margin-bottom: 15px;">
                            <el-form-item label="先进性" prop="advancement" :rules="{
                                required: true,
                                message: '请输入先进性内容',
                                trigger: 'blur',
                            }">
                                <el-input
                                v-model="form.advancement"
                                type="textarea"
                                placeholder="请输入(最多输入4000字)"
                                :disabled="type == 'view'"
                                rows="4"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <div class="container">
                    <div class="text">团队成员</div>
                    <el-row>
                        <!-- <el-col :span="16" style="margin-bottom: 15px;">
                            <el-form-item label="团队成员" prop="innovativeness">
                                <div style="display: flex;flex-wrap: wrap;">
                                    <div v-for="item,index in roleList"  :value="item.code" :label="item.name" :key="item.code">
                                        <div class="nameBox">
                                            <div class="name">{{ item.name }}</div>
                                            <i class="el-icon-remove" style="font-size: 24px;color: #ff0000;position: absolute;right: 8px;top:-8px" @click="updateList(index)"></i>
                                        </div>
                                    </div>
                                    
                                    <el-button type="primary" style="height: 40px;" @click="changeAddRole">新增</el-button>
                                </div>
                            </el-form-item>
                        </el-col>  -->
                        <el-col :span="16" style="margin-bottom: 15px;">
                            <el-form-item label="团队成员" prop="roleNames" >
                                <el-input
                                v-model="form.roleNames"
                                type="textarea"
                                placeholder="请输入团队成员(以逗号，分隔)"
                                :disabled="type == 'view'"
                                rows="2"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>


        <footer :style="isWorkBench?'left:20px;width: calc(100vw - 20px);':''">
            <div class="operation">
                <div class="operation-text">当前环节: {{ currentLink }}</div>
                <div class="operation-btn">
                    <el-button class="minorGrayButton" @click="goBack">返回</el-button>
                    <el-button class="minorRedButton"  @click="saveInitiation('form')">暂存</el-button>
                    <el-button class="mainRedButton" style="width: 100px" @click="submitApply('form')">办理
                    </el-button>
                </div>
            </div>
        </footer>

        <!-- 办理浮层 -->
        <approvalHandle v-if="type !== 'view'" :visible="handleVisable" @close="handleVisable = false" :isWorkBench="isWorkBench"
            @submit="onSubmit" :extId="currentApplyId"></approvalHandle>
       
       <!-- <addRole :visible="addStaffVisible" :orgCode="userInfo.companyId" :deptCode="userInfo.deptId"   @close="addStaffVisible=false" @closeAddModel="closeAddModel"></addRole> -->
    </div>
</template>
  
<script>
import {
    qryParamList
} from '@/assets/api/common/index'
import {
    saveProject,detailProject
} from '@/assets/api/approval/index'
import {
  issuesList,detailQuery
} from '@/assets/api/innovate/index'
import approvalHandle from "@/components/approval/approvalHandle.vue";
// import addRole from "@/components/approval/addRole.vue";
export default {
    name: "approvalApplication",
    components:{approvalHandle},
    data() {
        return {
            type: "add",
            currentLink: "申请人",
            currentApplyId: "",
            userInfo: {
                companyName: "",
                deptName: "",
                emailAddress: "",
                mobileTel: "",
                empName: "",
            },
            form: {
                programName:"",//项目名称
                approvalTime:"",//预计起始日期
                proBudget:null,//预计效益
                cateName:"",//所属类别
                proName:"",//所属项目
                innovativeness:"",//创新性
                advancement:"",//先进性
                projectId:"",
                roleNames:"",
                issuesId:""
            },
            cateList:[],
            approvalList:[],
            programList:[],
            //办理浮层
            handleVisable: false,
            tableLoading: false,
            errorValue:"",
            isWorkBench:false,
            addStaffVisible:false,
            roleList:[{name:'张三',code:'1'}]
        };
    },
    created() {
        let {companyId,companyName,deptId, deptName, emailAddress, empName, mobileTel } =
            JSON.parse(sessionStorage.getItem("userInfo"));
        this.userInfo = { companyName, deptName, emailAddress, empName, mobileTel,companyId,deptId}
        console.log('this.userInfo', this.userInfo)
        console.log('this.$route.params', this.$route.params)
        if(this.$route.params.isWhere){
            this.isWorkBench=true
        }
        this.qryParamList("CXLX")
        this.queryApprovalApply()
        if (this.$route.params.type) {
            let { type, projectId } = this.$route.params;
            this.type = type;
            this.currentApplyId = projectId;
            this.queryApprovalDetail();
        }
    },
    methods: {
        async qryParamList(value){
            const res = await qryParamList({"attrType": value});
            if (res.rspCode == "0000") {
                //赋值
                
                if(value=="CXLX"){
                    this.cateList = res.rspBody
                    this.qryParamList("XMLX")
                }else{
                    this.programList = res.rspBody
                }
                
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        //创新议题查询
        async queryApprovalApply() {
            let param = {
                "pageNum": 1,
                "pageSize": 99,
                "reqParam": {
                    "selType": "01",
                    "issuesTitle": "",
                    "selfSelType":'01',
                }
            };
            const res = await issuesList({
                ...param,
            });
            
            if (res.rspCode=='0000') {
                if(res.rspBody && res.rspBody.list && res.rspBody.list.length>0){
                    this.approvalList =res.rspBody.list;
                }else{
                    this.approvalList =[]
                }
                
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        async queryApprovalDetail() {
            const res = await detailProject({projectId:this.currentApplyId});
            
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
                    cateName:list.typeAttrCode,//所属类别
                    proName:list.projectAttrCode,//所属项目
                    innovativeness:array.find(item => item.attrCode === 'CXX') && array.find(item => item.attrCode === 'CXX').attrValue,//创新性
                    advancement:array.find(item => item.attrCode === 'XJX') && array.find(item => item.attrCode === 'XJX').attrValue,//先进性
                }
                
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        //返回
        goBack() {
            this.$router.go(-1);
        },
        //暂存
        saveInitiation(formName) {
            this.$refs[formName].validate(async (valid) => {
            if (valid) {
                
                
                let reg=/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                if(this.errorValue && !reg.test(this.errorValue)){
                    this.$message.error('请检查预计效益，仅可输入数字（最多2位小数点）');
                    return
                }
                let cateObj=this.cateList.filter((item)=>{
                    return item.attrCode == this.form.cateName
                })
                
                let proObj=this.programList.filter((item)=>{
                    return item.attrCode == this.form.proName
                })
                if(this.form.innovativeness.length>4000){
                    this.$message.error('请检查创新性，最多输入4000字');
                    return
                }
                if(this.form.advancement.length>4000){
                    this.$message.error('请检查先进性，最多输入4000字');
                    return
                }
                let param = {
                    projectName: this.form.programName,
                    startTime: this.form.approvalTime[0]+' 00:00:00',
                    endTime:this.form.approvalTime[1]+' 23:59:59',
                    economicBenefit:  parseFloat(this.form.proBudget),
                    typeAttrCode: cateObj[0].attrCode,
                    typeAttrName: cateObj[0].attrValue,
                    projectAttrCode:proObj[0].attrCode,
                    projectAttrName: proObj[0].attrValue,
                    // CXX-创新性、XJX-先进行、SYX-实用性、KJHL-科技含量、TGJZ-推广价值、YJXY-预计效益、QT-其他
                    projectAttrList:[{
                        attrType:"XMJS",
                        attrCode:"CXX",
                        attrName:"创新性",
                        attrValue:this.form.innovativeness,
                    },{
                        attrType:"XMJS",
                        attrCode:"XJX",
                        attrName:"先进性",
                        attrValue:this.form.advancement,
                    }
                    ],
                    projectId:this.currentApplyId || "",
                    operateType:'0',
                    menberNames:this.form.roleNames
                }
                const res = await saveProject(param);
                    if (res.rspCode == "0000") {
                        this.$message.success("暂存项目立项成功");
                        this.goBack();
                        // 
                    } else {
                    this.$message.error(res.rspDesc);
                }
            } else {
                return false;
            }
            });
        },
        //点击办理
        submitApply(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                    let reg=/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                    if(this.errorValue && !reg.test(this.errorValue)){
                        this.$message.error('请检查预计效益，仅可输入数字（最多2位小数点）');
                        return
                    }
                    this.handleVisable = true
                } else {
                    return false
                }
            });
        },
        //确认办理
        async onSubmit(data) {
            //处理课程信息
            
            let cateObj=this.cateList.filter((item)=>{
                return item.attrCode == this.form.cateName
            })
            
            let proObj=this.programList.filter((item)=>{
                return item.attrCode == this.form.proName
            })
            if(this.form.innovativeness.length>4000){
                this.$message.error('请检查创新性，最多输入4000字');
                return
            }
            if(this.form.advancement.length>4000){
                this.$message.error('请检查先进性，最多输入4000字');
                return
            }
            let list= JSON.parse(JSON.stringify(data.approvalInfoList));
            list.map((item)=>{
                delete item.apprNumber
                delete item.nodeState
            })
            let param = {
                projectName: this.form.programName,
                startTime: this.form.approvalTime[0]+' 00:00:00',
                endTime:this.form.approvalTime[1]+' 23:59:59',
                economicBenefit: parseFloat(this.form.proBudget),
                typeAttrCode: cateObj[0].attrCode,
                typeAttrName: cateObj[0].attrType,
                projectAttrCode:proObj[0].attrCode,
                projectAttrName: proObj[0].attrType,
                // CXX-创新性、XJX-先进行、SYX-实用性、KJHL-科技含量、TGJZ-推广价值、YJXY-预计效益、QT-其他
                projectAttrList:[{
                    attrType:"XMJS",
                    attrCode:"CXX",
                    attrName:"创新性",
                    attrValue:this.form.innovativeness,
                },{
                    attrType:"XMJS",
                    attrCode:"XJX",
                    attrName:"先进性",
                    attrValue:this.form.advancement,
                }
                ],
                projectId:this.currentApplyId || "",
                operateType:'1',
                applyReq:{
                    opinion:data.opinion,
                    approvalNodeList:[...list]
                },
                menberNames:this.form.roleNames
            }
            const res = await saveProject(param);
                if (res.rspCode == "0000") {
                    this.$message.success("办理项目立项成功");
                    this.goBack();
                    // 
                } else {
                this.$message.error(res.rspDesc);
            }
        },
        changeBenifit(e){
            let reg=/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
            if(!reg.test(e)){
                this.$message.error('请检查预计效益，仅可输入数字（最多2位小数点）');
                this.errorValue=e
                return
            }else{
                this.errorValue=""
            }
        },
        //选择项目详情
        approvalChange(val) {
            
            this.detailQuery(val);
            // this.form = "";
        },
         //议题详情
         async detailQuery(id) {
            const res = await detailQuery({issuesId:id});
            
            if (res.rspCode == "0000") {
                
                this.form.programName=res.rspBody.title
                let list=[]
                if(res.rspBody.partnerList && res.rspBody.partnerList.length>0){
                    res.rspBody.partnerList.map((item)=>{
                        list.push(item.partnerName)
                    })
                }
                this.form.roleNames=list.join('，')
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        changeAddRole(){
            this.addStaffVisible=true
        },
        closeAddModel(data){
            
            this.addStaffVisible=false
            data.map((item)=>{
                this.roleList.push({name:item.staffName,code:item.mainUserId})
            })
        },
        updateList(index){
            this.roleList.splice(index,1)
        }

    },
};
</script>
  
<style lang="scss" scoped>
.approval-application-page {
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
        padding: 0 30px;
        margin-right: 20px;
        color: #5991FF;
        border-radius: 5px;
        // margin-bottom: 10px;
    }
    .delete{
        position: absolute;
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
// ::v-deep .el-select-dropdown .el-select-dropdown__item {
//   padding-right: 0;
//   padding-left: 0;
// }
// .el-select-dropdown__item {
//   height: 100%;
// }
</style>