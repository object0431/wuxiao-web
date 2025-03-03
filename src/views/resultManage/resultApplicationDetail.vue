<template>
    <div class="approval-detail-page">
        <div class="head-title">项目成果详情</div>
        <div class="main-content">
            <el-form ref="form" :model="form" label-position="right" label-width="90px" class="form">
                <!-- 基础信息 -->
                <div class="container" style="padding-top: 0px">
                    <el-row>                   
                        <el-col :span="16">
                            <el-form-item label="项目名称" prop="programName" :rules="{
                                required: true,
                                message: '请输入项目名称',
                                trigger: 'blur',
                            }">
                            <div>{{form.programName}}</div>
                                <!-- <el-input placeholder="请输入" v-model="form.programName" :disabled="type == 'view'"></el-input> -->
                            </el-form-item>
                        </el-col>      
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="起止日期" prop="approvalTime" :rules="{
                                required: true,
                                message: '请选择起止日期',
                                trigger: 'blur',
                            }">
                            <div>{{form.approvalTime[0]}}至{{form.approvalTime[1]}}</div>
                                <!-- <el-date-picker style="width: 100%" value-format="yyyy-MM-dd"
                                    v-model="form.approvalTime" type="daterange" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" :disabled="type == 'view'">
                                </el-date-picker> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="经济效益/社会效益" prop="proBudget" :rules="{
                                required: true,
                                message: '请输入经济效益/社会效益',
                                trigger: 'blur',
                            }">
                             <div>{{form.proBudget}}万元</div>
                                <!-- <el-input placeholder="请输入" v-model="form.proBudget"
                                    :disabled="type == 'view' || type == 'review'"><template slot="append">万元</template>
                                </el-input> -->
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
                            <div>{{form.cateName}}</div>
                            <!-- <el-select
                                v-model="form.cateName"
                                placeholder="请选择"
                                :disabled="type == 'view'"
                                filterable clearable
                                @change="cateNameChange"
                            >
                                <el-option
                                v-for="item in cateList"
                                :key="item.cateCode"
                                :label="item.cateName"
                                :value="item.cateName"
                                ></el-option>
                            </el-select> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属项目" prop="proName" :rules="{
                                required: true,
                                message: '请选择所属项目',
                                trigger: 'blur',
                            }">
                             <div>{{form.proName}}</div>
                            <!-- <el-select
                                v-model="form.proName"
                                placeholder="请选择"
                                :disabled="type == 'view'"
                                filterable clearable
                                @change="proNameChange"
                            >
                                <el-option
                                v-for="item in programList"
                                :key="item.proCode"
                                :label="item.proName"
                                :value="item.proName"
                                ></el-option>
                            </el-select> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <!-- 成果介绍信息 -->
                <div class="container">
                    <div class="text">成果介绍</div>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="创新性" prop="innovativeness" :rules="{
                                required: true,
                                message: '请输入创新性内容',
                                trigger: 'blur',
                            }">
                            <div>{{form.innovativeness}}</div>
                                <!-- <el-input
                                v-model="form.innovativeness"
                                type="textarea"
                                placeholder="请输入"
                                :disabled="type == 'view'"
                                rows="5"
                                ></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="先进性" prop="advancement" :rules="{
                                required: true,
                                message: '请输入先进性内容',
                                trigger: 'blur',
                            }">
                                <div>{{form.advancement}}</div>
                                <!-- <el-input
                                v-model="form.advancement"
                                type="textarea"
                                placeholder="请输入"
                                :disabled="type == 'view'"
                                rows="5"
                                ></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="实用性" prop="practicability" :rules="{
                                required: true,
                                message: '请输入实用性内容',
                                trigger: 'blur',
                            }">
                                <div>{{form.practicability}}</div>
                                <!-- <el-input
                                v-model="form.practicability"
                                type="textarea"
                                placeholder="请输入"
                                :disabled="type == 'view'"
                                rows="5"
                                ></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="科技含量" prop="technologyContent" :rules="{
                                required: true,
                                message: '请输入科技含量内容',
                                trigger: 'blur',
                            }">
                                <div>{{form.technologyContent}}</div>
                                <!-- <el-input
                                v-model="form.technologyContent"
                                type="textarea"
                                placeholder="请输入"
                                :disabled="type == 'view'"
                                rows="5"
                                ></el-input> -->
                            </el-form-item>
                        </el-col>
                        <!-- 推广价值及效果 -->
                        <el-col :span="16">
                            <el-form-item label="推广价值" prop="promotionValue" :rules="{
                                required: true,
                                message: '请输入推广价值',
                                trigger: 'blur',
                            }">
                                <div>{{form.promotionValue}}</div>
                                <!-- <el-input
                                v-model="form.promotionValue"
                                type="textarea"
                                placeholder="请输入"
                                :disabled="type == 'view'"
                                rows="5"
                                ></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="经济效益/社会效益" prop="expectedBenefit" 
                                label-width="140px"
                            :rules="{
                                required: true,
                                message: '请输入经济效益/社会效益及效果内容',
                                trigger: 'blur',
                            }">
                                <div>{{form.expectedBenefit}}</div>
                                <!-- <el-input
                                v-model="form.expectedBenefit"
                                type="textarea"
                                placeholder="请输入"
                                :disabled="type == 'view'"
                                rows="5"
                                ></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="16" v-if="form.others">
                            <el-form-item label="其他" prop="others">
                                <div>{{form.others}}</div>
                                <!-- <el-input
                                v-model="form.others"
                                type="textarea"
                                placeholder="请输入"
                                :disabled="type == 'view'"
                                rows="5"
                                ></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>

        <!-- 流转意见 -->
        <!-- <div class="linkPoint">
            <flow-tips :flowList="flowList"></flow-tips>
        </div> -->

        <footer>
            <div class="operation">
                <div class="operation-text">当前环节: {{ currentLink }}</div>
                <div class="operation-btn">
                    <el-button class="minorGrayButton" @click="goBack">返回</el-button>
                    <el-button class="mainRedButton" style="width: 100px" @click="submitApply('form')"
                        v-if="type !== 'view'">专家建议
                    </el-button>
                </div>
            </div>
        </footer>

        <!-- 办理浮层 -->
        <approvalExamine v-if="type !== 'view'" :visible="handleVisable" @close="handleVisable = false"
            @submit="onSubmit" type="GRPXSQ" :extId="currentApplyId"></approvalExamine>

<!--        <addStaff :visible="addStaffVisible" :orgCode="userInfo.companyId" :deptCode="userInfo.deptId"   @close="addStaffVisible=false" @closeAddModel="closeAddModel"></addStaff>-->
    </div>
</template>
  
<script>
import approvalExamine from "@/components/approval/approvalExamine.vue";
export default {
    name: "approvalApplication",
    components:{approvalExamine},
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
                practicability:"",//实用性
                technologyContent:"",//科技含量
                promotionValue:"",//推广价值
                expectedBenefit:"",//预期效益
                others:"",//其他
            },
            // （小发明、小创造、小革新、小设计、小建议）
            cateList:[{
                cateName:"小发明",
                cateCode:0,
            },{
                cateName:"小创造",
                cateCode:1,
            },{
                cateName:"小革新",
                cateCode:2,
            },{
                cateName:"小设计",
                cateCode:3,
            },{
                cateName:"小建议",
                cateCode:4,
            }],
            // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
           programList:[{
                proName:"系统类",
                proCode:0,
            },{
                proName:"流程类",
                proCode:1,
            },{
                proName:"成本与管理类",
                proCode:2,
            },{
                proName:"服务支撑类",
                proCode:3,
            }],
            //办理浮层
            handleVisable: false,
            tableLoading: false,
        };
    },
    created() {
        if (this.$route.params.type) {
            let { type, applyId } = this.$route.params;
            this.type = type;
            this.currentApplyId = applyId;
            this.queryApprovalApply();
        }
    },
    methods: {
         //详情
         async queryApprovalApply() {
            // const res = await queryPersonalTrainingApplyDetail(this.currentApplyId);
            // if (res.rspCode == "0000") {
            //     //赋值
            //     res.rspBody.courseList.forEach((item) => {
            //       item.trainingtime = [item.trainingStartTime, item.trainingEndTime]
            //     });
            //     this.form = res.rspBody;
            //     this.form.projectFee = this.form.accomBudget + this.form.trainingBudget
            //   
            // } else {
            //     this.$message.error(res.rspDesc);
            // }
            this.form={
                programName:"测试",//项目名称
                approvalTime:["2023-08-09","2023-09-28"],//预计起始日期
                proBudget:12,//预计效益
                cateName:"小发明",//所属类别
                proName:"成本与管理类",//所属项目
                innovativeness:"测试",//创新性
                advancement:"测试",//先进性
                practicability:"测试",//实用性
                technologyContent:"测试",//科技含量
                promotionValue:"测试",//推广价值
                expectedBenefit:"测试",//预期效益
                others:"",//其他
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
        //暂存
        saveInitiation(formName) {
            this.$refs[formName].validate(async (valid) => {
            if (valid) {
                
                
                // let obj = JSON.parse(JSON.stringify(this.form));
                // obj.courseList.forEach((item) => {
                // item.trainingStartTime = item.trainingtime[0];
                // item.trainingEndTime = item.trainingtime[1];
                // delete item.trainingtime;
                // });
                // let obj1 = {
                // needSendSms: null,
                // applyInfo: obj,
                // handleInfo: null,
                // operType: "zc"
                // };
                // const res = await handlePersonalTrainingApply(obj1);
                // if (res.rspCode == "0000") {
                // this.$message.success("暂存个人培训申请成功");
                // this.goBack();
                // } else {
                // this.$message.error(res.rspDesc);
                // }
            } else {
                return false;
            }
            });
        },
        //点击办理
        submitApply(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleVisable = true
                } else {
                    return false
                }
            });
        },
        //确认办理
        async onSubmit(data) {
            //处理课程信息
            
        },

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