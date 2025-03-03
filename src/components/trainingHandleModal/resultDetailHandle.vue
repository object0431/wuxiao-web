<template>
  <div
    class="result-detail-handle"
    :class="visible?'on' : 'close'"
  >
    <i class="el-icon-close" style="font-size: 22px;" @click="close"></i>
    <div class="head-title">项目成果详情</div>
    <div class="main-content">
      <el-form
        ref="form"
        :model="form"
        label-position="right"
        label-width="90px"
        class="form"
      >
        <!-- 基础信息 -->
        <div
          class="container"
          style="padding-top: 0px"
        >
          <el-row>
            <el-col :span="16">
              <el-form-item
                label="项目名称"
                prop="projectName"
                :rules="{
                                required: true,
                                message: '请输入项目名称',
                                trigger: 'blur',
                            }"
              >
                <div>{{form.projectName}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="起止日期"
                prop="approvalTime"
                :rules="{
                                required: true,
                                message: '请选择起止日期',
                                trigger: 'blur',
                            }"
              >
                <div>{{form.approvalTime[0]}}至{{form.approvalTime[1]}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="经济效益/社会效益"
                label-width="140px"
                prop="proBudget"
                :rules="{
                                required: true,
                                message: '请输入经济效益/社会效益',
                                trigger: 'blur',
                            }"
              >
                <div>{{form.proBudget}}万元</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="所属类别"
                prop="cateName"
                :rules="{
                                required: true,
                                message: '请选择所属类别',
                                trigger: 'blur',
                            }"
              >
                <div>{{form.cateName}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="所属项目"
                prop="proName"
                :rules="{
                                required: true,
                                message: '请选择所属项目',
                                trigger: 'blur',
                            }"
              >
                <div>{{form.proName}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 成果介绍 -->
        <div class="container">
          <div class="text">成果介绍</div>
          <el-row>
            <el-col
              :span="16"
              v-for="subItem in form.itemList"
              :key="subItem.itemCode"
            >
              <el-form-item
                :label="subItem.itemName"
                label-width="190px"
                :prop="subItem.itemCode"
                :rules="{
                                required: true,
                                message: `请输入${subItem.itemName}`,
                                trigger: 'blur',
                            }"
              >
                <div>{{subItem.itemValue}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>

  </div>
</template>
  
<script>
import {
  resultSearchDetail,
} from "@/assets/api/resultManage";
export default {
  name: "resultDetailHandle",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    projectId: {
      type: String,
      default: '',
      // required: true    
    },
    form: {
      type: Object,
      default: ()=>{
        return {
        projectName: "", //项目名称
        approvalTime: [], //预计起始日期
        proBudget: null, //预计效益
        cateName: "", //所属类别
        proName: "", //所属项目
        innovativeness: "", //创新性
        advancement: "", //先进性
        practicability: "", //实用性
        technologyContent: "", //科技含量
        promotionValue: "", //推广价值
        expectedBenefit: "", //预期效益
        others: "", //其他
      }
      },
      // required: true    
    },
  },
  data() {
    return {
      type: "add",
      // form: {
      //   programName: "", //项目名称
      //   approvalTime: "", //预计起始日期
      //   proBudget: null, //预计效益
      //   cateName: "", //所属类别
      //   proName: "", //所属项目
      //   innovativeness: "", //创新性
      //   advancement: "", //先进性
      //   practicability: "", //实用性
      //   technologyContent: "", //科技含量
      //   promotionValue: "", //推广价值
      //   expectedBenefit: "", //预期效益
      //   others: "", //其他
      // },
      handleVisable: false,
      tableLoading: false,
      id:'',
    };
  },
  created() {
    
    // this.querySearchDetail();
  },
  methods: {
    //详情
    async querySearchDetail() {
      if(this.projectId && this.projectId.length > 0){
      const res = await resultSearchDetail({ projectId: this.projectId });
      if (res.rspCode == "0000") {
        let list = res.rspBody;
        let time = [];
        time.push(list.startDate);
        time.push(list.endDate);
        list.approvalTime = time;
        this.form = {
          startDate: list.startDate,
          endDate: list.endDate,
          projectName: list.projectName,
          projectId: list.projectId,
          applierName: list.applierName,
          applierCompanyId: list.applierCompanyId,
          approvalTime: time, //起始日期
          proBudget: list.benefit, //效益
          cateName: list.innovationType, //所属类别
          proName: list.projectType, //所属项目
          applierId: list.applierId,
          applierDeptId: list.applierDeptId,
          applyDate: list.applyDate,
          status: list.status,
          statusName: list.statusName,
          itemList: list.itemList,
          // fileList: this.form.fileList || [],
        };
      } else {
        this.$message.error(res.rspDesc);
      }
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
  
<style lang="scss" scoped>
.result-detail-handle {
  position: fixed;
  z-index: 99;
  background: #FFFFFF;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.3);
  padding: 20px 20px 0 20px;
  transition: all .5s ease;
  left: 240px;
  height: calc(100vh - 360px);
  width: calc(100vw - 300px);
  overflow: auto;
  border-radius: 20px;

  &.on {
    top: 240px;
  }

  &.close {
    top: 100vh;
  }

  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 16px;
    cursor: pointer;
  }
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
      color: #5991ff;
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