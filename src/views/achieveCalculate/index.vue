<template>
    <div class="achieveCalculate-page">
        <div class="head-title">项目成果统计</div>
        <div class="query">
            <el-form :model="form" label-position="right" label-width="90px">
                <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
                <el-row :gutter="16">
                    <el-col :span="8">
                        <el-form-item label="申请人公司" prop="applyCompany">
                            <el-select v-model="form.applierCompanyId" @change="changeOrg" filterable clearable>
                            <el-option
                                v-for="item in allOrgList"
                                :value="item.code"
                                :label="item.name"
                                :key="item.code"
                            ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="部门" prop="applyDepart">
                            <el-select v-model="form.applierDeptId" filterable clearable>
                            <el-option
                                v-for="item in deptList"
                                :value="item.code"
                                :label="item.name"
                                :key="item.code"
                            ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="" label-width="90px">
                            <el-button class="minorRedButton" @click="queryKeyword">查询</el-button>
                            <el-button class="minorRedButton" @click="exportFile">导出</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>


        <!-- 表格区域 -->
        <el-table v-loading="tableLoading" :data="tableData"
            style="width: 100%">
            <el-table-column prop="applierName" show-overflow-tooltip label="申请人"></el-table-column>          
            <el-table-column prop="applierCompanyId" label="公司"></el-table-column>
            <el-table-column prop="applierDeptId" label="部门"></el-table-column>
            <el-table-column prop="applyProjectTotal" label="已申报的项目立项数量"></el-table-column>
            <el-table-column prop="auditProjectTotal" label="已申报的项目成果数量"></el-table-column>
            <el-table-column prop="avgScore" label="平均评分"></el-table-column>
        </el-table>
        <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
            :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
            :total="pageParam.total" style="text-align: right; margin-top: 10px">
        </el-pagination>
    </div>
</template>

<script>
import {
    selProjectAchievementStatistics,
    selProjectAchievementStatisticsExport,
} from '@/assets/api/countryProject/index'
import {  qryAllOrg } from "@/assets/api/rolemanage/index";
import {exportBlobFile} from "@/utils/common";

export default {
    name:"countryList",
    data() {
        return {
            visible: false,
            //表单查询
            form: {
                "applierCompanyId": "",
                "applierDeptId": "",
                "applierId": ""
            },
            //分页
            pageParam: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            //列表数据
            tableLoading: false,
            tableData: [],
            selectList: [],
            programList:[],
            cateList:[],
            allOrgList:[],
            deptList:[],
            currentProjectId:"",
        }
    },
    created() {
        this.queryApprovalApply()
        this.qryAllOrg();
    },
    methods: {
        //查询
        async queryApprovalApply() {
            this.tableLoading = true
            let param={
                "pageNum": this.pageParam.pageNum,
                "pageSize": this.pageParam.pageSize,
                "reqParam": {...this.form}
            }
            const res = await selProjectAchievementStatistics({
                ...param
            })
            
            if (res.rspCode=='0000') {
                if(res.rspBody){
                    this.tableLoading = false
                    this.tableData = res.rspBody.list
                    this.pageParam.total = res.rspBody.total
                }
            } else {
                this.tableLoading = false
                this.tableData = []
            }
        },
        queryKeyword(){
            this.pageParam.pageNum = 1
            this.queryApprovalApply()
        },
        async exportFile() {
            let param={
                "pageNum": this.pageParam.pageNum,
                "pageSize": this.pageParam.pageSize,
                "reqParam": {...this.form}
            }
          const res = await selProjectAchievementStatisticsExport({
            ...param
          });
          exportBlobFile(res, '项目成果统计导出.xlsx')
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
            const req={
                queryType:'company'
            }
            const res = await qryAllOrg(req);
            if (res.rspCode == "0000") {
                this.allOrgList = res.rspBody;
            }
        },
         //选中公司
         changeOrg(val) {
            this.queryDept(val);
        },
        //查询部门
        async queryDept(code) {
            const res = await qryAllOrg({
                queryType:"dept",
                queryKeywords: code,
            });
            if (res.rspCode == "0000") {
                this.deptList = res.rspBody;
            }
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
        text-align: right;
        margin: 10px 0;
    }
}
</style>
