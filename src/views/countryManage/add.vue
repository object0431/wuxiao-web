<template>
    <div class="country-add-page">
        <div class="head-title">国家级成果申请</div>
        <div class="main-content">
            <el-form ref="form" :model="form" label-position="right" label-width="90px" class="form">
                <!-- 基础信息 -->
                <div class="container" style="padding-top: 0px">
                    <el-row>                   
                        <el-col :span="16">
                            <el-form-item label="成果名称" prop="projectName" :rules="{
                                required: true,
                                message: '请输入成果名称',
                                trigger: 'blur',
                            }">
                                <el-input placeholder="请输入" v-model="form.projectName"></el-input>
                            </el-form-item>
                        </el-col>      
                    </el-row>
                    <el-row>                   
                        <el-col :span="16">
                            <el-form-item label="获奖名称" prop="awardsProjectNameLevel" >
                                <el-input placeholder="请输入" v-model="form.awardsProjectNameLevel"></el-input>
                            </el-form-item>
                        </el-col>      
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="成果简介" prop="projectIntroduce" :rules="{
                                required: true,
                                message: '请输入成果简介',
                                trigger: 'blur',
                            }">
                                <el-input
                                v-model="form.projectIntroduce"
                                type="textarea"
                                placeholder="请输入（300-500字）"
                                rows="8"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <div class="container">
                    <div class="text">创造人</div>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="主要创造人" prop="mainCreateName" :rules="{
                                required: true,
                                message: '请输入主要创造人',
                                trigger: 'blur',
                            }">
                                <el-input placeholder="请输入" v-model="form.mainCreateName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="参与创造人" prop="otherCreateName">
                                <el-input placeholder="请输入" v-model="form.otherCreateName"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                </div>

                <div class="container">
                    <div class="text">宣传图片</div>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="宣传图片">
                                <el-upload
                                    class="upload-demo"
                                    action="/fsip-project/file/uploadFile"
                                    accept=".jpg,jpeg,.png"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :before-upload="beforeUpload"
                                    multiple
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :on-success="handleSuccess"
                                    :file-list="fileList"
                                >
                                    <el-button
                                    type="text"
                                    icon="iconfont icon-daochu"
                                    class="main-text-blue"
                                    >上传图片</el-button
                                    >
                                    <!-- <div slot="tip" class="el-upload__tip">
                                    只能上传jpg/png文件，且不超过500kb
                                    </div> -->
                                    <span class="tip">只能上传jpg/png文件，且不超过5M</span>
                                </el-upload>
                            </el-form-item>
                            </el-col>
                    </el-row>
                </div>

                <div class="container">
                    <div class="text">上传附件</div>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="附件上传">
                                <el-upload
                                class="upload-demo"
                                action="/fsip-project/file/uploadFile"
                                :on-preview="handlePreview"
                                :on-remove="(file, fileList)=>{return handleRemove(file, fileList, true)}"
                                :before-remove="beforeRemove"
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
                    <el-button class="mainRedButton" style="width: 100px" @click="submitApply('form')">提交
                    </el-button>
                </div>
            </div>
        </footer>
       
    </div>
</template>
  
<script>
import {
    deleteUploadFile
} from '@/assets/api/common/index'
import {
    nationalProjectAchievementPush,
} from '@/assets/api/countryProject/index'
export default {
    name: "approvalApplication",
    data() {
        return {
            form: {
                "projectName":"",
                "awardsProjectNameLevel":"",
                "projectIntroduce":"",
                "imageTag":"介绍图片",
                "mainCreateName":"",
                "otherCreateName":"",
                "attachmentList":[]
            },
            tableLoading: false,
            fileList:[],
            appendixList:[],
        };
    },
    created() {

    },
    methods: {
        //返回
        goBack() {
            this.$router.go(-1);
        },
        //点击提交
        submitApply(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                    let str=[]
                    if(this.fileList.length==0){
                        this.$message.error('请上传一张宣传图片')
                        return
                    }
                    this.fileList.map((item)=>{
                        str.push(item.fileName)
                    })
                    this.form.imageTag=str.join(',')
                    if (this.appendixList && this.appendixList.length > 0) {
                        let list = this.appendixList.map(item=>{
                            return {name:item.fileName}
                        })
                        if(list){
                            this.form.attachmentList = list;
                        }
                    }
                    this.gotoAdd()
                } else {
                    return false
                }
            });
        },
        async gotoAdd(){
            
            const res=await nationalProjectAchievementPush(this.form);
            
            if(res.rspCode=='0000'){
                this.$message.success("新增成功");
                this.goBack()
            }else{
                this.$message.error(res.rspDesc)
            }
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
        handleSuccess(res, file, fileList,isOther) {
            
            // this.form.fileList.push(res.rspBody);
            if(isOther){
                
                this.appendixList.push({ fileName: res.rspBody.fileName, filePath: res.rspBody.url,ossFileCode:res.rspBody.fileName,name:res.rspBody.originalFilename });
            } else {
                this.fileList.push({ fileName: res.rspBody.fileName, filePath: res.rspBody.url,ossFileCode:res.rspBody.fileName,name:res.rspBody.originalFilename })
            }
        },
        handleRemove(file, fileList,isOther) {
            if(isOther){
                this.appendixList.map((item, index) => {
                    if (item.name === file.name) {
                    this.appendixList.splice(index, 1);
                    }
                });
            } else {
                this.form.fileList.map((item, index) => {
                    if (item.name === file.name) {
                    this.form.fileList.splice(index, 1);
                    }
                });
            }
        },
        handleExceed(files, fileList,isOther) {
            if(isOther){
                this.$message.error(
                    `当前限制选择 5 个文件，本次选择了 ${
                        files.length
                    } 个文件，共选择了 ${files.length} 个文件`
                );
            } else {
                this.$message.error(
                    `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length
                    } 个文件`
                );
            }
        },
        beforeUpload(file,isOther){
            const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
            const whiteList = ["png", "jpg", "jpeg"];
            if(isOther){
                if (fileSuffix.indexOf('pdf') === -1) {
                    this.$message.info("上传文件只能是pdf文件 ");
                    return false;
                }
            }else{
                if (whiteList.indexOf(fileSuffix) === -1) {
                    this.$message.info("上传文件只能是图片文件 ");
                    return false;
                }
            }   
        },
        beforeRemove(file, fileList) {
        // return this.$confirm(`确定移除 ${file.name}？`);
        
        },
        async removeFile(fileName){
            const res=await deleteUploadFile(fileName);
            
        },

    },
};
</script>
  
<style lang="scss" scoped>
.country-add-page {
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