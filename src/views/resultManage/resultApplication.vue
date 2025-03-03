<template>
  <div class="approval-application-page">
    <div class="head-title">项目成果申请</div>
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
            <el-col :span="8">
              <el-form-item
                label="项目名称"
                prop="programName"
                :rules="{
                                required: true,
                                message: '请输入项目名称',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  placeholder="请输入"
                  v-model="form.programName"
                  :disabled="type == 'view'"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="projectId"
                label-width="10px"
              >
                <el-select
                  v-model="form.projectId"
                  placeholder="从已有立项项目中选择项目填入"
                  :disabled="type == 'view'"
                  filterable
                  clearable
                  @change="approvalChange"
                >
                  <el-option
                    v-for="item in approvalList"
                    :key="item.projectId"
                    :label="`${item.projectName}-${item.applierName || ''}`"
                    :value="item.projectId"
                  ></el-option>
                </el-select>
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
                <el-date-picker
                  style="width: 100%"
                  value-format="yyyy-MM-dd"
                  v-model="form.approvalTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="type == 'view'"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="经济效益/社会效益"
                prop="proBudget"
                label-width="140px"
                :rules="{
                                required: true,
                                message: '请输入经济效益/社会效益',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  placeholder="请输入数字,最多2位小数"
                  v-model="form.proBudget"
                  :disabled="type == 'view' || type == 'review'"
                ><template slot="append">万元</template>
                </el-input>
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
                <el-select
                  v-model="form.cateName"
                  placeholder="请选择"
                  :disabled="type == 'view'"
                  filterable
                  clearable
                  @change="cateNameChange"
                >
                  <el-option
                    v-for="item in cateList"
                    :key="item.attrCode"
                    :label="item.attrValue"
                    :value="item.attrValue"
                  ></el-option>
                </el-select>
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
                <el-select
                  v-model="form.proName"
                  placeholder="请选择"
                  :disabled="type == 'view'"
                  filterable
                  clearable
                  @change="proNameChange"
                >
                  <el-option
                    v-for="item in programList"
                    :key="item.attrCode"
                    :label="item.attrValue"
                    :value="item.attrValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 成果介绍 -->
        <div class="container">
          <div class="text">成果介绍</div>
          <el-row>
            <el-col :span="16">
              <el-form-item
                label="创新性"
                label-width="190px"
                prop="innovativeness"
                :rules="{
                                required: true,
                                message: '请输入创新性内容',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  v-model="form.innovativeness"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="先进性"
                label-width="190px"
                prop="advancement"
                :rules="{
                                required: true,
                                message: '请输入先进性内容',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  v-model="form.advancement"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="实用性"
                label-width="190px"
                prop="practicability"
                :rules="{
                                required: true,
                                message: '请输入实用性内容',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  v-model="form.practicability"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="科技含量"
                label-width="190px"
                prop="technologyContent"
                :rules="{
                                required: true,
                                message: '请输入科技含量内容',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  v-model="form.technologyContent"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- 推广价值及效果 -->
            <el-col :span="16">
              <el-form-item
                label="推广价值"
                label-width="190px"
                prop="promotionValue"
                :rules="{
                                required: true,
                                message: '请输入推广价值',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  v-model="form.promotionValue"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="创造的经济效益和社会效益"
                label-width="190px"
                prop="expectedBenefit"
                :rules="{
                                required: true,
                                message: '请输入创造的经济效益和社会效益',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  v-model="form.expectedBenefit"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="获奖情况"
                label-width="190px"
                prop="gradingInfo"
                :rules="{
                                required: true,
                                message: '请输入获奖情况',
                                trigger: 'blur',
                            }"
              >
                <el-input
                  v-model="form.gradingInfo"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="其他"
                label-width="190px"
                prop="others"
              >
                <el-input
                  v-model="form.others"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="宣传图片">
                <el-upload
                  class="upload-demo"
                  action="/fsip-project/file/uploadFile"
                  accept=".pdf, .gif,.jpg,.jpeg,.png"
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
                  >上传图片</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                      </div> -->
                  <span class="tip">请上传jpg/png文件</span>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="附件上传" required>
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
                 <span class="tip">只能上传10M以内文件</span>
                </el-upload>

                <div
                    v-for="(item, index) in form.attachList"
                    :key="index"
                    v-if="type=='view'"
                >
                  <a :href="item.attachUrl" target="downloadFile">{{
                      item.attachName
                    }}</a>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>

    <!-- 流转意见 -->
    <div
      class="linkPoint"
      v-if="type !== 'add'"
    >
      <flow-tips :flowList="flowList"></flow-tips>
    </div>

    <footer :style="isWorkBench?'left:20px;width: calc(100vw - 20px);':''">
      <div class="operation">
        <div class="operation-text">当前环节: {{ currentLink }}</div>
        <div class="operation-btn">
          <el-button
            class="minorGrayButton"
            @click="goBack"
          >返回</el-button>
          <el-button
            class="minorRedButton"
            @click="saveInitiation('form')"
          >暂存</el-button>
          <el-button
            class="mainRedButton"
            style="width: 100px"
            @click="submitApply('form')"
          >办理
          </el-button>
        </div>
      </div>
    </footer>

    <!--CGSQ 办理浮层 SJCGZSJ-->
    <approvalHandle
      v-if="type !== 'view'"
      :visible="handleVisable"
      @close="handleVisable = false"
      @submit="onSubmit"
      type="CGSQ"
      :extId="currentApplyId"
      :isWorkBench="isWorkBench"
    ></approvalHandle>

    <!--        <addStaff :visible="addStaffVisible" :orgCode="userInfo.companyId" :deptCode="userInfo.deptId"   @close="addStaffVisible=false" @closeAddModel="closeAddModel"></addStaff>-->
  </div>
</template>
  
<script>
import approvalHandle from "@/components/approval/resultApprovalHandle.vue";
import {
  resultSaveProject,
  resultHandleProject,
} from "@/assets/api/resultManage";
import { queryProject, detailProject } from "@/assets/api/approval/index";
import { queryPublicParams } from "@/assets/api/common";
export default {
  name: "approvalApplication",
  components: { approvalHandle },
  data() {
    return {
      type: "add",
      currentLink: "申请人",
      currentApplyId: "",
      userInfo: {
        companyName: "",
        deptName: "",
        emailAddress: "",
        mobileTel: "",
        empName: "",
      },
      form: {
        programName: "", //项目名称
        approvalTime: "", //起始日期
        proBudget: null, //效益
        cateName: "", //所属类别
        proName: "", //所属项目
        innovativeness: "", //创新性
        advancement: "", //先进性
        practicability: "", //实用性
        technologyContent: "", //科技含量
        promotionValue: "", //推广价值
        expectedBenefit: "", //创造效益
        gradingInfo: "", //获奖情况
        others: "", //其他
        fileList: [],
        appendixList:[],
        approvalDetail: {},
      },
      // （小发明、小创造、小革新、小设计、小建议）
      cateList: [],
      // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
      programList: [],
      //办理浮层
      handleVisable: false,
      tableLoading: false,
      approvalList: [],
      fileList: [],
      appendixList:[],
      isWorkBench:false,
    };
  },
  created() {
    // if (this.$route.params.type) {
    //   let { type, applyId } = this.$route.params;
    //   this.type = type;
    //   this.currentApplyId = applyId;
    if(this.$route.params.isWhere){
      this.isWorkBench=true
    }
    this.queryApprovalApply();
    // this.queryRequestApply();
    // }
    this.queryPublicParams("CXLX");
    this.queryPublicParams("XMLX");
  },
  methods: {
    // 查询静态参数
    async queryPublicParams(attrType) {
      const res = await queryPublicParams({
        attrType,
      });
      
      if (res.rspCode == "0000") {
        if (attrType == "XMLX") {
          //   let programList = {};
          //   res.rspBody.forEach((item) => {
          //     programList[item.attrCode] = item.attrValue;
          //   });
          this.programList = res.rspBody || [];
          //   this.$forceUpdate();
        } else if (attrType == "CXLX") {
          //   let cateList = {};
          //   res.rspBody.forEach((item) => {
          //     cateList[item.attrCode] = item.attrValue;
          //   });
          this.cateList = res.rspBody || [];
          //   this.$forceUpdate();
        }
        // cb && cb()
      }
    },
    //立项项目查询
    async queryApprovalApply() {
      let param = { pageNum: 1, pageSize: 1000 };
      const res = await queryProject({
        ...param,
      });
      
      if (res.dataList) {
        res.dataList.map((item) => {
          item.startTime = item.startTime.slice(0, 10);
          item.endTime = item.endTime.slice(0, 10);
        });
        this.approvalList = res.dataList;
      } else {
        this.approvalList = [];
      }
    },
    //立项项目详情
    async queryApprovalDetail(projectId) {
      const res = await detailProject({ projectId: projectId });
      
      if (res.rspCode == "0000") {
        //赋值
        let list = res.rspBody;
        let time = [];
        time.push(list.startTime.slice(0, 10));
        time.push(list.endTime.slice(0, 10));
        let array = list.projectAttrList || [];
        let innovativeness = "";
        let advancement = "";
        let practicability = "";
        let technologyContent = "";
        let promotionValue = "";
        let expectedBenefit = "";
        let others = "";
        if(array && array.length > 0){
          let cxx = array.find((item) => item.attrCode === "CXX");
          if(cxx) innovativeness = cxx.attrValue || '';
          let XJX = array.find((item) => item.attrCode === "XJX");
          if(XJX) advancement = XJX.attrValue || '';
          let SYX = array.find((item) => item.attrCode === "SYX");
          if(SYX) practicability = SYX.attrValue || '';
          let KJHL = array.find((item) => item.attrCode === "KJHL");
          if(KJHL) technologyContent = KJHL.attrValue || '';
          let TGJZ = array.find((item) => item.attrCode === "TGJZ");
          if(TGJZ) promotionValue = TGJZ.attrValue || '';
          let YJXY = array.find((item) => item.attrCode === "YJXY");
          if(YJXY) expectedBenefit = YJXY.attrValue || '';
          let QT = array.find((item) => item.attrCode === "QT");
          if(QT) others = QT.attrValue || '';
        }
        this.form = {
          programName: list.projectName, //项目名称
          approvalTime: time, //起始日期
          proBudget: list.economicBenefit, //效益
          cateName: list.typeAttrName, //所属类别
          proName: list.projectAttrName, //所属项目
          innovativeness, //创新性
          advancement, //先进性
          practicability, //实用性
          technologyContent, //科技含量
          promotionValue, //推广价值
          expectedBenefit, //预期效益
          others, //其他
          gradingInfo: "", //获奖情况
          fileList: [],
          appendixList:[],
        };
        this.flowList = list.approvalFlowList;
      } else {
        this.$message.error(res.rspDesc);
      }
    },
    //选择项目详情
    approvalChange(val) {
      
      this.queryApprovalDetail(val);
      // this.form = "";
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //选择认证名所属类别
    cateNameChange(val) {
      this.form.ca = "";
    },
    proNameChange(val) {
      this.form.ca = "";
    },
  // 小数点判断
    changeBenifit(e){
        let reg=/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        if(!reg.test(e)){
            this.$message.error('经济效益/社会效益项仅可输入数字（最多2位小数点）');
            return false
        }else{
            return true
        }
    },
    //暂存
    saveInitiation(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          
          
          
          
          if(!this.changeBenifit(this.form.proBudget)){return;}
          let cateObj = this.cateList.filter((item) => {
            return item.attrValue == this.form.cateName;
          });
          
          let proObj = this.programList.filter((item) => {
            return item.attrValue == this.form.proName;
          });
          let obj = JSON.parse(JSON.stringify(this.form));
          let itemList = [
            {
              itemCode: "CXX",
              itemName: "创新性",
              itemValue: obj.innovativeness,
              sort: 0,
            },
            {
              itemCode: "XJX",
              itemName: "先进性",
              itemValue: obj.advancement,
              sort: 1,
            },
            {
              itemCode: "SYX",
              itemName: "实用性",
              itemValue: obj.practicability,
              sort: 2,
            },
            {
              itemCode: "KJHL",
              itemName: "科技含量",
              itemValue: obj.technologyContent,
              sort: 3,
            },
            {
              itemCode: "TGJZ",
              itemName: "推广价值",
              itemValue: obj.promotionValue,
              sort: 4,
            },
            {
              itemCode: "CZJJXY",
              itemName: "创造的经济效益/社会效益",
              itemValue: obj.expectedBenefit,
              sort: 5,
            },
            {
              itemCode: "HJQK",
              itemName: "获奖情况",
              itemValue: obj.gradingInfo,
              sort: 6,
            },
            {
              itemCode: "QT",
              itemName: "其他",
              itemValue: obj.others,
              sort: 7,
            },
          ];
          let param = {
            projectName: obj.programName,
            projectId: "",
            startDate: obj.approvalTime[0],
            endDate: obj.approvalTime[1],
            benefit: obj.proBudget,
            innovationType: cateObj ? cateObj[0].attrCode : "",
            projectType: proObj ? proObj[0].attrCode : "",
            itemList: itemList,
          };
          if (this.form.fileList && this.form.fileList.length > 0) {
            param.backImage = this.form.fileList[0].name || "";
          }
          if (this.form.appendixList && this.form.appendixList.length > 0) {
            let list = this.form.appendixList.map(item=>{
              return {"fileName":item.fileName,"originalFilename":item.originalFilename}
            })
            if(list){
              param.appendixList = list;
            }
          }
          
          const res = await resultSaveProject(param);
          if (res.rspCode == "0000") {
            this.$confirm(`项目成果暂存成功,点击确认刷新页面`, "提示", {
              confirmButtonText: "确认",
              type: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            this.$message.error(res.rspDesc);
          }
        } else {
          return false;
        }
      });
    },
    //点击办理
    submitApply(formName) {
      console.log(this.form.appendixList )
      if(!this.form.appendixList || this.form.appendixList.length == 0) {
          this.$message.info("请上传至少一个附件！");
          return
      }
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.changeBenifit(this.form.proBudget)){return;}
          this.handleVisable = true;
        } else {
          return false;
        }
      });
    },
    //确认办理
    async onSubmit(data) {
      let cateObj = this.cateList.filter((item) => {
        return item.attrValue == this.form.cateName;
      });
      
      let proObj = this.programList.filter((item) => {
        return item.attrValue == this.form.proName;
      });
      let obj = JSON.parse(JSON.stringify(this.form));
      let list = JSON.parse(JSON.stringify(data.approvalInfoList));
      list.map((item) => {
        delete item.apprNumber;
        delete item.nodeState;
      });
      let projectModel = {
        projectName: this.form.programName,
        projectId: "",
        startDate: this.form.approvalTime[0],
        endDate: this.form.approvalTime[1],
        benefit: this.form.proBudget,
        innovationType: cateObj[0].attrCode,
        projectType: proObj[0].attrCode,
        itemList: [
          {
            itemCode: "CXX",
            itemName: "创新性",
            itemValue: obj.innovativeness,
            sort: 0,
          },
          {
            itemCode: "XJX",
            itemName: "先进性",
            itemValue: obj.advancement,
            sort: 1,
          },
          {
            itemCode: "SYX",
            itemName: "实用性",
            itemValue: obj.practicability,
            sort: 2,
          },
          {
            itemCode: "KJHL",
            itemName: "科技含量",
            itemValue: obj.technologyContent,
            sort: 3,
          },
          {
            itemCode: "TGJZ",
            itemName: "推广价值",
            itemValue: obj.promotionValue,
            sort: 4,
          },
          {
            itemCode: "CZJJXY",
            itemName: "创造的经济效益/社会效益",
            itemValue: obj.expectedBenefit,
            sort: 5,
          },
          {
            itemCode: "HJQK",
            itemName: "获奖情况",
            itemValue: obj.gradingInfo,
            sort: 6,
          },
          {
            itemCode: "QT",
            itemName: "其他",
            itemValue: obj.others,
            sort: 7,
          },
        ],
      };
      if (this.form.fileList && this.form.fileList.length > 0) {
        projectModel.backImage = this.form.fileList[0].name || "";
      }
      if (this.form.appendixList && this.form.appendixList.length > 0) {
        let list = this.form.appendixList.map(item=>{
              return {"fileName":item.fileName,"originalFilename":item.originalFilename}
        })
        console.log('#appendixList',list);
        projectModel.appendixList = this.form.appendixList;
      }
      let param = {
        projectModel: projectModel,
        applyReq: {
          opinion: data.opinion || "办理意见",
          approvalNodeList: [...list],
        },
      };
      const res = await resultHandleProject(param);
      if (res.rspCode == "0000") {
        this.$confirm(`项目成果申请成功,点击确认刷新页面`, "提示", {
          confirmButtonText: "确定",
          type: "success",
        }).then(() => {
          window.location.reload();
        });
        // this.goBack();
        // window.location.reload();
        // 
      } else {
        this.$message.error(res.rspDesc);
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
    handleSuccess(res, file, fileList,isAnnex) {
      
      
      let result = res.rspBody;
      result.name = result.fileName;
      
      if(isAnnex){
        
        this.form.appendixList.push(res.rspBody);
      } else {
        this.form.fileList.push(res.rspBody);
      }
      
    },
    handleRemove(file, fileList,isAnnex) {
      if(isAnnex){
      this.form.appendixList.map((item, index) => {
        if (item.originalFilename === file.name) {    
          this.form.appendixList.splice(index, 1);
        }
        console.log(this.form.appendixList,'====')
      });
      } else {
      this.form.fileList.map((item, index) => {
        if (item.name === file.name) {
          this.form.fileList.splice(index, 1);
        }
      });
      }
    },
    handleExceed(files, fileList,isAnnex) {
      if(isAnnex){
        this.$message.error(
          `当前限制选择 5 个文件，本次选择了 ${
            files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      } else {
        this.$message.error(
          `当前限制选择 1 个文件，本次选择了 ${
            files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      }
    },
    beforeUpload(file,isAnnex) {
      if(isAnnex){
          const isLt1M = file.size / 1024 / 1024 < 10;
        if (isLt1M) {
          return true;
        }
        
        return false;
      }
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

      const whiteList = ["pdf", "gif", "png", "jpg", "jpeg"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.info("上传文件只能是图片或pdf文件 ");
        return false;
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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