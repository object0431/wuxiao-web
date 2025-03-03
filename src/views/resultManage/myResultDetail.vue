<template>
  <div class="approval-detail-page">
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
                <div v-if="type !== 'edit'">{{form.projectName}}</div>
                <el-input
                  v-else
                  placeholder="请输入"
                  v-model="form.projectName"
                  :disabled="type == 'view'"
                ></el-input>
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
                <div v-if="type !== 'edit'">{{form.startDate}}至{{form.endDate}}</div>
                <el-date-picker
                  v-else
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
                <div v-if="type !== 'edit'">{{form.proBudget}}万元</div>
                <el-input
                  v-else
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
                <div v-if="type !== 'edit'">{{form.cateName}}</div>
                <el-select
                  v-else
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
                <div v-if="type !== 'edit'">{{form.proName}}</div>
                <el-select
                  v-else
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
            <el-col
              :span="24"
              v-for="subItem in form.itemList"
              :key="subItem.itemCode"
            >
              <el-form-item
                :label="subItem.itemName"
                label-width="190px"
                :prop="subItem.itemCode"
                :rules="[subItem.itemCode != 'QT' ?{
                      required: true,
                      message: `请输入${subItem.itemName}`,
                      trigger: 'blur',
                  }:'']"
              >
                <div v-if="type !== 'edit'" style="white-space: pre-wrap">{{subItem.itemValue}}</div>
                <el-input
                  v-else
                  v-model="subItem.itemValue"
                  type="textarea"
                  placeholder="请输入"
                  :disabled="type == 'view'"
                  rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="container" v-show="type === 'edit'">
          <el-row>
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
                  :file-list="form.fileList"
                >
                  <el-button
                    type="text"
                    icon="iconfont icon-daochu"
                    class="main-text-blue"
                  >上传图片</el-button>
                  <span class="tip">请上传jpg/png文件</span>
                </el-upload>
              </el-form-item>
            </el-col>

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
                  :file-list="form.appendixList"
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
        
         <div class="container" v-show="type !== 'edit'">
          <div class="text">附件下载</div>
          <div class="downloadBox">
          <div class="downloadItem" v-for="item in form.appendixList" :key="item">
            <a class="el-upload-list__item-name"><i class="el-icon-document">{{item.originalFilename || ''}}</i></a>
            <div class="downBtn" @click="downFile(item)">下载附件</div>
          </div>
          </div>
        </div>
      </el-form>
    </div>

    <!-- 流转意见 -->
    <div
      class="linkPoint"
      v-if="type !== 'edit'"
    >
      <flow-tips :flowList="flowList"></flow-tips>
    </div>

    <!-- 专家咨询 -->
    <div
      class="linkPoint"
      v-if="type != 'edit'"
    >
      <expert-score
        :expertList="expertList"
        @getScoring="getScoring"
      ></expert-score>
    </div>

    <footer :style="isWorkBench?'left:20px;width: calc(100vw - 20px);':''">
      <div class="operation">
        <div class="operation-text">当前环节: {{ currentLink }}</div>
        <div class="operation-btn">
          <el-button
            class="minorGrayButton"
            @click="goBack"
          >返回</el-button>
          <!-- <el-button
            class="minorRedButton"
            style="width: 100px"
            @click="withdraw('form')"
            v-if="type !== 'view'"
          >撤回
          </el-button> -->
          <el-button
            class="minorRedButton"
            style="width: 100px"
            @click="saveInitiation('form')"
            v-if="type !== 'view'"
          >暂存
          </el-button>
          <el-button
            class="mainRedButton"
            style="width: 100px"
            @click="submitApply('form')"
            v-if="type !== 'view'"
          >提交
          </el-button>
        </div>
      </div>
    </footer>

    <approvalHandle
      v-if="type !== 'view'"
      :visible="handleVisable"
      @close="handleVisable = false"
      @submit="onSubmit"
      type="CGSQ"
      :extId="projectId"
    ></approvalHandle>

    <getScore
      :visible="scoreShow"
      @closeModel="scoreShow = false"
      @submit="submitScore"
    ></getScore>

    <!--        <addStaff :visible="addStaffVisible" :orgCode="userInfo.companyId" :deptCode="userInfo.deptId"   @close="addStaffVisible=false" @closeAddModel="closeAddModel"></addStaff>-->
  </div>
</template>
  
<script>
import {
  resultSearchDetail,
  resultRecallProject,
  resultSaveProject,
  resultHandleProject,
} from "@/assets/api/resultManage";
import {
    queryListConsult,gradeConsult
} from '@/assets/api/common/index'
import { queryPublicParams,qryFLowLog,downloadFile } from "@/assets/api/common";
import approvalExamine from "@/components/approval/approvalExamine.vue";
import approvalHandle from "@/components/approval/resultApprovalHandle.vue";
import flowTips from "@/components/flowTips/flowTips.vue";
import getScore from "@/components/approval/getScore.vue";
import expertScore from "@/components/expertScore/expertScore.vue";
export default {
  name: "approvalApplication",
  components: { approvalExamine,flowTips,getScore,expertScore,approvalHandle },
  data() {
    return {
      type: "view",
      currentLink: "申请人",
      projectId: "",
      userInfo: {
        companyName: "",
        deptName: "",
        emailAddress: "",
        mobileTel: "",
        empName: "",
      },
      form: {
      },
      // （小发明、小创造、小革新、小设计、小建议）
      cateList: [],
      // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
      programList: [],
      //办理浮层
      handleVisable: false,
      tableLoading: false,
      flowList:[],//流转意见
      scoreShow:false,//评分
      expertList:[],//专家列表
      isWorkBench:false,
    };
  },
  created() {
    if(this.$route.params.isWhere){
      this.isWorkBench=true
    }
    if (this.$route.params.type) {
      let { type, applyId } = this.$route.params;
      this.type = type;
      if(type === 'edit'){
        this.queryPublicParams("CXLX");
        this.queryPublicParams("XMLX");
      }else{
        this.queryConsultList(applyId)
      }
      this.projectId = applyId;
      this.querySearchDetail();
    }
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
    //详情
    async querySearchDetail() {
      const res = await resultSearchDetail({ projectId: this.projectId });
      if (res.rspCode == "0000") {
        let list = res.rspBody;
        let time = [];
        time.push(list.startDate);
        time.push(list.endDate);
        list.approvalTime = time;
        let annexList = [];
        if(list.appendixList && list.appendixList.length > 0){// annexList
          for (const item of list.appendixList) {
            item.name = item.originalFilename || '';
            annexList.push(item)
          }
        }
        let bgList = [];
        if(list.backImage && list.backImage.length > 0){
          bgList.push({name:list.backImage})
        }
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
          itemList:list.itemList,
          fileList: bgList,
          appendixList:annexList
        };
        for (const item of list.itemList) {
          this.form[item.itemCode] = item.itemValue
        }
        console.log(this.form)
        if (this.$route.params.type!='edit') {
          this.qryFLowLog({
            flowType: 'CGSQ,SJCGZSJ',
            extId: this.projectId
          })
        }
        // this.form.projectFee = this.form.accomBudget + this.form.trainingBudget;
        // 
      } else {
        this.$message.error(res.rspDesc);
      }
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
    async qryFLowLog(params) {
      try {
        const res = await qryFLowLog(params)
        if (res.rspCode == "0000") {
          this.flowList = res.rspBody
        } else {
          this.$message.error(res.rspDesc)
        }
      } catch (error) {
        this.$message.error('请求出错')
      }
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
    //撤回
    withdraw(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$confirm(
            `您确定要撤回当前项目成果吗？`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(async () => {
            const res = await resultSearchDetail({ projectId: this.projectId });
            if (res.rspCode == "0000") {
                this.$message.success("项目成果已撤回成功");
                this.goBack();
            } else {
                this.$message.error(res.rspDesc);
            }
          });
        } else {
          return false;
        }
      });
    },
    //暂存
    saveInitiation(formName) {
      console.log(this.form)
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
              itemValue: obj.CXX,
              sort: 0,
            },
            {
              itemCode: "XJX",
              itemName: "先进性",
              itemValue: obj.XJX,
              sort: 1,
            },
            {
              itemCode: "SYX",
              itemName: "实用性",
              itemValue: obj.SYX,
              sort: 2,
            },
            {
              itemCode: "KJHL",
              itemName: "科技含量",
              itemValue: obj.KJHL,
              sort: 3,
            },
            {
              itemCode: "TGJZ",
              itemName: "推广价值",
              itemValue: obj.TGJZ,
              sort: 4,
            },
            {
              itemCode: "CZJJXY",
              itemName: "创造的经济效益/社会效益",
              itemValue: obj.CZJJXY,
              sort: 5,
            },
            {
              itemCode: "HJQK",
              itemName: "获奖情况",
              itemValue: obj.HJQK,
              sort: 6,
            },
            {
              itemCode: "QT",
              itemName: "其他",
              itemValue: obj.QT,
              sort: 7,
            },
          ];
          let param = {
            projectName: obj.projectName,
            projectId: obj.projectId || '',
            startDate: obj.approvalTime[0],
            endDate: obj.approvalTime[1],
            benefit: obj.proBudget,
            innovationType: cateObj ? cateObj[0].attrCode : "",
            projectType: proObj ? proObj[0].attrCode : "",
            itemList: this.form.itemList,
          };
          if (this.form.fileList && this.form.fileList.length > 0) {
            param.backImage = this.form.fileList[0].name || "";
          }
          if (this.form.appendixList && this.form.appendixList.length > 0) {
            let list = this.form.appendixList.map(item=>{
              return {"fileName":item.fileName,"originalFilename":item.originalFilename}
            })
            param.appendixList = list;
          }
          const res = await resultSaveProject(param);
          if (res.rspCode == "0000") {
            this.$confirm(`项目成果暂存成功,点击确认返回`, "提示", {
              confirmButtonText: "确认",
              type: "success",
            }).then(() => {
              this.goBack();
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
      let list = data.approvalInfoList;
      list.map((item) => {
        delete item.apprNumber;
        delete item.nodeState;
      });
      let projectModel = {
        projectName: this.form.projectName,
        projectId: obj.projectId || '',
        startDate: this.form.approvalTime[0],
        endDate: this.form.approvalTime[1],
        benefit: this.form.proBudget,
        innovationType: cateObj[0].attrCode,
        projectType: proObj[0].attrCode,
        backImage: "",
        // itemList: [
        //   {
        //     itemCode: "CXX",
        //     itemName: "创新性",
        //     itemValue: obj.CXX,
        //     sort: 0,
        //   },
        //   {
        //     itemCode: "XJX",
        //     itemName: "先进性",
        //     itemValue: obj.XJX,
        //     sort: 1,
        //   },
        //   {
        //     itemCode: "SYX",
        //     itemName: "实用性",
        //     itemValue: obj.SYX,
        //     sort: 2,
        //   },
        //   {
        //     itemCode: "KJHL",
        //     itemName: "科技含量",
        //     itemValue: obj.KJHL,
        //     sort: 3,
        //   },
        //   {
        //     itemCode: "TGJZ",
        //     itemName: "推广价值",
        //     itemValue: obj.TGJZ,
        //     sort: 4,
        //   },
        //   {
        //       itemCode: "CZJJXY",
        //       itemName: "创造的经济效益/社会效益",
        //       itemValue: obj.CZJJXY,
        //       sort: 5,
        //     },
        //     {
        //       itemCode: "HJQK",
        //       itemName: "获奖情况",
        //       itemValue: obj.HJQK,
        //       sort: 6,
        //     },
        //     {
        //       itemCode: "QT",
        //       itemName: "其他",
        //       itemValue: obj.QT,
        //       sort: 7,
        //     },
        // ],
        itemList:this.form.itemList
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
          opinion: data.opinion || "我是办理意见",
          approvalNodeList: [...list],
        },
      };
      const res = await resultHandleProject(param);
      if (res.rspCode == "0000") {
        this.$message.success("办理项目成果成功");
        this.goBack();
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
        if (item.name === file.name) {
          this.form.appendixList.splice(index, 1);
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
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    //查询咨询详情
    async queryConsultList(id){
      const res = await queryListConsult(id);
      if (res.rspCode=='0000') {
          this.expertList=res.rspBody
      } else {
          this.$message.error(res.rspDesc)
      }
    },
    //评分
    async submitScore(score){
      this.tableLoading = true
      this.scoreShow=false
      
      //查询专家评分接口
      const res = await gradeConsult(this.currentCode,score)
      if (res.rspCode=='0000') {
          this.tableLoading = false
          this.$message.success("评分成功");
          this.queryConsultList(this.$route.params.applyId)
          // this.goBack();
      } else {
          this.tableLoading = false
          this.$message.error(res.rspDesc)
      }
    },
    getScoring(code){
      
      this.currentCode=code
      this.scoreShow=true
    },
    async downFile(fileName){
      if(fileName && Object.keys(fileName).length > 0){
        fileName = fileName.fileName;
      }
      this.$message.info('正在下载，请稍后')
      // let reviewId=this.reviewId
      // let fileName=this.form.reviewTitle
      // 
      // let url=window.location.host
      // let file='http://'+url+`/tmc-talent/file/downloadFile?fileName=${fileName}`
      // let link = document.createElement('a'); // 创建a标签
      // link.setAttribute("download", fileName);
      // // href链接
      // link.setAttribute("href", file);
      // link.setAttribute("target", "_blank");
      // // 自执行点击事件
      // link.click();
       await downloadFile(fileName)
    },
  },
};
</script>
  
<style lang="scss" scoped>
.approval-detail-page {
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

    .downloadBox{
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .downloadItem{
        display: flex;
        margin: 10px;
        .downTitle{
          color: #909399;
          text-indent: 20px;
        }
        .downBtn{
          color: #5991ff;
          margin: 0 20px;
        }
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