<template>
    <div class="country-detail-page">
        <div class="head-title">国家级成果详情</div>
        <el-form ref="form" :model="form" label-position="right" label-width="90px" class="form">
                <!-- 基础信息 -->
                <div class="container" style="padding-top: 0px">
                    <el-row>                   
                        <el-col :span="16">
                            <el-form-item label="项目名称" prop="projectName">
                            <div>{{form.projectName || ''}}</div>
                            </el-form-item>
                        </el-col>      
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="获奖名称" prop="awardsProjectNameLevel">
                             <div>{{form.awardsProjectNameLevel || ''}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="成果简介" prop="projectIntroduce">
                            <div style="white-space: pre-wrap;">{{form.projectIntroduce || ''}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="主要创造人" prop="mainCreateName">
                            <div>{{form.mainCreateName || ''}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="参与创造人" prop="otherCreateName">
                            <div>{{form.otherCreateName || ''}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <div class="container" v-if="imageUrl">
                    <div class="text">宣传图片</div>
                    <el-row>
                        <el-col :span="24">
                            <!-- <el-form-item label="项目图片" prop="imageUrl">
                            
                            </el-form-item> -->
                            <el-image 
                                v-if="imageUrl" class="imgShow"
                                :src="imageUrl"
                                :preview-src-list="[].concat(imageUrl)">
                            </el-image>
                            <!-- <img v-if="imageUrl" class="imgShow" :src="imageUrl" alt=""> -->
                        </el-col>
                    </el-row>
                </div>

                <div class="container" v-if=" form.attachmentList &&  form.attachmentList.length>0">
                    <div class="text">附件内容</div>
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="(item, i) in form.attachmentList" :key="i">
                            <div class="main-item">
                                <img :src="getCoursewareCover(item)" alt="" @click="goView(item)">
                                <div class="title">{{ item }}</div>
                                <!-- <el-progress :percentage="Number(item.progressRate)"></el-progress> -->
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-form>

        <footer :style="isWorkBench?'left:20px;width: calc(100vw - 20px);':''">
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
    selNationalProjectAchievementDetai
} from '@/assets/api/countryProject/index'
import {
    downloadBase64,downloadFileView,downloadFile
} from '@/assets/api/common/index'
export default {
    name: "approvalApplication",
    data() {
        return {
            currentProjectId: "",
            form: {
                imageUrl:''
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
            imageUrl:"",
            isWorkBench:false,
            coursewareCoverList: {
                'pdf': require('@/assets/image/pdf.png'),
            }
        };
    },
    created() {
        let {projectId,isWhere} = this.$route.query;
        if(projectId){
            this.currentProjectId = projectId;
            this.queryApprovalDetail(projectId);
        }
        if(isWhere){
            this.isWorkBench=true
        }
    },
    methods: {
         //详情
         async queryApprovalDetail(id) {
            const res = await selNationalProjectAchievementDetai({achievementId:id});
            
            if (res.rspCode == "0000") {
                
                this.form=res.rspBody
                if(res.rspBody.backImage){
                    this.queryBase64(res.rspBody.backImage)
                }
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        async queryBase64(name){
            const res = await downloadBase64(name);
            
            this.form.imageUrl='data:image/png;base64,'+res
            this.imageUrl='data:image/png;base64,'+res
            
        },
        //返回
        goBack() {
            this.$router.go(-1);
        },
        //返回
        goBack() {
            this.$router.go(-1);
        },
        getCoursewareCover(item) {
            return this.coursewareCoverList['pdf']  
        },
        getObjectURL(file) {
            var binaryData = [];
            binaryData.push(file);
            let url = null;
            if (window.createObjectURL !== undefined) { // basic
                url = window.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
            } else if (window.webkitURL !== undefined) { // webkit or chrome
                try {
                    url = window.webkitURL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
                } catch (error) {
                }
            } else if (window.URL !== undefined) { // mozilla(firefox)
                try {
                    url = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
                } catch (error) {

                }
            }
            return url;
        },
        //获取不带后缀的文件名
        getFileName(name) {
            let index = name.lastIndexOf(".");
            let name1 = name.substring(0,index);
            return name1
        },
        async goView(item) {
            const res = await downloadFileView(item)
            // const res = await downloadFileView(this.getFileName(item)+'.pdf')
            // const res = await downPDF()
            let filePath = encodeURIComponent(this.getObjectURL(res));
            
            window.open(`/country/showPdf?fileType=pdf&filePath=${filePath}`)
        },

    },
};
</script>
  
<style lang="scss" scoped>
.country-detail-page {
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