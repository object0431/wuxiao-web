<template>
    <div class="approval-applyQuery-page">
        <div class="head-title">立项查询</div>
        <div class="query">
            <el-form :model="form" label-position="right" label-width="90px">
                <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="所属类别" prop="cateName" >
                        <el-select
                            v-model="form.typeAttrCode"
                            placeholder="请选择"
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
                        <el-form-item label="所属项目" prop="proName" >
                        <el-select
                            v-model="form.projectAttrCode"
                            placeholder="请选择"
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
                    <el-col :span="8">
                        <el-form-item label="项目名称" prop="orgName">
                            <el-input v-model="form.projectName" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!-- <el-form-item label="申请人公司" prop="orgName">
                            <el-input v-model="form.applyCompany" placeholder="请输入" clearable></el-input>
                        </el-form-item> -->
                        <el-form-item label="申请人公司" prop="applierCompanyId">
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
                        <!-- <el-form-item label="申请人部门" prop="orgName">
                            <el-input v-model="form.applyDepart" placeholder="请输入" clearable></el-input>
                        </el-form-item> -->
                        <el-form-item label="部门" prop="applierDeptId">
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
                        <el-form-item label="项目状态" prop="proStatus" >
                        <el-select
                            v-model="form.projectState"
                            placeholder="请选择"
                            filterable clearable
                        >
                            <el-option
                                v-for="item in statusList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="" label-width="90px">
                            <el-button class="minorRedButton" @click="queryApply">查询</el-button>
                            <el-button class="minorRedButton" @click="exportFile">导出</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="operation">
            <!-- <el-button class="mainRedButton" @click="goAdd">新增项目立项申请</el-button> -->
            <!-- <el-button class="minorRedButton" @click="deletePersonalTrainingApply">删除</el-button> -->
        </div>

        <!-- 表格区域 -->
        <el-table v-loading="tableLoading" :data="tableData" @selection-change="handleSelectionChange"
            style="width: 100%">
            <!-- <el-table-column type="selection" width="55" fixed="left"></el-table-column> -->
            <!-- <el-table-column prop="projectName" show-overflow-tooltip label="项目名称"></el-table-column> -->
            <el-table-column show-overflow-tooltip label="项目名称" width="240" >
              <template slot-scope="scope">
                <a class="projectName"  @click="goView(scope.row.projectId)">{{ scope.row.projectName }}</a>
            </template>
            </el-table-column>  

            <el-table-column prop="typeAttrName" label="所属类别"></el-table-column>
            <el-table-column prop="projectAttrName" label="所属项目"></el-table-column>
            <!-- 
            <el-table-column prop="startTime" label="开始时间"> </el-table-column>
            <el-table-column prop="endTime" label="结束时间"> </el-table-column> -->
            <el-table-column prop="applierName" label="申请人"></el-table-column>
            <el-table-column prop="applyCompanyName" label="公司"></el-table-column>
            <el-table-column prop="applyDeptName" label="部门"></el-table-column>     
            <el-table-column prop="economicBenefit" label="预期效益（万元）"></el-table-column>  
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == '00'">审批完成</span>
                    <span v-if="scope.row.status == '01'">部门领导审批</span>
                    <span v-if="scope.row.status == '02'">分管领导审批</span>
                    <span v-if="scope.row.status == '03'">工会主席审批</span>
                    <span v-if="scope.row.status == '04'">评审委员会审批</span>
                    <span v-if="scope.row.status == '05'">转发他人审批</span>
                    <span v-if="scope.row.status == 'TH'">退回修改</span>
                    <span v-if="scope.row.status == 'CH'">撤回</span>
                    <span v-if="scope.row.status == 'ZC'">暂存</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                    <el-tooltip class="item" content="详情" placement="top" popper-class="testtooltip">
                        <i class="table-btn icon-xiangqing iconfont" @click="goView(scope.row.projectId)"></i>
                    </el-tooltip>
                    <!-- <el-tooltip class="item" content="编辑" placement="top" popper-class="testtooltip">
                        <i class="table-btn icon-bianji iconfont" @click="goEdit(scope.row.projectId)"></i>
                    </el-tooltip> -->
                    <!-- <el-tooltip class="item" content="删除" placement="top" popper-class="testtooltip">
                        <el-popconfirm title="确定删除该数据吗？" @confirm="deletePersonalTrainingApply1(scope.row.projectId)">
                            <i slot="reference" style="font-size: 18px" class="el-icon-delete table-btn"></i>
                        </el-popconfirm>
                    </el-tooltip> -->
                    <el-tooltip class="item" content="审核" placement="top" popper-class="testtooltip">
                        <i class="table-btn el-icon-place" @click="goExamine(scope.row.projectId)"></i>
                    </el-tooltip>
                    <!-- <el-tooltip class="item" content="发起咨询" placement="top" popper-class="testtooltip">
                        <i style="font-size: 18px" class="el-icon-chat-line-round table-btn" @click="goConsult(scope.row.projectId)"></i>
                    </el-tooltip> -->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
            :current-page="pageParam.pageNum" :page-size="pageParam.pageSize" layout="prev, pager, next,sizes, total"
            :total="pageParam.total" style="text-align: right; margin-top: 10px">
        </el-pagination>
        <addTalent :visible="visible" @closeModel="closeModel" @addTalent='addTalent'></addTalent>
    </div>
</template>

<script>
import {
    queryProject,queryProjectExport
} from '@/assets/api/approval/index'
import {
    qryParamList,consultationInitiate
} from '@/assets/api/common/index'
import addTalent from "@/components/approval/addTalent.vue";
import {  qryAllOrg } from "@/assets/api/rolemanage/index";
import {exportBlobFile} from "@/utils/common";
export default {
    name:"applyQuery",
    components: { addTalent },
    data() {
        return {
            visible: false,
            //表单查询
            form: {
                typeAttrCode:"",
                projectAttrCode:"",
                projectName:"",
                applyCompany:"",
                applyDepart:"",
                projectState:"",
                applierCompanyId:"",
                applierDeptId:""
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
            statusList:[
                {value:'ZC',label:"暂存"},
                {value:'01',label: "部门领导审批"},
                {value: '02',label: '分管领导审批'},
                {value: '03',label: '工会主席审批'},
                {value: '04',label: '评审委员会审批'},
                {value: '05',label: '转发他人审批'},
                {value: '00',label: '审批完成'},
                {value: 'TH',label: '退回修改'},
                {value: 'CH',label: '撤回'}
            ]
        }
    },
    created() {
        this.queryApprovalApply()
        this.qryParamList("CXLX")
        this.qryAllOrg();
    },
    methods: {
        //查询
        async queryApprovalApply() {
            this.tableLoading = true
            let param={pageNum:this.pageParam.pageNum,pageSize:this.pageParam.pageSize}
            const res = await queryProject({
                ...this.form, ...param
            })
            
            if (res.dataList) {
                this.tableLoading = false
                res.dataList.map((item)=>{
                    item.startTime=item.startTime.slice(0,10)
                    item.endTime=item.endTime.slice(0,10)
                })
                this.tableData = res.dataList
                this.pageParam.total = res.total
            } else {
                this.tableLoading = false
                this.tableData = []
                this.pageParam.total=0
            }
        },
        //查询还原页数
        queryApply(){
            this.pageParam.pageNum=1;
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
        //查询项目类型
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
        //单独删除申请
        async deletePersonalTrainingApply1(id) {
            // const res = await deletePersonalTrainingApply([id])
            // if (res.rspCode == '0000') {
            //     this.$message.success('删除成功')
            //     this.queryApprovalApply()
            // } else {
            //     this.$message.error(res.rspDesc)
            // }
        },
        //批量删除申请
        async deletePersonalTrainingApply() {
            if (this.selectList.length == 0) {
                return this.$message.error('请选择至少一条数据')
            }
            let result= this.selectList.every(item=>{
              return item.ownerApplyFlag=='0'
            })
            if (result){
              this.$confirm(`确定删除吗`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                // let arr = this.selectList.map((item) => {
                //   return item.projectId
                // })
                // const res = await deletePersonalTrainingApply(arr)
                // if (res.rspCode == '0000') {
                //   this.$message.success('删除成功')
                //   this.queryApprovalApply()
                // } else {
                //   this.$message.error(res.rspDesc)
                // }
              })
            }else {
              this.$message.info("不能删除自己的申请单")
            }

        },
        //多选
        handleSelectionChange(val) {
            this.selectList = val
        },
        //查看
        goView(id) {
            // this.$router.push({
            //     name: 'approvalApplyDetail',
            //     params: {
            //         projectId: id,
            //         type: 'view'
            //     }
            // })
            this.$router.push(`/approval/applyDetail?projectId=${id}&type=view`)
        },
        //审核
        goExamine(id){
            this.$router.push(`/approval/applyDetail?projectId=${id}&type=examine`)
            // this.$router.push({
            //     name: 'approvalApplyDetail',
            //     params: {
            //         projectId: id,
            //         type: 'examine'
            //     }
            // })
        },
        //编辑
        goEdit(id) {
            this.$router.push({
                name: 'approvalApplication',
                params: {
                    projectId: id,
                    type: 'edit'
                }
            })
        },
        //新增
        goAdd() {
            this.$router.push('/approval/application')
        },
        //线上咨询
        goConsult(id){
            this.visible = true;
            this.currentProjectId=id
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
        //关闭弹窗
        closeModel() {
            this.visible = false;
        },
        //发起咨询
        async addTalent(data,question){
            let list=[]    
            data.map(item => {
                list.push({
                    // "mobilePhone": "string",
                    "staffId": item.staffId,
                    "staffName": item.staffName
                })
            }) 
            // 
            const res = await consultationInitiate({
                "expertList": list,
                "questions": question,
                "targetId": this.currentProjectId,
                "targetType": "LXSQ"
            });
            
            if (res.rspCode == "0000") {
                this.visible = false
                this.$message.success("项目发起咨询成功");
            }
        },
        async exportFile() {
            const loading = this.$loading({
                lock: true,
                text: '数据正在导出，请稍侯',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            const res = await queryProjectExport({
                ...this.form
            })
            if(res){
                loading.close();
            }else{
                loading.close();
            }
            // const res = await exportLoginEmpInfo(param.join('&'));
            exportBlobFile(res, '项目立项列表导出.xlsx')
        },
    }
}
</script>

<style lang="scss" scoped>
.approval-applyQuery-page {
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
