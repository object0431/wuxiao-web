<template>
    <div class="countryList-page">
        <div class="head-title">国家级示范成果录入</div>
        <div class="query">
            <el-form :model="form" label-position="right" label-width="90px">
                <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
                <el-row :gutter="16">
                    <el-col :span="8">
                        <el-form-item label="项目名称" prop="projectName">
                            <el-input v-model="form.projectName" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </el-col> 
                    <el-col :span="8">
                        <el-form-item
                            label="查询日期"
                            prop="value">
                            <ChartDatePicker
                                v-model="value"
                                :type.sync="groupType"
                                @handleChangeTime="handleChangeTime(type=0,$event)"
                            ></ChartDatePicker>
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

        <div class="operation">
            <el-button class="mainRedButton" @click="goAdd">新增国家级成果</el-button>
        </div>

        <!-- 表格区域 -->
        <el-table v-loading="tableLoading" :data="tableData" @selection-change="handleSelectionChange"
            style="width: 100%">
            <!-- <el-table-column type="selection" width="55" fixed="left"></el-table-column> -->
            <!-- <el-table-column prop="projectName" show-overflow-tooltip label="项目名称"></el-table-column>       -->
            <el-table-column show-overflow-tooltip label="项目名称"  >
              <template slot-scope="scope">
                <a class="projectName"  @click="goView(scope.row.achievementId)">{{ scope.row.projectName }}</a>
            </template>
          </el-table-column>    
            <el-table-column prop="awardsProjectNameLevel" label="获奖名称"></el-table-column>
            <el-table-column prop="applyYearmon" label="申请年份"></el-table-column>
            <el-table-column prop="mainCreateName" label="主要创造人"></el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                    <el-tooltip class="item" content="详情" placement="top" popper-class="testtooltip">
                        <i class="table-btn icon-xiangqing iconfont" @click="goView(scope.row.achievementId)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" content="删除" placement="top" popper-class="testtooltip">
                        <i style="font-size: 18px" class="el-icon-delete table-btn" @click="deleteProject(scope.row.achievementId)"></i>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
            :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
            :total="pageParam.total" style="text-align: right; margin-top: 10px">
        </el-pagination>
    </div>
</template>

<script>
import {
    selNationalProjectAchievementList,delNationalProjectAchievement,selNationalProjectAchievementListExport
} from '@/assets/api/countryProject/index'
import ChartDatePicker from "@/components/workbench/charlDataPicker.vue";
import { dateFormat } from "@/filters/index";
import {exportBlobFile} from "@/utils/common";
export default {
    name:"countryList",
    components: { ChartDatePicker },
    data() {
        return {
            visible: false,
            value: new Date(),
            groupType: "year",
            choiceDate: `${dateFormat(new Date(), "yyyy")}`,
            //表单查询
            form: {
                "achievementId": "",
                "achievementType": "",
                "innovationType": "",
                "projectName": ""
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
    },
    methods: {
        //查询
        async queryApprovalApply() {
            this.tableLoading = true
            let param={
                pageNum:this.pageParam.pageNum,
                pageSize:this.pageParam.pageSize,
                reqParam:{
                    projectName:this.form.projectName,
                    cycle:this.choiceDate,
                }
            }
            const res = await selNationalProjectAchievementList({
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
        goAdd(){
            this.$router.push('/countryManage/add')
        },
        goView(id){
            this.$router.push(`/countryManage/countryDetail?projectId=${id}`)
        },
        deleteProject(id){
            this.$confirm('确认删除该成果吗', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(async () => {
                
                let res = await delNationalProjectAchievement({achievementId:id})
                
                if(res.rspCode=='0000' && res.rspBody && res.rspBody.respCode=='0000'){
                    this.$notify({
                        title:'成功',
                        message:'删除成功',
                        type:'success'
                    })  
                    this.queryApprovalApply()
                }else{
                    this.$message.error(res.rspDesc)
                }
            })
            .catch(action => {
                this.$message({
                    type: 'info',
                    message: '取消删除'
                })
                //  this.queryApprovalApply()
            });
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
        //多选
        handleSelectionChange(val) {
            this.selectList = val
        },
         // 日期
        handleChangeTime(type, timeObj) {
            
            
            // TODO
            if (timeObj && timeObj.startTime) {
                this.choiceDate = timeObj.startTime;
            }
        },
        async exportFile() {
            const loading = this.$loading({
                lock: true,
                text: '数据正在导出，请稍侯',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });    
            let param={
                pageNum:1,
                // pageSize:this.pageParam.pageSize,
                reqParam:{
                    projectName:this.form.projectName,
                    cycle:this.choiceDate,
                }
            }
            const res = await selNationalProjectAchievementListExport({
                ...param
            });
            if(res){
                loading.close();
            }else{
                loading.close();
            }
            exportBlobFile(res, '国家级示范成果列表导出.xlsx')
        }, 
    }
}
</script>

<style lang="scss" scoped>
.countryList-page {
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
    .projectName{
      color: #3377FF;
      cursor: pointer;
    }
}
</style>
