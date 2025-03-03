<template>
    <div class="approval-application-page">
        <div class="head-title">新增{{ typeLabel[type] }}</div>
        <div class="main-content">
            <el-form ref="form" :model="form" label-position="right" label-width="90px" class="form">
                <!-- 基础信息 -->
                <div class="container" style="padding-top: 0px">
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="标题" prop="title" :rules="{
                                required: true,
                                message: '请输入标题',
                                trigger: 'blur',
                            }">
                                <el-input placeholder="请输入" v-model="form.title"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="内容" prop="content" :rules="{
                                required: true,
                                message: '请输入内容',
                                trigger: 'blur',
                            }">
                                <el-input  type="textarea" placeholder="请输入内容" v-model="form.content"  :autosize="{ minRows: 3, maxRows: 5}"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="type=='HD'?true:false">
                        <el-col :span="8">
                            <el-form-item :label="type=='HD'?'活动时间':'新闻时间'" prop="activityTime" :rules="{
                                required: true,
                                message: '请选择时间',
                                trigger: 'blur',
                            }">
                                <el-date-picker
                                    v-model="form.activityTime"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

            </el-form>
        </div>

        <footer>
            <div class="operation">
                <div class="operation-text"></div>
                <div class="operation-btn">
                    <el-button class="minorGrayButton" @click="goBack">返回</el-button>
                    <el-button class="mainRedButton" style="width: 100px" @click="submitApply('form')">新增
                    </el-button>
                </div>
            </div>
        </footer>
    </div>
</template>
    
<script>
import { activityInfoSaveActivity,activityInfoSaveNews } from "@/assets/api/resultManage";
export default {
    name: "eventArrangementsNewsAdd",
    components: {  },
    data() {
        return {
            type: "XW",
            typeLabel:{
                HD:"活动安排",
                XW:"活动新闻",
            },
            form: {
                title: "",
                content: "",
                activityTime: "",
            },
        };
    },
    created() {
        
        this.type = this.$route.params.type?this.$route.params.type:"HD"
    },
    methods: {
        
        //返回
        goBack() {
            this.$router.go(-1);
        },
        //点击办理
        submitApply(formName) {
            let this_ = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        ...this_.form,
                        type: this_.type
                    }
                    if(this_.type == 'XW'){
                        this_.activityInfoSaveNews(params)
                    }else{
                        this_.activityInfoSaveActivity(params)
                    }
                } else {
                    return false;
                }
            });
        },
        async activityInfoSaveNews(params){
            delete params.activityTime;
            const res = await activityInfoSaveNews(params);
            if (res.rspCode == "0000") {
                this.$message.success("新增成功");
                this.goBack();
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        async activityInfoSaveActivity(params){
            const res = await activityInfoSaveActivity(params);
            if (res.rspCode == "0000") {
                this.$message.success("新增成功");
                this.goBack();
            } else {
                this.$message.error(res.rspDesc);
            }
        },

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

    .container {
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        padding: 20px 0;
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
</style>