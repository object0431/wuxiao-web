<template>
    <div class="achieveCalculate-page">
        <div class="head-title">战队维护</div>
        <div class="query">
            <el-form :model="form" label-position="right" label-width="90px">
                <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
                <el-row :gutter="16">
                    <el-col :span="8">
                        <el-form-item label="所属公司" prop="applyCompany">
                            <el-select v-model="form.companyId" placeholder="请选择地市" filterable clearable>
                                <el-option v-for="item in allOrgList" :key="item.code" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                        <el-form-item label="战队名称" prop="applyDepart">
                            <el-input v-model="form.teamName" clearable></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="8">
                        <el-form-item label="" label-width="90px">
                            <el-button class="minorRedButton" @click="queryApprovalApply">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="operation">
            <el-upload class="upload-demo" action="" accept=".xls,.xlsx" :limit="1" :auto-upload="false"
                :file-list="queryImport.fileList" :on-change="jobOnChange" :on-remove="removeFile" :show-file-list="false">
                <el-button size="small" type="primary">模板导入</el-button>
            </el-upload>
            <el-button class="mainRedButton" @click="goDownload">下载模板</el-button>
        </div>

        <!-- 表格区域 -->
        <el-table v-loading="tableLoading" :data="tableData" style="width: 100%">
            <el-table-column prop="companyId" show-overflow-tooltip label="所属公司"></el-table-column>
            <el-table-column prop="teamName" show-overflow-tooltip label="战队名称"></el-table-column>
            <el-table-column prop="shineValue" show-overflow-tooltip label="初始闪耀值"></el-table-column>
            <el-table-column prop="loginShineValue" show-overflow-tooltip label="登陆闪耀值"></el-table-column>
            <el-table-column prop="staffName" label="创建人"></el-table-column>
            <el-table-column prop="updateTime" label="操作时间"></el-table-column>
        </el-table>
        <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
            :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
            :total="pageParam.total" style="text-align: right; margin-top: 10px">
        </el-pagination>
    </div>
</template>

<script>
import { qryAllOrg } from "@/assets/api/rolemanage/index";
// import { queryCompanyAndDept } from "@/assets/api/trainingBudget";
import { teamDownTemplate, teamExcelImport, teamInfoSel } from "@/assets/api/resultManage";
export default {
    name: "countryList",
    data() {
        return {
            visible: false,
            //表单查询
            form: {
                // "teamName": "",
                "companyId": ""
            },
            //分页
            pageParam: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            queryImport:{
                fileList:[]
            },
            //列表数据
            tableLoading: false,
            tableData: [],
            selectList: [],
            programList: [],
            cateList: [],
            allOrgList: [],
            deptList: [],
            companyData: [
                { code: "中国联通陕西省分公司", name: "中国联通陕西省分公司" },
                { code: "西安市分公司", name: "西安1" },
                { code: "咸阳市分公司", name: "咸阳1" },
                { code: "宝鸡市分公司", name: "宝鸡1" },
                { code: "铜川市分公司", name: "铜川1" },
                { code: "渭南市分公司", name: "渭南1" },
                { code: "延安市分公司", name: "延安1" },
                { code: "榆林市分公司", name: "榆林1" },
                { code: "汉中市分公司", name: "汉中1" },
                { code: "安康市分公司", name: "安康1" },
                { code: "商洛市分公司", name: "商洛1" },
            ],
            currentProjectId: "",
        }
    },
    created() {
        this.queryApprovalApply()
        this.qryAllOrg();
        // this.getCompanyAndDept({ queryType: "company" });
    },
    methods: {

        //查询
        async queryApprovalApply() {
            this.tableLoading = true
            let param = {
                "pageNum": this.pageParam.pageNum,
                "pageSize": this.pageParam.pageSize,
                "reqParam": { ...this.form }
            }
            const res = await teamInfoSel(param)
            
            if (res.rspCode == '0000') {
                if (res.rspBody) {
                    this.tableLoading = false
                    if (res.rspBody.list && res.rspBody.list.length > 0) {
                        this.tableData = res.rspBody.list
                        this.pageParam.total = res.rspBody.total
                        return ""
                    }
                }
            }
            this.tableLoading = false
            this.tableData = []
            this.pageParam.total = 0
        },
        //分页
        handleCurrentChange(val) {
            this.pageParam.pageNum = val
            this.queryApprovalApply()
        },
        handleSizeChange(val) {
            this.pageParam.pageSize = val
            this.queryApprovalApply()
        },
        //查询公司
        async qryAllOrg() {
            const req = {
                queryType: 'company'
            }
            const res = await qryAllOrg(req);
            if (res.rspCode == "0000") {
                this.allOrgList = res.rspBody;
            }
        },

        //goDownload

        jobOnChange(file, fileList) {
            //获取上传文件大小
            let imgSize = Number(file.size / 1024 / 1024);

            if (imgSize > 20) {
                this.$msgbox({
                    title: "",
                    message: "文件大小不能超过20MB，请重新上传。",
                    type: "warning",
                });
                fileList.splice(-1, 1)
                return false;
            }
            this.queryImport.fileList = [file];
            this.toDataImport()
        },
        removeFile() {
            this.queryImport.fileList = []
        },
        
        async toDataImport() {
            var formdata = new FormData();
            formdata.append("file", this.queryImport.fileList[0].raw);
            const res = await teamExcelImport(formdata)
            if(res.rspCode == '0000'){
                this.$message({ message: res.rspBody.respMsg, type: res.rspBody.respMsg.indexOf('成功')>-1?'success':'error' });
                this.removeFile()
                this.queryApprovalApply()
            }
        },

        goDownload() {
            teamDownTemplate('Team_Import_Template.xlsx', this,'战队维护模板.xlsx');
        },
    }
}
</script>

<style lang="scss" scoped>
.achieveCalculate-page {
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;

    .query {
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
    }

    .operation {
        display: flex;
        // justify-content: center;
        align-items: center;
    }
}
</style>
