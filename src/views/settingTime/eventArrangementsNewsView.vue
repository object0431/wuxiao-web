<template>
    <div class="approval-detail-page">
        <div class="head-title">{{ typeLabel[type] }}</div>
        <div class="main-content">
            <el-form ref="form" :model="form" label-position="left" label-width="90px" class="form">
                <!-- 基础信息 -->
                <div class="container" style="padding-top: 0px">
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="标题" prop="title" :rules="{
                                required: true,
                                message: '请输入项目名称',
                                trigger: 'blur',
                            }">
                                <div v-if="pageType !== 'edit'">{{ form.title }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="操作员名称" prop="staffName" :rules="{
                                required: true,
                                message: '请输入操作员名称',
                                trigger: 'blur',
                            }">
                                <div v-if="pageType !== 'edit'">{{ form.staffName }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" >
                            <!-- <el-form-item label="新闻时间" prop="activityTime" label-width="140px" :rules="{
                                required: true,
                                message: '请选择新闻时间',
                                trigger: 'blur',
                            }">
                                <div v-if="pageType !== 'edit'">{{ form.activityTime }}</div>
                            </el-form-item> -->
                            <el-form-item label="操作时间" prop="updateTime" :rules="{
                                required: true,
                                message: '请选择操作时间',
                                trigger: 'blur',
                            }">
                                <div v-if="pageType !== 'edit'">{{ form.updateTime }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="16">
                            <el-form-item label="操作时间" prop="updateTime" :rules="{
                                required: true,
                                message: '请选择操作时间',
                                trigger: 'blur',
                            }">
                                <div v-if="pageType !== 'edit'">{{ form.updateTime }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                </div>

                <!-- 成果介绍 -->
                <div class="container" v-if="pageType !== 'edit'">
                    <div class="text">活动内容</div>
                    <el-row>
                        <div v-if="pageType !== 'edit'" class="activityContent" style="white-space: pre-line">{{ form.content }}</div>
                    </el-row>
                </div>
                <div class="container" v-if="pageType == 'edit'">
                    <div class="text">活动内容</div>
                    <el-row>
                        <el-col :span="16" >
                            <el-form-item label="内容" label-width="190px" prop="updateTime" :rules="{
                                required: true,
                                message: `请输入内容`,
                                trigger: 'blur',
                            }">
                                <!-- <div v-if="pageType !== 'edit'" style="white-space: pre-line">{{ form.content }}</div> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

            </el-form>
        </div>

        <footer >
            <div class="operation">
                <div class="operation-text"></div>
                <div class="operation-btn">
                    <el-button class="minorGrayButton" style="margin: 24px;" @click="goBack">返回</el-button>
                </div>
            </div>
        </footer>
    </div>
</template>
    
<script>
import { activityInfoqueryDetail } from "@/assets/api/resultManage";
export default {
    name: "approvalApplication",
    components: {  },
    data() {
        return {
            pageType: "view",
            type: "XW",
            typeLabel:{
                HD:"活动安排",
                XW:"活动新闻",
            },
            currentLink: "详情查看",
            projectId: "",
            form: {
            },
        };
    },
    created() {
        // 
        
        if (this.$route.params.type) {
            let { type, id } = this.$route.params;
            this.type = type;
            this.querySearchView(id);
        }
    },
    methods: {
        
        //返回
        goBack() {
            this.$router.go(-1);
        },
        async querySearchView(id){
            let formData = new FormData()
            formData.append('id', id)
            const res = await activityInfoqueryDetail(formData);
            if (res.rspCode == "0000") {
                this.form = res.rspBody;
            } else {
                this.$message.error(res.rspDesc);
            }
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
        .activityContent{
            white-space: pre-line;
            font-size: 14px;
            line-height: 26px;
            padding: 0 90px;
            color: #000;
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
            color: #5991ff;
            letter-spacing: 0;
            font-weight: 400;

            &:hover {
                cursor: pointer;
            }
        }

        .downloadBox {
            display: flex;
            flex-direction: column;
            font-size: 14px;

            .downloadItem {
                display: flex;
                margin: 10px;

                .downTitle {
                    color: #909399;
                    text-indent: 20px;
                }

                .downBtn {
                    color: #5991ff;
                    margin: 0 20px;
                }
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