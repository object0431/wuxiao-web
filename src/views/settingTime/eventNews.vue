<template>
    <!-- 活动新闻 -->
    <div class="approval-eventNews-page">
        <div class="head-title">活动新闻</div>
        <div class="query">
            <el-form :model="form" label-position="right" label-width="90px">
                <!-- 所属类别、所属项目、项目名称、申请人公司、申请人部门 -->
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="标题">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="" label-width="90px">
                            <el-button class="minorRedButton" @click="queryApprovalApply">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="operation">
            <el-button class="mainRedButton" @click="goAdd">新增</el-button>
        </div>

        <!-- 表格区域 -->
        <el-table v-loading="tableLoading" :data="tableData" style="width: 100%">
            <el-table-column prop="title" show-overflow-tooltip label="标题" min-width="150"></el-table-column>
            <el-table-column prop="content" label="内容" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="staffName" label="操作员名称" width="100"> </el-table-column>
            <!-- <el-table-column prop="activityTime" label="新闻时间" width="150"></el-table-column> -->
            <el-table-column prop="updateTime" label="操作时间" min-width="150"> </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
                <template slot-scope="scope">
                    <el-tooltip class="item" content="详情" placement="top" popper-class="testtooltip">
                        <i class="table-btn icon-xiangqing iconfont" @click="goView(scope.row.id)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" content="删除" placement="top" popper-class="testtooltip">
                        <el-popconfirm title="确定删除该数据吗？" @confirm="deletePersonalTrainingApply1(scope.row.id)">
                            <i slot="reference" style="font-size: 18px" class="el-icon-delete table-btn"></i>
                        </el-popconfirm>
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
import { activityInfoQueryNews, activityInfoDeleteNews } from "@/assets/api/resultManage";
export default {
    name: "eventNews",
    components: {},
    data() {
        return {
            type: "add",
            visible: false,
            //表单查询
            form: {
                type:"XW"
            },
            //分页
            pageParam: {
                pageNum: 1,
                pageSize: 20,
                total: 0,
            },
            //列表数据
            tableLoading: false,
            tableData: [],
            selectList: [],
            cateList: [],
            statusList: [],
            // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
            programList: [],
            currentProjectId: ""
        };
    },
    created() {
        this.queryApprovalApply();
    },
    methods: {
        //查询
        async queryApprovalApply() {
            this.tableLoading = true;
            const res = await activityInfoQueryNews({
                reqParam: {
                    ...this.form,
                },
                ...this.pageParam,
            });
            if (res.rspCode == "0000") {
                this.tableLoading = false;
                this.tableData = res.rspBody.list;
                this.pageParam.total = res.rspBody.total;
            } else {
                this.tableLoading = false;
                this.$message.error(res.rspDesc);
            }
        },
        goView(id){
            this.$router.push({ name: "eventArrangementsNewsView", params: {type: "XW", id: id }, });
        },
        //单独删除申请
        async deletePersonalTrainingApply1(id) {
            let formData = new FormData()
            formData.append('id', id)
            const res = await activityInfoDeleteNews(formData);
            if (res.rspCode == "0000") {
                this.$message.success("删除成功");
                this.queryApprovalApply();
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        //新增
        goAdd() {
            this.$router.push({ name: "eventArrangementsNewsAdd", params: { type: "XW" }, });
        },

        //分页
        handleCurrentChange(val) {
            this.pageParam.pageNum = val;
            this.queryApprovalApply();
        },
        handleSizeChange(val) {
            this.pageParam.pageSize = val;
            this.queryApprovalApply();
        },
    },
};
</script>

<style lang="scss" scoped>
.approval-eventNews-page {
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;

    .query {
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
    }

    // .operation {
    //     text-align: right;
    //     margin: 10px 0;
    // }

    footer {
        .operation-footer {
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
</style>
