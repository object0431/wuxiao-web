<template>
    <div class="addLeader-dialog">
      <el-dialog
        :visible="visible"
        title="选择部门领导"
        width="800px"
        destroy-on-close
        :close-on-click-modal="false"
        @open="openModal"
        @close="closeModel"
      >
        <el-form
          :model="form"
          label-position="right"
          label-width="70px"
          ref="form"
          class="form"
        >
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="姓名" prop="major">
                <el-select v-model="form.major" filterable clearable @change="changeZYFX">
                  <el-option
                    v-for="item in majorList"
                    :value="item.typeCode"
                    :label="item.typeName"
                    :key="item.typeCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="" label-width="0">
                <el-button class="minorRedButton" 
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 表格区域 -->
         <el-table v-loading="tableLoading" :data="tableData" @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column type="selection" width="55" fixed="left"></el-table-column>
              <el-table-column prop="name" show-overflow-tooltip label="姓名"></el-table-column>
          </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pageParam.pageNum"
          :page-size="pageParam.pageSize"
          layout="prev, pager, next,sizes, total"
          :total="pageParam.total"
          style="text-align: right; margin-top: 10px"
        >
        </el-pagination>
        <span slot="footer">
          <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
          <el-button class="mainRedButton_copy" @click="addLeader">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
    
  <script>
import {
    queryStaffRoleList
} from '@/assets/api/common/index'
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        //表单查询
        form: {
          major: "",
        },
        majorList: [], //专业分类
        //分页
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
        tableData: [{
          name:'张三',
  
        }],
        tableLoading: false,
        selectList: [],
      };
    },
    created() {
        this.qryStaff()
    },
    methods: {
        async qryStaff(value){
            let param={
                "pageNum": 1,
                "pageSize": 10,
                // "reqParam": {
                //     "roleId": "BMJL",
                //     "staffName": "赵媛"
                // }
            }
            const res = await queryStaffRoleList(param);
            if (res.rspCode == "0000") {
                //赋值
                
               
            } else {
                this.$message.error(res.rspDesc);
            }
        },
      //确认添加
      addLeader() {
          this.$emit('addLeader',this.selectList)
      },
      //选择专业方向
      changeZYFX(val) {
        this.form.majorType = "";
        if (val == "") return;
        // this.qryLinkType(val, "3");
      },
      //打开弹窗
      openModal() {
        
      },
      //关闭弹窗
      closeModel() {
        this.$emit("closeModel");
      },
      //多选
      handleSelectionChange(val) {
        this.selectList = val;
      },
      //分页
      handleCurrentChange(val) {
        this.pageParam.pageNum = val;
        // this.queryCourseware()
      },
      handleSizeChange(val) {
        this.pageParam.pageSize = val;
        // this.queryCourseware()
      },
    },
  };
  </script>
    
  <style lang="scss" scoped>
  </style>
    
    